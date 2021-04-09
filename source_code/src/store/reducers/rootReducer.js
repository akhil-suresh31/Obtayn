import { combineReducers } from "redux";
import authReducer from "./authReducer";
import requestReducer from "./requestReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
	auth: authReducer,
	request: requestReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
});

export default rootReducer;
