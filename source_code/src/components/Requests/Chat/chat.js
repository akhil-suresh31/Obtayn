import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { motion } from "framer-motion";
import "./chat.css";

const Chat = () => {
  return (
    <div className="chat-container">
      <center>
        <h4 className="chat-heading">Recent Messages</h4>
      </center>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    chatList: state.firestore.ordered.Chat,
    user: state.firebase.auth.uid,
    userList: state.firestore.ordered.User,
  };
};

export default compose(
  connect(mapStatetoProps),
  firestoreConnect([{ collection: "Chat" }, { collection: "User" }])
)(Chat);
