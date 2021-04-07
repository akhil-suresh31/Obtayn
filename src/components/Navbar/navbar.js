import React from "react";
import { Navbar, Nav, DropdownButton, Dropdown } from "react-bootstrap";
import Avatar from "react-avatar";
import { ChatRightTextFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CreatePostModal from "../Homepage/Create-Post/createPost";
import SearchBar from "./searchBar";
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
						<Nav.Link href="#home" style={{ color: "white" }}>
							Feed
						</Nav.Link>
						<Nav.Link href="#requests" style={{ color: "white" }}>
							Requests
						</Nav.Link>
					</Nav>
					<SearchBar />
					<Nav className="justify-content-end">
						<Nav.Link href="#create-post">
							<CreatePostModal />
						</Nav.Link>

						<Nav.Link href="#chat">
							<ChatRightTextFill
								className="chat-icon"
								size={27}
								color="white"
							/>
						</Nav.Link>
					</Nav>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<Nav className="justify-content-end">
						<DropdownButton
							menuAlign="right"
							title="Jordan"
							id="dropdown-menu-align-right"
							variant="light"
							className="navbar-profile"
						>
							<center>
								<Dropdown.ItemText>
									<Avatar
										size="60"
										src="images/user1.jpg"
										round={true}
									/>

									<img
										className="edit-profile"
										src="images/pen-fill.svg"
										alt=""
									/>
								</Dropdown.ItemText>
								<Dropdown.Divider />
								<Dropdown.ItemText eventKey="1">
									Jordan Fisher
								</Dropdown.ItemText>
								<Dropdown.ItemText eventKey="2">
									jordan@hotmail.com
								</Dropdown.ItemText>
								<Dropdown.ItemText eventKey="2">
									0987654321
								</Dropdown.ItemText>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="4" href="#logout">
									<Link to="/">Logout</Link>
								</Dropdown.Item>
							</center>
						</DropdownButton>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
