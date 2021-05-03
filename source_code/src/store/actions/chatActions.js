import { messageSent } from "./notificationActions";
import firebase from "../../firebase/firebase.js";
import { format } from "date-fns";

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

const uploadTaskPromise = async (image, chat) => {
	return new Promise((resolve, reject) => {
		const storage = firebase.storage();
		const time = format(new Date(), "yyyyMMdd-HH-mm-ss-SSS");
		const uploadTask = storage
			.ref(`/chatImages/${chat.id}/IMG-${time}-${image.name}`)
			.put(image);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				if (snapshot.state === firebase.storage.TaskState.RUNNING) {
					console.log(`Progress: ${progress}%`);
				}
			},
			(error) => {
				console.log(error);
				reject();
			},
			() => {
				storage
					.ref(`chatImages/${chat.id}`)
					.child(`IMG-${time}-${image.name}`)
					.getDownloadURL()
					.then((url) => {
						resolve(url);
					});
			}
		);
	});
};

export const sendChat = (messageInfo, chat) => {
	return async (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const user = getState().firebase.auth.uid;
		const message = messageInfo.message ? messageInfo.message : "";
		const chatRef = firestore.collection("Chat").doc(chat.id);
		const images = messageInfo.images;
		// console.log(images);
		var imagesUrl = [];
		for (let i = 0; i < images.length; i++) {
			let url = await uploadTaskPromise(images[i], chat);
			imagesUrl.push(url);
		}

		// console.log(imagesUrl);
		chatRef
			.update({
				seen: false,
				timestamp: new Date(),
				messages: firestore.FieldValue.arrayUnion({
					message: message,
					from: user,
					images: imagesUrl,
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
