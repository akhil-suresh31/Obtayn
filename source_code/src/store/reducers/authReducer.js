const initState = {
	error: null,
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			console.log("login success");
			return { ...state, error: null };
		case "LOGIN_ERROR":
			console.log("Login error :", action.err);
			return {
				...state,
				error: action.err.message,
			};
		case "LOGOUT_SUCCESS":
			console.log("Logout success");
			return state;
		case "LOGOUT_ERROR":
			console.log("Logout failure:", action.err.message);
			return state;
		case "SIGNUP_SUCCESS":
			console.log("Signup successful");
			return {
				...state,
				error: null,
			};
		case "SIGNUP_ERROR":
			console.log("Signup failed");
			return {
				...state,
				error: action.err.message,
			};
		case "GOOGLE_AUTH_SUCCESS":
			console.log("Google auth successful");
			return {
				...state,
				error: null,
			};
		case "GOOGLE_AUTH_ERROR":
			console.log("Google auth failed");
			return {
				...state,
				error: action.err.message,
			};
		default:
			return state;
	}
};
export default authReducer;
