import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { continueWithGoogle, login } from "../../store/actions/authActions";

function Login({
	login,
	error,
	continueWithGoogle,
	authState,
	setLogin,
	setFrgtPass,
}) {
	const [email, setEmail] = useState("");
	const [pass, setpass] = useState("");
	const [disableButton, setDisableButton] = useState(false);
	const history = useHistory();

	var signInGoogle = (e) => {
		e.preventDefault();
		setDisableButton(true);
		continueWithGoogle();
		if (authState.uid) history.push("/home");
		setDisableButton(false);
	};

	var handleSubmit = (e) => {
		e.preventDefault();
		setDisableButton(true);
		login({ email: email, pass: pass });

		// if (!user.emailValidated) {
		// 	alert("Email Not validated please validate to continue");

		// 	setDisableButton(false);
		// 	return;
		// }
		setDisableButton(false);
		//console.log("login successful", user.uid);
	};

	return (
		<div>
			<Row>
				<Col style={{ height: "100%" }}>
					<Form onSubmit={handleSubmit} style={{ height: "100%" }}>
						<Col
							md="auto"
							style={{ height: "100%" }}
							className="d-flex flex-column justify-content-center"
						>
							{error && <Alert variant="danger">{error}</Alert>}
							<Row className="d-flex align-content-center">
								<Form.Group
									controlId="formBasicEmail"
									className="formInput"
									style={{ marginTop: "3vh" }}
								>
									<Form.Control
										required={true}
										type="email"
										placeholder="Enter email"
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</Form.Group>
							</Row>
							<Row className="d-flex align-content-center">
								<Form.Group
									controlId="formBasicPassword"
									className="formInput mb-1"
								>
									<Form.Control
										required={true}
										type="password"
										placeholder="Password"
										value={pass}
										onChange={(e) => {
											setpass(e.target.value);
										}}
									/>
								</Form.Group>
								<Form.Text
									className="forgot-pass mb-3 mt=0"
									onClick={() => {
										console.log(
											"lmao loser forgtot his/her password"
										);
										setFrgtPass(true);
									}}
								>
									<b>Forgot password ?</b>
								</Form.Text>
							</Row>
							<Row className="d-flex align-content-center">
								<Form.Group className="formInput justify-content-center">
									<Button
										type="submit"
										disabled={disableButton}
										variant="dark"
										style={{
											width: "100%",
											fontWeight: "bold",
											fontSize: "16px",
											padding: "0.5em 0",
										}}
									>
										Login
									</Button>
								</Form.Group>
							</Row>
							<div className="separator">or</div>
							<Row className="d-flex align-content-center mt-3">
								<Form.Group className="formInput justify-content-center">
									<Button
										variant="light"
										style={{ padding: 0, border: 0 }}
										onClick={signInGoogle}
										disabled={disableButton}
										aria-label="googleButton"
									>
										<img
											style={{
												height: "46px",
												width: "191px",
												maxHeight: "100%",
												maxWidth: "100%",
											}}
											src="/images/google-button.png"
											alt=""
										></img>
									</Button>
								</Form.Group>
							</Row>
						</Col>
					</Form>
					<center>
						<div
							className="signUp-link"
							onClick={() => setLogin(false)}
						>
							New to Obtayn? Sign up
						</div>
					</center>
				</Col>
			</Row>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		error: state.auth.error,
		authState: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (creds) => dispatch(login(creds)),
		continueWithGoogle: () => dispatch(continueWithGoogle()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
