import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { forgotPass } from "../../store/actions/authActions";

function ForgotPassword({
	error,
	success,
	setFrgtPass,
	setLogin,
	forgetPassword,
}) {
	const [email, setEmail] = useState("");
	const [disableButton, setDisableButton] = useState(false);
	var handleSubmit = (e) => {
		e.preventDefault();
		setDisableButton(true);
		forgetPassword({ email: email });
		setDisableButton(false);
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
							<Row className=" d-flex align-content-center justify-content-center">
								<h2>Password Reset</h2>
							</Row>
							{success && (
								<Alert variant="success">{success}</Alert>
							)}
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
										Reset Password
									</Button>
								</Form.Group>
							</Row>
							<Row className="d-flex align-content-center">
								<Form.Group className="formInput justify-content-center">
									<Button
										onClick={() => {
											setFrgtPass(false);
										}}
										variant="light"
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
						</Col>
					</Form>
					<center>
						<div
							className="signUp-link"
							onClick={() => {
								setFrgtPass(false);
								setLogin(false);
							}}
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
		success: state.auth.success,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		forgetPassword: (userInfo) => dispatch(forgotPass(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
