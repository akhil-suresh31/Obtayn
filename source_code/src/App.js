import Homepage from "./components/Homepage/homepage";
import LandingPage from "./components/LandingPage/LandingPage";
import Requests from "./components/Requests/requests";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={LandingPage} />
				<Route path="/home" component={Homepage} />
				<Route path="/requests" component={Requests} />
			</Switch>
		</Router>
	);
}

export default App;
