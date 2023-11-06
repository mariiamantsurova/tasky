"use client";
//react
import React, { SyntheticEvent, useEffect, useState } from "react";
//next`
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { validate } from "../register/page";
import toast, { Toaster } from "react-hot-toast";
//style
import styles from "../../styles/sign-in-up.module.scss";
//component
import Logo from "../../../public/icons/Logo";

const Login = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`http://localhost:3000/api/checkAuth`, {
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
			validate(username, password, pathname);
			const res = await fetch(`http://localhost:3000/api/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ username, password }),
			});
			const { message, error } = await res.json();
			if (res.ok) {
				toast.success(message);
				setTimeout(() => {
					router.push("/");
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
					<button type="submit">Submit</button>
				</form>
				<h3>
					Do not have an account?
					<Link href="/register"> Sign up</Link>
				</h3>
				<Toaster />
			</div>
		</div>
	);
};

export default Login;
