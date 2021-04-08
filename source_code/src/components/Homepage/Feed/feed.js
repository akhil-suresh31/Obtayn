import { React } from "react";
import { Media } from "react-bootstrap";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "./feed.css";

const Feed = ({ requests }) => {
	return (
		<div className="feed-container">
			{requests &&
				requests.map((item, index) => {
					return (
						<motion.div
							className="feed-post"
							whileHover={{ scale: 1.05 }}
							key={index}
						>
							<Media className="post-container">
								<img
									width={60}
									height={60}
									className="align-self-start mr-3 feed-img"
									src={item.avatar}
									alt="Generic placeholder"
								/>
								<Media.Body>
									<h5>{item.title}</h5>
									<p>{item.message}</p>
								</Media.Body>
							</Media>
						</motion.div>
					);
				})}
		</div>
	);
};

const mapStatetoProps = (state) => {
	console.log(state);
	return {
		requests: state.request.requests,
	};
};

export default compose(
	connect(mapStatetoProps),
	firestoreConnect(() => ["Request"])
)(Feed);
