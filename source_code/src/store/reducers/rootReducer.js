import { combineReducers } from "redux";
import authReducer from "./authReducer";
import requestReducer from "./requestReducer";
import postReducer from "./postReducer";
import chatReducer from "./chatReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  request: requestReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  notification: notificationReducer,
  post: postReducer,
  chat: chatReducer,
});

export default rootReducer;
