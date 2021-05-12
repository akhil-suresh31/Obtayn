import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./homepage.css";

function PostFilter({ setFilter, filter }) {
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
						style={{ color: "black" }}
						onClick={() => {
							setFilter({ ...filter, request: !filter.request });
						}}
					/>
				</Col>
				<Col>
					<Form.Check
						name="posts"
						label="Posts"
						id="viewPosts"
						feedbackTooltip
						style={{ color: "black" }}
						onClick={() => {
							setFilter({ ...filter, post: !filter.post });
						}}
					/>
				</Col>
			</Row>
		</div>
	);
}

export default PostFilter;
