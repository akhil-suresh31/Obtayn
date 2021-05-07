import { React, useEffect, useState } from "react";
import { Media, Spinner, Button } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import { connect } from "react-redux";
import { compose } from "redux";
import Avatar from "react-avatar";
import Swal from "sweetalert2";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { withFirestore } from "react-redux-firebase";
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
	const [showImage, setImage] = useState(false); //shows image modal
	const [selectedImg, setSelectedImg] = useState(null); //sets the image which is selected
	const [lastPost, setLastPost] = useState(null); //last post object used as reference to fetch next post
	const [lastRequest, setLastRequest] = useState(null); //Last request for fetching referrence
	const [lastPost2, setLastPost2] = useState(null); //last to last post used for comparison to stop fetching
	const [lastReq2, setLastReq2] = useState(null); //last to last reqeust used for comparison to stop fetching
	const [loading, setLoading] = useState(false); //variable to show loading spinner when fetching data
	const [loadall, setLoadall] = useState(true); //variable to check when to fetch all data wehn searching

	/**
	 * function which is called when end of scrollbar is reached , to fetch more data
	 */
	const loadMore = () => {
		setLoading(true);
		var lastpost, lastReq;

		if (posts) lastpost = posts[posts.length - 1];
		if (requests) lastReq = requests[requests.length - 1];
		setLastReq2(lastReq);
		setLastPost2(lastpost);
		if (lastReq2 == null || lastReq2.id !== lastRequest.id) {
			firestore.get({
				collection: "Request",
				limit: requests.length + 4,
				orderBy: ["timestamp", "desc"],
				where: ["to_user_id", "==", null],
				startAfter: lastReq,
			});
		} else {
			console.log("done fetching requests");
		}
		if (lastPost2 == null || lastPost2.id !== lastPost.id) {
			firestore.get({
				collection: "Post",
				limit: posts.length + 4,
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
	/**
	 * function to fetch all data , called when searching
	 */
	const loadAll = () => {
		firestore.get({
			collection: "Request",
			orderBy: ["timestamp", "desc"],
			where: ["to_user_id", "==", null],
		});
		firestore.get({
			collection: "Post",
			orderBy: ["timestamp", "desc"],
		});
	};

	useEffect(() => {
		firestore.setListeners([
			{
				collection: "Request",
				limit: 4,
				orderBy: ["timestamp", "desc"],
				where: ["to_user_id", "==", null],
				startAfter: 0,
			},
			{
				collection: "Post",
				limit: 4,
				orderBy: ["timestamp", "desc"],
				startAfter: 0,
			},
		]);

		return () => {
			firestore.unsetListeners([
				{
					collection: "Request",
					limit: 4,
					orderBy: ["timestamp", "desc"],
					where: ["to_user_id", "==", null],
					startAfter: 0,
				},
				{
					collection: "Post",
					limit: 4,
					orderBy: ["timestamp", "desc"],
					startAfter: 0,
				},
			]);
		};
	}, []);

	/**
	 * keeps track of posts and request to update the last request and post
	 */
	useEffect(() => {
		if (posts && lastPost !== posts[posts.length - 1])
			setLastPost(posts[posts.length - 1]);
		if (requests && lastRequest !== requests[requests.length - 1])
			setLastRequest(requests[requests.length - 1]);
	}, [requests, posts]);

	/**function to delete a request
	 * parameter : request object
	 */
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
	/**function to delete a post
	 * parameter : post object
	 */
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

	if (searchButton && loadall) {
		loadAll();
		setLoadall(false);
	}

	if (requests && posts && users) {
		/**avatarlist : map containing user_id as key and user profile picture as value */
		const avatarlist = new Map(
			users.map((obj) => [obj.id, obj.profile_picture])
		);
		var allPosts;
		/**allPosts contains requests and posts ordered by timestamp */
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

		/**filtering data according to the search parameters  */
		if (searchData && searchButton) {
			console.log("Searching...");
			console.log(searchData);
			if (searchData.category !== "") {
				allPosts = allPosts.filter(
					(post) => post.category === searchData.category
				);
				console.log("Category filter -> ", allPosts);
			}
			if (searchData.keyword !== "") {
				allPosts = allPosts.filter(
					(post) =>
						post.title
							.toLowerCase()
							.includes(searchData.keyword.toLowerCase()) ||
						post.message
							.toLowerCase()
							.includes(searchData.keyword.toLowerCase())
				);
				console.log("Keyword filter -> ", allPosts);
			}
			if (searchData.location !== "") {
				allPosts = allPosts.filter((post) =>
					post.location?.includes(searchData.location)
				);
				console.log("Keyword filter -> ", allPosts);
			}
			console.log("FILTERED FEED-> ", allPosts);
		} else setSearchButton(false);

		if (allPosts.length > 0) {
			return (
				<div className="feed-container mb-5">
					{/* <Button onClick={loadMore}>load more</Button> */}
					<AnimatePresence>
						{allPosts.map((item, index) => {
							return (
								<motion.div
									className="feed-post"
									key={index}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}
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
													item.file.length !== 0
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
																					alt=""
																					style={{
																						height:
																							"20vh",
																						width:
																							"20vh",
																						padding:
																							"10%",
																					}}
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
								</motion.div>
							);
						})}
					</AnimatePresence>
					{loading && (
						<center className="mt-3">
							<Spinner animation="border" variant="light" />
						</center>
					)}

					{!searchButton && (
						<Waypoint onEnter={loadMore}>
							<p></p>
						</Waypoint>
					)}
				</div>
			);
		} else {
			return (
				<>
					<div className="no-results">
						<img
							src="images/no-results.gif"
							name="results-gif"
							alt=""
						/>
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
)(Feed);
