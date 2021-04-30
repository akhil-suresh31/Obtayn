import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Avatar from "react-avatar";
import "./chat.css";
import { Form, Spinner, Button } from "react-bootstrap";
import { ArrowLeft, Cursor, CursorFill, Image } from "react-bootstrap-icons";
import { sendChat } from "../../../store/actions/chatActions";

var myImages = [];

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
	const [error, setError] = useState(null);
	const lastMessage = useRef();
	const sendMessage = () => {
		setError("");
		console.log(message);
		const messageInfo = {
			message: message,
			to_user_id: user.id,
			images: myImages,
		};
		if (message || myImages.length) sendChat(messageInfo, chat);
		setMessage("");
		myImages = [];
	};

	const handleChange = (e) => {
		e.preventDefault();
		var files = e.target.files;
		console.log("Target files ->", files);
		var i;
		if (files.length > 3) setError("Cannot upload more than 3 images.");
		else setError(null);
		if (files.length > 0) {
			for (i = 0; i < files.length; i++) {
				if (["image/png", "image/jpeg"].includes(files[i].type)) {
					myImages.push(files[i]);

					setError("");
					//setImages(myImages);
				} else setError("Please select an image file (png or jpg)");
			}
		}
		console.log("temp->", myImages);
	};
	const goBack = () => {
		setDMChat(null);
		setDMUser(null);
		setOpenDM(false);
	};

	useEffect(() => {
		lastMessage.current.scrollIntoView({ behavior: "smooth" });
	}, [activeChat[0]]);

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
							// size="65"
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
											{msg.images &&
												msg.images.map((image) => (
													<img
														src={image}
														style={{
															width: "80%",
															aspectRatio: "auto",
															padding: "3px",
															borderRadius: "5%",
														}}
													></img>
												))}
											{(() => {
												if (
													msg.images &&
													msg.images.length
												)
													return <br></br>;
											})()}
											{msg.message}
											<div
												className="chat-time"
												style={{
													textAlign:
														messageClass == "sent"
															? "right"
															: "left",
												}}
											>
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
						{error && <div className="error">{error}</div>}
						{myImages && myImages.length == 0 ? null : (
							<div className="file-names">
								{myImages.map((image) => image.name)}
								<Button
									variant="danger"
									onClick={() => {
										myImages = [];
									}}
								>
									cancel
								</Button>
							</div>
						)}
						<div className="d-flex align-items-center ml-1 mr-1">
							<label
								for="file-input"
								style={{ cursor: "pointer" }}
							>
								<Image className="chat-input-icon" />
							</label>
							<input
								style={{ display: "none" }}
								type="file"
								id="file-input"
								className="position-relative"
								name="file"
								onChange={handleChange}
								multiple
							/>

							<Form
								className="flex-grow-1 mr-1 ml-1"
								onSubmit={(e) => {
									e.preventDefault();
									sendMessage();
								}}
								name="message-form"
							>
								<Form.Control
									style={{ minWidth: 0 }}
									name="message"
									type="text"
									autoComplete="off"
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
						{error && <div className="error">{error}</div>}
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
