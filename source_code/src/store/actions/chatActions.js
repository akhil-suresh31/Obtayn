import { messageSent } from "./notificationActions";

export const addUserChat = (users) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		const chatRef = firestore
			.collection("Chat")
			.where("from", "in", [users.from, users.to]);
		chatRef
			.get()
			.then((doc) => {
				let chat_exists = false;
				doc.docs.forEach((ele) => {
					ele = ele.data();
					if (
						[users.from, users.to].includes(ele.to) &&
						!chat_exists
					) {
						chat_exists = true;
						dispatch({ type: "CHAT_EXISTS", doc: doc.docs });
					}
				});
				if (!chat_exists) {
					firestore
						.collection("Chat")
						.add({
							from: users.from,
							to: users.to,
							timestamp: new Date(),
						})
						.then((ref) => {
							console.log(ref.id);
							dispatch({ type: "ADDED_CHAT", ref });
						})
						.catch((err) => {
							dispatch({ type: "ADDED_CHAT_ERROR", err });
						});
				}
			})
			.catch((err) => {
				dispatch({ type: "ADDED_CHAT_ERROR", err });
			});
	};
};

export const sendChat = (messageInfo, chat) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const user = getState().firebase.auth.uid;

		const chatRef = firestore.collection("Chat").doc(chat.id);
		chatRef
			.update({
				seen: false,
				timestamp: new Date(),
				messages: firestore.FieldValue.arrayUnion({
					message: messageInfo.message,
					from: user,
					timestamp: new Date(),
				}),
			})
			.then(() => {
				dispatch({ type: "CHAT_SENT" });
				dispatch(messageSent(messageInfo, chat));
			})
			.catch((err) => {
				console.log(err.message);
				dispatch({ type: "CHAT_SENT_ERROR", err });
			});
	};
};

export const markAsRead = (chat) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		const chatRef = firestore.collection("Chat").doc(chat.id);
		chatRef
			.update({
				seen: true,
			})
			.then(() => {
				dispatch({ type: "CHAT_READ" });
			})
			.catch((err) => {
				console.log(err.message);
				dispatch({ type: "CHAT_READ_ERROR", err });
			});
	};
};
