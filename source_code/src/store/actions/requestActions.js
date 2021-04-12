export const createRequest = (request) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const uid = getState().firebase.auth.uid;
		const user = getState().firebase.profile.name;
		const avatar = getState().firebase.profile.profile_picture;
		firestore
			.collection("Request")
			.add({
				...request,
				from_user_id: uid,
				to_user_id: null,
				timestamp: new Date(),
				status: "not_accepted",
				avatar: avatar,
				user: user,
			})
			.then(() => {
				dispatch({ type: "CREATE_REQUEST", request });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_REQUEST_ERROR", err });
			});
	};
};
