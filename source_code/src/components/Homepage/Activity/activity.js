import React from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { format, compareAsc } from "date-fns";
import "./activity.css";

const Activity = ({ notifications }) => {
	console.log("notif", notifications);
	return (
		<div className="homepage-activity">
			<center>
				<h4>Recent Activity</h4>
			</center>
			{/* <motion.div className="activity-notif" whileHover={{ scale: 1.05 }}>
				<p className="notif">
					Alex sent you a message!Lorem ipsum, or lipsumas it is
					sometimes known, is dummy text used in laying out print,
				</p>
			</motion.div>
			<motion.div className="activity-notif" whileHover={{ scale: 1.05 }}>
				<p className="notif">Chloe accepted ypur request!Lorem ipsum</p>
			</motion.div> */}

			{notifications &&
				notifications.map((item, index) => {
					return (
						<motion.div
							className="activity-notif"
							whileHover={{ scale: 1.05 }}
							key={index}
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
	console.log(state);
	return {
		notifications: state.firestore.ordered.Notification,
	};
};

export default compose(
	connect(mapStatetoProps),
	firestoreConnect(() => ["Notification"])
)(Activity);
