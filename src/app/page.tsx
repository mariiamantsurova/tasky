"use client";
import { useEffect, useState } from "react";
//next
import Image from "next/image";
//styles
import styles from "../styles/home.module.scss";
//component
import Header from "@/components/home-components/Header";
import Accordion from "@/components/home-components/Accordion";
import Footer from "@/components/Footer";
import Modal from "@/components/home-components/Modal";
import AddTask from "@/components/home-components/AddTask";
import AddCategory from "@/components/home-components/AddCategory";
//stores
import { useDateStore } from "@/stores/DateStore";
async function getData() {
	const categories = await fetch(`http://localhost:3000/api/categories`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const tasks = await fetch(`http://localhost:3000/api/tasks`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!categories.ok || !tasks.ok) {
		throw new Error("Failed to fetch data");
	}

	return {
		categories: await categories.json(),
		tasks: await tasks.json(),
	};
}
//TODO change type
type Props = {
	categories: Record<string, string>[];
	tasks: Record<string, string>[];
};

export default function Home() {
	const children = <h1>Hi</h1>;
	const [data, setData] = useState<Props>();
	const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
	const [showAddCategoriesModal, setShowAddCategoriesModal] = useState<boolean>(false);
	const date = useDateStore();

	useEffect(() => {
		getData().then((data) => {
			setData(data);
		});
	}, [date]);

	return (
		<main className={styles["main"]} onClick={() => console.log(data)}>
			<Header />
			<section className={styles["tasks-sections"]}>
				<Image className={styles["logo"]} src="/images/logo.png" alt="logo" width="605" height="500" />
				<div className={styles["accordions-container"]}>
					<Accordion title="Accordion" tasks={children} color="red" />
					<Accordion title="Accordion" tasks={children} type="done" />
				</div>
			</section>
			<Footer setOpen={setShowAddTaskModal} />
			{showAddTaskModal && (
				<Modal setOpen={setShowAddTaskModal} zIndex={2} height={"60%"}>
					<AddTask setOpen={setShowAddTaskModal} setCategoryOpen={setShowAddCategoriesModal} />
				</Modal>
			)}
			{showAddCategoriesModal && (
				<Modal setOpen={setShowAddCategoriesModal} zIndex={4} height={"30%"}>
					<AddCategory setOpen={setShowAddCategoriesModal} />
				</Modal>
			)}
		</main>
	);
}
