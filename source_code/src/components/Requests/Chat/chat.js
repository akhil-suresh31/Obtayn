import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Avatar from "react-avatar";
import { motion } from "framer-motion";
import "./chat.css";
import { Media } from "react-bootstrap";
import { markAsRead } from "../../../store/actions/chatActions";

const Chat = ({
	chatList,
	auth,
	userList,
	setDMChat,
	setDMUser,
	setOpenDM,
	markAsRead,
}) => {
	const openDm = (chat, user) => {
		setDMChat(chat);
		setDMUser(user);
		setOpenDM(true);
	};

	if (chatList && userList && auth) {
		const UserDetails = new Map(
			userList.map((user) => [
				user.id,
				{ name: user.name, dp: user.profile_picture, id: user.id },
			])
		);

		const chatForUser = chatList.filter(
			(chat) => chat.to == auth.uid || chat.from == auth.uid
		);
		chatForUser.sort((a, b) => b.timestamp - a.timestamp);

		return (
			<div className="chat-container">
				<center>
					<h4 className="chat-heading">Recent Messages</h4>

					<div className="chat-List">
						{chatForUser.map((chat) => {
							var user;
							if (chat.to == auth.uid) user = chat.from;
							else user = chat.to;
							user = UserDetails.get(user);
							return (
								<div className="chat-user">
									<Media
										onClick={() => {
											if (
												!chat.seen &&
												chat.messages &&
												chat.messages[
													chat.messages.length - 1
												].from == user.id
											)
												markAsRead(chat);
											openDm(chat, user);
										}}
									>
										<Avatar
											size="55"
											src={user && user.dp}
											round={true}
											className="mt-1 ml-1"
											name={user && user.name}
										/>
										<Media.Body>
											<div className="d-flex w-100 align-tems-start mt-1">
												<h5 className="ml-4">
													{user && user.name}
												</h5>
											</div>

											<div className="d-flex ml-4 mb-1">
												{chat.messages ? (
													chat.seen == false &&
													chat.messages[
														chat.messages.length - 1
													].from ==
														(user && user.id) ? (
														<p className="last-message unread">
															{
																chat.messages[
																	chat
																		.messages
																		.length -
																		1
																].message
															}
														</p>
													) : (
														<p className="last-message">
															{
																chat.messages[
																	chat
																		.messages
																		.length -
																		1
																].message
															}
														</p>
													)
												) : (
													<p className="last-message unread">
														Well whatcha waiting for
														say hi!
													</p>
												)}
												<p className="chat-List-time ">
													{chat.timestamp
														.toDate()
														.toLocaleTimeString(
															"en-US",
															{
																weekday:
																	"short",
																day: "numeric",
																month:
																	"numeric",
																hour: "2-digit",
																minute:
																	"2-digit",
															}
														)}
												</p>
											</div>
										</Media.Body>
									</Media>
								</div>
							);
						})}
					</div>
				</center>
			</div>
		);
	} else {
		return (
			<div className="chat-container">
				<center>
					<h4 className="chat-heading">Recent Messages</h4>
					<div style={{ color: "white" }}>Loading</div>
				</center>
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		markAsRead: (chat) => dispatch(markAsRead(chat)),
	};
};

const mapStatetoProps = (state) => {
	return {
		chatList: state.firestore.ordered.Chat,
		userList: state.firestore.ordered.User,
		auth: state.firebase.auth,
	};
};

export default compose(
	connect(mapStatetoProps, mapDispatchToProps),
	firestoreConnect([
		{
			collection: "Chat",
			orderBy: ["timestamp"],
		},
		{ collection: "User" },
	])
)(Chat);
