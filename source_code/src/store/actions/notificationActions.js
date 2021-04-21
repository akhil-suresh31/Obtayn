import { fulfillRequest } from "./requestActions";

export const requestAccepted = (request, acceptor) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const user = getState().firebase.profile.name;
		const title = request.title;
		firestore
			.collection("Notification")
			.add({
				trigger_event: "request",
				trigger_event_id: request.id,
				from_user_id: acceptor,
				to_user_id: request.from_user_id,
				message: `${user} accepted your request - "${title}"`,
				timestamp: new Date(),
			})
			.then((ref) => {
				dispatch({ type: "ACCEPT_REQ", request });
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
				message: `${user} fulfilled your request - "${title}"`,
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
