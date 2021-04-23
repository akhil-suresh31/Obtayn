import { React, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { createPost } from "../../../store/actions/postActions";
import "../homepage.css";
import "./post.css";
var myImages = [];
function CreatePostForm({ createPost, modalClose, uploadError }) {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState(null);
	const types = ["image/png", "image/jpeg"];

	const handleChange = (e) => {
		e.preventDefault();
		var files = e.target.files;
		console.log("Target files ->", files);
		var i;
		if (files.length > 3) setError("Cannot upload more than 3 myImages.");
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
		//console.log(formDataObj);

		console.log(myImages);
		createPost(formDataObj, myImages);
		if (uploadError) alert("Post cannot be uploaded!");
		modalClose();
	};

	return (
		<div>
			<br />
			<Form
				noValidate
				validated={validated}
				onSubmit={handleSubmit}
				name="form"
			>
				<Row>
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
				<br />
				<Form.Group>
					<Form.Label>Message</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						required
						name="message"
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
								onChange={handleChange}
								multiple
							/>
							{error && <div className="error">{error}</div>}
						</Form.Group>
					</Col>
					<Col>
						<br />
						{error ? (
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
	);
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		uploadError: state.auth.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createPost: (data, myImages) => dispatch(createPost(data, myImages)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostForm);
