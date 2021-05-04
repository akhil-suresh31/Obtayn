import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Avatar from "react-avatar";
import "./chat.css";
import { Media, Spinner } from "react-bootstrap";
import { markAsRead } from "../../../store/actions/chatActions";
import { Image } from "react-bootstrap-icons";

/**
 *
 * @param {object} chat - contains details like from/to user time of last sent message
 *
 * @param {object} user -has user details like profile pic, name
 * @param {function} openDm -function to switch from chat list to direct chat
 * @param {function} markAsRead -function to set the seen status as true
 * @param {int} key -key for each element rendered using the map
 * @returns jsx of Media(from bootstrap) containing the user name , profile_pic, and last mesage
 */
const userChat = (chat, user, openDm, markAsRead, key) => {
	let lastMsg;
	var style;
	if (!chat.messages || chat.messages.length === 0) {
		lastMsg = "Well whatcha waiting for say hi!";
		style = "unread";
	}
	if (chat.messages && chat.messages[chat.messages.length - 1].message) {
		lastMsg = chat.messages[chat.messages.length - 1].images.length ? (
			<div>
				<Image style={{ marginRight: "4px" }} />
				{chat.messages[chat.messages.length - 1].message}
			</div>
		) : (
			chat.messages[chat.messages.length - 1].message
		);
		style =
			chat.messages[chat.messages.length - 1].from === user?.id
				? "unread"
				: "";
	}
	if (chat.messages && !chat.messages[chat.messages.length - 1].message) {
		lastMsg = (
			<div style={{ fontStyle: "italic" }}>
				<Image /> Photo
			</div>
		);
		style =
			chat.messages[chat.messages.length - 1].from === user?.uid
				? "unread"
				: "";
	}
	if (chat.seen) style = "";
	return (
		<div className="chat-user" key={key}>
			<Media
				style={{ cursor: "pointer" }}
				onClick={() => {
					if (
						!chat.seen &&
						chat.messages &&
						chat.messages[chat.messages.length - 1].from === user.id
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
						<h5 className="ml-4">{user && user.name}</h5>
					</div>
					<div className="d-flex ml-4 mr-2">
						<p className={`mb-0 last-message ${style}`}>
							{lastMsg}
						</p>
					</div>
					<div className="mr-2 mb-1">
						<p className="chat-List-time ">
							{chat.timestamp
								.toDate()
								.toLocaleTimeString("en-US", {
									weekday: "short",
									day: "numeric",
									month: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
						</p>
					</div>
				</Media.Body>
			</Media>
		</div>
	);
};

const Chat = ({
	chatList,
	auth,
	userList,
	setDMChat,
	setDMUser,
	setOpenDM,
	markAsRead,
}) => {
	/**function to open chat, set the user for the direct chat and the chat object */
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
		/**filters chat only for the user */
		const chatForUser = chatList.filter(
			(chat) => chat.to === auth.uid || chat.from === auth.uid
		);
		chatForUser.sort((a, b) => b.timestamp - a.timestamp);

		return (
			<div className="chat-container">
				<center>
					<h4 className="chat-heading">Recent Messages</h4>

					<div className="chat-List">
						{chatForUser.map((chat, i) => {
							var user;
							if (chat.to === auth.uid) user = chat.from;
							else user = chat.to;
							user = UserDetails.get(user);
							return userChat(chat, user, openDm, markAsRead, i);
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
					<Spinner
						animation="border"
						variant="light"
						className="mt-4"
					/>
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
