import React, { useState } from "react";
import { ArrowUpCircleFill } from "react-bootstrap-icons";
import "./homepage.css";

const ScrollToTop = () => {
	const [showScroll, setShowScroll] = useState(false);

	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 200) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 200) {
			setShowScroll(false);
		}
	};

	const scrollTop = () => {
		console.log("****");
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	window.addEventListener("scroll", checkScrollTop);

	return (
		<ArrowUpCircleFill
			className="scrollTop"
			onClick={scrollTop}
			// style={{ height: 40, display: showScroll ? "flex" : "none" }}
			style={{ height: 40, display: "flex" }}
		/>
	);
};

export default ScrollToTop;
