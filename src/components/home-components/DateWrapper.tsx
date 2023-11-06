//react
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
//next
//styles
import styles from "../../styles/components/date-wrapper.module.scss";
import "react-day-picker/dist/style.css";
//component
import { DayPicker } from "react-day-picker";
//hooks
import { useDateStore } from "@/stores/DateStore";

type Prop = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};
const DateWrapper: React.FC<Prop> = ({ setOpen }) => {
	const { date, setValue } = useDateStore();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (!ref.current || ref.current.contains(event.target as HTMLElement)) return;
			setOpen(false);
		};
		document.addEventListener("click", listener);
		return () => document.removeEventListener("click", listener);
	}, [ref, setOpen]);

	return (
		<div className={styles["date-wrapper-container"]} ref={ref}>
			<DayPicker
				mode="single"
				selected={date}
				onSelect={(date) => setValue("date", date)}
				modifiersClassNames={{
					selected: `${styles["selected"]}`,
				}}
			/>
		</div>
	);
};

export default DateWrapper;
