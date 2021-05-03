import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
	Tooltip,
	OverlayTrigger,
	Accordion,
	Card,
	Form,
	FormLabel,
} from "react-bootstrap";
import Swal from "sweetalert2";

import Navbar from "../Homepage/Navbar/navbar";
import Chat from "./Chat/chat";
import DirectChat from "./Chat/directChat";
import "./requests.css";
import { CheckCircleFill, TrashFill } from "react-bootstrap-icons";
import { deleteRequest } from "../../store/actions/requestActions";
import {
	clearNotif,
	requestFulfilledNotif,
} from "../../store/actions/notificationActions";
import Activity from "../Homepage/Activity/activity";

const Requests = ({
	requests,
	user,
	users,
	chats,
	deleteRequest,
	requestFulfilledNotif,
	clearNotif,
	highlight,
}) => {
	const [show, setShow] = useState(false);
	const [tag, setTag] = useState("Tag");
	const [menuOpen, setMenuOpen] = useState(false);
	const [openDM, setOpenDM] = useState(false);
	const [DMUser, setDMUser] = useState();
	const [DMChat, setDMChat] = useState();
	const [requestView, setRequestView] = useState(true);
	const [highlightedReq, setHighlightedReq] = useState();
	const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;

	useEffect(() => {
		if (highlight) {
			if (highlight.trigger_event === "request") {
				highlight.message.includes("accepted")
					? setRequestView(true)
					: setRequestView(false);
				setHighlightedReq(highlight.trigger_event_id);
				setTimeout(function () {
					clearNotif();
					setHighlightedReq();
				}, 5000);
			}

			if (highlight.trigger_event === "chat") {
				const user =
					users &&
					users.filter(
						(user) => user.id === highlight.from_user_id
					)[0];
				const chat =
					chats &&
					chats.filter(
						(chat) => chat.id === highlight.trigger_event_id
					)[0];
				if (chats) {
					setDMUser(user);
					setDMChat(chat);
					setOpenDM(true);
				}
				setTimeout(function () {
					clearNotif();
				}, 5000);
			}
		}
	}, [highlight]);

	const markFulfilled = (request) => {
		Swal.fire({
			title: "Do you want to mark this Request as fulfilled?	",
			showConfirmButton: true,
			confirmButtonText: "Yes",
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				console.log("calling");
				requestFulfilledNotif(request);
				Swal.fire({
					title: "Marked as Fulfilled!",
					text: "",
					icon: "success",
					timer: 1500,
				});
				console.log("called");
			}
		});
	};

	const delRequest = (request) => {
		Swal.fire({
			title: "Do you want to permanently delete this Request?",
			showConfirmButton: true,
			confirmButtonText: "Yes",
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

	const handleChange = (e) => {
		setRequestView(!requestView);
	};

	var incomingReq = [];
	var pendingReq = [];
	var fulfilledReq = [];
	//var req_status = [];
	var acceptor = "";
	requests &&
		user &&
		requests.map((item, index) => {
			if (item.to_user_id === user) incomingReq.push(item);
			else if (item.from_user_id === user) {
				if (item.status === "pending" || item.status === "accepted")
					pendingReq.push(item);
				else if (item.status === "fulfilled") fulfilledReq.push(item);
			}
		});
	console.log("Pending-> ", pendingReq);
	return (
		<div>
			<Navbar
				tag={tag}
				setTag={setTag}
				show={show}
				setShow={setShow}
				menuOpen={menuOpen}
				setMenuOpen={setMenuOpen}
			/>
			<div className="requests-body">
				<Activity menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
				<div className="requests-container">
					<div className="incoming-req-container">
						<center>
							<h6 className="req-heading">Accepted Requests</h6>
						</center>
						<Accordion className="incoming-req-acc">
							{incomingReq &&
								incomingReq.map((req, index) => {
									const style =
										highlightedReq == req.id
											? {
													border: "5px solid #99ff99",
											  }
											: {};
									return (
										<Card
											className="incoming-req-card"
											style={style}
										>
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
									);
								})}
						</Accordion>
					</div>

					<div className="outgoing-req-container">
						<center>
							<div className="sticky-div">
								<h6 className="req-heading">My Requests</h6>
								<center>
									<Form onChange={handleChange}>
										<FormLabel inline>
											Pending/Accepted
										</FormLabel>
										&nbsp;&nbsp;
										<Form.Check
											inline
											type="switch"
											id="create-post-switch"
											label="Fulfilled"
											onChange={handleChange}
											checked={!requestView}
										/>
									</Form>
								</center>

								{/* <Form.Check
										type="radio"
										label="Pending + Accepted"
										inline
										checked={requestView}
									/>
									<Form.Check
										type="radio"
										label="Fulfilled"
										inline
										checked={!requestView}
									/>
								</Form> */}
							</div>
						</center>
						{requestView ? (
							<div className="pending-req-container">
								<Accordion className="outgoing-req-acc">
									{pendingReq &&
										pendingReq.map((req, index) => {
											var bgcolor = "#FBD589";
											const style =
												highlightedReq == req.id
													? {
															backgroundColor:
																"#99ff99",
															border:
																"5px solid #99ff99",
													  }
													: {
															backgroundColor: bgcolor,
													  };
											if (req.status == "accepted") {
												acceptor =
													users[
														users.findIndex(
															(x) =>
																x.id ==
																req.to_user_id
														)
													];
												// console.log(acceptor);
											}

											return (
												<Card
													className="outgoing-req-card"
													style={style}
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
																<div className="fulfill-button">
																	<OverlayTrigger
																		placement="top"
																		overlay={renderTooltip(
																			"Mark as Fulfilled"
																		)}
																	>
																		<CheckCircleFill
																			onClick={() => {
																				markFulfilled(
																					req
																				);
																			}}
																			style={{
																				color:
																					"black",
																				height:
																					"80%",
																				width:
																					"80%",
																			}}
																		/>
																	</OverlayTrigger>
																</div>
															) : null}
														</p>
														{acceptor ? (
															<p className="req-acceptor">
																<b>
																	{req.status}{" "}
																	by: {}
																</b>
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
																	(
																		image,
																		index
																	) => {
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
						) : (
							<div className="fulfilled-req-container">
								<Accordion className="outgoing-req-acc">
									{fulfilledReq &&
										fulfilledReq.map((req, index) => {
											var bgcolor = "#B5E477";
											const style =
												highlightedReq == req.id
													? {
															backgroundColor:
																"#99ff99",
															border:
																"5px solid #99ff99",
													  }
													: {
															backgroundColor: bgcolor,
													  };
											if (req.status == "fulfilled") {
												acceptor =
													users[
														users.findIndex(
															(x) =>
																x.id ==
																req.to_user_id
														)
													];
												// console.log(acceptor);
											}

											return (
												<Card
													className="outgoing-req-card"
													style={style}
												>
													<Accordion.Toggle
														as={Card.Header}
														variant="link"
														eventKey={index + 1}
													>
														<p className="req-title">
															{req.title}
														</p>
														{acceptor ? (
															<p className="req-acceptor">
																<b>
																	{req.status}{" "}
																	by: {}
																</b>
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
																	(
																		image,
																		index
																	) => {
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
						)}
					</div>
				</div>
				{!openDM && (
					<Chat
						setDMChat={setDMChat}
						setDMUser={setDMUser}
						setOpenDM={setOpenDM}
					/>
				)}
				{openDM && (
					<DirectChat
						user={DMUser}
						chat={DMChat}
						setOpenDM={setOpenDM}
						setDMChat={setDMChat}
						setDMUser={setDMUser}
					/>
				)}
			</div>
		</div>
	);
};

const mapStatetoProps = (state) => {
	return {
		requests: state.firestore.ordered.Request,
		user: state.firebase.auth.uid,
		users: state.firestore.ordered.User,
		highlight: state.notification,
		chats: state.firestore.ordered.Chat,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearNotif: () => dispatch(clearNotif()),
		deleteRequest: (request) => dispatch(deleteRequest(request)),
		requestFulfilledNotif: (request) =>
			dispatch(requestFulfilledNotif(request)),
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
		{ collection: "Chat" },
	])
)(Requests);
