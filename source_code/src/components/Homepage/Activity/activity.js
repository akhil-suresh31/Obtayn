import React from "react";
import { motion } from "framer-motion";
import "./activity.css";

const Activity = () => {
	return (
		<div className="homepage-activity">
			<center>
				<h4>Recent Activity</h4>
			</center>
			<motion.div className="activity-notif" whileHover={{ scale: 1.1 }}>
				<p className="notif">
					Alex sent you a message!Lorem ipsum, or lipsumas it is
					sometimes known, is dummy text used in laying out print,
				</p>
			</motion.div>
			<motion.div className="activity-notif" whileHover={{ scale: 1.1 }}>
				<p className="notif">Chloe accepted ypur request!Lorem ipsum</p>
			</motion.div>
		</div>
	);
};

export default Activity;
