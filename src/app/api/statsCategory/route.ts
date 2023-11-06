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
			const statsCategory = await Task.aggregate([
				{
					$match: {
						$and: [
							{ category: { $ne: "done" } },
							{ date: { $gte: new Date(dateStartString), $lte: new Date(dateFinishString) } },
							{ user_id: _id },
						],
					},
				},
				{ $group: { _id: "$category", count: { $sum: 1 } } },
				{
					$lookup: {
						from: "categories",
						localField: "_id",
						foreignField: "title",
						as: "categoryTable",
					},
				},
				{ $unwind: "$categoryTable" },
				{ $project: { color: "$categoryTable.color", id: 1, count: 1 } },
			]);

			return Response.json({ statsCategory });
		}
		throw "not authenticated";
	} catch (error: any) {
		console.log(error);
		return Response.json({ error: error?.message }, { status: 500 });
	}
}
