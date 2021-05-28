import { fulfillRequest } from "./requestActions";

export const requestAccepted = (request, acceptor) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const user = getState().firebase.profile.name;
		const title = request.title;
		const data = {
			trigger_event: "request",
			trigger_event_id: request.id,
			from_user_id: acceptor,
			to_user_id: request.from_user_id,
			message: `${user} accepted your request - "${title}"`,
			timestamp: new Date(),
		};
		firestore
			.collection("Notification")
			.add(data)
			.then((ref) => {
				dispatch({ type: "ACCEPT_REQ", notif: data });
			})
			.catch((err) => {
				dispatch({ type: "ACCEPT_REQ_ERROR", err });
			});
	};
};

export const requestFulfilledNotif = (request) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const user = getState().firebase.profile.name;
		const title = request.title;
		firestore
			.collection("Notification")
			.add({
				trigger_event: "request",
				trigger_event_id: request.id,
				from_user_id: request.from_user_id,
				to_user_id: request.to_user_id,
				message: `${user} marked their request as Fulfilled - "${title}"`,
				timestamp: new Date(),
			})
			.then((ref) => {
				dispatch(fulfillRequest(request));
			})
			.catch((err) => {
				dispatch({ type: "FULFILL_NOTIF_ERROR", err });
			});
	};
};

export const requestDeclinedNotif = (request) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const user = getState().firebase.profile.name;
		const title = request.title;
		firestore
			.collection("Notification")
			.add({
				trigger_event: "request",
				trigger_event_id: request.id,
				from_user_id: request.to_user_id,
				to_user_id: request.from_user_id,
				message: `${user} declined your request - "${title}"`,
				timestamp: new Date(),
			})
			.then((ref) => {
				dispatch({ type: "DECLINE_NOTIF", request });
			})
			.catch((err) => {
				dispatch({ type: "DECLINE_NOTIF_ERROR", err });
			});
	};
};

export const requestDeletedNotif = (request) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const user = getState().firebase.profile.name;
		const title = request.title;
		firestore
			.collection("Notification")
			.add({
				trigger_event: "request",
				trigger_event_id: request.id,
				from_user_id: request.from_user_id,
				to_user_id: request.to_user_id,
				message: `${user} deleted their request - "${title}"`,
				timestamp: new Date(),
			})
			.then((ref) => {
				dispatch({ type: "DELETE_NOTIF", request });
			})
			.catch((err) => {
				dispatch({ type: "DELETE_NOTIF_ERROR", err });
			});
	};
};

export const messageSent = (messageInfo, chat) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const user = getState().firebase.auth.uid;
		const userName = getState().firebase.profile.name;
		firestore
			.collection("Notification")
			.add({
				trigger_event: "chat",
				trigger_event_id: chat.id,
				from_user_id: user,
				to_user_id: messageInfo.to_user_id,
				message: `${userName} sent you a message.`,
				timestamp: new Date(),
			})
			.then((ref) => {
				dispatch({ type: "NEW_MESSAGE_NOTIF", ref });
			})
			.catch((err) => {
				dispatch({ type: "NEW_MESSAGE_NOTIF_ERROR", err });
			});
	};
};

export const clickNotif = (notif) => {
	return {
		type: "NOTIF_CLICK",
		notif,
	};
};

export const clearNotif = () => {
	return {
		type: "CLEAR_NOTIF",
	};
};

export const deleteNotif = (notif) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection("Notification")
			.doc(notif.id)
			.delete()
			.then(() => {
				dispatch({ type: "DELETED_NOTIF", notif });
			})
			.catch((err) => {
				dispatch({ type: "DELETED_NOTIF_ERROR", err });
			});
	};
};
