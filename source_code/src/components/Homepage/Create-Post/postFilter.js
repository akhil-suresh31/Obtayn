import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./post.css";

function PostFilter() {
	return (
		<div className="filter-div">
			<Row>
				<Col>
					<h5>Filter:</h5>
				</Col>
				<Col>
					<Form.Check
						name="requests"
						label="Requests"
						id="viewRequests"
						feedbackTooltip
						style={{ color: "white" }}
					/>
				</Col>
				<Col>
					<Form.Check
						name="posts"
						label="Posts"
						id="viewPosts"
						feedbackTooltip
						style={{ color: "white" }}
					/>
				</Col>
			</Row>
		</div>
	);
}

export default PostFilter;
