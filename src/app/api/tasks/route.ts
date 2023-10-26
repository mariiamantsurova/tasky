import connectMongoDb from "@lib/mongodb";
import Task from "@models/tasks";
import { NextRequest } from "next/server";

const validate = async (title: string, category: string) => {
	if (title === "" || category === "") {
		return true;
	}
	return false;
};

export async function POST(req: NextRequest) {
	const { title, category, date, notification } = await req.json();
	try {
		await connectMongoDb();
		if (await validate(title, category)) {
			throw "Task is not valid";
		}
		await Task.create({ title, category, date, notification });
		return Response.json({ message: "Task created" }, { status: 201 });
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}

export async function GET() {
	try {
		await connectMongoDb();
		const tasks = await Task.find();
		return Response.json({ tasks });
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}

export async function PUT(req: NextRequest) {
	const { id } = await req.json();
	try {
		await connectMongoDb();
		await Task.findByIdAndUpdate(id, { category: "done" });
		return Response.json({ message: "Task is done" });
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const { id } = await req.json();
		await connectMongoDb();
		await Task.findByIdAndDelete(id);
		return Response.json({ message: "Task deleted successfully" }, { status: 200 });
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}
