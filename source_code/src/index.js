import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import thunk from "redux-thunk";
import {
	getFirestore,
	reduxFirestore,
	createFirestoreInstance,
} from "redux-firestore";
import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "./firebase/firebase";

const rrfConfig = {
	userProfile: "User",
	useFirestoreForProfile: true,
};

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		reduxFirestore(firebase)
		// window.__REDUX_DEVTOOLS_EXTENSION__ &&
		// 	window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
};

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById("root")
);
