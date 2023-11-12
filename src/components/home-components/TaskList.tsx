//react
import React, { useState } from "react";
//styles
import styles from "../../styles/components/task-list.module.scss";
//components
import Delete from "../../../public/icons/Delete";
import { TaskType, useGetTasksStore } from "@/stores/TasksStore";
import CheckMark from "../../../public/icons/CheckMark";
import Important from "../../../public/icons/Important";
//stores

type Props = {
	tasksByCategory: TaskType[];
	type?: "done";
};

const TaskList: React.FC<Props> = ({ tasksByCategory, type }) => {
	const { tasks, setValue } = useGetTasksStore();
	const onDelete = async (_id: string) => {
		try {
			const res = await fetch(`${process.env.BASE_URL}/api/tasks`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ task_id: _id }),
			});
			if (res.ok) {
				setValue({
					tasks: tasks.filter((task) => {
						return task._id !== _id;
					}),
				});
			} else {
				//TODO change alerts with toasts
				alert("error in deleting task");
			}
		} catch (error) {
			alert("Oops something went wrong" + error);
		}
	};
	const onChecked = async (_id: string) => {
		console.log("checked");
		try {
			const res = await fetch(`${process.env.BASE_URL}/api/tasks`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ task_id: _id }),
			});
			if (res.ok) {
				setValue({
					tasks: tasks.map((task) => {
						if (task._id === _id) {
							task.category = "done";
							return task;
						}
						return task;
					}),
				});
			} else {
				//TODO change alerts with toasts
				alert("error in checking task");
			}
		} catch (error) {
			alert("Oops something went wrong" + error);
		}
	};
	return (
		<div className={styles["task-list-container"]}>
			{tasksByCategory.map((task, index) => {
				return (
					<div key={index} className={styles["task-list-wrapper"]}>
						<span className={styles["check-mark"]}>
							{type ? <CheckMark /> : ""}
							<input
								type="checkbox"
								disabled={type ? true : false}
								onClick={() => {
									onChecked(task._id);
								}}
							></input>
						</span>
						<h3 className={type && styles["done"]}>{task.task}</h3>
						<div className={styles["task-list-right"]}>
							{task.important && <Important />}
							<button
								onClick={() => {
									onDelete(task._id);
								}}
							>
								<Delete />
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TaskList;
