import Validator from "@lib/validator/Validator";

export function validate(username: string, password: string, confirmPassword?: string, pathname?: string) {
	if (!Validator.username.test(username) && !Validator.password.test(password)) {
		throw new Error(" Username or Password is not Valid");
	}
	if (pathname === "/register") {
		if (password !== confirmPassword) {
			throw new Error(" Password and confirm password don't match");
		}
	}
}
