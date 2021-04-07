import Homepage from "./components/Homepage/homepage";
import LandingPage from "./components/LandingPage/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={LandingPage} />
				<Route path="/home" component={Homepage} />
			</Switch>
		</Router>
	);
}

export default App;
