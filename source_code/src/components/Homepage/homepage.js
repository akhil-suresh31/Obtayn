import React, { useState } from "react";
import NavBar from "./Navbar/navbar";
import Feed from "./Feed/feed";
import Activity from "./Activity/activity";
import ScrollToTop from "./scrollToTop";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import CreatePostDiv from "./Create-Post/createPostDiv";
import "./homepage.css";
import PostFilter from "./Create-Post/postFilter";
import { Spinner } from "react-bootstrap";

const Homepage = ({ users, profile_pic }) => {
  const [scrollToTop, setscrollToTop] = useState(false);
  const [filter, setFilter] = useState({ post: false, request: false });

  const [show, setShow] = useState(false);
  const [tag, setTag] = useState("Tag");

  function checkScrollPos(val) {
    if (val > 200 && !scrollToTop) setscrollToTop(true);
    if (val <= 200 && scrollToTop) setscrollToTop(false);
  }

  function scrollUp() {
    document.getElementsByClassName("homepage-feed")[0].scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  if (profile_pic)
    return (
      <div>
        <NavBar tag={tag} setTag={setTag} show={show} setShow={setShow} />
        <div className="homepage-body">
          <div
            className="homepage-feed"
            onScroll={(val) => checkScrollPos(val.target.scrollTop)}
          >
            <center>
              <CreatePostDiv
                dp={profile_pic}
                tag={tag}
                setTag={setTag}
                show={show}
                setShow={setShow}
              />
            </center>
            <PostFilter setFilter={setFilter} filter={filter} />
            <Feed users={users} filter={filter} />
            <div className="scroll">
              <ScrollToTop scrollToTop={scrollToTop} scrollUp={scrollUp} />
            </div>
          </div>
          <Activity />
        </div>
      </div>
    );
  else
    return (
      <div className="homepage-body">
        <center className="mt-3">
          <Spinner animation="border" variant="light" />;
        </center>
      </div>
    );
};

const mapStatetoProps = (state) => {
  return {
    users: state.firestore.ordered.User,
    profile_pic: state.firebase.profile.profile_picture,
  };
};

export default compose(
  connect(mapStatetoProps),
  firestoreConnect([{ collection: "User" }])
)(Homepage);
