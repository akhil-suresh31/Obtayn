import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "./activity.css";
import { clickNotif } from "../../../store/actions/notificationActions";
import { deleteNotif } from "../../../store/actions/notificationActions";
import { useHistory } from "react-router";
import { X } from "react-bootstrap-icons";
import { slide as Menu } from "react-burger-menu";

const Activity = ({
	notifications,
	user,
	clickNotif,
	menuOpen,
	setMenuOpen,
	deleteNotif,
}) => {
	const history = useHistory();

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const handleDelete = (notif) => {
		console.log(notif);
		deleteNotif(notif);
	};
	var notifCount = 0;

	return (
		<Menu right isOpen={menuOpen} width={"25vw"}>
			<div className="homepage-activity">
				<h4 className="activity-heading">Notifications</h4>

				{notifications &&
					notifications.map((item, index) => {
						if (item.to_user_id === user && notifCount < 5) {
							++notifCount;

							return (
								<AnimatePresence>
									<motion.div
										className="activity-notif"
										whileHover={{ scale: 1.05 }}
										key={index}
										positionTransition
										initial={{
											opacity: 0,
											y: 50,
											scale: 0.3,
										}}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{
											opacity: 0,
											scale: 0.5,
											transition: { duration: 0.2 },
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
								</AnimatePresence>
							);
						}
					})}
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
