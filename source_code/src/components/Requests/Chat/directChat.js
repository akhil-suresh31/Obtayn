import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Avatar from "react-avatar";
import "./chat.css";
import { Button, Form, Spinner } from "react-bootstrap";
import { ArrowLeft, Cursor, CursorFill, Image } from "react-bootstrap-icons";
import { sendChat } from "../../../store/actions/chatActions";

const DirectChat = ({
	chat,
	auth,
	user,
	setOpenDM,
	activeChat,
	sendChat,
	setDMChat,
	setDMUser,
}) => {
	const [message, setMessage] = useState();
	const lastMessage = useRef();
	const sendMessage = () => {
		console.log(message);
		const messageInfo = {
			message: message,
			to_user_id: user.id,
		};
		if (message) sendChat(messageInfo, chat);
		setMessage("");
	};

	const goBack = () => {
		setDMChat(null);
		setDMUser(null);
		setOpenDM(false);
	};

	useEffect(() => {
		lastMessage.current.scrollIntoView({ behavior: "smooth" });
	}, [activeChat[0].messages]);

	if (chat && user && auth) {
		return (
			<div className="chat-container d-flex flex-column">
				<div className="DM-heading d-flex justify-content-between align-items-center">
					<ArrowLeft
						className="chat-input-icon mt-1 ml-1 align-self-start"
						onClick={goBack}
					/>
					<center>
						<Avatar
							className="DM-avatar"
							size="65"
							src={
								user && user.dp ? user.dp : user.profile_picture
							}
							round={true}
							name={user && user.name}
						/>
						<h4 className="DM-userName">{user.name}</h4>
					</center>
					<div vissible={false}> </div>
				</div>

				<div className="chat-List-DM d-flex align-items-start flex-column">
					<div className="messages mb-auto w-100">
						{activeChat[0].messages &&
							activeChat[0].messages.map((msg) => {
								const messageClass =
									msg.from == user.id ? "received" : "sent";

								return (
									<div
										className={`message ${messageClass} align-items-center`}
									>
										<p>
											{msg.message}{" "}
											<div className="chat-time">
												{msg.timestamp
													.toDate()
													.toLocaleTimeString(
														"en-US",
														{
															weekday: "short",
															day: "numeric",
															month: "numeric",
															hour: "2-digit",
															minute: "2-digit",
														}
													)}
											</div>
										</p>
									</div>
								);
							})}
						<div ref={lastMessage} />
					</div>

					<div className="chat-input">
						<div className="d-flex justify-content-around align-items-center">
							<Image className="chat-input-icon" />
							<Form
								onSubmit={(e) => {
									e.preventDefault();
									sendMessage();
								}}
								name="message-form"
							>
								<Form.Control
									name="message"
									type="text"
									placeholder={
										user && `Messasge ${user.name}`
									}
									value={message}
									onChange={(e) => {
										setMessage(e.target.value);
									}}
								/>
							</Form>
							{message ? (
								<CursorFill
									type="submit"
									className="chat-input-icon"
									onClick={sendMessage}
								/>
							) : (
								<Cursor
									type="submit"
									className="chat-input-icon"
									onClick={sendMessage}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="chat-container">
				<Spinner animation="border" variant="light" />;
			</div>
		);
	}
};

const mapStatetoProps = (state) => {
	return {
		auth: state.firebase.auth,
		activeChat: state.firestore.ordered.Chat,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendChat: (messageInfo, chat) => dispatch(sendChat(messageInfo, chat)),
	};
};

export default compose(
	connect(mapStatetoProps, mapDispatchToProps),
	firestoreConnect((props) => [
		{ collection: "User" },
		{
			collection: "Chat",
			doc: props.chat.id,
		},
	])
)(DirectChat);
