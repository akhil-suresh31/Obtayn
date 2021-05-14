import React, { useState, useEffect } from "react";
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

	const handleDismiss = () => {
		notifications.forEach((notif) => {
			deleteNotif(notif);
		});
	};

	const handleDelete = (notif) => {
		deleteNotif(notif);
	};

	useEffect(() => {
		if (notifications && notifications.length === 0) setEmptyNotif(true);
		else setEmptyNotif(false);
	}, [notifications]);

	return (
		<Menu right isOpen={menuOpen} width={"25vw"}>
			<div className="homepage-activity">
				<h4 className="activity-heading">Notifications</h4>

				<Button
					className="dismiss-button"
					onClick={handleDismiss}
					style={{ display: isEmptyNotif ? "none" : "block" }}
				>
					Dismiss All
				</Button>

				<AnimatePresence>
					{notifications &&
						notifications.map((item, i) => {
							return (
								<motion.li
									className="activity-notif"
									whileHover={{ scale: 1.05 }}
									key={item.id}
									style={{ listStyle: "none" }}
									variants={{
										hidden: (i) => ({
											opacity: 0,
											y: -50 * i,
										}),
										visible: (i) => ({
											opacity: 1,
											y: 0,
											transition: {
												delay: i * 0.025,
											},
										}),
										removed: (i) => ({
											opacity: 0,
											x: -220 * i,
											transition: {
												type: "tween",
											},
										}),
									}}
									initial="hidden"
									animate="visible"
									exit="removed"
									custom={i}
								>
									<div
										className="delete-notif-div"
										onClick={() => handleDelete(item)}
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
								</motion.li>
							);
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
	firestoreConnect((props) => [
		{
			collection: "Notification",
			orderBy: ["timestamp", "desc"],
			where: [["to_user_id", "==", props.user]],
			limit: 5,
		},
	])
)(Activity);
