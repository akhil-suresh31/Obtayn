const initState = {};

const postReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_POST":
			console.log("Created post");
			return state;

		case "CREATE_POST_ERROR":
			console.log("Could not create post", action.code);
			return {
				...state,
				error: action.err.message,
				success: null,
			};
		case "DELETE_POST":
			console.log("post deleted");
			return state;

		case "DELETE_POST_ERROR":
			console.log("error to delete post", action.code);
			return {
				...state,
				error: action.err.message,
				success: null,
			};
		default:
			return state;
	}
};
export default postReducer;
