import React, { useState } from "react";
import firebase from "../../../firebase/firebase";
import "firebase/firestore";
import "firebase/storage";

function UploadFiles(newFile) {
	console.log("$$$$");
	const [url, setURL] = useState("");
	const storage = firebase.storage();
	console.log(newFile);
	const uploadTask = storage.ref(`/feedImages/${newFile.name}`).put(newFile);
	console.log(uploadTask);
	uploadTask.on("state_changed", console.log, console.error, () => {
		storage
			.ref("feedImages")
			.child(newFile.name)
			.getDownloadURL()
			.then((url) => {
				//setFile(null);
				setURL(url);
				console.log(url);
			});
	});
}

export default UploadFiles;
