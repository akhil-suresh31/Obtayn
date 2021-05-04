import React from "react";
import { ArrowUpCircleFill } from "react-bootstrap-icons";
import "./homepage.css";

/**
 * Use - Renders "scroll-to-top" button as arrow icon inside Feed.
 * Parameters - scrollToTop to toggle arrow icon display
 * 				scrollUp as function to scroll to top of Feed
 */

const ScrollToTop = ({ scrollToTop, scrollUp }) => {
	return (
		<ArrowUpCircleFill
			className="scrollTop"
			onClick={scrollUp}
			style={{
				height: 40,
				width: 40,
				display: scrollToTop ? "flex" : "none",
			}}
		/>
	);
};

export default ScrollToTop;
