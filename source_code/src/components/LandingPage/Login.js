import React, { useState } from "react";
import { auth, db, googleProvider } from "../../firebase/firebase";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [pass, setpass] = useState("");
	const [disableButton, setDisableButton] = useState(false);
	const [error, setError] = useState("");
	const history = useHistory();

	var signInGoogle = async (e) => {
		e.preventDefault();
		setDisableButton(true);
		try {
			setError("");
			var result = await auth.signInWithPopup(googleProvider);
		} catch (err) {
			console.log(err.code);
			console.log(err.message);
			setDisableButton(false);
			return setError(err.code);
		}
		const user = result.user;
		var docRef = db.collection("User").doc(user.uid);
		var doc = await docRef.get();
		if (!doc.exists) {
			await db
				.collection("User")
				.doc(user.uid)
				.set({
					name: user.displayName,
					profile_picture: user.photoURL,
					phone_number: "",
				})
				.catch((error) => {
					console.log(error.code);
					console.log(error.message);
					setDisableButton(false);
					return;
				});
			console.log("Doc added with id :", user.uid);
		}
		history.push("/home");
		setDisableButton(false);
	};

	var handleSubmit = async (e) => {
		e.preventDefault();
		setDisableButton(true);
		try {
			setError("");
			var userCredentials = await auth.signInWithEmailAndPassword(
				email,
				pass
			);
		} catch (err) {
			console.log(err.code);
			setDisableButton(false);
			return setError(err.message);
		}

		const user = userCredentials.user;
		// if (!user.emailValidated) {
		// 	alert("Email Not validated please validate to continue");

		// 	setDisableButton(false);
		// 	return;
		// }
		setDisableButton(false);
		console.log("login successful", user.uid);
		history.push("/home");
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
								<h2>Welcome Back!</h2>
							</Row>
							{error && <Alert variant="danger">{error}</Alert>}
							<Row className="d-flex align-content-center">
								<Form.Group
									controlId="formBasicEmail"
									className="formInput"
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
							<Row className="d-flex align-content-center">
								<Form.Group className="formInput justify-content-center">
									<Button
										variant="dark"
										type="submit"
										disabled={disableButton}
									>
										Login
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

export default Login;
