import { React, useState } from "react";
import {
	Nav,
	DropdownButton,
	Dropdown,
	Modal,
	Form,
	Button,
} from "react-bootstrap";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function UserProfile() {
	const User = {
		avatar: "images/user1.jpg",
		name: "Jordan",
		email: "jordan@hotmail.com",
		contactNumber: "1234567890",
	};

	const [UserInfo, setUserInfo] = useState({
		avatar: User.avatar,
		name: User.name,
		email: User.email,
		contactNumber: User.contactNumber,
	});
	const [show, setShow] = useState(false);
	const [file, setFile] = useState(null);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [error, setError] = useState(null);
	const types = ["image/png", "image/jpeg"];

	const changleHandler = (e) => {
		let selected = e.target.files[0];

		if (selected && types.includes(selected.type)) {
			setFile(selected);
			setError("");
			let newPhoto = "images/" + file.name;
			setUserInfo({
				...UserInfo,
				avatar: newPhoto,
			});
		} else {
			setFile(null);
			setError("Please select an image file (png or jpg)");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		var formData = new FormData(form);
		formData = Object.fromEntries(formData.entries());
		console.log(formData);

		if (formData["profile-name"] !== UserInfo.name) {
			setUserInfo({
				...UserInfo,
				name: formData["profile-name"],
			});
			console.log("&&&&");
		}

		if (formData["profile-contact"] !== UserInfo.contactNumber)
			setUserInfo({
				...UserInfo,
				contactNumber: formData["profile-contact"],
			});

		handleClose();
		console.log(UserInfo);
	};

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
					<center>
						<Dropdown.ItemText>
							<motion.div
								className="avatar-container"
								whileHover={{ scale: 1.1 }}
							>
								<Avatar
									className="profile-avatar"
									size="60"
									src={UserInfo.avatar}
									round={true}
									onClick={handleShow}
								/>
							</motion.div>
							<div className="edit-profile-modal">
								<Modal show={show} onHide={handleClose}>
									<Modal.Header closeButton>
										<Modal.Title>Edit Profile</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<Form
											name="edit-profile-form"
											onSubmit={handleSubmit}
										>
											<Form.Control
												type="text"
												defaultValue={UserInfo.name}
												name="profile-name"
											/>
											<br />
											<Form.Control
												type="email"
												defaultValue={UserInfo.email}
												readOnly
											/>
											<br />
											<Form.Control
												type="text"
												defaultValue={
													UserInfo.contactNumber
												}
												name="profile-contact"
											/>
											<br />
											<Form.Group>
												<Form.File
													className="position-relative"
													name="profile-pic"
													label="Select new Profile Photo"
													onChange={changleHandler}
												/>
												{error && (
													<div className="error">
														{error}
													</div>
												)}
												{/* {file && <div>{file.name}</div>} */}
											</Form.Group>
											<Button
												className="add-request-button"
												variant="dark"
												type="submit"
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
						<Dropdown.ItemText eventKey="4">
							<Link to="/">Logout</Link>
						</Dropdown.ItemText>
					</center>
				</DropdownButton>
			</Nav>
		</div>
	);
}

export default UserProfile;
