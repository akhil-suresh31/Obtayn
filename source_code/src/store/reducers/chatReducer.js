const initState = {};

const chatReducer = (state = initState, action) => {
	switch (action.type) {
		case "ADDED_CHAT":
			console.log("Initialized chat");
			return state;
		case "ADDED_CHAT_ERROR":
			console.log("Error to initialize chat", action.code);
			return state;
		case "CHAT_EXISTS":
			console.log("A thread already exists between users:", action.doc);
			return state;
		case "CHAT_SENT":
			console.log("chat added successfully");
			return state;
		case "CHAT_SENT_ERROR":
			console.log("Error to send chat", action.code);
			return state;
		default:
			return state;
	}
};

export default chatReducer;
