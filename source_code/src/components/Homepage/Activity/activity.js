import React from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "./activity.css";

const Activity = ({ notifications, user }) => {
	const handleClick = (event, e) => {
		console.log(event);
	};

	return (
		<div className="homepage-activity">
			<center>
				<h4>Recent Activity</h4>
			</center>

			{notifications &&
				notifications.map((item, index) => {
					if (item.to_user_id === user)
						return (
							<motion.div
								className="activity-notif"
								whileHover={{ scale: 1.05 }}
								key={index}
								onClick={(e) => handleClick(item.trigger_event)}
							>
								<p className="notif-message">{item.message}</p>
								<p className="notif-timestamp">
									{item.timestamp.toDate().toDateString()}
								</p>
							</motion.div>
						);
				})}
		</div>
	);
};

const mapStatetoProps = (state) => {
	return {
		notifications: state.firestore.ordered.Notification,
		user: state.firebase.auth.uid,
	};
};

export default compose(
	connect(mapStatetoProps),
	firestoreConnect([
		{
			collection: "Notification",
			orderBy: ["timestamp", "desc"],
			limit: 6,
		},
	])
)(Activity);
