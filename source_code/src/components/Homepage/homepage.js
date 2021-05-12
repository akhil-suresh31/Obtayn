import { useState, Suspense, lazy } from "react";
import { Redirect } from "react-router";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import "./homepage.css";
import NavBar from "./Navbar/navbar";
import Feed from "./Feed/feed";
import SearchBar from "./searchBar";
import PostFilter from "./postFilter";

const ScrollToTop = lazy(() => import("./scrollToTop"));
const Activity = lazy(() => import("./Activity/activity"));

const Homepage = ({ users, auth }) => {
	var initialSearchData = { category: null, keywords: null, location: null };
	const [scrollToTop, setscrollToTop] = useState(false);
	const [filter, setFilter] = useState({ post: false, request: false });
	const [menuOpen, setMenuOpen] = useState(false);
	const [data, setData] = useState(initialSearchData);
	const [searchButton, setSearchButton] = useState(false); //search button in SearchBar component

	function checkScrollPos(val) {
		if (val > 200 && !scrollToTop) setscrollToTop(true);
		if (val <= 200 && scrollToTop) setscrollToTop(false);
	}

	function scrollUp() {
		document.getElementsByClassName("homepage-feed")[0].scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	if (!auth.uid) return <Redirect to="/" />;

	return (
		<div>
			<NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

			<div className="homepage-body">
				<Suspense fallback={<div>Loading...</div>}>
					<Activity menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
				</Suspense>
				<div className="homepage-sticky">
					<center>
						<SearchBar
							setData={setData}
							setSearchButton={setSearchButton}
						/>

						<PostFilter setFilter={setFilter} filter={filter} />
					</center>
				</div>
				<div
					className="homepage-feed"
					onScroll={(val) => checkScrollPos(val.target.scrollTop)}
				>
					<Feed
						users={users}
						filter={filter}
						searchData={data}
						searchButton={searchButton}
						setSearchButton={setSearchButton}
					/>
					<div className="scroll">
						<Suspense fallback={<div>Loading...</div>}>
							<ScrollToTop
								scrollToTop={scrollToTop}
								scrollUp={scrollUp}
							/>
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStatetoProps = (state) => {
	return {
		users: state.firestore.ordered.User,
		auth: state.firebase.auth,
	};
};

export default compose(
	connect(mapStatetoProps),
	firestoreConnect([{ collection: "User" }])
)(Homepage);
