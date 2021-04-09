import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { continueWithGoogle, signUp } from "../../store/actions/authActions";
import { connect } from "react-redux";

function SignUp({ setLogin, authError, signUp, continueWithGoogle }) {
	const [email, setEmail] = useState("");
	const [pass, setpass] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [fullName, setFullName] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [disableButton, setDisableButton] = useState(false);
	const [error, setError] = useState("");

	var signInGoogle = (e) => {
		e.preventDefault();
		setDisableButton(true);
		continueWithGoogle();
		// setLogin(true);
		setDisableButton(false);
	};

	var handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setDisableButton(true);
		if (pass !== confirmPass) {
			setDisableButton(false);
			return setError("Password does not match,Try Again!");
		}
		if (pass.length < 6) {
			setDisableButton(false);
			return setError("passwords needs to be more than 6 characters");
		}

		signUp({
			email: email,
			name: fullName,
			pass: pass,
			phoneNo: phoneNo,
		});

		setDisableButton(false);
		// setLogin(true);
		console.log("sign up completed");
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
							<Row className=" d-flex align-content-center ">
								<h2>Join Us Now!</h2>
							</Row>
							{authError && (
								<Alert variant="danger">{authError}</Alert>
							)}
							{error && <Alert variant="danger">{error}</Alert>}
							<Row className="d-flex align-content-center">
								<Form.Group className="formInput">
									<Form.Control
										required={true}
										type="text"
										placeholder="Enter Name"
										value={fullName}
										onChange={(e) => {
											setFullName(e.target.value);
										}}
									/>
								</Form.Group>
							</Row>
							<Row className="d-flex align-content-center">
								<Form.Group className="formInput">
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
								<Form.Group className="formInput">
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
								<Form.Group className="formInput mt-0">
									<Form.Text className="text-muted">
										Your password must be 6-20 characters
										long.
									</Form.Text>
								</Form.Group>
							</Row>
							<Row className="d-flex align-content-center">
								<Form.Group className="formInput">
									<Form.Control
										required={true}
										type="password"
										placeholder="Confirm Password"
										value={confirmPass}
										onChange={(e) => {
											setConfirmPass(e.target.value);
										}}
									/>
								</Form.Group>
							</Row>
							<Row className="d-flex align-content-center">
								<Form.Group className="formInput">
									<Form.Control
										type="number"
										placeholder="Enter Contact number"
										value={phoneNo}
										onChange={(e) => {
											setPhoneNo(e.target.value);
										}}
									/>
								</Form.Group>
							</Row>
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
												maxHeight: "46px",
												maxWidth: "191px",
											}}
											src="/images/google-button.png"
											alt=""
										></img>
									</Button>
								</Form.Group>
							</Row>
							<Row className="d-flex align-content-center">
								<Form.Group className="formInput justify-content-center">
									<Button
										variant="dark"
										type="submit"
										disabled={disableButton}
									>
										Sign Up
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

const mapStatetoProps = (state) => {
	return {
		authError: state.auth.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (userInfo) => dispatch(signUp(userInfo)),
		continueWithGoogle: () => dispatch(continueWithGoogle()),
	};
};

export default connect(mapStatetoProps, mapDispatchToProps)(SignUp);
