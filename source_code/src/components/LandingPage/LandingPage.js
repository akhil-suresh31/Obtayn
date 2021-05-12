import { useState, Suspense, lazy } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import { Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./Login";
import "./LandingPage.css";

const SignUp = lazy(() => import("./SignUp"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));

function LandingPage({ authState }) {
	const [login, setLogin] = useState(true);
	const [frgtPass, setFrgtPass] = useState(false);
	const { state } = useLocation();

	if (authState.uid) return <Redirect to={state?.from || "/home"} />;

	return (
		<div className="contents">
			<div className="black-div">
				<Jumbotron className="jumbotron-bg">
					<Container>
						<h1 className="font-weight-bold">Obtayn</h1>
						<p>Get stuff.</p>
					</Container>
				</Jumbotron>
				<h2
					style={{
						color: "rgb(20 128 112)",
						paddingLeft: "5%",
						paddingRight: "5%",
					}}
				>
					New here?
				</h2>

				<p
					className="FillerText"
					style={{
						paddingLeft: "5%",
						paddingRight: "5%",
					}}
				>
					We've created a community where people can exchange
					souvenirs, hassle-free. Send requests, chat with other
					awesome people, post photos or say thanks via an
					appreciation post!
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
							frgtPass ? (
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
									{" "}
									<Suspense fallback={<div>Loading...</div>}>
										<ForgotPassword
											setLogin={setLogin}
											setFrgtPass={setFrgtPass}
										/>
									</Suspense>
								</motion.div>
							) : (
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
									<Login
										setLogin={setLogin}
										setFrgtPass={setFrgtPass}
									/>
								</motion.div>
							)
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
								<Suspense fallback={<div>Loading...</div>}>
									<SignUp setLogin={setLogin} />
								</Suspense>
							</motion.div>
						)}
					</div>
				</AnimatePresence>
			</div>
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		authState: state.firebase.auth,
	};
};

export default connect(mapStateToProps)(LandingPage);
