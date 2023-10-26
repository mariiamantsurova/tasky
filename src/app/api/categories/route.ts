//mongodb
import connectMongoDb from "@lib/mongodb";
import Category from "@models/categories";
import { NextRequest } from "next/server";

const validate = async (title: string) => {
	if ((await Category.find({ title: title })).length || title === "") {
		return true;
	}
	return false;
};

function getColor() {
	return "hsl(" + 360 * Math.random() + "," + (25 + 70 * Math.random()) + "%," + (85 + 10 * Math.random()) + "%)";
}
export async function POST(req: NextRequest) {
	const { title } = await req.json();
	const color = getColor();
	try {
		await connectMongoDb();
		if (await validate(title)) {
			throw "Category is not valid";
		}
		await Category.create({ title, color });
		return Response.json({ message: "Category created" }, { status: 201 });
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}

export async function GET() {
	try {
		await connectMongoDb();
		!(await Category.findOne({ title: "done" })) && Category.create({ title: "done", color: "gray" });
		const categories = await Category.find();
		return Response.json({ categories });
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const { id } = await req.json();
		await connectMongoDb();
		await Category.findByIdAndDelete(id);
		return Response.json({ message: "Category deleted successfully" }, { status: 200 });
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}
