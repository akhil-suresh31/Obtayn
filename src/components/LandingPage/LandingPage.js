import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./LandingPage.css";
import SignUp from "./SignUp";

function LandingPage() {
	const [Login, setLogin] = useState(false);
	const [index, setIndex] = useState(0);
	var handleCaraousel = () => {
		setIndex((index + 1) % 3);
	};

	return (
		<div>
			<div className="LandingPage">
				<Carousel
					className="carousal"
					controls={false}
					keyboard={false}
					interval={1000}
					onSelect={handleCaraousel}
					activeIndex={index}
				>
					<Carousel.Item>
						<img
							className="w-100"
							src="/images/artem-beliaikin-TYwEQGLiups-unsplash.jpg"
							alt=""
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="w-100"
							src="/images/omar-tursic-4D5xKxHJmZM-unsplash.jpg"
							alt=""
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="w-100"
							src="/images/jezael-melgoza-layMbSJ3YOE-unsplash.jpg"
							alt=""
						/>
					</Carousel.Item>
					<div style={{display:"flex"}}>
                        <div className="FillerText">
                            <h2>Inspirational Text</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Sed sagittis quam quam, at consequat ligula
                                rutrum eget. Cras bibendum sagittis nisl, in
                                sollicitudin dolor mollis id. Fusce viverra pharetra
                                ante vitae blandit. Etiam sit amet laoreet dolor.
                                Nullam sit amet nisl condimentum, rutrum sem eu,
                                bibendum ex. Curabitur suscipit ex in lacus lobortis
                                suscipit. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Vivamus diam erat, scelerisque a
                                erat ut, molestie maximus erat. Curabitur eget lacus
                                at risus luctus porta quis vitae risus. Ut
                                condimentum rutrum risus, sit amet consectetur arcu
                                semper quis. Pellentesque sit amet turpi
                            </p>
                        </div>
                        <div className="Forms">
                            {Login ? (
                                <div>
                                    <h2>Login</h2>
                                </div>
                            ) : (
                                <div>
                                    <SignUp />
                                </div>
                            )}
                        </div>
                    </div>
				</Carousel>
			</div>
		</div>
	);
}

export default LandingPage;
