import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./post.css";

function PostFilter() {
	return (
		<div className="filter-div">
			<Row>
				<Col>
					<h5 style={{ color: "white" }}>Filter:</h5>
				</Col>
				<Col>
					<Form.Check
						name="all-posts"
						label="All"
						id="viewAllPosts"
						feedbackTooltip
						style={{ color: "white" }}
					/>
				</Col>
				<Col>
					<h6>Post</h6>
				</Col>
				<Col>
					<Form>
						<Form.Check type="switch" id="filter" />
					</Form>
				</Col>
				<Col>
					<h6>Request</h6>
				</Col>
			</Row>
		</div>
	);
}

export default PostFilter;
