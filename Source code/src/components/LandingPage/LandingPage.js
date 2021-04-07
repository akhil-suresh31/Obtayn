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
		<div>
			<div className="LandingPage">
				<Carousel
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
							src="/images/artem-beliaikin-TYwEQGLiups-unsplash.jpg"
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
							src="/images/jezael-melgoza-layMbSJ3YOE-unsplash.jpg"
							alt=""
						/>
					</Carousel.Item>

					<div className="contents">
						<Jumbotron className="jumbotron-bg">
							<Container>
								<h1 className="font-weight-bold">Obtayn</h1>
								<p>Get stuff.</p>
							</Container>
						</Jumbotron>
						<div className="FillerText">
							<h2>Inspirational Text</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Sed sagittis quam quam, at
								consequat ligula rutrum eget. Cras bibendum
								sagittis nisl, in sollicitudin dolor mollis id.
								Fusce viverra pharetra ante vitae blandit. Etiam
								sit amet laoreet dolor. Nullam sit amet nisl c
								ondimentum, rutrum sem eu, bibendum ex.
								Curabitur suscipit ex in lacus lobortis
								suscipit. Lorem ipsum dolor sit amet,
								consectetur adipiscing elit. Vivamus diam erat,
								scelerisque a erat ut, molestie maximus erat.
								Curabitur eget lacus at risus luctus porta quis
								vitae risus.
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Sed sagittis quam quam, at
								consequat ligula rutrum eget. Cras bibendum
								sagittis nisl, in sollicitudin dolor mollis id.
								Fusce viverra pharetra ante vitae blandit. Etiam
								sit amet laoreet dolor.
							</p>
							<Button
								variant="dark"
								onClick={() => {
									setLogin(!login);
								}}
							>
								{login ? "Get Started" : "Login Instead"}
							</Button>
						</div>
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
				</Carousel>
			</div>
		</div>
	);
}

export default LandingPage;
