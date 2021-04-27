import React, { useState } from "react";
import { Carousel, Button, Jumbotron, Container } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import SignUp from "./SignUp";
import Login from "./Login";
import "./LandingPage.css";

function LandingPage() {
	const [login, setLogin] = useState(true);
	const [index, setIndex] = useState(0);
	var handleCaraousel = () => {
		setIndex((index + 1) % 3);
	};

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
					<p>
						We've created a community where people can exchange
						souvenirs, hassle-free. Send requests, chat with other
						awesome people, post photos or say thanks via an
						appreciation post!
					</p>
					<Button
						variant="dark"
						onClick={() => {
							setLogin(!login);
						}}
						style={{
							backgroundColor: "rgb(74, 186, 170)",
						}}
					>
						{login ? "Get Started" : "Login Instead"}
					</Button>
				</p>
			</div>
			<div className="image-div">
				<AnimatePresence>
					<div className="Form-Container">
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
								<Login />
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

/* <Carousel
					pause={false}
					className="carousal"
					controls={false}
					keyboard={false}
					interval={4000}
					onSelect={handleCaraousel}
					activeIndex={index}
				>
					<Carousel.Item>
						<img
							className="w-100"
							src="/images/roberto-lopez-UAiUNEv3USM-unsplash.jpg"
							alt=""
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="w-100"
							src="/images/omar-tursic-4D5xKxHJmZM-unsplash.jpg"
							alt=""
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="w-100"
							src="/images/marvin-kuhn-uHrRgJKPPAk-unsplash.jpg"
							alt=""
						/>
					</Carousel.Item> */
