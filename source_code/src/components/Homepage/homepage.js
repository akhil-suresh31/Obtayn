import React, { useState } from "react";
import NavBar from "./Navbar/navbar";
import Feed from "./Feed/feed";
import Activity from "./Activity/activity";
import ScrollToTop from "./scrollToTop";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import SearchBar from "./searchBar";
import "./homepage.css";
import PostFilter from "./postFilter";
import { Redirect } from "react-router";

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
	if (auth.uid)
		return (
			<div>
				<NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

				<div className="homepage-body">
					<Activity menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

					<div className="homepage-sticky">
						<center>
							<SearchBar
								setData={setData}
								setSearchButton={setSearchButton}
							/>
						</center>
						<PostFilter setFilter={setFilter} filter={filter} />
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
							<ScrollToTop
								scrollToTop={scrollToTop}
								scrollUp={scrollUp}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	else
		return (
			<Redirect to="/" />
			// <div className="homepage-body">
			// 	<center className="mt-3">
			// 		<Spinner animation="border" variant="light" />
			// 	</center>
			// </div>
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
