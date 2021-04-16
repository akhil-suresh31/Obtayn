export const login = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.pass)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const logOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT_ERROR", err });
      });
  };
};

export const signUp = (userInfo) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(userInfo.email, userInfo.pass)
      .then((userCred) => {
        const user = userCred.user;
        user.sendEmailVerification();
        return firestore.collection("User").doc(user.uid).set({
          name: userInfo.name,
          profile_picture:
            "https://firebasestorage.googleapis.com/v0/b/obtayn-rd2931.appspot.com/o/Default-profile-pic.png?alt=media&token=540e79e2-661c-4f5f-a9d4-e7a8b6cffc01",
          phone_number: userInfo.phoneNo,
          email: user.email,
        });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const continueWithGoogle = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((userCred) => {
        const user = userCred.user;
        if (firestore.collection("User").doc(user.uid)) return;
        else {
          return firestore
            .collection("User")
            .doc(user.uid)
            .set({
              name: user.displayName,
              profile_picture: user.photoURL
                ? user.photoURL
                : "https://firebasestorage.googleapis.com/v0/b/obtayn-rd2931.appspot.com/o/Default-profile-pic.png?alt=media&token=540e79e2-661c-4f5f-a9d4-e7a8b6cffc01",
              phone_number: "",
              email: user.email,
            });
        }
      })
      .then(() => {
        dispatch({ type: "GOOGLE_AUTH_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "GOOGLE_AUTH_ERROR", err });
      });
  };
};
