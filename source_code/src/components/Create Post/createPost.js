import { useState, lazy, Suspense } from "react";
import NavBar from "../Homepage/Navbar/navbar";
import { Form, Row, Col, Button, FormLabel, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router";
import "./createPost.css";
import { createRequest } from "../../store/actions/requestActions";
import { createPost } from "../../store/actions/postActions";
import LocationAutoComplete from "../Homepage/Location/LocationAutoComplete";
import { PlusCircle, X } from "react-bootstrap-icons";

const Activity = lazy(() => import("../Homepage/Activity/activity"));

/**
 * Use - Renders Create Post component. Appears as a shortcut inside Navbar.
 * 		Contains Form to add details for new Request/Post.
 * Parameters - createRequest from store/actions/requestActions to add new document to Request collection in Firestore
 * 				createPost from store/actions/postActions to add new document to Post collection in Firestore
 * 				post_error from postReducer to handle createPost error
 * 				req_error from requestReducer to handle createRequest error
 */

function CreatePost({
	createRequest,
	createPost,
	post_error,
	req_error,
	auth,
}) {
	const [menuOpen, setMenuOpen] = useState(false); //toggles Notifications menu
	const [validated, setValidated] = useState(false); //check if form fields are validated
	const [error, setError] = useState(null); //check if form validations contain errors
	const [requestForm, setRequestForm] = useState(false); //check is Request option is not selected
	const types = ["image/png", "image/jpeg"]; //stores file extensions accepted
	const [location, setLocation] = useState(); //set location from LocationAutoComplete form field
	const [images, setImages] = useState([]);
	const history = useHistory();

	const handleChange = (e) => {
		//set or unset requestForm state
		setRequestForm(!requestForm);
	};

	const handleImageChange = (e) => {
		//validate image according to constraints
		e.preventDefault();
		var files = e.target.files;
		var i;
		var myImages = [];
		if (images.length + files.length > 3) {
			setError("Cannot upload more than 3 images.");
			return;
		} else setError(null);

		if (files.length > 0) {
			for (i = 0; i < files.length; i++) {
				if (types.includes(files[i].type)) {
					myImages.push(files[i]);
					setError("");
				} else {
					setError("Please select an image file (png or jpg)");
					return;
				}
			}
		}
		setImages([...images, ...myImages]);
	};

	const handleSubmit = (e) => {
		//upload form data to firestore
		e.preventDefault();
		setValidated(true);
		const form = e.target;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			return;
		}
		const formData = new FormData(form);
		const formDataObj = Object.fromEntries(formData.entries());

		if (!requestForm) {
			formDataObj.location = location?.value.formatted;
			formDataObj.locCoords = location
				? {
						latitude: location.value.lat,
						longitude: location.value.lng,
				  }
				: null;
		}
		if (!requestForm) createRequest(formDataObj, images);
		else createPost(formDataObj, images);

		setImages([]);
		if (!post_error) history.push("/home");
	};

	const removeImage = (img) => {
		var array = Array.from(images);
		var index = array.indexOf(img);
		if (index !== -1) {
			array.splice(index, 1);
			setImages(array);
		}
	};
	if (!auth.uid) return <Redirect to="/" />;
	return (
		<div>
			<NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			<Suspense fallback={<div>Loading...</div>}>
				<Activity menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			</Suspense>
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
					<div className="form-container">
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
							<Form.Label>Add Images</Form.Label>
							<Row>
								<Col
								// style={{
								// 	maxWidth: "min-content",
								// 	maxHeight: "min-content",
								// }}
								>
									<label className="file-input-label">
										<input
											type="file"
											name="file"
											onChange={handleImageChange}
											multiple
											className="position-relative file-input"
										/>
										<PlusCircle className="plus-icon" />
									</label>
								</Col>

								{error && (
									<Col>
										<div className="error">
											<i>{error}</i>
										</div>
									</Col>
								)}

								<div className="file-output d-flex">
									{images.length != 0
										? images.map((img, index) => {
												return (
													<Col>
														<div
															style={{
																position:
																	"relative",
																borderRadius:
																	"5px",
																width: "70px",
																height: "70px",
																margin: "0 5px",
																backgroundImage: `url(${URL.createObjectURL(
																	img
																)})`,
																backgroundSize:
																	"cover",
															}}
														>
															<X
																size={25}
																style={{
																	position:
																		"absolute",
																	right: 0,
																	top: "1px",
																	backgroundColor:
																		"#0000007c",
																	borderRadius:
																		"12px",
																	cursor: "pointer",
																}}
																color={"white"}
																onClick={() =>
																	removeImage(
																		img
																	)
																}
															/>
														</div>
													</Col>
												);
										  })
										: null}
								</div>

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
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		post_error: state.post.error,
		req_error: state.request.error,
		auth: state.firebase.auth,
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
