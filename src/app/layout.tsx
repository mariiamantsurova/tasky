import type { Metadata } from "next";
import "../styles/global.scss";
import { Children } from "react";

export const metadata: Metadata = {
	title: "Tasky",
	description: "Task management app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning={true}>{children}</body>
		</html>
	);
}
