import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Button } from "react-bootstrap";
import Navbar from "../Homepage/Navbar/navbar";
import Chat from "./Chat/chat";
import "./requests.css";

const Requests = ({ requests, user }) => {
	const [show, setShow] = useState(false);
	const [tag, setTag] = useState("Tag");

	var incomingReq = [];
	var outgoingReq = [];
	requests &&
		user &&
		requests.map((item, index) => {
			if (item.to_user_id === user) incomingReq.push(item);
			else if (item.from_user_id === user) outgoingReq.push(item);
		});
	return (
		<div>
			<Navbar tag={tag} setTag={setTag} show={show} setShow={setShow} />
			<div className="requests-body">
				{/* {console.log(requests)} */}
				<div className="requests-container">
					<div className="incoming-req-container">
						<h6 className="req-heading">Incoming Requests</h6>
						{incomingReq &&
							incomingReq.map((req, index) => {
								return (
									<div className="incoming-req" key={index}>
										<p className="req-title">{req.title}</p>
										<p className="req-message">
											{req.message}
										</p>

										{req.file &&
											req.file.map((image, index) => {
												return (
													<img
														src={image}
														style={{
															height: "20vh",
															width: "20vh",
															padding: "5%",
															borderRadius: "15%",
														}}
														alt="Some image"
														// onClick={() => {
														// 	setSelectedImg(
														// 		image
														// 	);
														// 	setImage(
														// 		!showImage
														// 	);
														// }}
													/>
												);
											})}
										<p className="req-timestamp">
											{req.timestamp
												.toDate()
												.toDateString()}
										</p>
									</div>
								);
							})}
					</div>

					<div className="outgoing-req-container">
						<h6 className="req-heading">Outgoing Requests</h6>
						{outgoingReq &&
							outgoingReq.map((req, index) => {
								return (
									<div className="outgoing-req" key={index}>
										<p className="req-title">{req.title}</p>
										<p className="req-message">
											{req.message}
										</p>

										{req.file &&
											req.file.map((image, index) => {
												return (
													<img
														src={image}
														style={{
															height: "20vh",
															width: "20vh",
															padding: "5%",
															borderRadius: "15%",
														}}
														alt="Some image"
														// onClick={() => {
														// 	setSelectedImg(
														// 		image
														// 	);
														// 	setImage(
														// 		!showImage
														// 	);
														// }}
													/>
												);
											})}
										{req.status === "accepted" ? (
											<Button>Fulfilled</Button>
										) : (
											<> </>
										)}
										<p className="req-timestamp">
											{req.timestamp
												.toDate()
												.toDateString()}
										</p>
									</div>
								);
							})}
					</div>
				</div>
				<Chat />
			</div>
		</div>
	);
};

const mapStatetoProps = (state) => {
	return {
		requests: state.firestore.ordered.Request,
		user: state.firebase.auth.uid,
	};
};

export default compose(
	connect(mapStatetoProps),
	firestoreConnect([
		{
			collection: "Request",
			orderBy: ["timestamp", "desc"],
		},
	])
)(Requests);
