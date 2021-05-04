import React, { useState } from "react";
import NavBar from "../Homepage/Navbar/navbar";
import Activity from "../Homepage/Activity/activity";
import { Form, Row, Col, Button, FormLabel, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import "./createPost.css";
import { createRequest } from "../../store/actions/requestActions";
import { createPost } from "../../store/actions/postActions";
import LocationAutoComplete from "../Homepage/LocationAutoComplete";
var myImages = [];

function CreatePost({ createRequest, createPost, post_error, req_error }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState(null);
	const [requestForm, setRequestForm] = useState(false);
	const types = ["image/png", "image/jpeg"];
	const [location, setLocation] = useState();
	const history = useHistory();

	const handleChange = (e) => {
		setRequestForm(!requestForm);
	};

	const handleImageChange = (e) => {
		e.preventDefault();
		var files = e.target.files;
		var i;
		if (files.length > 3) setError("Cannot upload more than 3 images.");
		else setError(null);
		if (files.length > 0) {
			for (i = 0; i < files.length; i++) {
				if (types.includes(files[i].type)) {
					//console.log(files[i]);
					myImages.push(files[i]);
					setError("");
				} else setError("Please select an image file (png or jpg)");
			}
		}
		//console.log("temp->", myImages);
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

		if (!requestForm) formDataObj.location = location?.value.formatted;
		if (!requestForm) createRequest(formDataObj, myImages);
		else createPost(formDataObj, myImages);

		myImages = [];
		if (!post_error) history.push("/home");
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
				{post_error && <Alert variant="danger">{post_error}</Alert>}
				{req_error && <Alert variant="danger">{req_error}</Alert>}
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
							</Row>
							<Row>
								{!requestForm ? (
									<Col>
										<LocationAutoComplete
											setLocation={setLocation}
											isrequest={true}
										/>
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
										{/*<input
											type="file"
											className="position-relative"
											name="file"
											label="Add Image"
											onChange={handleImageChange}
											multiple
										/>
										{error && (
											<div className="error">{error}</div>
										)} */}
										<Form.Label>Add Images</Form.Label>
										<label className="file-input-label">
											<input
												type="file"
												name="file"
												onChange={handleImageChange}
												multiple
												className="position-relative file-input"
											/>
											<span
												style={{
													marginLeft: "18%",
												}}
											>
												+
											</span>
										</label>
										{error && (
											<div className="error">
												<i>{error}</i>
											</div>
										)}
										<div className="file-output">
											{myImages.length != 0
												? myImages.map((img, index) => {
														return (
															<i>
																{img.name}
																<br />
															</i>
														);
												  })
												: null}
										</div>
									</Form.Group>
								</Col>
								<Col>
									{!requestForm ? (
										error ? (
											<Button
												className="submit-button"
												type="submit"
												disabled
											>
												Add Request
											</Button>
										) : (
											<Button
												className="submit-button"
												type="submit"
											>
												Add Request
											</Button>
										)
									) : error ? (
										<Button
											className="submit-button"
											type="submit"
											disabled
										>
											Add Post
										</Button>
									) : (
										<Button
											className="submit-button"
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

const mapStateToProps = (state) => {
	return {
		post_error: state.post.error,
		req_error: state.request.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createRequest: (request, myImages) =>
			dispatch(createRequest(request, myImages)),
		createPost: (data, myImages) => dispatch(createPost(data, myImages)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
