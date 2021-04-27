const initState = {
	error: null,
	success: null,
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			console.log("login success");
			return { ...state, error: null, success: null };
		case "LOGIN_ERROR":
			console.log("Login error :", action.err);
			return {
				...state,
				error: action.err.message,
				success: null,
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
				success: null,
			};
		case "SIGNUP_ERROR":
			console.log("Signup failed");
			return {
				...state,
				error: action.err.message,
				success: null,
			};
		case "GOOGLE_AUTH_SUCCESS":
			console.log("Google auth successful");
			return {
				...state,
				error: null,
				success: null,
			};
		case "GOOGLE_AUTH_ERROR":
			console.log("Google auth failed");
			return {
				...state,
				error: action.err.message,
				success: null,
			};
		case "PASSWORD_RESET":
			console.log("Password reset mail sent");
			return {
				...state,
				error: null,
				success: "Check you mail for furthur instructions",
			};
		case "PASSWORD_RESET_ERROR":
			console.log("Password reset error");
			return {
				...state,
				error: action.err.message,
				success: null,
			};
		default:
			return state;
	}
};
export default authReducer;
