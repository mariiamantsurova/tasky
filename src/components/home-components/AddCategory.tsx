//React
import React, { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
//styles
import styles from "../../styles/components/add-category.module.scss";
//components
import Plus from "../../../public/icons/Plus";
import { useCategoryStore } from "@/stores/CategoriesStore";

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddCategory: React.FC<Props> = ({ setOpen }) => {
	const { title, setValue, reset } = useCategoryStore();

	const handleSubmit = async (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (!title) {
			alert("category and color is required");
			return;
		}
		try {
			const res = await fetch(`http://localhost:3000/api/categories`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title }),
			});
			if (res.ok) {
				alert("category added successfully");
				reset();
				setOpen(false);
			} else {
				alert("error in adding category");
			}
		} catch (error) {
			alert("Oops something went wrong");
		}
	};

	return (
		<div className={styles["add-category-container"]}>
			<h3>New Category</h3>
			<input type="text" placeholder="type category" onChange={(e) => setValue("title", e.target.value)} />
			<button
				onClick={(e) => {
					handleSubmit(e);
				}}
			>
				<Plus />
			</button>
		</div>
	);
};

export default AddCategory;
