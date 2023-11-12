"use client";
//react
import React, { SyntheticEvent, useEffect, useState } from "react";
//next
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Validator from "@lib/validator/Validator";
import toast, { Toaster } from "react-hot-toast";
//styles
import styles from "../../styles/sign-in-up.module.scss";
import Logo from "../../../public/icons/Logo";
import { validate } from "@/functions/validate";
//component

const Register = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`${process.env.BASE_URL}/api/checkAuth`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				});
				const { error } = await res.json();
				if (res.ok) {
					router.push("/");
				} else if (error !== undefined) {
					throw new Error(error);
				}
			} catch (error: any) {
				toast.error(error);
			}
		})();
	}, [router]);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			validate(username, password, confirmPassword, pathname);
			const res = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});
			const { message, error } = await res.json();
			if (res.ok) {
				toast.success(message);
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			} else {
				toast.error(error);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div className={styles["form-container"]}>
			<Logo />
			<div className={styles["form-wrapper"]}>
				<form onSubmit={handleSubmit}>
					<label>Username</label>
					<input type="text" required onChange={(e) => setUsername(e.target.value)} />
					<label>Password</label>
					<input type="password" required onChange={(e) => setPassword(e.target.value)} />
					<label>Confirm password</label>
					<input type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
					<button type="submit">Submit</button>
				</form>
				<h3>
					Already have an account?
					<Link href="/login"> Sign in</Link>
				</h3>
				<Toaster />
			</div>
		</div>
	);
};

export default Register;
