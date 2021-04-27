import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { continueWithGoogle, login } from "../../store/actions/authActions";

function Login({ login, error, continueWithGoogle, authState }) {
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

	if (authState.uid) return <Redirect to="/home"></Redirect>;

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
							<Row className=" d-flex align-content-center ">
								<center>
									<h2>Welcome!</h2>
								</center>
							</Row>
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
									className="formInput"
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
							</Row>
							<Row className="d-flex align-content-center">
								<Form.Group className="formInput justify-content-center">
									<Button
										type="submit"
										disabled={disableButton}
										variant="dark"
										// style={{
										// 	backgroundColor: "white",
										// 	color: "#389486",
										// 	border: "none",
										// }}
									>
										Login
									</Button>
								</Form.Group>
							</Row>
							<center>
								<p>Or</p>
							</center>
							<Row className="d-flex align-content-center">
								<Form.Group className="formInput justify-content-center">
									<Button
										variant="light"
										style={{ padding: 0, border: 0 }}
										onClick={signInGoogle}
										disabled={disableButton}
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
				</Col>
			</Row>
		</div>
	);
}

const mapStateToProps = (state) => {
	console.log(state);
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
