import connectMongoDb from "@lib/mongodb";
import Task from "@models/tasks";
import { JwtPayload, verify } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { secret } from "../auth/login/route";

export async function POST(req: NextRequest) {
	const token = req.cookies.get("auth-token")?.value;
	const { localDateString } = await req.json();
	try {
		if (token) {
			const { _id } = verify(token, secret) as JwtPayload;
			await connectMongoDb();
			const tasks = await Task.find({ date: localDateString, user_id: _id });
			return Response.json({ tasks });
		}
		throw "not authenticated";
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}
