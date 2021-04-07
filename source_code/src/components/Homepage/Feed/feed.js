import { React, useState } from "react";
import { Media, NavItem } from "react-bootstrap";
import { motion } from "framer-motion";
import { Posts } from "./feed-data.js";
import "./feed.css";

console.log(Posts);

const Feed = () => {
	return (
		<div className="feed-container">
			{Posts.map((item, index) => {
				return (
					<motion.div
						className="feed-post"
						whileHover={{ scale: 1.1 }}
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

export default Feed;
