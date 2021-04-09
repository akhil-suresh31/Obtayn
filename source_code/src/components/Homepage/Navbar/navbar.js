import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { ChatRightTextFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CreatePostModal from "../Create-Post/createPost";
import SearchBar from "./searchBar";
import UserProfile from "./userProfile";
import "./navbar.css";

export default function NavBar() {
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
						<Link to="/home" style={{ color: "white" }}>
							Feed
						</Link>

						<Link to="/requests" style={{ color: "white" }}>
							My Requests
						</Link>
					</Nav>
					<SearchBar />
					<Nav className="justify-content-end">
						<CreatePostModal />

						<ChatRightTextFill
							className="chat-icon"
							size={27}
							color="white"
						/>
					</Nav>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<UserProfile />
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
