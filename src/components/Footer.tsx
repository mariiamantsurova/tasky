"use client";
//react
import React, { Dispatch, SetStateAction } from "react";
//next
import { usePathname } from "next/navigation";
import Link from "next/link";
//styles
import styles from "../styles/components/footer.module.scss";
//components
import Tasks from "../../public/icons/Tasks";
import Dashboard from "../../public/icons/Dashboard";
import Plus from "../../public/icons/Plus";
//hooks
//constants

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const Footer: React.FC<Props> = ({ setOpen }) => {
	const location = usePathname();

	return (
		<footer className={styles["footer-container"]}>
			<div className={styles["links-wrapper"]}>
				<div className={`${styles["link-container"]} ${location === "/" ? styles["active-link"] : ""}`}>
					<Link href="/">
						<Tasks />
					</Link>
					<h3>tasks</h3>
				</div>
				<div className={`${styles["link-container"]} ${location === "/dashboard" ? styles["active-link"] : ""}`}>
					<Link href="/dashboard">
						<Dashboard />
					</Link>
					<h3>stats</h3>
				</div>
			</div>
			<div className={styles["plus-container"]}>
				<button className={styles["plus-wrapper"]} onClick={() => setOpen(true)}>
					<Plus />
				</button>
			</div>
		</footer>
	);
};

export default Footer;
