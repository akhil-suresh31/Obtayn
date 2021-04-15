export const reqeustAccepted = (request, acceptor) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = getState().firebase.profile.name;
    firestore
      .collection("Notification")
      .add({
        trigger_event: "request",
        trigger_event_id: request.id,
        from_user_id: acceptor,
        to_user_id: request.from_user_id,
        message: `${user} accepted ypur request`,
        timestamp: new Date(),
      })
      .then((ref) => {
        dispatch({ type: "ACCEPT_REQ", ref });
      })
      .catch((err) => {
        dispatch({ type: "ACCEPT_REQ_ERROR", err });
      });
  };
};
