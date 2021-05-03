import "firebase/firestore";
import "firebase/storage";
import firebase from "../../firebase/firebase.js";
import { addUserChat } from "./chatActions.js";
import { requestAccepted, requestDeletedNotif } from "./notificationActions";

const uploadImages = (myImages, doc_id, firestore) => {
	const storage = firebase.storage();
	const URLList = [];
	for (let i = 0; i < myImages.length; i++) {
		const uploadTask = storage
			.ref(`/feedImages/${doc_id}-${i}`)
			.put(myImages[i]);
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
			},
			() => {
				storage
					.ref("feedImages")
					.child(`${doc_id}-${i}`)
					.getDownloadURL()
					.then((url) => {
						console.log("supposed to be named :", `${doc_id}-${i}`);
						URLList.push(url);
						firestore
							.collection("Request")
							.doc(doc_id)
							.update({ file: URLList });
					});
			}
		);
	}
};

export const createRequest = (request, myImages) => {
	return (dispatch, getState, { getFirestore }) => {
		console.log("Received->", myImages);
		const firestore = getFirestore();
		const uid = getState().firebase.auth.uid;
		const user = getState().firebase.profile.name;
		var ref;
		const URLList = [];

		firestore
			.collection("Request")
			.add({
				...request,
				file: URLList,
				from_user_id: uid,
				to_user_id: null,
				timestamp: new Date(),
				status: "pending",
				user: user,
			})
			.then((docRef) => {
				ref = docRef.id;
				uploadImages(myImages, ref, firestore);
				console.log("doc Id ", ref);
				dispatch({ type: "CREATE_REQUEST", request });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_REQUEST_ERROR", err });
			});
	};
};

export const acceptRequest = (request) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const ref = firestore.collection("Request").doc(request.id);
		const uid = getState().firebase.auth.uid;
		ref.update({
			to_user_id: uid,
			status: "accepted",
		})
			.then(() => {
				dispatch(requestAccepted(request, uid));
				const users = { from: request.from_user_id, to: uid };
				dispatch(addUserChat(users));
			})
			.catch((err) => {
				dispatch({ type: "ACCEPT_REQUEST_ERROR", err });
			});
	};
};

export const deleteRequest = (request) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		if (request.file) {
			const storage = firebase.storage();
			for (let i = 0; i < request.file.length; i++) {
				storage
					.refFromURL(request.file[i])
					.delete()
					.then(console.log("Deleted"))
					.catch((err) => {
						console.log(err);
					});
			}
		}

		firestore
			.collection("Request")
			.doc(request.id)
			.delete()
			.then(() => {
				if (request.status == "accepted")
					dispatch(requestDeletedNotif(request));
				else if (request.status == "pending")
					dispatch({ type: "DELETE_REQUEST", request });
			})
			.catch((err) => {
				dispatch({ type: "DELETE_REQUEST_ERROR", err });
			});
	};
};

export const fulfillRequest = (request) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const ref = firestore.collection("Request").doc(request.id);
		// const uid = getState().firebase.auth.uid;
		ref.update({
			status: "fulfilled",
		})
			.then(() => {
				dispatch({ type: "REQUEST_FULFILLED" });
			})
			.catch((err) => {
				dispatch({ type: "REQUEST_FULFILL_ERROR", err });
			});
	};
};
