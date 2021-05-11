import { React, useState, useEffect, useRef } from "react";
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
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { logOut } from "../../../../store/actions/authActions";
import { connect } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import firebase from "../../../../firebase/firebase";
import "firebase/storage";
import "firebase/firestore";
import "./profile.css";
import { PlusCircle, X } from "react-bootstrap-icons";

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
	const [show, setShow] = useState(false);
	const [file, setFile] = useState(null);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [error, setError] = useState(null);
	const [contactError, setContactError] = useState(null);
	const types = ["image/png", "image/jpeg"];
	const progressRef = useRef(null);

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
		if (contact !== "") {
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
	};

	const resizeImage = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		return new Promise((resolve, reject) => {
			reader.onload = function (event) {
				const imgElement = document.createElement("img");
				imgElement.src = event.target.result;

				imgElement.onload = function (e) {
					const canvas = document.createElement("canvas");
					const MAX_WIDTH = 400;

					const scaleSize = MAX_WIDTH / e.target.width;
					canvas.width = MAX_WIDTH;
					canvas.height = e.target.height * scaleSize;
					console.log("width :", canvas.width);
					console.log("height :", canvas.height);
					const ctx = canvas.getContext("2d");

					ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

					canvas.toBlob((blob) => {
						console.log("blob", blob);
						resolve(blob);
					}, "image/jpeg");
					// const srcEncoded = ctx.canvas.toDataURL(
					// 	e.target,
					// 	"image/jpeg"
					// );

					// // you can send srcEncoded to the server
					// resolve(srcEncoded);
				};
				imgElement.onerror = (e) => reject(e);
			};
			reader.onerror = (e) => reject(e);
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const firestore = firebase.firestore();
		const collectionRef = firestore.collection("User");
		const form = e.target;
		var formData = new FormData(form);
		formData = Object.fromEntries(formData.entries());

		if (file) {
			var result;
			try {
				result = await resizeImage(file);
			} catch (e) {
				console.log("file conver error :", e);
			}
			const uploadDate = Date.now();
			const blob = result;
			const uploadTask = storage
				.ref(`/avatars/${user_id}-DP-${uploadDate}`)
				.put(blob, { contentType: "image/jpeg" });
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const percentage =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(percentage);

					if (snapshot.state === firebase.storage.TaskState.RUNNING) {
						if (progressRef)
							progressRef.current.style.width = `${percentage}%`;
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					storage
						.ref("avatars")
						.child(`${user_id}-DP-${uploadDate}`)
						.getDownloadURL()
						.then((url) => {
							setFile(null);
							console.log("url:", url);
							const oldRef = storage.refFromURL(UserInfo.avatar);
							collectionRef.doc(user_id).update({
								name: formData.profileName,
								phone_number: formData.profileContact,
								profile_picture: url,
							});
							oldRef
								.delete()
								.then(() => {
									Swal.fire({
										icon: "success",
										title: "Profile updated!",
										confirmButtonText: "Cool",
										timer: 1000,
									});
									handleClose();
								})
								.catch((err) => console.log(err));
						});
				}
			);
		} else {
			collectionRef.doc(user_id).update({
				name: formData.profileName,
				phone_number: formData.profileContact,
				profile_picture: User.profile_picture,
			});
			Swal.fire({
				icon: "success",
				title: "Profile updated!",
				confirmButtonText: "Cool",
				timer: 1000,
			});
			handleClose();
		}
	};

	const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;

	const removeImage = () => {
		setFile(null);
	};

	if (User.isLoaded)
		return (
			<div>
				<Nav className="justify-content-end">
					<DropdownButton
						menuAlign="right"
						title={User.name}
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

													<Form.Label
														style={{
															marginLeft: "2%",
														}}
													>
														New Profile Picture
													</Form.Label>
													<Row>
														<Col
															style={{
																maxWidth:
																	"min-content",
															}}
														>
															<label className="profile-input-label">
																<input
																	type="file"
																	onChange={
																		changleHandler
																	}
																	className="profile-input"
																/>
																<PlusCircle className="plus-icon" />
															</label>
														</Col>

														{error && (
															<Col>
																<div className="error">
																	<i>
																		{error}
																	</i>
																</div>
															</Col>
														)}

														{file && (
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
																			file
																		)})`,
																		backgroundSize:
																			"cover",
																	}}
																>
																	<X
																		size={
																			25
																		}
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
																		color={
																			"white"
																		}
																		onClick={() =>
																			removeImage()
																		}
																	/>
																</div>
															</Col>
														)}
													</Row>

													{file && (
														<motion.div
															ref={progressRef}
															className="progress-bar"
															initial={{
																width: 0,
															}}
														>
															{" "}
														</motion.div>
													)}

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
									<div
										to={null}
										onClick={handleLogout}
										style={{
											cursor: "pointer",
											color: "black",
											textDecoration: "none",
										}}
									>
										Logout
									</div>
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
