import { React } from "react";
import { Media, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import "./feed.css";

const Feed = ({ requests, user }) => {
	return (
		<div className="feed-container">
			{requests &&
				requests.map((item, index) => {
					if (!item.to_user_id)
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
										alt="user initials"
									/>
									<Media.Body>
										<div className="d-flex w-100 mb-0 align-items-end">
											<h6 className="text-left font-weight-bold">
												{item.user}
											</h6>
											<h6>#request</h6>
										</div>
										<div className="d-flex w-100 mt-0 ">
											<h5 className="text-left">
												{item.title}
											</h5>
											<h6>{item.location}</h6>
										</div>

										<p>{item.message}</p>
										<div className="d-flex w-100">
											<p className="feed-timestamp text-left">
												{item.timestamp
													.toDate()
													.toDateString()}
											</p>
											{user == item.from_user_id ? (
												<Button>Delete</Button>
											) : (
												<Button>Accept</Button>
											)}
										</div>
									</Media.Body>
								</Media>
							</motion.div>
						);
				})}
		</div>
	);
};

const mapStatetoProps = (state) => {
	// console.log(state);
	return {
		requests: state.firestore.ordered.Request,
		user: state.firebase.auth.uid,
	};
};

export default compose(
	connect(mapStatetoProps),
	firestoreConnect([
		{
			collection: "Request",
			orderBy: ["timestamp", "desc"],
			// where: ["status", "==", "not_accepted"],
		},
	])
)(Feed);
