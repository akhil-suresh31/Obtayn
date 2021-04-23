import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { createRequest } from "../../../store/actions/requestActions";
import "../homepage.css";
import "./post.css";
var myImages = [];

function CreateRequestForm({ selectedTag, createRequest, modalClose }) {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState(null);
	const types = ["image/png", "image/jpeg"];
	//var initialImageState = [];
	//const [images, setImages] = useState(initialImageState);

	const handleChange = (e) => {
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
					//setImages(myImages);
				} else setError("Please select an image file (png or jpg)");
			}
		}
		console.log("temp->", myImages);
		//console.log("State-> ", images);
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
		//console.log(images);
		createRequest(formDataObj, myImages);
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
						<Form.Group as={Col}>
							<Form.Label>Category</Form.Label>
							<Form.Control
								as="select"
								defaultValue="Choose..."
								required
								name="category"
							>
								<option disabled={true}>Choose...</option>
								<option>Clothing</option>
								<option>Electronics</option>
								<option>Food</option>
								<option>Hobbies</option>
								<option>Home & Living</option>
								<option>Other</option>
							</Form.Control>
							{/* <Form.Control.Feedback>
								Looks good!
							</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								Please choose a Category.
							</Form.Control.Feedback> */}
						</Form.Group>
					</Col>
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
				</Row>
				<br />
				<Row>
					<Col></Col>
					<Col>
						{error ? (
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
						)}
					</Col>
				</Row>
			</Form>
		</div>
	);
}
const mapDispatchToProps = (dispatch) => {
	return {
		createRequest: (request, myImages) =>
			dispatch(createRequest(request, myImages)),
	};
};

export default connect(null, mapDispatchToProps)(CreateRequestForm);
