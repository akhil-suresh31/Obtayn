import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "../homepage.css";
import CreateForm from "./createForm";
import { FileEarmarkPlusFill } from "react-bootstrap-icons";

function CreatePostModal() {
	const [show, setShow] = useState(false);
	const [tag, setTag] = useState("Tag");

	const handleClose = () => setShow(false);

	const handleShow = () => {
		setShow(true);
		setTag("Tag");
	};

	const handleSelect = (e) => {
		console.log(e);
		setTag(e);
	};

	return (
		<>
			<FileEarmarkPlusFill size={27} color="white" onClick={handleShow} />

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DropdownButton
						id="dropdown-item-button"
						title={tag}
						variant="light"
						onSelect={handleSelect}
					>
						<h6 class="dropdown-header">Select post tag</h6>
						<Dropdown.Item eventKey="Request">
							Request
						</Dropdown.Item>
						<Dropdown.Item eventKey="Post">Post</Dropdown.Item>
					</DropdownButton>
					<CreateForm selectedTag={tag} />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default CreatePostModal;