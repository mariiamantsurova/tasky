import { statsCompleted } from "@/app/dashboard/page";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type Props = {
	statsCompleted: statsCompleted[] | undefined;
};

const COLOR = ["#8884d8", "#82ca9d"];

const CompletedChart: React.FC<Props> = ({ statsCompleted }) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart width={400} height={400}>
				<Pie data={statsCompleted} dataKey="tasks" cx="50%" cy="50%" innerRadius={70} outerRadius={90}>
					{statsCompleted?.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLOR[index]} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default CompletedChart;
