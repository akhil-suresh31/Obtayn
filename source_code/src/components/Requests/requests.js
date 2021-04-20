import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Tooltip, OverlayTrigger, Accordion, Card } from "react-bootstrap";
import Swal from "sweetalert2";

import Navbar from "../Homepage/Navbar/navbar";
import Chat from "./Chat/chat";
import "./requests.css";
import { CheckCircleFill, TrashFill } from "react-bootstrap-icons";
import { deleteRequest } from "../../store/actions/requestActions";

const Requests = ({ requests, user, users, deleteRequest }) => {
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
	var acceptor = "";
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
				<div className="requests-container">
					<div className="incoming-req-container">
						<center>
							<h6 className="req-heading">Incoming Requests</h6>
						</center>
						<Accordion className="incoming-req-acc">
							{incomingReq &&
								incomingReq.map((req, index) => {
									return (
										<Card className="incoming-req-card">
											<Accordion.Toggle
												as={Card.Header}
												variant="link"
												eventKey={index + 1}
											>
												<p className="req-title">
													{req.title}
												</p>
												<p className="req-sender">
													<b>From: </b>
													{req.user}
												</p>
											</Accordion.Toggle>

											<Accordion.Collapse
												eventKey={index + 1}
											>
												<Card.Body>
													<p className="req-message">
														{req.message}
													</p>
													{req.file &&
														req.file.map(
															(image, index) => {
																return (
																	<img
																		src={
																			image
																		}
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
																	/>
																);
															}
														)}
													<p className="req-timestamp">
														{req.timestamp
															.toDate()
															.toDateString()}
													</p>
												</Card.Body>
											</Accordion.Collapse>
										</Card>

										// 	key={index}
										// 	className="incoming-req"
										// 	id={index}
										// >
									);
								})}
						</Accordion>
					</div>

					<div className="outgoing-req-container">
						<center>
							<h6 className="req-heading">Outgoing Requests</h6>
						</center>
						<Accordion className="outgoing-req-acc">
							{outgoingReq &&
								outgoingReq.map((req, index) => {
									if (req.status == "accepted") {
										acceptor =
											users[
												users.findIndex(
													(x) =>
														x.id == req.to_user_id
												)
											];
										console.log(acceptor);
									}

									return (
										<Card
											className="outgoing-req-card"
											style={{
												backgroundColor:
													req.status == "accepted"
														? "#9dc8cf"
														: "#dbe9ee",
											}}
										>
											<Accordion.Toggle
												as={Card.Header}
												variant="link"
												eventKey={index + 1}
											>
												<p className="req-title">
													{req.title}

													{req.status ===
													"accepted" ? (
														<OverlayTrigger
															placement="top"
															overlay={renderTooltip(
																"Mark as Fulfilled"
															)}
														>
															<CheckCircleFill
																className="fulfill-button"
																onClick={() =>
																	markFulfilled(
																		req
																	)
																}
															/>
														</OverlayTrigger>
													) : null}
												</p>
												{acceptor ? (
													<p className="req-acceptor">
														<b>Accepted: </b>{" "}
														{acceptor.name}
													</p>
												) : (
													<p className="req-acceptor">
														<b>Pending</b>
													</p>
												)}
											</Accordion.Toggle>
											<Accordion.Collapse
												eventKey={index + 1}
											>
												<Card.Body>
													<p className="req-message">
														{req.message}
													</p>

													{req.file &&
														req.file.map(
															(image, index) => {
																return (
																	<img
																		src={
																			image
																		}
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
																	/>
																);
															}
														)}
													<br />

													<p className="req-timestamp">
														{req.timestamp
															.toDate()
															.toDateString()}
														<OverlayTrigger
															placement="top"
															overlay={renderTooltip(
																"Delete"
															)}
														>
															<TrashFill
																onClick={() =>
																	delRequest(
																		req
																	)
																}
																className="delete-button1"
															/>
														</OverlayTrigger>
													</p>
												</Card.Body>
											</Accordion.Collapse>
										</Card>
									);
								})}
						</Accordion>
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
		users: state.firestore.ordered.User,
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
		{ collection: "User" },
	])
)(Requests);
