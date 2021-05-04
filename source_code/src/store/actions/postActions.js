import "firebase/firestore";
import "firebase/storage";
import firebase from "../../firebase/firebase.js";

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
							.collection("Post")
							.doc(doc_id)
							.update({ file: URLList });
					});
			}
		);
	}
};

export const createPost = (data, myImages) => {
	return (dispatch, getState, { getFirestore }) => {
		//console.log("Received->", myImages);
		const firestore = getFirestore();
		const uid = getState().firebase.auth.uid;
		const user = getState().firebase.profile.name;
		var ref;
		const URLList = [];

		firestore
			.collection("Post")
			.add({
				...data,
				file: URLList,
				from_user_id: uid,
				timestamp: new Date(),
				user: user,
				title: data.title,
				message: data.message,
			})
			.then((docRef) => {
				ref = docRef.id;
				uploadImages(myImages, ref, firestore);
				//console.log("doc Id ", ref);
				dispatch({ type: "CREATE_POST", data });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_POST_ERROR", err });
			});
	};
};

export const deletePost = (post) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection("Post")
			.doc(post.id)
			.delete()
			.then(() => {
				dispatch({ type: "DELETE_POST", post });
			})
			.catch((err) => {
				dispatch({ type: "DELETE_POST_ERROR", err });
			});
	};
};
