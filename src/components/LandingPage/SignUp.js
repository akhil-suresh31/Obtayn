import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { auth, db, googleProvider } from "../../firebase/firebase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SignUp() {
	const [email, setEmail] = useState("");
	const [pass, setpass] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [fullName, setFullName] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
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
		if (pass !== confirmPass) {
			console.log("nope");
			alert("noope");
			setDisableButton(false);
			return;
		}
		if (pass.length < 6) {
			alert("passwords needs to be more than 6 characters");
			setDisableButton(false);
			return;
		}
		var userCredentials = await auth
			.createUserWithEmailAndPassword(email, pass)
			.catch((error) => {
				setError(true);
				console.log(error.code);
				console.log(error.message);
				setDisableButton(false);
				alert(error.message);
				return;
			});
		if (error) {
			return;
		}
		const user = userCredentials.user;
		await user
			.updateProfile({
				displayName: fullName,
				photoURL: "",
			})
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
			});

		await db
			.collection("User")
			.doc(user.uid)
			.set({
				name: user.displayName,
				profile_picture: user.photoURL,
				phone_number: phoneNo,
			})
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
			});

		console.log("Doc added with id :", user.uid);
		user.sendEmailVerification();
		setDisableButton(false);
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
								<h3>Join Us Now!</h3>
							</Row>
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

export default SignUp;
