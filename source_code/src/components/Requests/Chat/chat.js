import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { motion } from "framer-motion";
import "./chat.css";

const Chat = ({ chatList, user, userList }) => {
  if (chatList && userList) {
    const userDetails = new Map(
      userList.map((obj) => [
        obj.id,
        { dp: obj.profile_picture, name: obj.name },
      ])
    );
    return (
      <div className="chat-container">
        <center>
          <h4 className="chat-heading">Recent Messages</h4>
        </center>
        {chatList.map((item, index) => {
          if (item.from == user || item.to == user) {
            var get_id;
            item.from == user ? (get_id = item.to) : (get_id = item.from);
            var name = userDetails.get(get_id);
            name = name.name;
            return (
              <motion.div
                className="activity-notif"
                whileHover={{ scale: 1.02 }}
                key={index}
              >
                <p className="notif-message">{name}</p>
              </motion.div>
            );
          }
        })}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
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
