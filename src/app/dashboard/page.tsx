"use client";
//react
import React, { useEffect, useState } from "react";
//next
import Image from "next/image";
//styles
import styles from "../../styles/dashboard.module.scss";
//component
import Header from "@/components/dashboard-components/Header";

import Footer from "@/components/Footer";
import WeekChart from "@/components/dashboard-components/WeekChart";
import CategoryChart from "@/components/dashboard-components/CategoryChart";
import CompletedChart from "@/components/dashboard-components/CompletedChart";
import Categories from "@/components/dashboard-components/Categories";
import { useDateRangeStore } from "@/stores/DateRange";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Loader from "@/components/Loader";

async function getData(dateStart: Date | undefined, dateFinish: Date | undefined) {
	const dateStartString = dateStart?.toLocaleDateString();
	const dateFinishString = dateFinish?.toLocaleDateString();

	const resStatsCategory = await fetch(`${process.env.BASE_URL}/api/statsCategory`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ dateStartString, dateFinishString }),
	});
	const resStatsCompleted = await fetch(`${process.env.BASE_URL}/api/statsCompleted`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ dateStartString, dateFinishString }),
	});
	const resStatsDate = await fetch(`${process.env.BASE_URL}/api/statsDate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ dateStartString, dateFinishString }),
	});

	if (!resStatsCategory.ok || !resStatsCompleted.ok || !resStatsDate.ok) {
		throw new Error("Failed to fetch data");
	}

	return {
		statsCategory: await resStatsCategory.json().then((res) => res.statsCategory),
		statsCompleted: await resStatsCompleted.json().then((res) => res.statsCompleted),
		statsDate: await resStatsDate.json().then((res) => res.statsDate),
	};
}
export type statsDate = {
	day: string;
	tasks: number;
};
export type statsCompleted = {
	_id: string;
	tasks: number;
};

export type statsCategory = {
	_id: string;
	count: number;
	color: string;
};

const Dashboard = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { dateStart, dateFinish } = useDateRangeStore();

	const [statsDate, setStatsDate] = useState<statsDate[]>();
	const [statsCategory, setStatsCategory] = useState<statsCategory[]>([]);
	const [statsCompleted, setStatsCompleted] = useState<statsCompleted[]>([]);

	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`${process.env.BASE_URL}/api/checkAuth`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				});
				const { error } = await res.json();
				if (res.status === 401) {
					router.push("/login");
				}
				if (error !== undefined) {
					throw new Error(error);
				}
			} catch (error: any) {
				toast.error(error);
			}
		})().then(() =>
			getData(dateStart, dateFinish).then((data) => {
				setStatsDate(data.statsDate);
				setStatsCategory(data.statsCategory);
				setStatsCompleted(data.statsCompleted);
			}),
		);
		setIsLoading(false);
	}, [dateFinish, dateStart, router]);

	return (
		<main className={styles["dashboard-container"]}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Header />
					<section className={styles["dashboard-section"]}>
						<Image className={styles["logo"]} src="/images/small-logo.png" alt="logo" width="200" height="72" />
						<div className={styles["dashboard-grid"]}>
							<div className={`${styles["grid-container"]} ${styles["row-2"]}`}>
								<Categories statsCategory={statsCategory} />
							</div>
							<div className={`${styles["grid-container"]} ${styles["aspect-ration"]}`}>
								<CategoryChart statsCategory={statsCategory} />
							</div>
							<div className={`${styles["grid-container"]} ${styles["column-2"]} ${styles["row-2"]}`}>
								<h3>
									Week stats:{" "}
									<b>
										{dateStart?.toDateString()}-{dateFinish?.toDateString()}
									</b>
								</h3>
								<WeekChart statsDate={statsDate} />
							</div>
							<div className={`${styles["grid-container"]} ${styles["aspect-ration"]} ${styles["title-center"]}`}>
								<CompletedChart statsCompleted={statsCompleted} />
								{statsCompleted[0] ? (
									<h3>
										Completed: <br />
										<b>
											{statsCompleted[1]?.tasks}/{statsCompleted[0]?.tasks}
										</b>
									</h3>
								) : null}
							</div>
						</div>
					</section>
					<Footer />
				</>
			)}
			<Toaster />
		</main>
	);
};

export default Dashboard;
