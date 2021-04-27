import React, { useState, useEffect } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import SignUp from "./SignUp";
import Login from "./Login";
import "./LandingPage.css";

function LandingPage() {
	const [login, setLogin] = useState(true);
	var style = {};
	return (
		<div className="contents">
			<div className="black-div">
				<Jumbotron className="jumbotron-bg">
					<Container>
						<h1 className="font-weight-bold">Obtayn</h1>
						<p>Get stuff.</p>
					</Container>
				</Jumbotron>

				<p
					style={{
						color: "white",
						paddingLeft: "5%",
						paddingRight: "5%",
					}}
				>
					<h2 style={{ color: "#4abaaa" }}>New here?</h2>
					<p className="FillerText">
						We've created a community where people can exchange
						souvenirs, hassle-free. Send requests, chat with other
						awesome people, post photos or say thanks via an
						appreciation post!
					</p>
				</p>
			</div>
			<div
				className="image-div d-flex align-items-center justify-content-center"
				style={{ backgroundImage: "url(/images/pastel-pink-blue.jpg)" }}
			>
				<AnimatePresence>
					<div className="Form-Container">
						<Jumbotron className="jumbotron-bg inside-Form">
							<Container>
								<h1 className="font-weight-bold">Obtayn</h1>
								<p>Get stuff.</p>
							</Container>
						</Jumbotron>
						{login ? (
							<motion.div
								key="login"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									ease: "easeIn",
									duration: 0.75,
								}}
								exit={{ opacity: 0 }}
							>
								<Login setLogin={setLogin} />
							</motion.div>
						) : (
							<motion.div
								key="signup"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									ease: "easeIn",
									duration: 0.75,
								}}
								exit={{ opacity: 0 }}
							>
								<SignUp setLogin={setLogin} />
							</motion.div>
						)}
					</div>
				</AnimatePresence>
			</div>
		</div>
	);
}

export default LandingPage;
