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
import { useHistory } from "react-router";
import { getDistance } from "geolib";

/**
 * Use - Renders feed component ,shows un-accepted reqeusts and posts, ordered by time of upload.
 * 		 More posts are dynamically loaded as user scrolls down ,all of the data is updated in real time, synced to databse.
 * Parameters - requests :array of requests fetched from the database
				user : Unique id of currently logged in user
	users : List of users ,
	posts : array of posts fetched from db,
	acceptRequest :function to change the status of request when its accepted,
	deleteRequest :function to delete the request from the database,
	deletePost :function to delete the post from the database,
	filter : data from filter component that tells if the user has selected any filter or not,
	searchData :data from search component that contains the search paramertes to carry out search,
	searchButton :bool value to tell if user pressed the seach button or not,
	setSearchButton,
	firestore :firestore ref of current project using witFirestore,
 */

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
	const [loading, setLoading] = useState(false); //variable to show loading spinner when fetching data
	const [loadall, setLoadall] = useState(true); //variable to check when to fetch all data wehn searching
	const [userLoc, setUserLoc] = useState(null); //contains user location, null by default has longitude and latitude when user allows location access
	const [reqLen, setReqLen] = useState(4); //stores the length of array requested from  "Reqeust" collection
	const [postLen, setPostLen] = useState(4); //stores the length of array requested from  "Reqeust" collection
	const history = useHistory(); //hook to help with routing

	/**
	 * lifecycle method use effects ,
	 * sets the listener to Reqeusts and Posts when component is mounted, also remove listeners when component is unmounted
	 */
	useEffect(() => {
		firestore.unsetListeners([
			{
				collection: "Request",
				orderBy: ["timestamp", "desc"],
				where: ["to_user_id", "==", null],
			},
			{
				collection: "Post",
				orderBy: ["timestamp", "desc"],
			},
		]);

		firestore.setListeners([
			{
				collection: "Request",
				limit: 4,
				orderBy: ["timestamp", "desc"],
				where: ["to_user_id", "==", null],
			},
			{
				collection: "Post",
				limit: 4,
				orderBy: ["timestamp", "desc"],
			},
		]);

		return () => {
			firestore.unsetListeners([
				{
					collection: "Request",
					orderBy: ["timestamp", "desc"],
					where: ["to_user_id", "==", null],
				},
				{
					collection: "Post",
					orderBy: ["timestamp", "desc"],
				},
			]);
			console.log("inside unmounting shizzzz");

			firestore.unsetListeners([
				{
					collection: "Request",
					limit: reqLen,
					orderBy: ["timestamp", "desc"],
					where: ["to_user_id", "==", null],
				},
				{
					collection: "Post",
					limit: postLen,
					orderBy: ["timestamp", "desc"],
				},
			]);
		};
	}, []);

	/**
	 * function which is called when end of scrollbar is reached , to fetch more data
	 */
	const loadMore = () => {
		setLoading(true);

		if (reqLen === requests.length) {
			console.log("req len: ", reqLen);

			firestore.unsetListener({
				collection: "Request",
				limit: requests.length,
				orderBy: ["timestamp", "desc"],
				where: ["to_user_id", "==", null],
			});
			firestore.setListener({
				collection: "Request",
				limit: reqLen + 4,
				orderBy: ["timestamp", "desc"],
				where: ["to_user_id", "==", null],
			});
			setReqLen(reqLen + 4);
		} else {
			console.log("done fetching requests");
		}
		if (postLen === posts.length) {
			console.log("Post len :", postLen);

			firestore.unsetListener({
				collection: "Post",
				limit: posts.length,
				orderBy: ["timestamp", "desc"],
			});
			firestore.setListener({
				collection: "Post",
				limit: postLen + 4,
				orderBy: ["timestamp", "desc"],
			});
			setPostLen(postLen + 4);
		} else {
			console.log("done fetching posts");
		}
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};
	/**
	 * function to fetch all data , called when searching
	 */
	const loadAll = () => {
		firestore.unsetListeners([
			{
				collection: "Request",
				limit: reqLen,
				orderBy: ["timestamp", "desc"],
				where: ["to_user_id", "==", null],
			},
			{
				collection: "Post",
				limit: postLen,
				orderBy: ["timestamp", "desc"],
			},
		]);
		firestore.setListeners([
			{
				collection: "Request",
				orderBy: ["timestamp", "desc"],
				where: ["to_user_id", "==", null],
			},
			{
				collection: "Post",
				orderBy: ["timestamp", "desc"],
			},
		]);
	};

	/**
	 * function triggered when user clicks the accept button
	 * parameter - req : request obj for which accept button was clicked
	 */
	const confirmAccept = (req) => {
		Swal.fire({
			title: "Are you sure you want to accept this request?",
			confirmButtonText: "Yes",
			showConfirmButton: true,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				acceptRequest(req);
				Swal.fire({
					title: "Request Accepted!",
					text: "",
					icon: "success",
					timer: 1500,
				});
				history.push("/requests");
			}
		});
	};

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

	//helper fucntion to load all data if search button was pressed and to prevent reloaduing data once its fetched
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
			if (navigator.geolocation) {
				!userLoc &&
					navigator.geolocation.getCurrentPosition((position) => {
						setUserLoc({
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
						});
					});
			}
			if (userLoc)
				allPosts.sort((a, b) => {
					if (!a.locCoords || !b.locCoords) return -1;
					return (
						getDistance(userLoc, a.locCoords) -
						getDistance(userLoc, b.locCoords)
					);
				});
		} else if (filter.post) {
			allPosts = [...posts];
		}

		/**filtering data according to the search parameters  */
		if (searchData && searchButton) {
			if (searchData.category !== "") {
				allPosts = allPosts.filter(
					(post) => post.category === searchData.category
				);
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
			}
			if (searchData.location !== "") {
				allPosts = allPosts.filter((post) =>
					post.location?.includes(searchData.location)
				);
			}
		} else setSearchButton(false);

		/**rendering the posts and requests which are stored together in allPosts */

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
																		<div
																			key={
																				index
																			}
																		>
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
																confirmAccept(
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
