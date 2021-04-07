import React from "react";
import { LightbulbFill, SuitHeartFill } from "react-bootstrap-icons";
import { Row, Col, Form } from "react-bootstrap";
import Avatar from "react-avatar";
import { motion } from "framer-motion";
import "../homepage.css";

const CreatePostDiv = () => {
	return (
		<div className="create-post-div">
			<Row className="mt-3">
				<Col md="auto">
					<div className="create-post-avatar">
						<Avatar size="55" src="images/user1.jpg" round={true} />
					</div>
				</Col>
				<Col>
					<div className="create-post-input">
						<Form inline>
							<Form.Control
								type="text"
								placeholder="Write something..."
								className="post-input"
								readOnly
							/>
						</Form>
					</div>
				</Col>
				<Col></Col>
				<Col></Col>
				<Col></Col>
				<Col></Col>
				<Col></Col>
				<Col></Col>
				<Col></Col>
				<Col></Col>
				<Col></Col>
				<motion.div whileHover={{ scale: 1.4 }}>
					<LightbulbFill
						className="request-shortcut icons"
						size={30}
					/>
				</motion.div>
				<motion.div whileHover={{ scale: 1.4 }}>
					<SuitHeartFill className="post-shortcut icons" size={30} />
				</motion.div>
			</Row>
		</div>
	);
};

export default CreatePostDiv;
