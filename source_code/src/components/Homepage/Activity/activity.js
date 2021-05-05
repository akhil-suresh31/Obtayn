import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "./activity.css";
import { clickNotif } from "../../../store/actions/notificationActions";
import { deleteNotif } from "../../../store/actions/notificationActions";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import { slide as Menu } from "react-burger-menu";

/**
 * Use - Component to show Notifications. Uses react-burger-menu as a Sidebar.
 * props - notifications as collection from Firestore
 * 			user as current logged in User
 * 			clickNotif from actions to redirect on notification click event
 * 			menuOpen, setMenuOpen to toggle visibility of burger menu
 * 			deleteNotif from actions to delete a notification
 */

const Activity = ({
	notifications,
	user,
	clickNotif,
	menuOpen,
	setMenuOpen,
	deleteNotif,
}) => {
	const history = useHistory();
	const [isEmptyNotif, setEmptyNotif] = useState(true);
	const closeMenu = () => {
		setMenuOpen(false);
	};
	var notifCount = 0;

	const handleDismiss = (e) => {
		notifications.forEach((notif) => {
			if (notif.to_user_id === user) {
				deleteNotif(notif);
				console.log("Deleted: ", notif);
			}
		});
		notifCount = 0;
		console.log("Notif count->", notifCount);
		setEmptyNotif(true);
	};

	const handleDelete = (notif) => {
		console.log(notif);
		deleteNotif(notif);
		--notifCount;
		// console.log("Notif count->", notifCount);
		if (notifCount == 0) setEmptyNotif(true);
	};

	return (
		<Menu right isOpen={menuOpen} width={"25vw"}>
			<div className="homepage-activity">
				<h4 className="activity-heading">Notifications</h4>

				<Button
					className="dismiss-button"
					onClick={handleDismiss}
					style={{ display: isEmptyNotif ? "hidden" : "block" }}
				>
					Dismiss All
				</Button>

				<AnimatePresence>
					{notifications &&
						notifications.map((item, index) => {
							if (item.to_user_id === user && notifCount < 5) {
								++notifCount;
								// console.log("Notif count->", notifCount);
								return (
									<motion.div
										className="activity-notif"
										whileHover={{ scale: 1.05 }}
										key={index}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{
											x: -500,
											opacity: 0,
											transition: {
												//duration: 0.5,
												duration: 0.5 + index * 0.2,
											},
										}}
									>
										<div
											className="delete-notif-div"
											onClick={(e) => handleDelete(item)}
										>
											<X
												style={{
													float: "right",
													height: "8%",
													width: "8%",
													color: "black",
													cursor: "pointer",
												}}
											/>
										</div>
										<p
											className="notif-message"
											onClick={() => {
												clickNotif(item);
												closeMenu();
												history.push("/requests");
											}}
											style={{ cursor: "pointer" }}
										>
											{item.message}
										</p>
										<p className="notif-timestamp">
											{item.timestamp
												.toDate()
												.toLocaleTimeString("en-US", {
													weekday: "short",
													day: "numeric",
													month: "numeric",
													hour: "2-digit",
													minute: "2-digit",
												})}
										</p>
									</motion.div>
								);
							}
							// if (notifCount > 0) setEmptyNotif(false);
						})}
				</AnimatePresence>
			</div>
		</Menu>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		clickNotif: (notif) => dispatch(clickNotif(notif)),
		deleteNotif: (notif) => dispatch(deleteNotif(notif)),
	};
};

const mapStatetoProps = (state) => {
	return {
		notifications: state.firestore.ordered.Notification,
		user: state.firebase.auth.uid,
	};
};

export default compose(
	connect(mapStatetoProps, mapDispatchToProps),
	firestoreConnect([
		{
			collection: "Notification",
			orderBy: ["timestamp", "desc"],
		},
	])
)(Activity);
