import React from "react";
import { CaretLeftSquareFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function ErrorPage() {
	return (
		<div
			style={{
				backgroundColor: "#adcad6",
				height: "100vh",
				width: "100vw",
			}}
		>
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				href="https://fonts.googleapis.com/css2?family=Recursive:wght@600&display=swap"
				rel="stylesheet"
			></link>

			<center style={{ color: "white" }}>
				<br />

				<br />
				<h1
					style={{
						fontFamily: "Recursive",
						color: "white",
						fontSize: "60px",
					}}
				>
					Obtayn
				</h1>
				<br />
				<br />
				<img src="/images/no_results.svg" />
				<br />
				<br />
				<br />
				<h4 style={{ color: "black" }}>
					<b>The page you were looking for does not exist.</b>
				</h4>
				<h6 style={{ color: "black" }}>
					<i>
						You may have mistyped the address or the page may have
						moved.
					</i>
				</h6>
				<br />
				<Button variant="dark">
					<Link
						to="/home"
						style={{ color: "white", fontSize: "18px" }}
					>
						<b>Back to Home</b>
					</Link>
				</Button>
			</center>
		</div>
	);
}

export default ErrorPage;
