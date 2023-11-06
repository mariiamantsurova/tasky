import connectMongoDb from "@lib/mongodb";
import User from "@models/users";
import { NextRequest } from "next/server";
import Validator from "@lib/validator/Validator";

const validate = async (username: string, password: string) => {
	//password of minimum eight characters, at least one letter and one number
	if (!Validator.username.test(username) && !Validator.password.test(password)) {
		throw new Error("Invalid username or password");
	} else if (await User.findOne({ username })) {
		throw new Error("User with the same username already exists");
	}
	return;
};
export async function POST(req: NextRequest) {
	const { username, password } = await req.json();
	try {
		await validate(username, password);
		await connectMongoDb();
		User.create({ username, password });
		return Response.json({ message: "Created Successfully" }, { status: 200 });
	} catch (error: any) {
		return Response.json({ error: error?.message }, { status: 500 });
	}
}
