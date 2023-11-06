import connectMongoDb from "@lib/mongodb";
import User from "@models/users";
import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { secret } from "../auth/login/route";

interface JwtPayload {
	_id: string;
}

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get("auth-token")?.value;
		if (token) {
			const { _id } = verify(token, secret) as JwtPayload;
			await connectMongoDb();
			const user = await User.findOne({ _id });
			if (user) {
				return Response.json({ auth: true }, { status: 200 });
			}
			return Response.json({ auth: false }, { status: 401 });
		}
		return Response.json({ auth: false }, { status: 401 });
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
}
