const initState = {};

const notificationReducer = (state = initState, action) => {
	switch (action.type) {
		case "ACCEPT_REQ":
			console.log("accept request notification added");
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
			console.log("request delete notification sent");
			return state;

		case "DELETE_NOTIF_ERROR":
			console.log(
				"error sending request deleted notification",
				action.code
			);
			return state;

		case "NEW_MESSAGE_NOTIF":
			console.log("new message notification sent");
			return state;

		case "NEW_MESSAGE_NOTIF_ERROR":
			console.log("error sending new message notification", action.code);
			return state;

		case "NOTIF_CLICK":
			console.log("notification clicked :");
			return {
				...state,
				...action.notif,
			};

		case "CLEAR_NOTIF":
			console.log("cleared notif state");
			return null;

		case "DELETED_NOTIF":
			console.log("notification deleted");
			return state;

		case "DELETED_NOTIF_ERROR":
			console.log("error deleting notification", action.code);
			return state;
		case "DECLINE_NOTIF":
			console.log("request declined notification sent");
			return state;

		case "DECLINE_NOTIF_ERROR":
			console.log("error sending decline notification", action.code);
			return state;
		default:
			return state;
	}
};
export default notificationReducer;
