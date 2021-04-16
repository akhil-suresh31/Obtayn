import { React, useEffect, useState } from "react";
import { Media, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import Swal from "sweetalert2";
import { firestoreConnect } from "react-redux-firebase";
import {
	acceptRequest,
	deleteReqeust,
} from "../../../store/actions/requestActions";
import "./feed.css";
import { instanceOf } from "prop-types";

const Feed = ({
	requests,
	user,
	users,
	posts,
	acceptRequest,
	deleteReqeust,
}) => {
	const delRequest = (req) => {
		Swal.fire({
			title: "Do you want to delete your request?",
			showConfirmButton: true,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				deleteReqeust(req);
				Swal.fire({
					title: "Request Deleted!",
					text: "",
					icon: "success",
					timer: 1500,
				});
			}
		});
	};

	//if (allPosts.length == requests.length + posts.length) {
	if (requests && posts && users) {
		const avatarlist = new Map(
			users.map((obj) => [obj.id, obj.profile_picture])
		);

		const allPosts = [].concat(requests, posts);
		allPosts.sort((a, b) => b.timestamp - a.timestamp);
		console.log("All->", allPosts);
		console.log("Posts->", posts);

		return (
			<div className="feed-container">
				{allPosts.map((item, index) => {
					console.log(item);
					if (item.category)
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
										src={
											avatarlist &&
											avatarlist.get(item.from_user_id)
											// "asd"
										}
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
											{user === item.from_user_id ? (
												<Button
													onClick={() =>
														delRequest(item)
													}
												>
													Delete
												</Button>
											) : (
												<Button
													onClick={() =>
														acceptRequest(item)
													}
												>
													Accept
												</Button>
											)}
										</div>
									</Media.Body>
								</Media>
							</motion.div>
						);
					else
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
										src={
											avatarlist &&
											avatarlist.get(item.from_user_id)
										}
										alt="user initials"
									/>

									<Media.Body>
										<div className="d-flex w-100 mb-0 align-items-end">
											<h6 className="text-left font-weight-bold">
												{item.user}
											</h6>
											<h6>#thanks</h6>
										</div>
										<div className="d-flex w-100 mt-0 ">
											<h5 className="text-left">
												{item.title}
											</h5>
										</div>

										<p>{item.message}</p>
										{(() => {
											if (item.file != null)
												return (
													<div className="abc">
														<img
															src={item.file[0]}
															style={{
																height: "15vh",
																width: "15vh",
															}}
														/>
													</div>
												);
										})()}
										<div className="d-flex w-100">
											<p className="feed-timestamp text-left">
												{item.timestamp
													.toDate()
													.toDateString()}
											</p>
										</div>
									</Media.Body>
								</Media>
							</motion.div>
						);
				})}
			</div>
		);
		//}
	} else {
		return (
			<div className="feed-container">
				<center className="mt-3">
					<Spinner animation="border" variant="light" />;
				</center>
			</div>
		);
	}
};

const mapStatetoProps = (state) => {
	return {
		requests: state.firestore.ordered.Request,
		user: state.firebase.auth.uid,
		users: state.firestore.ordered.User,
		posts: state.firestore.ordered.Post,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		acceptRequest: (request) => dispatch(acceptRequest(request)),
		deleteReqeust: (request) => dispatch(deleteReqeust(request)),
	};
};

export default compose(
	connect(mapStatetoProps, mapDispatchToProps),
	firestoreConnect([
		{
			collection: "Request",
			orderBy: ["timestamp", "desc"],
			where: ["to_user_id", "==", null],
		},
		{ collection: "User" },
		{
			collection: "Post",
			orderBy: ["timestamp", "desc"],
		},
	])
)(Feed);
