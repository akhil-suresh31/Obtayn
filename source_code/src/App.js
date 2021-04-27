import Homepage from "./components/Homepage/homepage";
import LandingPage from "./components/LandingPage/LandingPage";
import Requests from "./components/Requests/requests";
import CreatePost from "./components/Create Post/createPost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={LandingPage} />
				<Route path="/home" component={Homepage} />
				<Route path="/requests" component={Requests} />
				<Route path="/createPost" component={CreatePost} />
			</Switch>
		</Router>
	);
}

export default App;
