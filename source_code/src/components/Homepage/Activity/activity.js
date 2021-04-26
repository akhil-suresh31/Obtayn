import React from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "./activity.css";
import { clickNotif } from "../../../store/actions/notificationActions";
import { useHistory } from "react-router";
import { X } from "react-bootstrap-icons";
import { slide as Menu } from "react-burger-menu";

const Activity = ({
	notifications,
	user,
	clickNotif,
	menuOpen,
	setMenuOpen,
}) => {
	const handleClick = (event, item, e) => {
		console.log(item);
	};

	const history = useHistory();

	const closeMenu = () => {
		setMenuOpen(false);
	};

	return (
		<Menu right isOpen={menuOpen} width={"25vw"}>
			{/* {console.log("Activity->", menuOpen)} */}
			<div className="homepage-activity">
				<h4 className="activity-heading">Notifications</h4>

				{notifications &&
					notifications.map((item, index) => {
						if (item.to_user_id === user)
							return (
								<motion.div
									className="activity-notif"
									whileHover={{ scale: 1.05 }}
									key={index}
									onClick={() => {
										clickNotif(item);
										history.push("/requests");
									}}
								>
									<X
										style={{
											float: "right",
											height: "8%",
											width: "8%",
											color: "dimgrey",
										}}
									/>
									<p className="notif-message">
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
					})}
			</div>
		</Menu>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		clickNotif: (notif) => dispatch(clickNotif(notif)),
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
			limit: 6,
		},
	])
)(Activity);
