import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import FormControl from "react-bootstrap/FormControl";
// import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Avatar from "react-avatar";
import "./navbar.css";
import CreatePostModal from '../Homepage/Create-Post/createPost';

export default function NavBar() {
	return (
		<>
			<Navbar
				bg="dark"
				variant="dark"
				expand="lg"
				className="justify-content-between"
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
					<Nav className="mr-auto">
						<Nav.Link href="#home">Feed</Nav.Link>
						<Nav.Link href="#requests">Requests</Nav.Link>
						<Nav.Link href="#create-post">
							<CreatePostModal />
						</Nav.Link>
						<Nav.Link href="#chat">
							<img
								className="chat"
								src="images/chat.svg"
							/>
						</Nav.Link>
					</Nav>
					{/* <Form inline className="nav-search-bar">
						<FormControl
							type="text"
							placeholder="search"
							className="mr-sm-2"
						/>
						<Button variant="dark">search</Button>
					</Form> */}
					<Nav>
						{/* <NavDropdown
							className="profile-dropdown"
							title="Jordan29"
							menuAlign="right"
						>
							<NavDropdown.Item>Jordan</NavDropdown.Item>
							<NavDropdown.Item>
								jordan@hotmail.com2
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#logout">
								Logout
							</NavDropdown.Item>
						</NavDropdown> */}

						<DropdownButton
							menuAlign="right"
							title="Jordan"
							id="dropdown-menu-align-right"
							variant="light"
						>
							<center>
								<Dropdown.ItemText>
									<Avatar
										size="60"
										src="images/man.jpg"
										round={true}
									/>
									<img
										className="edit-profile"
										src="images/pen-fill.svg"
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
									Logout
								</Dropdown.Item>
							</center>
						</DropdownButton>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
