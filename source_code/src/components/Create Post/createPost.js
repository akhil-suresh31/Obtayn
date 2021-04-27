import React, { useState } from "react";
import NavBar from "../Homepage/Navbar/navbar";
import Activity from "../Homepage/Activity/activity";
import { Form, Row, Col, Button, FormLabel } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import "./createPost.css";
import { createRequest } from "../../store/actions/requestActions";
import { createPost } from "../../store/actions/postActions";
var myImages = [];

function CreatePost({ createRequest, createPost }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState(null);
	const [requestForm, setRequestForm] = useState(false);
	const types = ["image/png", "image/jpeg"];

	const history = useHistory();

	const handleChange = (e) => {
		setRequestForm(!requestForm);
		console.log(e.target);
		console.log("Request from visibilty-> ", requestForm);
	};

	const handleImageChange = (e) => {
		e.preventDefault();
		var files = e.target.files;
		console.log("Target files ->", files);
		var i;
		if (files.length > 3) setError("Cannot upload more than 3 images.");
		else setError(null);
		if (files.length > 0) {
			for (i = 0; i < files.length; i++) {
				if (types.includes(files[i].type)) {
					console.log(files[i]);
					myImages.push(files[i]);
					setError("");
				} else setError("Please select an image file (png or jpg)");
			}
		}
		console.log("temp->", myImages);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValidated(true);
		const form = e.target;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			return;
		}
		const formData = new FormData(form);
		const formDataObj = Object.fromEntries(formData.entries());
		console.log(formDataObj);
		console.log(myImages);
		if (!requestForm) createRequest(formDataObj, myImages);
		else createPost(formDataObj, myImages);
		console.log("submitted!");
		history.push("/home");
	};

	return (
		<div>
			<NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			<Activity menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			<div
				className="left-image-container"
				style={{
					backgroundImage: "url(/images/left-bg.jpg)",
					backgroundSize: "cover",
				}}
			></div>
			<div className="create-post-container">
				<div className="create-post-body">
					<center>
						<FormLabel inline>New Request</FormLabel>
						&nbsp;&nbsp;
						<Form.Check
							inline
							type="switch"
							id="create-post-switch"
							label="New Post"
							onChange={handleChange}
							checked={requestForm}
						/>
					</center>
					<br />
					<div
						className="form-container"
						style={{
							backgroundColor: requestForm
								? "#b5e477"
								: "#F8B4C5",
						}}
					>
						<Form
							noValidate
							validated={validated}
							onSubmit={handleSubmit}
							name="form"
							className="pink-form"
						>
							<Row>
								{!requestForm ? (
									<Col>
										<Form.Group as={Col}>
											{/* <Form.Label>Category</Form.Label> */}
											<Form.Control
												as="select"
												defaultValue="Category"
												required
												name="category"
											>
												<option disabled={true}>
													Category
												</option>
												<option>Clothing</option>
												<option>Electronics</option>
												<option>Food</option>
												<option>Hobbies</option>
												<option>Home & Living</option>
												<option>Other</option>
											</Form.Control>
										</Form.Group>
									</Col>
								) : null}
								<Col>
									<Form.Control
										required
										type="text"
										placeholder="Title"
										name="title"
									/>
									<Form.Control.Feedback>
										Looks good!
									</Form.Control.Feedback>
									<Form.Control.Feedback type="invalid">
										Please enter a title.
									</Form.Control.Feedback>
								</Col>
								{!requestForm ? (
									<Col>
										<Form.Control
											type="text"
											required
											placeholder="Location"
											name="location"
										/>
										<Form.Control.Feedback>
											Looks good!
										</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">
											Please enter a location.
										</Form.Control.Feedback>
									</Col>
								) : null}
							</Row>
							<br />
							<Form.Group>
								<Form.Control
									as="textarea"
									rows={3}
									required
									name="message"
									placeholder="Message"
								/>
								<Form.Control.Feedback>
									Looks good!
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please enter a message.
								</Form.Control.Feedback>
							</Form.Group>
							<Row>
								<Col>
									<Form.Group>
										<input
											type="file"
											className="position-relative"
											name="file"
											label="Add Image"
											onChange={handleImageChange}
											multiple
										/>
										{error && (
											<div className="error">{error}</div>
										)}
									</Form.Group>
								</Col>
							</Row>
							<br />
							<Row>
								<Col></Col>
								<Col>
									{!requestForm ? (
										error ? (
											<Button
												className="add-request-button"
												variant="dark"
												type="submit"
												disabled
											>
												Add Request
											</Button>
										) : (
											<Button
												className="add-request-button"
												variant="dark"
												type="submit"
											>
												Add Request
											</Button>
										)
									) : error ? (
										<Button
											className="add-post-button"
											variant="dark"
											type="submit"
											disabled
										>
											Add Post
										</Button>
									) : (
										<Button
											className="add-post-button"
											variant="dark"
											type="submit"
										>
											Add Post
										</Button>
									)}
								</Col>
							</Row>
						</Form>
					</div>
				</div>
			</div>
			<div
				className="right-image-container"
				style={{
					backgroundImage: "url(/images/right-bg.jpg)",
					backgroundSize: "cover",
				}}
			></div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		createRequest: (request, myImages) =>
			dispatch(createRequest(request, myImages)),
		createPost: (data, myImages) => dispatch(createPost(data, myImages)),
	};
};

export default connect(null, mapDispatchToProps)(CreatePost);
