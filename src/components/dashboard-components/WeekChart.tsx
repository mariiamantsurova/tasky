//react
import { statsDate } from "@/app/dashboard/page";
import React from "react";
//chart
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

type Props = {
	statsDate: statsDate[] | undefined;
};
const WeekChart: React.FC<Props> = ({ statsDate }) => {
	return (
		<ResponsiveContainer width="90%" height="85%">
			<AreaChart data={statsDate}>
				<defs>
					<linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
						<stop offset="30%" stopColor="#D3B8E5" stopOpacity="1" />
						<stop offset="75%" stopColor="#D3B8E5" stopOpacity="0.3" />
						<stop offset="95%" stopColor="#FFFFFF" stopOpacity="0.2" />
					</linearGradient>
				</defs>
				<Tooltip />
				<XAxis dataKey="day" />
				<Area type="monotone" dataKey="tasks" stroke="#7209B7" strokeWidth="1" fill="url(#colorView)" />
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default WeekChart;
