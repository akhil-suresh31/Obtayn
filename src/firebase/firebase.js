import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyD1V0foEiKi-bS6VA-c93Flmk2RwAp4pgs",
	authDomain: "obtayn-rd2931.firebaseapp.com",
	projectId: "obtayn-rd2931",
	storageBucket: "obtayn-rd2931.appspot.com",
	messagingSenderId: "357831469103",
	appId: "1:357831469103:web:4f45d7be8be886db447eda",
};
const app = firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
export const auth = app.auth();
export default app;