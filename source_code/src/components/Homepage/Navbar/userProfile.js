import { React, useState, useEffect } from "react";
import {
	Nav,
	DropdownButton,
	Dropdown,
	Modal,
	Form,
	Button,
	Row,
	Col,
} from "react-bootstrap";
import Avatar from "react-avatar";
import { useHistory, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { logOut } from "../../../store/actions/authActions";
import { connect } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import firebase from "../../../firebase/firebase";
import "firebase/storage";
import "firebase/firestore";

/**
 * Use - Loads User Profile component inside Navbar. Renders as a dropdown.
 * 		Also contains Edit Profile modal on avatar clock event.
 * Parameters - logOut to unset current User
 * 				User as current logged in user
 * 				user_id as current User's id
 */

function UserProfile({ logOut, User, user_id }) {
	const [UserInfo, setUserInfo] = useState({
		avatar: User.profile_picture,
		name: User.name,
		email: User.email,
		contactNumber: User.phone_number,
	});

	const storage = firebase.storage();

	const [url, setURL] = useState("");
	const [show, setShow] = useState(false);
	const [file, setFile] = useState(null);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [error, setError] = useState(null);
	const [contactError, setContactError] = useState(null);
	const types = ["image/png", "image/jpeg"];
	const history = useHistory();

	useEffect(() => {
		setUserInfo({
			avatar: User.profile_picture,
			name: User.name,
			email: User.email,
			contactNumber: User.phone_number,
		});
	}, [User]);

	const changeContact = (e) => {
		let contact = e.target.value;
		console.log(contact);
		if (contact != "") {
			if (isNaN(contact))
				setContactError("Contact number must be numeric.");
			else if (contact.length < 10)
				setContactError("Contact number must be 10 digits long.");
			else setContactError(null);
		} else setContactError(null);
	};

	const changleHandler = (e) => {
		let selected = e.target.files[0];

		if (selected && types.includes(selected.type)) {
			setFile(selected);
			setError("");
		} else {
			setFile(null);
			setError("Please select an image file (png or jpg)");
		}
		if (!selected) setError(null);
	};

	const handleLogout = () => {
		logOut();
		// setTimeout(() => {
		// 	history.push("/");
		// }, 2000);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const firestore = firebase.firestore();
		const collectionRef = firestore.collection("User");
		const form = e.target;
		var formData = new FormData(form);
		formData = Object.fromEntries(formData.entries());

		if (file) {
			const uploadTask = storage
				.ref(`/avatars/${user_id}-${file.name}`)
				.put(file);
			uploadTask.on("state_changed", console.log, console.error, () => {
				storage
					.ref("avatars")
					.child(`${user_id}-${file.name}`)
					.getDownloadURL()
					.then((url) => {
						setFile(null);
						const oldRef = storage.refFromURL(UserInfo.avatar);
						collectionRef.doc(user_id).update({
							name: formData.profileName,
							phone_number: formData.profileContact,
							profile_picture: url,
						});
						setURL(url);
						oldRef
							.delete()
							.then(console.log("Deleted old file."))
							.catch((err) => console.log(err));
					});
			});
		} else {
			collectionRef.doc(user_id).update({
				name: formData.profileName,
				phone_number: formData.profileContact,
				profile_picture: User.profile_picture,
			});
		}
		Swal.fire({
			icon: "success",
			title: "Profile updated!",
			confirmButtonText: "Cool",
			timer: 1000,
		});
		handleClose();
	};

	const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;
	if (User.isLoaded)
		return (
			<div>
				<Nav className="justify-content-end">
					<DropdownButton
						menuAlign="right"
						title={UserInfo.name}
						id="dropdown-menu-align-right"
						variant="light"
						className="navbar-profile"
					>
						<div className="profile-body">
							<center>
								<Dropdown.ItemText>
									<OverlayTrigger
										placement="bottom"
										overlay={renderTooltip("Edit Profile")}
									>
										<motion.div
											className="avatar-container"
											whileHover={{ scale: 1.1 }}
										>
											<Avatar
												className="profileAvatar"
												size="60"
												src={UserInfo.avatar}
												round={true}
												onClick={handleShow}
											/>
										</motion.div>
									</OverlayTrigger>
									<div className="edit-profile-modal">
										<Modal show={show} onHide={handleClose}>
											<Modal.Header closeButton>
												<Modal.Title>
													Edit Profile
												</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<Form
													name="edit-profile-form"
													onSubmit={handleSubmit}
												>
													<Form.Control
														type="text"
														defaultValue={
															UserInfo.name
														}
														name="profileName"
													/>
													<br />
													<Form.Control
														type="email"
														defaultValue={
															UserInfo.email
														}
														readOnly
													/>
													<br />
													<Form.Group>
														<Form.Control
															type="text"
															defaultValue={
																UserInfo.contactNumber
															}
															name="profileContact"
															onChange={
																changeContact
															}
															placeholder="Contact Number"
														/>
														{contactError && (
															<div className="error">
																<i>
																	{
																		contactError
																	}
																</i>
															</div>
														)}
													</Form.Group>
													<br />
													<Row>
														<Col>
															<Form.Group>
																{/* <Form.File
															className="position-relative"
															name="profilePic"
															label="Select new Profile Photo"
															onChange={
																changleHandler
															}
														/> */}
																<Form.Label>
																	New Profile
																	Picture
																</Form.Label>
																<label className="profile-input-label">
																	<input
																		type="file"
																		onChange={
																			changleHandler
																		}
																		className="profile-input"
																	/>
																	<span
																		style={{
																			marginLeft:
																				"18%",
																		}}
																	>
																		+
																	</span>
																</label>
																{error && (
																	<div className="error">
																		<i>
																			{
																				error
																			}
																		</i>
																	</div>
																)}
																{file && (
																	<div className="file-output">
																		<i>
																			{
																				file.name
																			}
																		</i>
																	</div>
																)}
															</Form.Group>
														</Col>
														<Col>
															<Button
																className="update-button"
																type="submit"
																disabled={
																	error ||
																	contactError
																		? true
																		: false
																}
															>
																Update
															</Button>
														</Col>
													</Row>
												</Form>
											</Modal.Body>
										</Modal>
									</div>
								</Dropdown.ItemText>
								<Dropdown.Divider />
								<Dropdown.ItemText eventKey="1">
									{UserInfo.name}
								</Dropdown.ItemText>
								<Dropdown.ItemText eventKey="2">
									{UserInfo.email}
								</Dropdown.ItemText>
								<Dropdown.ItemText eventKey="2">
									{UserInfo.contactNumber}
								</Dropdown.ItemText>
								<Dropdown.Divider />
								<Dropdown.ItemText
									className="logout-link"
									eventKey="4"
								>
									<Link
										onClick={handleLogout}
										style={{
											color: "black",
											textDecoration: "none",
										}}
									>
										Logout
									</Link>
								</Dropdown.ItemText>
							</center>
						</div>
					</DropdownButton>
				</Nav>
			</div>
		);
	else return <div style={{ color: "white" }}>Loading....</div>;
}

const mapDispatchToProps = (dispatch) => {
	return {
		logOut: () => dispatch(logOut()),
	};
};

const mapStateToProps = (state) => {
	return {
		User: state.firebase.profile,
		user_id: state.firebase.auth.uid,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
