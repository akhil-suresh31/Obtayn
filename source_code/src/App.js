import Homepage from "./components/Homepage/homepage";
import LandingPage from "./components/LandingPage/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
	return (
		<Router>
			<Provider store={store}>
				<Switch>
					<Route path="/" exact component={LandingPage} />
					<Route path="/home" component={Homepage} />
				</Switch>
			</Provider>
		</Router>
	);
}

export default App;
