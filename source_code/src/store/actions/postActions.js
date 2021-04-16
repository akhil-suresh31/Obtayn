import "firebase/firestore";
import "firebase/storage";
import firebase from "../../firebase/firebase.js";

export const createPost = (data, images) => {
  console.log("Files->", images);
  const storage = firebase.storage();
  const URLList = [];
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const user = getState().firebase.profile.name;
    var ref;

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
        console.log(ref);
        dispatch({ type: "CREATE_POST", data });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_POST_ERROR", err });
      });

    for (let i = 0; i < images.length; i++) {
      //images.forEach((img) => {
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
