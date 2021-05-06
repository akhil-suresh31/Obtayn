import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Avatar from "react-avatar";
import "./chat.css";
import { Form, Spinner, Button } from "react-bootstrap";
import { ArrowLeft, Cursor, CursorFill, Image, X } from "react-bootstrap-icons";
import { markAsRead, sendChat } from "../../../store/actions/chatActions";

const DirectChat = ({
	chat,
	auth,
	user,
	setOpenDM,
	activeChat,
	sendChat,
	setDMChat,
	setDMUser,
	markAsRead,
}) => {
	const [message, setMessage] = useState(); //state storing the message in input box
	const [error, setError] = useState(null); //Error state when image is not of the defined type/has more images than 3
	const [images, setImages] = useState([]); //Array of images selected by the user
	const messagesRef = useRef(null); //refrence to message container to capture when the scrol size changes
	const lastMessage = useRef(); //reference to the end of the chat to scroll into view
	/**
	 * function to send message containing the message/image
	 */
	const sendMessage = () => {
		setError("");
		// console.log(message);
		const messageInfo = {
			message: message,
			to_user_id: user.id,
			images: images,
		};
		if (message || images.length) sendChat(messageInfo, chat);
		setMessage("");
		setImages([]);
	};

	/**function to handle file upload */
	const handleChange = (e) => {
		e.preventDefault();
		var files = e.target.files;
		console.log("Target files ->", files);
		const myImages = [];
		if (images.length + files.length > 3) {
			setError("Cannot upload more than 3 images.");
			return;
		} else setError(null);
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				if (["image/png", "image/jpeg"].includes(files[i].type)) {
					myImages.push(files[i]);

					setError("");
				} else {
					setError("Please select an image file (png or jpg)");
					return;
				}
			}
		}
		console.log("temp->", myImages);
		setImages([...images, ...myImages]);
		console.log("images => ", images);
	};

	/**function to clear the user and chat,nd go back to chatlist */
	const goBack = () => {
		setDMChat(null);
		setDMUser(null);
		setOpenDM(false);
	};

	useEffect(() => {
		lastMessage.current.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		// lastMessage.current.scrollIntoView({ behavior: "smooth" });
		if (
			activeChat[0] &&
			activeChat[0].messages &&
			activeChat[0].messages[activeChat[0].messages.length - 1].from ===
				user.id
		)
			markAsRead(chat);
	}, [activeChat[0]]);

	/**check when the scroll lengh is increased to scroll to the bottom */
	useEffect(() => {
		lastMessage.current.scrollIntoView({ behavior: "smooth" });
	}, [messagesRef?.current?.scrollHeight]);

	/**
	 * function to remove the image from the list when user presses "X"
	 */
	const removeImage = (img) => {
		var array = Array.from(images);
		var index = array.indexOf(img);
		if (index !== -1) {
			array.splice(index, 1);
			setImages(array);
		}
	};

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
					<div visible="false"> </div>
				</div>

				<div className="chat-List-DM d-flex align-items-start flex-column">
					<div ref={messagesRef} className="messages mb-auto w-100">
						{activeChat[0].messages &&
							activeChat[0].messages.map((msg) => {
								const messageClass =
									msg.from === user.id ? "received" : "sent";

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
														alt=""
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
														messageClass === "sent"
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
					{!activeChat[0].messages && (
						<div
							className="empty-message justify-content-center align-items-end mb-5"
							style={{
								backgroundImage: "url(/images/emptychat.jpg)",
							}}
						>
							Type your first message!
						</div>
					)}
					<div className="chat-input">
						{images && images.length === 0 ? null : (
							<div className="selected-files mb-2 align-items-center">
								{images.map((image) => (
									<div
										style={{
											position: "relative",
											borderRadius: "5px",
											width: "70px",
											height: "70px",
											margin: "0 5px",
											backgroundImage: `url(${URL.createObjectURL(
												image
											)})`,
											backgroundSize: "cover",
										}}
									>
										<X
											size={25}
											style={{
												position: "absolute",
												right: 0,
												top: "1px",
												backgroundColor: "#0000007c",
												borderRadius: "12px",
												cursor: "pointer",
											}}
											color={"white"}
											onClick={() => removeImage(image)}
										/>
									</div>
								))}
								<Button
									variant="danger"
									onClick={() => {
										console.log(images);
										setImages([]);
									}}
									style={{
										height: "min-content",
										marginLeft: "auto",
										marginRight: "5px",
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
									autoFocus
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
						{error && (
							<div
								className="ml-2 mr-2 d-flex"
								style={{ color: "salmon" }}
							>
								{error}
								<X
									size={25}
									style={{
										backgroundColor: "#0000007c",
										borderRadius: "12px",
										cursor: "pointer",
										marginLeft: "auto",
									}}
									color={"white"}
									onClick={() => setError(null)}
								/>
							</div>
						)}
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
		markAsRead: (chat) => dispatch(markAsRead(chat)),
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
