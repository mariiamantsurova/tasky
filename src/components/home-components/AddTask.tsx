//react
import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";
//next
//styles
import styles from "../../styles/components/add-task.module.scss";
//components
import Switch from "react-switch";
import Plus from "../../../public/icons/Plus";
import AddCategory from "./AddCategory";
import Modal from "./Modal";
//stores
import { useTasksStore } from "@/stores/TasksStore";

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>;
	setCategoryOpen: Dispatch<SetStateAction<boolean>>;
};

const AddTask: React.FC<Props> = ({ setOpen, setCategoryOpen }) => {
	const categories = [
		{ title: "dev", id: "1" },
		{ title: "house", id: "2" },
		{ title: "study", id: "3" },
	];
	const { title, category, date, notification, setValue, reset } = useTasksStore();
	const [selected, setSelected] = useState<number | undefined>();

	const handleSubmit = async (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (!title || !category) {
			alert("title and category is required");
			return;
		}
		try {
			const res = await fetch(`http://localhost:3000/api/tasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, category, date, notification }),
			});
			if (res.ok) {
				alert("task added successfully");
				reset();
				setOpen(false);
			} else {
				//TODO change alerts with toasts
				alert("error in adding task");
			}
		} catch (error) {
			alert("Oops something went wrong");
		}
	};

	return (
		<div className={styles["add-task-container"]}>
			<input type="text" placeholder="Type the Task" className={styles["add-task-input"]} onChange={(e) => setValue("title", e.target.value)} />
			<div className={styles["category-title"]}>
				<h3>Categories</h3>
				<button onClick={() => setCategoryOpen(true)}>
					<Plus />
				</button>
			</div>
			<div className={styles["categories-container"]}>
				{categories.map((category, index) => {
					return (
						<button
							className={styles[`${index === selected && "selected"}`]}
							key={category.id}
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
			<div className={styles["notification-container"]}>
				<h3>notification</h3>
				<Switch
					onChange={(e) => setValue("notification", e)}
					checked={notification}
					offColor="#E8DBF1"
					onColor="#7209B7"
					checkedIcon={false}
					uncheckedIcon={false}
				/>
			</div>
			<button className={styles["add-btn"]} onClick={(e: MouseEvent<HTMLElement>) => handleSubmit(e)}>
				<Plus />
			</button>
		</div>
	);
};

export default AddTask;
