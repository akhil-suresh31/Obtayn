export const addUserChat = (users) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const chatRef = firestore
      .collection("Chat")
      .where("from", "==", users.from)
      .where("to", "==", users.to);
    chatRef
      .get()
      .then((doc) => {
        console.log("length :", doc.docs.length);
        if (doc.docs.length) {
          dispatch({ type: "CHAT_EXISTS", doc: doc.docs });
        } else {
          firestore
            .collection("Chat")
            .add({
              from: users.from,
              to: users.to,
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
