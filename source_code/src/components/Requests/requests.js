import React from "react";
import Navbar from "../Homepage/Navbar/navbar";
import Chat from "./Chat/chat";
import "./requests.css";

const Requests = () => {
	return (
		<>
			<Navbar />
			<div className="requests-body">
				<div className="requests-container"></div>
				<Chat />
			</div>
		</>
	);
};

export default Requests;
