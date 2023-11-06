"use client";
//react
import React, { ReactNode, useState } from "react";
//next
//styles
import styles from "../../styles/components/accordion.module.scss";
//components
import ArrowDown from "../../../public/icons/ArrowDown";
import ArrowUp from "../../../public/icons/ArrowUp";
import { TaskType } from "@/stores/TasksStore";
import TaskList from "./TaskList";

type Props = {
	title: string;
	color?: string;
	tasks: TaskType[];
	type?: "done";
	badge: number;
};

const Accordion: React.FC<Props> = ({ title, color, tasks, type, badge }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleOpen = () => {
		setIsOpen((value) => !value);
	};

	return (
		<div className={`${styles["accordion-container"]} ${type && styles["done"]}`}>
			<div style={{ backgroundColor: type ? "#BFC5CF" : color }} className={styles["ticket"]}></div>
			<button onClick={toggleOpen} className={styles["accordion-wrapper"]}>
				<h3>{title}</h3>
				<div className={styles["accordion-right-side"]}>
					{isOpen ? <ArrowDown /> : <ArrowUp />}
					<span>{badge}</span>
				</div>
			</button>
			<div className={`${styles["list"]} ${!isOpen && styles["hidden"]}`}>
				<TaskList tasksByCategory={tasks} type={type} />
			</div>
		</div>
	);
};

export default Accordion;
