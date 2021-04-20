import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Avatar from "react-avatar";
import { motion } from "framer-motion";
import "./chat.css";
import { Media } from "react-bootstrap";

const DirectChat = ({ chat, auth, user, setOpenDM }) => {
	if (chat && user && auth) {
		return (
			<div className="chat-container">
				<center>
					<div className="DM-heading">
						<Avatar
							size="65"
							src={user && user.dp}
							round={true}
							name={user.name}
							onClick={() => {
								setOpenDM(false);
							}}
						/>
						<h3 className="chat-heading">{user.name}</h3>
					</div>
					{/* <div className="chat-List">
						{chatForUser.map((chat) => {
							var user;
							if (chat.to == auth.uid) user = chat.from;
							else user = chat.to;
							user = UserDetails.get(user);

							return (
								<div className="chat-user">
									<Media>
										<Avatar
											size="55"
											src={user && user.dp}
											round={true}
											alt={user && user.name[0]}
											className="mt-1 ml-1"
										/>
										<Media.Body>
											<div className="d-flex w-100 align-tems-start mt-1">
												<h4 className="ml-4">
													{user && user.name}
												</h4>
											</div>
											<div className="d-flex ml-4 mb-2">
												{chat.message ? (
													<>{"some message"}</>
												) : (
													<>
														Well whatcha waiting for
														say hi!
													</>
												)}
											</div>
										</Media.Body>
									</Media>
								</div>
							);
						})}
					</div> */}
				</center>
			</div>
		);
	}
	// } else {
	// 	return (
	// 		<div className="chat-container">
	// 			<center>
	// 				<h4 className="chat-heading">Recent Messages</h4>
	// 				<div style={{ color: "white" }}>Loading</div>
	// 			</center>
	// 		</div>
	// 	);
	// }
};

const mapStatetoProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};

export default compose(
	connect(mapStatetoProps),
	firestoreConnect([{ collection: "User" }])
)(DirectChat);
