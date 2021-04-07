import React from "react";
import NavBar from "./Navbar/navbar";
import Feed from "./Feed/feed";
import Activity from "./Activity/activity";
import ScrollToTop from "./scrollToTop";
import CreatePostDiv from "./Create-Post/createPostDiv";
import "./homepage.css";

const Homepage = () => {
	return (
		<div>
			<NavBar />
			<div className="homepage-body">
				<div className="homepage-feed">
					<center>
						<CreatePostDiv />
					</center>
					<Feed />
					<div className="scroll">
						<ScrollToTop />
					</div>
				</div>
				<Activity />
			</div>
		</div>
	);
};
export default Homepage;
