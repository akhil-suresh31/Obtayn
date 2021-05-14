const initState = {};

const requestReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_REQUEST":
			console.log("created request");
			return state;

		case "CREATE_REQUEST_ERROR":
			console.log("error to create request", action.code);
			return state;

		case "ACCEPT_REQUEST_ERROR":
			console.log("error to accept request", action.code);
			return state;

		case "DELETE_REQUEST":
			console.log("request deleted");
			return state;

		case "DELETE_REQUEST_ERROR":
			console.log("error to delete request", action.code);
			return state;

		case "REQUEST_FULFILLED":
			console.log("request fulfilled");
			return state;

		case "REQUEST_FULFILL_ERROR":
			console.log("error fulfilling request", action.code);
			return state;
		default:
			return state;
	}
};
export default requestReducer;
