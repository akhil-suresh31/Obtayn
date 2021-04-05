import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyBdW8Jml_3biCK9dzpNydIl_64yH5eh2I4",
    authDomain: "auth-trial-206b6.firebaseapp.com",
    projectId: "auth-trial-206b6",
    storageBucket: "auth-trial-206b6.appspot.com",
    messagingSenderId: "1066855813620",
    appId: "1:1066855813620:web:b7e0883e73789e6cf4a9a1"
  };
const app = firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
export const auth = app.auth();
export default app;