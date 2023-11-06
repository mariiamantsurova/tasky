//react
import React, { forwardRef } from "react";
//next
import Image from "next/image";
//styles
import styles from "../../styles/components/component-to-print.module.scss";
//components
//stores
import { useGetCategoryStore } from "@/stores/CategoriesStore";
import { useGetTasksStore } from "@/stores/TasksStore";
//functions
import { getTasksByCategory } from "@/app/page";
import Important from "../../../public/icons/Important";

const ComponentToPrint = () => {
	const { categories } = useGetCategoryStore();
	const { tasks } = useGetTasksStore();

	return (
		<div className={styles["component-to-print-container"]}>
			<div className="logo">
				<Image className={styles["logo"]} src="/images/logo.png" alt="logo" width="605" height="500" />
			</div>
			{Object.values(categories)
				.reverse()
				.map((category) => {
					if (category.title !== "done") {
						const tasksByCategory = getTasksByCategory(category.title, tasks);
						if (tasksByCategory.length) {
							return (
								<div key={category._id} className={styles["category-title"]}>
									<h1>{category.title}</h1>
									{Object.values(tasksByCategory).map((task) => {
										return (
											<div className={styles["task-container"]} key={task._id}>
												<span className={styles["checkmark"]}></span>
												<h3 className={styles["task-title"]}>{task.task}</h3>
												{task.important && <Important />}
											</div>
										);
									})}
								</div>
							);
						}
					}
				})}
		</div>
	);
};

const ComponentToPrintWithRef = forwardRef<HTMLDivElement>((props, ref) => (
	<div ref={ref}>
		<ComponentToPrint />
	</div>
));
ComponentToPrintWithRef.displayName = "ComponentToPrint";

export default ComponentToPrintWithRef;
