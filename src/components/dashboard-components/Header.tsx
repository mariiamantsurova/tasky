//react
import React, { useState, MouseEvent } from "react";
//next
//styles
import styles from "../../styles/components/header-dashboard.module.scss";
//component
//store
import { useDateRangeStore } from "@/stores/DateRange";
const Header = () => {
	const today = new Date();
	const [active, setActive] = useState<string>("weekly");
	const { setValue, dateStart, dateFinish } = useDateRangeStore();

	const handleChangeStats = (e: MouseEvent<HTMLButtonElement>) => {
		if ((e.target as HTMLButtonElement).value === "weekly" && active !== "weekly") {
			setActive("weekly");
			setValue("dateStart", new Date(new Date().setDate(new Date().getDate() - new Date().getDay())));
			setValue("dateFinish", new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7)));
		}
		if ((e.target as HTMLButtonElement).value === "monthly" && active !== "monthly") {
			setActive("monthly");
			setValue("dateStart", new Date(new Date().getFullYear(), new Date().getMonth(), 1));
			setValue("dateFinish", new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
		}
	};
	return (
		<div className={styles["header-dashboard"]}>
			<div className={styles["today-container"]}>
				<h2>{today.toDateString()}</h2>
			</div>
			<div className={styles["btns-container"]}>
				<button className={active === "weekly" ? styles["active"] : ""} onClick={(e) => handleChangeStats(e)} value={"weekly"}>
					weekly
				</button>
				<button className={active === "monthly" ? styles["active"] : ""} onClick={(e) => handleChangeStats(e)} value={"monthly"}>
					monthly
				</button>
			</div>
		</div>
	);
};

export default Header;
