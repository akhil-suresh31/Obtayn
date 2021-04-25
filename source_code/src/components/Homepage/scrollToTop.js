import React from "react";
import { ArrowUpCircleFill } from "react-bootstrap-icons";
import "./homepage.css";

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
