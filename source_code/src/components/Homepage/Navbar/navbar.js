import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BellFill, ChatRightTextFill } from "react-bootstrap-icons";
import { Link, useHistory } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FileEarmarkPlusFill } from "react-bootstrap-icons";
import Tooltip from "react-bootstrap/Tooltip";
import UserProfile from "./userProfile";
import "./navbar.css";

/**
 * Use - Component that renders a responsive Navbar containing links and shortcuts using react-bootstrap.
 * Parameters - menuOpen and setMenuOpen to toggle Activity sidebar.
 */

export default function NavBar({ menuOpen, setMenuOpen }) {
	const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;
	const history = useHistory();

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				className="justify-content-between homepage-navbar"
			>
				<Navbar.Brand
					style={{
						color: "#d8bf95",
						fontFamily: "Lucida Console, Courier New, monospace",
					}}
					className="homepage-navbar-brand"
				>
					<b
						onClick={() => history.push("/home")}
						style={{ cursor: "pointer" }}
					>
						Obtayn
					</b>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />

				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto justify-content-center">
						{(() => {
							if (window.location.pathname === "/requests")
								return (
									<Nav.Link className="redirect-link">
										<Link
											to="/home"
											style={{ color: "white" }}
										>
											Feed
										</Link>
									</Nav.Link>
								);
							else if (window.location.pathname === "/home")
								return (
									<Nav.Link className="redirect-link">
										<Link
											to="/requests"
											style={{ color: "white" }}
										>
											My Requests
										</Link>
									</Nav.Link>
								);
							else
								return (
									<Nav>
										<Nav.Link className="redirect-link">
											<Link
												to="/home"
												style={{ color: "white" }}
											>
												Feed
											</Link>
										</Nav.Link>
										<Nav.Link className="redirect-link">
											<Link
												to="/requests"
												style={{ color: "white" }}
											>
												My Requests
											</Link>
										</Nav.Link>
									</Nav>
								);
						})()}
					</Nav>

					<Nav className="justify-content-end">
						<OverlayTrigger
							placement="bottom"
							overlay={renderTooltip("Notifications")}
						>
							<BellFill
								className="navbar-icons"
								size={27}
								onClick={() => {
									setMenuOpen(!menuOpen);
									console.log("Navbar->", menuOpen);
								}}
								alt="Notifications"
							/>
						</OverlayTrigger>
					</Nav>
					<Nav className="justify-content-end">
						<OverlayTrigger
							placement="bottom"
							overlay={renderTooltip("New Post")}
						>
							<Link to="/createPost" className="navbar-icons">
								<FileEarmarkPlusFill size={27} />
							</Link>
						</OverlayTrigger>
					</Nav>
					{(() => {
						if (window.location.pathname === "/home")
							return (
								<Nav className="justify-content-end">
									<OverlayTrigger
										placement="bottom"
										overlay={renderTooltip("Chat")}
									>
										<ChatRightTextFill
											className="navbar-icons"
											size={27}
											onClick={() => {
												history.push("/requests");
											}}
										/>
									</OverlayTrigger>
								</Nav>
							);
					})()}

					<UserProfile />
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
