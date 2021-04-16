import "firebase/firestore";
import "firebase/storage";
import firebase from "../../firebase/firebase.js";

import { reqeustAccepted } from "./notificationActions";

export const createRequest = (request, images) => {
  const storage = firebase.storage();
  const URLList = [];
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const user = getState().firebase.profile.name;
    var ref;

    firestore
      .collection("Request")
      .add({
        ...request,
        file: URLList,
        from_user_id: uid,
        to_user_id: null,
        timestamp: new Date(),
        status: "not_accepted",
        user: user,
      })
      .then((docRef) => {
        ref = docRef.id;
        dispatch({ type: "CREATE_REQUEST", request });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_REQUEST_ERROR", err });
      });

    for (let i = 0; i < images.length; i++) {
      const uploadTask = storage
        .ref(`/feedImages/${images[i].name}`)
        .put(images[i]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            console.log(`Progress: ${progress}%`);
          }
        },
        console.error,
        () => {
          storage
            .ref("feedImages")
            .child(images[i].name)
            .getDownloadURL()
            .then((url) => {
              URLList.push(url);
              firestore.collection("Post").doc(ref).update({ file: URLList });
              console.log(url);
            });
        }
      );
    }
  };
};

export const acceptRequest = (request) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const ref = firestore.collection("Request").doc(request.id);
    const uid = getState().firebase.auth.uid;
    ref
      .update({
        to_user_id: uid,
        status: "accepted",
      })
      .then(() => {
        dispatch(reqeustAccepted(request, uid));
      })
      .catch((err) => {
        dispatch({ type: "ACCEPT_REQUEST_ERROR", err });
      });
  };
};

export const deleteReqeust = (request) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("Request")
      .doc(request.id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_REQUEST", request });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_REQUEST_ERROR", err });
      });
  };
};
