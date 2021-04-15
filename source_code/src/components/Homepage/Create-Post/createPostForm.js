import { React, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { createRequest } from "../../../store/actions/requestActions";
import "../homepage.css";

function CreatePostForm({ selectedTag, createRequest, modalClose }) {
	const [validated, setValidated] = useState(false);
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);
	const types = ["image/png", "image/jpeg"];
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
		var data;
		if (formDataObj.file.name == "") data = { ...formDataObj, file: null };
		console.log(data);
		modalClose();
		if (selectedTag === "Request") createRequest(data);
	};

	useEffect(() => {
		if (document.getElementsByName("form")[0]) {
			document.getElementsByName("form")[0].reset();
			setValidated(false);
		}
	}, [selectedTag]);

	const handleChange = (e) => {
		let selected = e.target.files[0];

		if (selected && types.includes(selected.type)) {
			setFile(selected);
			setError("");
		} else {
			setFile(null);
			setError("Please select an image file (png or jpg)");
		}
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
							<Form.File
								className="position-relative"
								name="file"
								label="Add Image"
							/>
							<Form.Control.Feedback>
								Looks good!
							</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								Please choose a valid image.
							</Form.Control.Feedback>
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
		createRequest: (request) => dispatch(createRequest(request)),
	};
};

export default connect(null, mapDispatchToProps)(CreatePostForm);
