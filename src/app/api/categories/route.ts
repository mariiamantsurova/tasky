//mongodb
import connectMongoDb from "@lib/mongodb";
import Category from "@models/categories";
import { JwtPayload, verify } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { secret } from "../auth/login/route";

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
	const token = req.cookies.get("auth-token")?.value;
	const { title } = await req.json();
	const color = getColor();
	try {
		if (token) {
			const { _id } = verify(token, secret) as JwtPayload;
			await connectMongoDb();
			if (await validate(title)) {
				throw "Category is not valid";
			}
			const newCategory = await Category.create({ title, color, user_id: _id });
			return Response.json({ _id: newCategory._id, color: newCategory.color }, { status: 201 });
		}
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	const token = req.cookies.get("auth-token")?.value;
	try {
		if (token) {
			const { _id } = verify(token, secret) as JwtPayload;
			await connectMongoDb();
			!(await Category.findOne({ user_id: _id, title: "done" })) && Category.create({ title: "done", color: "#C2C2C2", user_id: _id });
			const categories = await Category.find({ user_id: _id });
			return Response.json({ categories });
		}
		throw "not authenticated";
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	const { id } = await req.json();
	const token = req.cookies.get("auth-token")?.value;
	try {
		if (token) {
			const { _id } = verify(token, secret) as JwtPayload;
			await connectMongoDb();
			await Category.findByIdAndDelete({ id, user_id: _id });
			return Response.json({ message: "Category deleted successfully" }, { status: 200 });
		}
		throw "not authenticated";
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}
