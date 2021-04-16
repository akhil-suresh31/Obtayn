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

const Homepage = ({ users, profile_pic }) => {
  const [scrollToTop, setscrollToTop] = useState(false);
  const [filter, setFilter] = useState({ post: false, request: false });

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

  return (
    <div>
      <NavBar />
      <div className="homepage-body">
        <div
          className="homepage-feed"
          onScroll={(val) => checkScrollPos(val.target.scrollTop)}
        >
          <center>
            <CreatePostDiv dp={profile_pic} />
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
