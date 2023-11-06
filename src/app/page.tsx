"use client";
import { useEffect, useState } from "react";
//next
import Image from "next/image";
import { useRouter } from "next/navigation";
//styles
import styles from "../styles/home.module.scss";
//component
import Header from "@/components/home-components/Header";
import Accordion from "@/components/home-components/Accordion";
import Footer from "@/components/Footer";
import Modal from "@/components/home-components/Modal";
import AddTask from "@/components/home-components/AddTask";
import AddCategory from "@/components/home-components/AddCategory";
import { Toaster, toast } from "react-hot-toast";
//stores
import { useDateStore } from "@/stores/DateStore";
import { useGetCategoryStore } from "@/stores/CategoriesStore";
import { TaskType, useGetTasksStore } from "@/stores/TasksStore";
import Loader from "@/components/Loader";
//types

export const getTasksByCategory = (category: string, tasks: TaskType[]) => {
	return Object.values(tasks).filter((task) => {
		return task.category === category;
	});
};

async function getData(date: Date | undefined) {
	const localDateString = date?.toLocaleDateString();
	const categories = await fetch(`http://localhost:3000/api/categories`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const tasks = await fetch(`http://localhost:3000/api/getTasks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ localDateString }),
	});
	if (!tasks.ok) {
		const { error } = await tasks.json();
		throw new Error(error);
	}
	if (!categories.ok) {
		const { error } = await categories.json();
		throw new Error(error);
	}
	return {
		categories: await categories.json(),
		tasks: await tasks.json(),
	};
}

const Home = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const setValuesCategory = useGetCategoryStore().setValue;
	const { categories } = useGetCategoryStore();
	const setValueTasks = useGetTasksStore().setValue;
	const { tasks } = useGetTasksStore();

	const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
	const [showAddCategoriesModal, setShowAddCategoriesModal] = useState<boolean>(false);
	const { date } = useDateStore();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`http://localhost:3000/api/checkAuth`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				});
				const { error } = await res.json();
				if (res.status === 401) {
					router.push("/login");
				} else if (error !== undefined) {
					throw new Error(error);
				}
			} catch (error: any) {
				toast.error(error);
			}
		})().then(() =>
			getData(date).then(({ categories, tasks }) => {
				setValuesCategory(categories);
				setValueTasks(tasks);
				setIsLoading(false);
			}),
		);
	}, [date, router, setValueTasks, setValuesCategory]);

	return (
		<main className={styles["main"]}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Header />
					<section className={styles["tasks-section"]}>
						<div className={styles["logo"]}>
							<Image src="/images/logo.png" alt="logo" layout="fill" objectFit="cover" />
						</div>
						<div className={styles["accordions-container"]}>
							{Object.values(categories)
								.reverse()
								.map((category) => {
									const tasksByCategory = getTasksByCategory(category.title, tasks);
									if (tasksByCategory.length) {
										return (
											<Accordion
												title={category.title}
												tasks={tasksByCategory}
												color={category.color}
												key={category._id}
												type={category.title === "done" ? "done" : undefined}
												badge={tasksByCategory.length}
											/>
										);
									}
								})}
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
					<Toaster />
				</>
			)}
		</main>
	);
};

export default Home;
