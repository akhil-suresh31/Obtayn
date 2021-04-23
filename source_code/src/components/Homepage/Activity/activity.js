import React from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "./activity.css";
import { clickNotif } from "../../../store/actions/notificationActions";
import { useHistory } from "react-router";

const Activity = ({ notifications, user, clickNotif }) => {
	const handleClick = (event, item, e) => {
		console.log(item);
	};

	const history = useHistory();

	return (
		<div className="homepage-activity">
			<center>
				<h4 className="activity-heading">Recent Activity</h4>
			</center>

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
								<p className="notif-message">{item.message}</p>
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
	firestoreConnect([
		{
			collection: "Notification",
			orderBy: ["timestamp", "desc"],
			limit: 6,
		},
	])
)(Activity);
