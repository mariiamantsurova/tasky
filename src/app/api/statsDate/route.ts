import connectMongoDb from "@lib/mongodb";
import Task from "@models/tasks";
import { NextRequest } from "next/server";
import { weekdays } from "../../../../constansts/weekdays";
import { JwtPayload, verify } from "jsonwebtoken";
import { secret } from "../auth/login/route";

export async function POST(req: NextRequest) {
	const { dateStartString, dateFinishString } = await req.json();
	const token = req.cookies.get("auth-token")?.value;

	try {
		if (token) {
			const { _id } = verify(token, secret) as JwtPayload;
			await connectMongoDb();
			const statsDate = [];
			for (let i = new Date(dateStartString); i <= new Date(dateFinishString); i.setDate(i.getDate() + 1)) {
				let task: Array<{ tasks: number }> = await Task.aggregate([
					{
						$match: {
							$and: [{ category: "done" }, { date: i }, { user_id: _id }],
						},
					},
					{
						$count: "tasks",
					},
				]);
				let tasksAmount = task[0] ? task[0] : { tasks: 0 };
				statsDate.push({ day: weekdays[i.getDay()] + " " + i.getDate(), ...tasksAmount });
			}
			return Response.json({ statsDate });
		}
		throw "not authenticated";
	} catch (error: any) {
		return Response.json({ error: error?.message }, { status: 500 });
	}
}
