import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { ChatRightTextFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CreatePostModal from "../Create-Post/createPost";
import SearchBar from "./searchBar";
import UserProfile from "./userProfile";
import "./navbar.css";

export default function NavBar() {
	const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;
	return (
		<>
			<Navbar
				expand="lg"
				className="justify-content-between homepage-navbar"
			>
				<Navbar.Brand href="#home">
					<img
						alt="logo"
						src="http://placekitten.com/200/200"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{" "}
					Obtayn
				</Navbar.Brand>

				<Navbar.Toggle />

				<Navbar.Collapse>
					<Nav className="mr-auto justify-content-center">
						<Nav.Link>
							<Link to="/home" style={{ color: "white" }}>
								Feed
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/requests" style={{ color: "white" }}>
								My Requests
							</Link>
						</Nav.Link>
					</Nav>
					<SearchBar />
					<Nav className="justify-content-end">
						<CreatePostModal />

						<OverlayTrigger
							placement="bottom"
							overlay={renderTooltip("Chat")}
						>
							<ChatRightTextFill
								className="chat-icon"
								size={27}
								color="white"
							/>
						</OverlayTrigger>
					</Nav>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<UserProfile />
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
