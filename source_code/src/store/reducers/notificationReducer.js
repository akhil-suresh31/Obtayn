const initState = {};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case "ACCEPT_REQ":
      console.log("accepted request notification added", action.ref);
      return state;

    case "ACCEPT_REQ_ERROR":
      console.log("error to create accept request notification", action.code);
      return state;
    default:
      return state;
  }
};
export default notificationReducer;
