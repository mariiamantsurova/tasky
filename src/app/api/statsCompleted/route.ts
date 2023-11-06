import connectMongoDb from "@lib/mongodb";
import Task from "@models/tasks";
import { JwtPayload, verify } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { secret } from "../auth/login/route";

export async function POST(req: NextRequest) {
	const { dateStartString, dateFinishString } = await req.json();
	const token = req.cookies.get("auth-token")?.value;

	try {
		if (token) {
			const { _id } = verify(token, secret) as JwtPayload;
			await connectMongoDb();
			const all = await Task.aggregate([
				{
					$match: {
						date: { $gte: new Date(dateStartString), $lte: new Date(dateFinishString) },
						user_id: _id,
					},
				},
				{ $count: "tasks" },
			]);

			const done = await Task.aggregate([
				{
					$match: {
						$and: [{ category: "done" }, { date: { $gte: new Date(dateStartString), $lte: new Date(dateFinishString) } }],
						user_id: _id,
					},
				},
				{ $count: "tasks" },
			]);

			let allAmount = all[0] ? all[0] : { tasks: 0 };
			let doneAmount = done[0] ? done[0] : { tasks: 0 };

			const statsCompleted = [Object.assign({ _id: "all" }, allAmount), Object.assign({ _id: "done" }, doneAmount)];

			return Response.json({ statsCompleted });
		}
		throw "not authenticated";
	} catch (error: any) {
		console.log(error);
		return Response.json({ error: error?.message }, { status: 500 });
	}
}
