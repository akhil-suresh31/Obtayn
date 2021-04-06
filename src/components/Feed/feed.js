import React from "react";
import { Media } from "react-bootstrap";
import "./feed.css";

const Feed = () => {
	return (
		<div className="feed-container">
			<div className="feed-post">
				<Media className="post-container">
					<img
						width={60}
						height={60}
						className="align-self-start mr-3 feed-img"
						src="images/user3.jpg"
						alt="Generic placeholder"
					/>
					<Media.Body>
						<h5>Media Heading</h5>
						<p>
							Cras sit amet nibh libero, in gravida nulla. Nulla
							vel metus scelerisque ante sollicitudin commodo.
							Cras purus odio, vestibulum in vulputate at, tempus
							viverra turpis. Fusce condimentum nunc ac nisi
							vulputate fringilla. Donec lacinia congue felis in
							faucibus.
						</p>

						<p>
							Donec sed odio dui. Nullam quis risus eget urna
							mollis ornare vel eu leo. Cum sociis natoque
							penatibus et magnis dis parturient montes, nascetur
							ridiculus mus.
						</p>
					</Media.Body>
				</Media>
			</div>
			<div className="feed-post">
				<Media className="post-container">
										<Media.Body>
						<h5>Media Heading</h5>
						<p>
							Cras sit amet nibh libero, in gravida nulla. Nulla
							vel metus scelerisque ante sollicitudin commodo.
							Cras purus odio, vestibulum in vulputate at, tempus
							viverra turpis. Fusce condimentum nunc ac nisi
							vulputate fringilla. Donec lacinia congue felis in
							faucibus.
						</p>

						<p>
							Donec sed odio dui. Nullam quis risus eget urna
							mollis ornare vel eu leo. Cum sociis natoque
							penatibus et magnis dis parturient montes, nascetur
							ridiculus mus.
						</p>
					</Media.Body>
                    <img
						width={60}
						height={60}
						className="align-self-start mr-3 feed-img"
						src="images/user2.jpg"
						alt="Generic placeholder"
					/>
				</Media>
			</div>
			<div className="feed-post">
				<Media className="post-container">
					<img
						width={60}
						height={60}
						className="align-self-start mr-3 feed-img"
						src="images/user4.jpg"
						alt="Generic placeholder"
					/>
					<Media.Body>
						<h5>Media Heading</h5>
						<p>
							Cras sit amet nibh libero, in gravida nulla. Nulla
							vel metus scelerisque ante sollicitudin commodo.
							Cras purus odio, vestibulum in vulputate at, tempus
							viverra turpis. Fusce condimentum nunc ac nisi
							vulputate fringilla. Donec lacinia congue felis in
							faucibus.
						</p>

						<p className="mb-0">
							Donec sed odio dui. Nullam quis risus eget urna
							mollis ornare vel eu leo. Cum sociis natoque
							penatibus et magnis dis parturient montes, nascetur
							ridiculus mus.
						</p>
					</Media.Body>
				</Media>
			</div>
            <div className="feed-post">
				<Media className="post-container">
					<img
						width={60}
						height={60}
						className="align-self-start mr-3 feed-img"
						src="images/user4.jpg"
						alt="Generic placeholder"
					/>
					<Media.Body>
						<h5>Media Heading</h5>
						<p>
							Cras sit amet nibh libero, in gravida nulla. Nulla
							vel metus scelerisque ante sollicitudin commodo.
							Cras purus odio, vestibulum in vulputate at, tempus
							viverra turpis. Fusce condimentum nunc ac nisi
							vulputate fringilla. Donec lacinia congue felis in
							faucibus.
						</p>

						<p className="mb-0">
							Donec sed odio dui. Nullam quis risus eget urna
							mollis ornare vel eu leo. Cum sociis natoque
							penatibus et magnis dis parturient montes, nascetur
							ridiculus mus.
						</p>
					</Media.Body>
				</Media>
			</div>
            <div className="feed-post">
				<Media className="post-container">
					<img
						width={60}
						height={60}
						className="align-self-start mr-3 feed-img"
						src="images/user3.jpg"
						alt="Generic placeholder"
					/>
					<Media.Body>
						<h5>Media Heading</h5>
						<p>
							Cras sit amet nibh libero, in gravida nulla. Nulla
							vel metus scelerisque ante sollicitudin commodo.
							Cras purus odio, vestibulum in vulputate at, tempus
							viverra turpis. Fusce condimentum nunc ac nisi
							vulputate fringilla. Donec lacinia congue felis in
							faucibus.
						</p>

						<p>
							Donec sed odio dui. Nullam quis risus eget urna
							mollis ornare vel eu leo. Cum sociis natoque
							penatibus et magnis dis parturient montes, nascetur
							ridiculus mus.
						</p>
					</Media.Body>
				</Media>
			</div>
		</div>
	);
};

export default Feed;
