import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Row, Col } from "react-bootstrap";
import "../homepage.css";

function CreateForm({ selectedTag }) {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	if (selectedTag == "Request")
		return (
			<div>
				<br />
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Form.Control
								required
								type="text"
								controlId="request-title"
								placeholder="Title"
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
								controlId="request-location"
								placeholder="Location"
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
					<Form.Group controlId="request-message">
						<Form.Label>Message</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							required
							hasValidation
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
							<Form.Group as={Col} controlId="formGridCategory">
								<Form.Label>Category</Form.Label>
								<Form.Control
									as="select"
									defaultValue="Choose..."
									required
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
								/>
								<Form.Control.Feedback>
									Looks good!
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please choose a valid image.
								</Form.Control.Feedback>
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
	else
		return (
			//Add post form
			<div>
				<br />
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Form.Control
								required
								type="text"
								controlId="post-title"
								placeholder="Title"
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
					<Form.Group controlId="post-message">
						<Form.Label>Message</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							required
							hasValidation
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
}

export default CreateForm;
