import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Swal from "sweetalert2";
import Navbar from "../Homepage/Navbar/navbar";
import Chat from "./Chat/chat";
import "./requests.css";
import { CheckCircleFill, TrashFill } from "react-bootstrap-icons";
import { deleteRequest } from "../../store/actions/requestActions";

const Requests = ({ requests, user, deleteRequest }) => {
	const [show, setShow] = useState(false);
	const [tag, setTag] = useState("Tag");
	const [open, setOpen] = useState(false);
	const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;

	const handleOpen = (e) => {
		setOpen(!open);
	};

	const markFulfilled = (request) => {
		Swal.fire({
			title:
				"Do you want to mark this Request as fulfilled?	This will remove it from the database.",
			showConfirmButton: true,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				deleteRequest(request);
				Swal.fire({
					title: "Marked as Fulfilled!",
					text: "",
					icon: "success",
					timer: 1500,
				});
			}
		});
	};

	const delRequest = (request) => {
		Swal.fire({
			title: "Do you want to permanently delete this Request?",
			showConfirmButton: true,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				deleteRequest(request);
				Swal.fire({
					title: "Request deleted!",
					text: "",
					icon: "success",
					timer: 1500,
				});
			}
		});
	};

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
										<p
											className="req-title"
											onClick={(e) => handleOpen(e)}
										>
											{req.title}
										</p>

										{open ? (
											<div className="extra-info">
												<p className="req-message">
													{req.message}
												</p>
												{req.file &&
													req.file.map(
														(image, index) => {
															return (
																<img
																	src={image}
																	style={{
																		height:
																			"20vh",
																		width:
																			"20vh",
																		padding:
																			"5%",
																		borderRadius:
																			"15%",
																	}}
																	alt=""
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
														}
													)}
												<p className="req-timestamp">
													{req.timestamp
														.toDate()
														.toDateString()}
												</p>
											</div>
										) : null}
									</div>
								);
							})}
					</div>

					<div className="outgoing-req-container">
						<h6 className="req-heading">Outgoing Requests</h6>
						{outgoingReq &&
							outgoingReq.map((req, index) => {
								return (
									<div
										className="outgoing-req"
										key={index}
										style={{
											backgroundColor:
												req.status == "accepted"
													? "#729ca2"
													: "#c2d7d0",
										}}
									>
										<p className="req-title">
											{req.title}

											{req.status === "accepted" ? (
												<OverlayTrigger
													placement="top"
													overlay={renderTooltip(
														"Mark as Fulfilled"
													)}
												>
													<CheckCircleFill
														className="fulfill-button"
														onClick={() =>
															markFulfilled(req)
														}
													/>
												</OverlayTrigger>
											) : null}
										</p>

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
														alt=""
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
										<br />
										<OverlayTrigger
											placement="top"
											overlay={renderTooltip("Delete")}
										>
											<TrashFill
												onClick={() => delRequest(req)}
												className="delete-button1"
											/>
										</OverlayTrigger>
										<br />

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

const mapDispatchToProps = (dispatch) => {
	return {
		deleteRequest: (request) => dispatch(deleteRequest(request)),
	};
};

export default compose(
	connect(mapStatetoProps, mapDispatchToProps),
	firestoreConnect([
		{
			collection: "Request",
			orderBy: ["timestamp", "desc"],
		},
	])
)(Requests);
