import { serialize } from "cookie";

export async function GET() {
	try {
		const serialized = serialize("auth-token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: -1,
			path: "/",
		});

		return Response.json({ message: "Logged Out" }, { status: 200, headers: { "Set-Cookie": serialized } });
	} catch (error: any) {
		return Response.json({ error: error?.message }, { status: 500 });
	}
}
