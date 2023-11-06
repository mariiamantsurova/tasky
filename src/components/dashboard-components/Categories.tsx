import { statsCategory } from "@/app/dashboard/page";
import { useGetCategoryStore } from "@/stores/CategoriesStore";
import React from "react";

type Props = {
	statsCategory: statsCategory[] | undefined;
};

const Categories: React.FC<Props> = ({ statsCategory }) => {
	return (
		<div style={{ display: "flex", gap: "10px", alignItems: "flex-start", flexDirection: "column", overflowY: "auto" }}>
			{statsCategory?.map((category) => {
				return (
					<div key={category._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<span style={{ width: "15px", height: "15px", display: "block", backgroundColor: category.color, borderRadius: "50%" }} />
						<h3>{category._id}</h3>
					</div>
				);
			})}
		</div>
	);
};

export default Categories;
