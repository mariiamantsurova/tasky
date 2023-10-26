"use client";
//react
import React, { ReactNode, useState } from "react";
//next
//styles
import styles from "../../styles/components/accordion.module.scss";
//components
import ArrowDown from "../../../public/icons/ArrowDown";
import ArrowUp from "../../../public/icons/ArrowUp";

type Props = {
	title: string;
	color?: string;
	tasks: ReactNode;
	type?: "done";
};

const Accordion: React.FC<Props> = ({ title, color, tasks, type }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleOpen = () => {
		setIsOpen((value) => !value);
	};

	return (
		<div className={styles["accordion-container"]}>
			<div style={{ backgroundColor: type ? "#BFC5CF" : color }} className={styles["ticket"]}></div>
			<button onClick={toggleOpen} className={styles["accordion-wrapper"]}>
				<h3>{title}</h3>
				{isOpen ? <ArrowDown /> : <ArrowUp />}
			</button>
			<div className={`${styles["list"]} ${!isOpen ? styles["hidden"] : ""}`}>{tasks}</div>
		</div>
	);
};

export default Accordion;
