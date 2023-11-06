import { statsCategory } from "@/app/dashboard/page";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type Props = {
	statsCategory: statsCategory[] | undefined;
};

const CategoryChart: React.FC<Props> = ({ statsCategory }) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart width={400} height={400}>
				<Pie data={statsCategory} dataKey="count" cx="50%" cy="50%" innerRadius={70} outerRadius={90}>
					{statsCategory?.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default CategoryChart;
