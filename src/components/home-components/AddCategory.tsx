//React
import React, { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
//styles
import styles from "../../styles/components/add-category.module.scss";
//components
import Plus from "../../../public/icons/Plus";
import { useCategoryStore, useGetCategoryStore } from "@/stores/CategoriesStore";
import { Toaster, toast } from "react-hot-toast";

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddCategory: React.FC<Props> = ({ setOpen }) => {
	const { title, setValue, reset } = useCategoryStore();

	const setCategoriesValue = useGetCategoryStore().setValue;
	const { categories } = useGetCategoryStore();

	const handleSubmit = async (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (!title) {
			toast.error("category and color is required");
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
				toast.success("category added successfully");
				const { _id, color } = await res.json();
				setCategoriesValue({ categories: [...Object.values(categories), { _id: _id, title: title, color: color }] });
				reset();
				setOpen(false);
			} else {
				toast.error("error in adding category");
			}
		} catch (error) {
			toast.error("Oops something went wrong");
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
			<Toaster />
		</div>
	);
};

export default AddCategory;
