import React from "react";
import Avatar from "react-avatar";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NavBar from "../Navbar/navbar";
import Feed from "../Feed/feed";
import Activity from "../Activity/activity";
import ScrollToTop from "./scrollToTop";
import { LightbulbFill, SuitHeartFill } from "react-bootstrap-icons";

const Homepage = () => {
	return (
		<div>
			<NavBar />
			<div className="homepage-body">
				<div className="homepage-feed">
					<center>
						<div className="create-post-div">
							<Row className="mt-3">
								<Col md="auto">
									<div className="create-post-avatar">
										<Avatar
											size="55"
											src="images/user1.jpg"
											round={true}
										/>
									</div>
								</Col>
								<Col>
									<div className="create-post-input">
										<Form inline>
											<Form.Control
												type="text"
												placeholder="Write something..."
												className="post-input"
												readOnly
											/>
										</Form>
									</div>
								</Col>
								<Col></Col>
								<Col></Col>
								<Col></Col>
								<Col></Col>
								<Col></Col>
								<Col>
									<LightbulbFill color="white" className="icons" size={27}/>
								</Col>
								<Col>
									<SuitHeartFill color="white" className="icons" size={27}/>
								</Col>
							</Row>
						</div>
					</center>
					<Feed />
					
				</div>
                <ScrollToTop />
				<Activity />
			</div>
		</div>
	);
};
export default Homepage;
