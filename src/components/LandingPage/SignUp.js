import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { auth, db, googleProvider } from "../../firebase/firebase";

function SignUp() {
	const [email, setEmail] = useState("");
	const [pass, setpass] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [fullName, setFullName] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
    const [disableButton, setDisableButton] = useState(false)

    var signInGoogle = async (e)=>{
        e.preventDefault();
        setDisableButton(true);
        var result = await auth.signInWithPopup(googleProvider).catch((error)=>{
            console.log(error.code);
			console.log(error.message);
            setDisableButton(false);
            return;
        });
        const user = result.user;
        var docRef = await db.collection("User").add({
			id: user.uid,
			name: user.displayName,
			profile_picture: user.photoURL,
			phone_number: ''
		}).catch((error)=>{
            console.log(error.code);
            console.log(error.message);
            setDisableButton(false);
            return;
        });
        console.log("Doc added with id :",docRef.id);
        setDisableButton(false);
    }

	var handleSubmit = async (e) => {
        e.preventDefault();
        setDisableButton(true);
		if (pass !== confirmPass) {
			console.log('nope');
			alert("noope");
            setDisableButton(false);
			return;
		}
        if(pass.length < 6)
        {
            alert('passwords needs to be more than 6 characters');
            setDisableButton(false);
            return;
        }
		var userCredentials = await auth.createUserWithEmailAndPassword(
			email,
			pass
		);
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

		var docRef = await db.collection("User").add({
			id: user.uid,
			name: user.displayName,
			profile_picture: user.photoURL,
			phone_number: phoneNo
		}).catch((error)=>{
            console.log(error.code);
            console.log(error.message);
        });

        console.log("Doc added with id :",docRef.id);
        user.sendEmailVerification();
        setDisableButton(false);
        console.log('sign up completed');
	};

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<h3>Sign up</h3>
				<Form.Group>
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

				<Form.Group controlId="formBasicEmail">
					<Form.Control
                        
                        required={true}
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<Form.Text className="text-muted">
						Your email will be safe with us.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Control
                        required={true}
						type="password"
						placeholder="Password"
						value={pass}
						onChange={(e) => {
							setpass(e.target.value);
						}}
					/>
                    <Form.Text className="text-muted">
                    Your password must be 6-20 characters long.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
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

				<Form.Group>
					<Form.Control
						type="number"
						placeholder="Enter Contact number"
						value={phoneNo}
						onChange={(e) => {
							setPhoneNo(e.target.value);
						}}
					/>
				</Form.Group>

				<Button variant="light" style={{ padding: 0, border: 0 }} onClick={signInGoogle} disabled={disableButton}>
					<img
						style={{ maxHeight: "46px", maxWidth: "191px" }}
						src="/images/google-button.png"
					></img>
				</Button>
				<br></br>
				<Button variant="dark" type="submit" disabled={disableButton}>
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default SignUp;
