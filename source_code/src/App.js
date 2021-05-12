import { lazy, Suspense } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

const Homepage = lazy(() => import("./components/Homepage/homepage"));
const LandingPage = lazy(() => import("./components/LandingPage/LandingPage"));
const Requests = lazy(() => import("./components/Requests/requests"));
const CreatePost = lazy(() => import("./components/Create Post/createPost"));
const ErrorPage = lazy(() => import("./components/errorPage"));

function PrivateRoute({ children, ...rest }) {
	const auth = useSelector((state) => state.firebase.auth);
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return isLoaded(auth) ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
}

function App() {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path="/" exact component={LandingPage} />
					<PrivateRoute path="/home">
						<Homepage />
					</PrivateRoute>
					{/* <Route path="/home" component={Homepage} /> */}
					<PrivateRoute path="/requests">
						<Requests />
					</PrivateRoute>
					{/* <Route path="/requests" component={Requests} /> */}
					<PrivateRoute path="/createPost">
						<CreatePost />
					</PrivateRoute>
					{/* <Route path="/createPost" component={CreatePost} /> */}
					{/* <PrivateRoute path="/home"></PrivateRoute> */}
					<Route path="/404" component={ErrorPage} />
					<Redirect to="/404" />
				</Switch>
			</Suspense>
		</Router>
	);
}

export default App;
