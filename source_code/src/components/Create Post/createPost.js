import React, { useState } from "react";
import NavBar from "../Homepage/Navbar/navbar";
import Activity from "../Homepage/Activity/activity";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./createPost.css";

function CreatePost() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState(null);
	return (
		<div>
			<NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			<Activity menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			<div className="create-post-container">
				<div className="create-post-body">
					<center>
						<Form>
							<Form.Check
								inline
								type="radio"
								label="New Request"
							/>
							<Form.Check inline type="radio" label="New Post" />
						</Form>
					</center>
					<br /> <br />
					<Form
						noValidate
						validated={validated}
						// onSubmit={handleSubmit}
						name="form"
						className="pink-form"
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
										<option disabled={true}>
											Choose...
										</option>
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
										// onChange={handleChange}
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
			</div>
		</div>
	);
}

export default CreatePost;
