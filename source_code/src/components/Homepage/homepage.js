import React, { useState } from "react";
import NavBar from "./Navbar/navbar";
import Feed from "./Feed/feed";
import Activity from "./Activity/activity";
import ScrollToTop from "./scrollToTop";
import CreatePostDiv from "./Create-Post/createPostDiv";
import "./homepage.css";
import PostFilter from "./Create-Post/postFilter";

const Homepage = () => {
	const [scrollToTop, setscrollToTop] = useState(false);

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

	return (
		<div>
			<NavBar />
			<div className="homepage-body">
				<div
					className="homepage-feed"
					onScroll={(val) => checkScrollPos(val.target.scrollTop)}
				>
					<center>
						<CreatePostDiv />
					</center>
					<PostFilter />
					<Feed />
					<div className="scroll">
						<ScrollToTop
							scrollToTop={scrollToTop}
							scrollUp={scrollUp}
						/>
					</div>
				</div>
				<Activity />
			</div>
		</div>
	);
};
export default Homepage;
