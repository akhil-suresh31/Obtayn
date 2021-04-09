import { React, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

function EditProfile({ show }) {
	//const [show, setShow] = useState(false);
	return (
		<div>
			<Modal show={show}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Profile Picture</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.File
								className="position-relative"
								required
								name="file"
								label="Select Image"
							/>
							<Form.Control.Feedback>
								Looks good!
							</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								Please choose a valid image.
							</Form.Control.Feedback>
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
	);
}

// const handleShow = () => setShow(true);

export { EditProfile };
