import connectMongoDb from "@lib/mongodb";
import Task from "@models/tasks";
import { JwtPayload, verify } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { secret } from "../auth/login/route";

const validate = async (title: string, category: string) => {
	if (title === "" || category === "") {
		return true;
	}
	return false;
};

export async function POST(req: NextRequest) {
	const { task, category, localDateString, important } = await req.json();
	const token = req.cookies.get("auth-token")?.value;

	try {
		if (token) {
			const { _id } = verify(token, secret) as JwtPayload;
			await connectMongoDb();
			if (await validate(task, category)) {
				throw "Task is not valid";
			}
			const newTask = await Task.create({ task, category, date: localDateString, important, user_id: _id });
			return Response.json({ _id: newTask._id }, { status: 201 });
		}
		throw "not authenticated";
	} catch (error: any) {
		return Response.json({ error: error?.message }, { status: 500 });
	}
}

export async function PUT(req: NextRequest) {
	const { task_id } = await req.json();
	const token = req.cookies.get("auth-token")?.value;
	try {
		if (token) {
			const { _id } = verify(token, secret) as JwtPayload;
			await connectMongoDb();
			await Task.findByIdAndUpdate({ _id: task_id }, { category: "done" }, { user_id: _id });
			return Response.json({ message: "Task is done" });
		}
		throw "not authenticated";
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	const { task_id } = await req.json();
	const token = req.cookies.get("auth-token")?.value;
	try {
		if (token) {
			const { _id } = verify(token, secret) as JwtPayload;
			await connectMongoDb();
			await Task.findByIdAndDelete({ _id: task_id }, { user_id: _id });
			return Response.json({ message: "Task deleted successfully" }, { status: 200 });
		}
		throw "not authenticated";
	} catch (error: any) {
		return Response.json({ error: error?.message }, { status: 500 });
	}
}
