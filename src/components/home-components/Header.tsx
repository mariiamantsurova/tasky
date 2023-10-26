"use client";
//react
import React, { useCallback, useEffect, useState } from "react";
//next
//styles
import styles from "../../styles/components/header.module.scss";
//components
import Print from "../../../public/icons/Print";
import Calendar from "../../../public/icons/Calendar";
import DateWrapper from "./DateWrapper";
//hooks
import { useDateStore } from "@/stores/DateStore";
import { weekdays } from "../../../constansts/weekdays";
//constants

type listDay = {
	weekDay: string;
	dateDay: number;
	fullDate: Date;
};

const Header = () => {
	const [today, setToday] = useState<Date>(new Date());
	const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
	const { date, setValue } = useDateStore();
	const [listDay, setListDay] = useState<listDay[]>([]);

	const listArray = useCallback((date: Date | undefined): Array<listDay> => {
		!date && (date = new Date());
		const arr = [];
		for (let i = -3; i < 4; i++) {
			const weekday = (date.getDay() + i) % 7;
			arr.push({
				weekDay: weekdays[weekday < 0 ? Math.abs(weekday) : weekday],
				dateDay: new Date(new Date().setDate(date.getDate() + i)).getDate(),
				fullDate: new Date(new Date().setDate(date.getDate() + i)),
			});
		}
		return arr;
	}, []);

	useEffect(() => {
		setListDay(listArray(date));
	}, [date, listArray]);

	useEffect(() => {
		setToday(new Date());
	}, []);

	return (
		<header className={styles["header-container"]}>
			<div className={styles["today-container"]}>
				<div className={styles["today-text"]}>
					<h2>{today.toDateString()}</h2>
				</div>
				<div className={styles["btns-container"]}>
					<button>
						<Print />
					</button>
					<button onClick={() => setDatePickerOpen(true)}>
						<Calendar />
					</button>
				</div>
			</div>
			{datePickerOpen && <DateWrapper setOpen={setDatePickerOpen} />}
			<div className={styles["day-select-container"]}>
				{listDay.map((day: listDay, index: number) => {
					return (
						<div key={index} className={`${index === 3 ? styles["selected-day"] : ""} ${styles["day-container"]}`}>
							<h3 className={styles["day-text"]}>{day.weekDay}</h3>
							<button
								className={styles["day-btn"]}
								onClick={() => {
									setValue({ date: day.fullDate });
								}}
							>
								<h3>{day.dateDay}</h3>
							</button>
						</div>
					);
				})}
			</div>
		</header>
	);
};

export default Header;
