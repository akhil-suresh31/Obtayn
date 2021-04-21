const initState = {};

const notificationReducer = (state = initState, action) => {
	switch (action.type) {
		case "ACCEPT_REQ":
			console.log("accept request notification added", action.ref);
			return state;

		case "ACCEPT_REQ_ERROR":
			console.log(
				"error sending accept request notification",
				action.code
			);
			return state;

		case "FULFILL_NOTIF_ERROR":
			console.log(
				"error sending request fulfilled notification",
				action.code
			);
			return state;

		case "DELETE_NOTIF":
			console.log("request delete notification sent", action.ref);
			return state;

		case "DELETE_NOTIF_ERROR":
			console.log(
				"error sending request deleted notification",
				action.code
			);
			return state;

		default:
			return state;
	}
};
export default notificationReducer;
