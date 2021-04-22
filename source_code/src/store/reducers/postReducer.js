const initState = {};

const postReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_POST":
			console.log("Created post", action.data);
			return state;

		case "CREATE_POST_ERROR":
			console.log("Could not create post", action.code);
			return {
				...state,
				error: action.err.message,
			};
		case "DELETE_POST":
			console.log("post deleted", action.post.id);
			return state;

		case "DELETE_POST_ERROR":
			console.log("error to delete post", action.code);
			return state;
		default:
			return state;
	}
};
export default postReducer;
