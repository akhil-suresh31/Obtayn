import { React, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { createPost } from "../../../store/actions/postActions";
import "../homepage.css";

function CreatePostForm({ createPost, modalClose }) {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState(null);
	const types = ["image/png", "image/jpeg"];
	var images = [];

	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.files.length > 3) {
			setError("Cannot upload more than 3 images.");
		}
		images = e.target.files;
		console.log(images);
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
		modalClose();
		console.log(images);
		createPost(formDataObj, images);
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
							<Form.Control.Feedback>
								Looks good!
							</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								Please choose a valid image.
							</Form.Control.Feedback>
							{error && <div className="error">{error}</div>}
						</Form.Group>
					</Col>
					<Col>
						<br />
						<Button
							className="add-post-button"
							variant="dark"
							type="submit"
						>
							Add Post
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
}
const mapDispatchToProps = (dispatch) => {
	return {
		createPost: (data, images) => dispatch(createPost(data, images)),
	};
};

export default connect(null, mapDispatchToProps)(CreatePostForm);
