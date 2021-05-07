import Homepage from "./components/Homepage/homepage";
import LandingPage from "./components/LandingPage/LandingPage";
import Requests from "./components/Requests/requests";
import CreatePost from "./components/Create Post/createPost";
import ErrorPage from "./components/errorPage";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={LandingPage} />
				<Route path="/home" component={Homepage} />
				<Route path="/requests" component={Requests} />
				<Route path="/createPost" component={CreatePost} />
				<Route path="/404" component={ErrorPage} />
				<Redirect to="/404" />
			</Switch>
		</Router>
	);
}

export default App;
