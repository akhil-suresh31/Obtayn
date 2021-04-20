import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Avatar from "react-avatar";
import { motion } from "framer-motion";
import "./chat.css";
import { Col, Media, Row } from "react-bootstrap";

const Chat = ({
	chatList,
	auth,
	userList,
	setDMChat,
	setDMUser,
	setOpenDM,
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
												<h4 className="ml-4">
													{user && user.name}
												</h4>
											</div>
											<div className="d-flex ml-4 mb-2">
												{chat.message ? (
													<>{"some message"}</>
												) : (
													<>
														Well whatcha waiting for
														say hi!
													</>
												)}
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

const mapStatetoProps = (state) => {
	return {
		chatList: state.firestore.ordered.Chat,
		userList: state.firestore.ordered.User,
		auth: state.firebase.auth,
	};
};

export default compose(
	connect(mapStatetoProps),
	firestoreConnect([
		{
			collection: "Chat",
			orderBy: ["timestamp"],
		},
		{ collection: "User" },
	])
)(Chat);
