const initState = {};

const requestReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      console.log("created request", action.request);
      return state;

    case "CREATE_REQUEST_ERROR":
      console.log("error to create request", action.code);
      return state;

    case "ACCPET_REQUEST_ERROR":
      console.log("error to accept request", action.code);
      return state;

    case "DELETE_REQUEST":
      console.log("request deleted", action.request.id);
      return state;

    case "DELETE_REQUEST_ERROR":
      console.log("error to delete request", action.code);
      return state;
    default:
      return state;
  }
};
export default requestReducer;
