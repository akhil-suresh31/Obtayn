import { React, useEffect, useState } from "react";
import { Media, Spinner, Button } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import Avatar from "react-avatar";
import Swal from "sweetalert2";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { firestoreConnect, withFirestore } from "react-redux-firebase";
import {
	acceptRequest,
	deleteRequest,
} from "../../../store/actions/requestActions";
import "./feed.css";
import { deletePost } from "../../../store/actions/postActions";
import { GeoAltFill, TrashFill } from "react-bootstrap-icons";
import ImageModal from "./imageModal";
import { Waypoint } from "react-waypoint";

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
	firestore,
}) => {
	const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;
	const [showImage, setImage] = useState(false);
	const [selectedImg, setSelectedImg] = useState(null);
	const [lastPost, setLastPost] = useState(null);
	const [lastRequest, setLastRequest] = useState(null);
	const [lastPost2, setLastPost2] = useState(null);
	const [lastReq2, setLastReq2] = useState(null);
	const [loading, setLoading] = useState(false);

	const loadMore = () => {
		setLoading(true);
		var lastpost, lastReq;

		if (posts) lastpost = posts[posts.length - 1];
		if (requests) lastReq = requests[requests.length - 1];
		setLastReq2(lastReq);
		setLastPost2(lastpost);
		if (lastReq2 == null || lastReq2.id != lastRequest.id) {
			firestore.get({
				collection: "Request",
				limit: requests.length + 2,
				orderBy: ["timestamp", "desc"],
				// where: ["to_user_id", "==", null],
				startAfter: lastReq,
			});
		} else {
			console.log("done fetching requests");
		}
		if (lastPost2 == null || lastPost2.id != lastPost.id) {
			firestore.get({
				collection: "Post",
				limit: posts.length + 2,
				orderBy: ["timestamp", "desc"],
				startAfter: lastpost,
			});
		} else {
			console.log("done fetching posts");
		}
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	useEffect(() => {
		firestore.get({
			collection: "Request",
			limit: 2,
			orderBy: ["timestamp", "desc"],
			where: ["to_user_id", "==", null],
			startAfter: 0,
		});
		firestore.get({
			collection: "Post",
			limit: 2,
			orderBy: ["timestamp", "desc"],
			startAfter: 0,
		});

		return () => {
			firestore.unsetListeners([
				{ collection: "Request" },
				{ collection: "Post" },
			]);
		};
	}, []);

	useEffect(() => {
		if (posts && lastPost != posts[posts.length - 1])
			setLastPost(posts[posts.length - 1]);
		if (requests && lastRequest != requests[requests.length - 1])
			setLastRequest(requests[requests.length - 1]);
	}, [requests, posts]);

	const delRequest = (req) => {
		Swal.fire({
			title: "Do you want to delete your request?",
			confirmButtonText: "Yes",
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
			confirmButtonText: "Yes",
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
			console.log(searchData);
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
				allPosts = allPosts.filter((post) =>
					post.location?.includes(searchData.location)
				);
				console.log("Keyword filter -> ", allPosts);
			}
			console.log("FILTERED FEED-> ", allPosts);
		} else setSearchButton(false);

		if (allPosts.length > 0) {
			return (
				<div className="feed-container mb-4">
					{/* <Button onClick={loadMore}>load more</Button> */}
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
												<h6 className="text-left font-weight-bold feed-user">
													{item.user}
												</h6>

												{item.category && (
													<p className="feed-category">
														{item.category}
													</p>
												)}
											</div>
											<p className="feed-timestamp text-left">
												{item.timestamp
													.toDate()
													.toLocaleTimeString(
														"en-US",
														{
															weekday: "short",
															day: "numeric",
															month: "numeric",
															hour: "2-digit",
															minute: "2-digit",
														}
													)}
											</p>
											<div className="d-flex w-100 mt-0 ">
												<p className="text-left feed-title">
													{item.title}
												</p>

												{item.location ? (
													<h6>
														{item.location}
														<GeoAltFill
															size={22}
															style={{
																color:
																	"#cc0000",
															}}
														/>
													</h6>
												) : null}
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
											{/* {actionBtn ? ( */}
											<div className="d-flex w-100 mt-0 ">
												<p></p>

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
														<Button
															className="accept-button"
															onClick={() =>
																acceptRequest(
																	item
																)
															}
														>
															Accept
														</Button>
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
											</div>
											{/* ) : null} */}
										</Media.Body>
									</Media>
								</div>
							</AnimatePresence>
						);
					})}
					{loading && (
						<center className="mt-3">
							<Spinner animation="border" variant="light" />
						</center>
					)}

					<Waypoint onEnter={loadMore}>
						<p></p>
					</Waypoint>
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
					<Spinner animation="border" variant="light" />
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
	withFirestore,
	connect(mapStatetoProps, mapDispatchToProps)
	// firestoreConnect([
	// 	{
	// 		collection: "Request",
	// 		orderBy: ["timestamp", "desc"],
	// 		where: ["to_user_id", "==", null],
	// 		limit: 2,
	// 	},
	// 	{ collection: "User" },
	// 	{
	// 		collection: "Post",
	// 		orderBy: ["timestamp", "desc"],
	// 		limit: 2,
	// 	},
	// ])
)(Feed);
