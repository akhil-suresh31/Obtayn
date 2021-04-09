import React from "react";
import { ArrowUpCircleFill, HouseDoorFill } from "react-bootstrap-icons";
import "./homepage.css";

const ScrollToTop = ({ scrollToTop, scrollUp }) => {
	return (
		<HouseDoorFill
			className="scrollTop"
			onClick={scrollUp}
			style={{ height: 40, display: scrollToTop ? "flex" : "none" }}
			// style={{ height: 40, display: "flex" }}
		/>
	);
};

export default ScrollToTop;
