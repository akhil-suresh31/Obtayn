import { reqeustAccepted } from "./notificationActions";

export const createRequest = (request) => {
  return (dispatch, getState, { getFirestore }) => {
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
