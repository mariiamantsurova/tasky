"use client";

export default function Error({ error }: { error: Error & { digest?: string } }) {
	return (
		<div style={{ backgroundColor: "red" }}>
			<h2>Something went wrong!</h2>
			<h3>{error.message}</h3>
		</div>
	);
}
