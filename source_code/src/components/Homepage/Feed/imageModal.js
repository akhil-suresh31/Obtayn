import React from "react";
import { Modal } from "react-bootstrap";
//import { motion } from "framer-motion";

function ImageModal({ show, setShow, image }) {
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Body>
				<img
					src={image}
					style={{
						height: "100%",
						width: "100%",
						maxHeight: "90vh",
						maxWidth: "90vw",
					}}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default ImageModal;
