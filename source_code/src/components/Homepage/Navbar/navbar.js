import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BellFill, ChatRightTextFill } from "react-bootstrap-icons";
import { Link, useHistory } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CreatePostModal from "../Create-Post/createPost";
import UserProfile from "./userProfile";
import "./navbar.css";

export default function NavBar({
	tag,
	setTag,
	show,
	setShow,
	menuOpen,
	setMenuOpen,
}) {
	const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;
	const history = useHistory();

	//console.log(window.location.pathname);
	return (
		<>
			<Navbar
				expand="lg"
				className="justify-content-between homepage-navbar"
			>
				<Navbar.Brand
					style={{
						color: "#d8bf95",
						fontFamily: "Lucida Console, Courier New, monospace",
					}}
				>
					<img
						alt="logo"
						src="http://placekitten.com/200/200"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{" "}
					<b>Obtayn</b>
				</Navbar.Brand>

				<Navbar.Toggle />

				<Navbar.Collapse>
					<Nav className="mr-auto justify-content-center">
						{(() => {
							if (window.location.pathname == "/requests")
								return (
									<Nav.Link>
										<Link
											to="/home"
											style={{ color: "white" }}
										>
											Feed
										</Link>
									</Nav.Link>
								);
							else
								return (
									<Nav.Link>
										<Link
											to="/requests"
											style={{ color: "white" }}
										>
											My Requests
										</Link>
									</Nav.Link>
								);
						})()}
					</Nav>

					<Nav className="justify-content-end">
						<OverlayTrigger
							placement="bottom"
							overlay={renderTooltip("Notifications")}
						>
							<BellFill
								className="notifications"
								size={27}
								onClick={() => {
									setMenuOpen(!menuOpen);
									console.log("Navbar->", menuOpen);
								}}
							/>
						</OverlayTrigger>
						<CreatePostModal
							tag={tag}
							setTag={setTag}
							show={show}
							setShow={setShow}
						/>

						{(() => {
							if (window.location.pathname == "/home")
								return (
									<OverlayTrigger
										placement="bottom"
										overlay={renderTooltip("Chat")}
									>
										<ChatRightTextFill
											className="chat-icon"
											size={27}
											color="white"
											onClick={() => {
												history.push("/requests");
											}}
										/>
									</OverlayTrigger>
								);
						})()}
					</Nav>

					<UserProfile />
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
