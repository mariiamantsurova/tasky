//react
import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";
//next
//styles
import styles from "../../styles/components/add-task.module.scss";
//components
import Switch from "react-switch";
import Plus from "../../../public/icons/Plus";
//stores
import { useGetTasksStore, useTasksStore } from "@/stores/TasksStore";
import { useGetCategoryStore } from "@/stores/CategoriesStore";
import { useDateStore } from "@/stores/DateStore";
import toast, { Toaster } from "react-hot-toast";

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>;
	setCategoryOpen: Dispatch<SetStateAction<boolean>>;
};

const AddTask: React.FC<Props> = ({ setOpen, setCategoryOpen }) => {
	const { categories } = useGetCategoryStore();
	const { task, category, important, setValue, reset } = useTasksStore();
	const { date } = useDateStore();
	const setTasks = useGetTasksStore().setValue;
	const { tasks } = useGetTasksStore();
	const [selected, setSelected] = useState<number | undefined>();

	const handleSubmit = async (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const localDateString = date ? date.toLocaleDateString() : new Date().toLocaleDateString();
		if (!task || !category) {
			console.log(task);
			console.log(category);
			toast.error("task and category is required");
			return;
		}
		try {
			const res = await fetch(`http://localhost:3000/api/tasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ task, category, localDateString, important }),
			});
			if (res.ok) {
				const { _id } = await res.json();
				setTasks({ tasks: [...Object.values(tasks), { _id: _id, task: task, category: category, important: important }] });
				reset();
				toast.success("task added successfully");
				setTimeout(() => {
					setOpen(false);
				}, 2000);
			} else {
				throw new Error("error in adding task");
			}
		} catch (error) {
			toast.error("Oops something went wrong" + error);
		}
	};

	return (
		<div className={styles["add-task-container"]}>
			<input type="text" placeholder="Type the Task" className={styles["add-task-input"]} onChange={(e) => setValue("task", e.target.value)} />
			<div className={styles["category-title"]}>
				<h3>Categories</h3>
				<button onClick={() => setCategoryOpen(true)}>
					<Plus />
				</button>
			</div>
			<div className={styles["categories-container"]}>
				{Object.values(categories).map((category, index) => {
					if (category.title !== "done")
						return (
							<button
								className={styles[`${index === selected && "selected"}`]}
								key={category._id}
								onClick={() => {
									setValue("category", category.title);
									setSelected(index);
								}}
							>
								{category.title}
							</button>
						);
				})}
			</div>
			<div className={styles["important-container"]}>
				<h3>important</h3>
				<Switch
					onChange={(e) => setValue("important", e)}
					checked={important}
					offColor="#E8DBF1"
					onColor="#7209B7"
					checkedIcon={false}
					uncheckedIcon={false}
				/>
			</div>
			<button className={styles["add-btn"]} onClick={(e: MouseEvent<HTMLElement>) => handleSubmit(e)}>
				<Plus />
			</button>
			<Toaster />
		</div>
	);
};

export default AddTask;
