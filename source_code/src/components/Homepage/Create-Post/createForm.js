import { React, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import "../homepage.css";

function CreateForm({ selectedTag }) {
	const [validated, setValidated] = useState(false);
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);
	const types = ["image/png", "image/jpeg"];

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
		}
		setValidated(true);
		const formData = new FormData(e.target);
		const formDataObj = Object.fromEntries(formData.entries());
		console.log(formDataObj);
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

	if (selectedTag === "Request")
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
							// hasValidation
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
							<Form.Group as={Col}>
								<Form.Label>Category</Form.Label>
								<Form.Control
									as="select"
									defaultValue="Choose..."
									required
									name="category"
								>
									<option>Choose...</option>
									<option>Clothing</option>
									<option>Electronics</option>
									<option>Food</option>
									<option>Hobbies</option>
									<option>Home & Living</option>
								</Form.Control>
								<Form.Control.Feedback>
									Looks good!
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please choose a Category.
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.File
									className="position-relative"
									required
									name="file"
									label="Add Image"
									onChange={handleChange}
								/>
								<Form.Control.Feedback>
									Looks good!
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please choose a valid image.
								</Form.Control.Feedback>
								{error && <div className="error">{error}</div>}
								{file && <div>{file.name}</div>}
							</Form.Group>
						</Col>
					</Row>
					<br />
					<Row>
						<Col></Col>
						<Col>
							<Button
								className="add-request-button"
								variant="dark"
								type="submit"
							>
								Add Request
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		);
	else if (selectedTag === "Post")
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
							// hasValidation
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
								<Form.File
									className="position-relative"
									required
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
	else return <div></div>;
}

export default CreateForm;
