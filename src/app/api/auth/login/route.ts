import connectMongoDb from "@lib/mongodb";
import User from "@models/users";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { NextRequest } from "next/server";

export const secret = process.env.JWT_SECRET || "";
const MAX_AGE = 60 * 60 * 24 * 30; //30 days

export async function POST(req: NextRequest) {
	const { username, password } = await req.json();
	try {
		await connectMongoDb();
		const { _id } = await User.login(username, password);
		const token = sign({ _id: _id }, secret, { expiresIn: MAX_AGE });
		const serialized = serialize("auth-token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: MAX_AGE,
			path: "/",
		});

		return Response.json({ message: "Authenticated" }, { status: 200, headers: { "Set-Cookie": serialized } });
	} catch (error: any) {
		return Response.json({ error: error?.message }, { status: 500 });
	}
}
