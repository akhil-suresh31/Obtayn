import { React, useState } from "react";
import { Media, Spinner } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import Avatar from "react-avatar";
import Swal from "sweetalert2";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { firestoreConnect } from "react-redux-firebase";
import {
	acceptRequest,
	deleteRequest,
} from "../../../store/actions/requestActions";
import "./feed.css";
import { deletePost } from "../../../store/actions/postActions";
import { HandThumbsUpFill, TrashFill } from "react-bootstrap-icons";
import ImageModal from "./imageModal";

const Feed = ({
	requests,
	user,
	users,
	posts,
	acceptRequest,
	deleteRequest,
	deletePost,
	filter,
	searchData,
	searchButton,
	setSearchButton,
}) => {
	const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;
	const [showImage, setImage] = useState(false);
	const [selectedImg, setSelectedImg] = useState(null);

	const delRequest = (req) => {
		Swal.fire({
			title: "Do you want to delete your request?",
			showConfirmButton: true,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				deleteRequest(req);
				Swal.fire({
					title: "Request Deleted!",
					text: "",
					icon: "success",
					timer: 1500,
				});
			}
		});
	};
	const delPost = (post) => {
		Swal.fire({
			title: "Do you want to delete your post?",
			showConfirmButton: true,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				deletePost(post);
				Swal.fire({
					title: "Post Deleted!",
					text: "",
					icon: "success",
					timer: 1500,
				});
			}
		});
	};

	if (requests && posts && users) {
		const avatarlist = new Map(
			users.map((obj) => [obj.id, obj.profile_picture])
		);
		var allPosts;
		if (
			(filter.request && filter.post) ||
			(!filter.request && !filter.post)
		) {
			allPosts = [].concat(requests, posts);
			allPosts.sort((a, b) => b.timestamp - a.timestamp);
		} else if (filter.request) {
			allPosts = [...requests];
		} else if (filter.post) {
			allPosts = [...posts];
		}

		if (searchData && searchButton) {
			console.log("Searching...");
			// var filteredPosts = allPosts;
			// allPosts = allPosts.filter(
			// 	(post) =>
			// 		post.category == searchData.category &&
			// 		post.title.includes(searchData.keyword) &&
			// 		post.location == searchData.location
			// );
			if (searchData.category != "") {
				allPosts = allPosts.filter(
					(post) => post.category == searchData.category
				);
				console.log("Category filter -> ", allPosts);
			}
			if (searchData.keyword != "") {
				allPosts = allPosts.filter(
					(post) =>
						post.title.includes(searchData.keyword) ||
						post.message.includes(searchData.keyword)
				);
				console.log("Keyword filter -> ", allPosts);
			}
			if (searchData.location != "") {
				allPosts = allPosts.filter(
					(post) => post.location == searchData.location
				);
				console.log("Keyword filter -> ", allPosts);
			}
			console.log("FILTERED FEED-> ", allPosts);
		} else setSearchButton(false);

		if (allPosts.length > 0) {
			return (
				<div className="feed-container">
					{allPosts.map((item, index) => {
						return (
							<AnimatePresence>
								<div
									className="feed-post"
									key={index}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.2 }}
									exit={{ opacity: 0 }}
								>
									<Media className="post-container">
										<Avatar
											size="55"
											className="align-self-start mr-3 feed-img"
											src={
												avatarlist &&
												avatarlist.get(
													item.from_user_id
												)
											}
											round={true}
										/>
										<Media.Body>
											<div className="d-flex w-100 mb-0 align-items-end">
												<h6 className="text-left font-weight-bold">
													{item.user}
												</h6>
												<h6>
													{item.category
														? "#request"
														: "#thanks"}
												</h6>
											</div>
											{item.category && (
												<h6>{item.category}</h6>
											)}

											<div className="d-flex w-100 mt-0 ">
												<h5 className="text-left">
													{item.title}
												</h5>
												<h6>
													{item.location
														? item.location
														: null}
												</h6>
											</div>
											<p>{item.message}</p>
											{(() => {
												if (
													item.file &&
													item.file.length != 0
												)
													return (
														<div className="image-grid">
															{item.file.map(
																(
																	image,
																	index
																) => {
																	return (
																		<div>
																			<OverlayTrigger
																				placement="top"
																				overlay={renderTooltip(
																					"Click to expand"
																				)}
																			>
																				<img
																					src={
																						image
																					}
																					style={{
																						height:
																							"20vh",
																						width:
																							"20vh",
																						padding:
																							"10%",
																					}}
																					alt="Some image"
																					onClick={() => {
																						setSelectedImg(
																							image
																						);
																						setImage(
																							!showImage
																						);
																					}}
																				/>
																			</OverlayTrigger>
																			<ImageModal
																				show={
																					showImage
																				}
																				setShow={
																					setImage
																				}
																				image={
																					selectedImg
																				}
																			/>
																		</div>
																	);
																}
															)}
														</div>
													);
											})()}
											<div className="d-flex w-100">
												<p className="feed-timestamp text-left">
													{item.timestamp
														.toDate()
														.toLocaleTimeString(
															"en-US",
															{
																weekday:
																	"short",
																day: "numeric",
																month:
																	"numeric",
																hour: "2-digit",
																minute:
																	"2-digit",
															}
														)}
												</p>
												{item.category ? (
													user ===
													item.from_user_id ? (
														<OverlayTrigger
															placement="top"
															overlay={renderTooltip(
																"Delete"
															)}
														>
															<TrashFill
																onClick={() =>
																	delRequest(
																		item
																	)
																}
																className="delete-button"
															/>
														</OverlayTrigger>
													) : (
														<OverlayTrigger
															placement="top"
															overlay={renderTooltip(
																"Accept"
															)}
														>
															<HandThumbsUpFill
																onClick={() =>
																	acceptRequest(
																		item
																	)
																}
																className="accept-button"
															/>
														</OverlayTrigger>
													)
												) : user ===
												  item.from_user_id ? (
													<OverlayTrigger
														placement="top"
														overlay={renderTooltip(
															"Delete"
														)}
													>
														<TrashFill
															onClick={() =>
																delPost(item)
															}
															className="delete-button"
														/>
													</OverlayTrigger>
												) : null}
												{}
											</div>
										</Media.Body>
									</Media>
								</div>
							</AnimatePresence>
						);
					})}
				</div>
			);
		} else {
			return (
				<>
					<div className="no-results">
						<img src="images/tenor.gif" name="results-gif" />
					</div>
					<h4
						className="no-result-text"
						style={{ color: "white", paddingTop: "2%" }}
					>
						Don't be mad, we couldn't find any results.
					</h4>
				</>
			);
		}
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
		deleteRequest: (request) => dispatch(deleteRequest(request)),
		deletePost: (post) => dispatch(deletePost(post)),
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
