import React, { useState } from "react";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import { FileEarmarkPlusFill } from "react-bootstrap-icons";
import "../homepage.css";
import CreateForm from "./createForm";

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
						<h6 className="dropdown-header">Select post tag</h6>
						<Dropdown.Item eventKey="Request">
							Request
						</Dropdown.Item>
						<Dropdown.Item eventKey="Post">Post</Dropdown.Item>
					</DropdownButton>
					<CreateForm selectedTag={tag} modalClose={handleClose} />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default CreatePostModal;
