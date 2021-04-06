import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { auth, db, googleProvider } from "../../firebase/firebase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Login() {
	const [email, setEmail] = useState("");
	const [pass, setpass] = useState("");
	const [disableButton, setDisableButton] = useState(false);
	const [error, setError] = useState(false);

	var signInGoogle = async (e) => {
		e.preventDefault();
		setDisableButton(true);
		var result = await auth
			.signInWithPopup(googleProvider)
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
				setDisableButton(false);
				return;
			});
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

		setDisableButton(false);
	};

	var handleSubmit = async (e) => {
		e.preventDefault();
		setDisableButton(true);

		var userCredentials = await auth
			.signInWithEmailAndPassword(email, pass)
			.catch((error) => {
				setError(true);
				console.log(error.code);
				var errorMessage = error.message;
				setDisableButton(false);
				alert(errorMessage);
				return ;
			});
		if (error) {
			console.log('yup error');
			return ;
		}
		const user = userCredentials.user;
		if (!user.emailValidated) {
			alert("Email Not validated please validate to continue")
			
		setDisableButton(false);
			return;
		}
		setDisableButton(false);
		console.log("login successful");
		alert("welcomee");
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
								<Col className="d-flex flex-column justify-content-center">
									<Row>
										<h3>Welcome Back!</h3>
									</Row>
									<Row>
										<h3>Login</h3>
									</Row>
								</Col>
							</Row>
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
