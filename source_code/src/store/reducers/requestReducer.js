import { Posts } from "../../components/Homepage/Feed/feed-data";

const initState = { requests: Posts };

const requestReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_REQUEST":
			console.log("created request", action.request);
			return state;

		case "CREATE_REQUEST_ERROR":
			console.log("error to create reqquest", action.code);
			return state;

		default:
			return state;
	}
};
export default requestReducer;
