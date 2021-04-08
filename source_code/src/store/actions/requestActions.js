export const createRequest = (request) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
        firestore.collection('Request').add({
            ...request,
            from_user_id:null,
            to_user_id:null,
            timestamp:new Date(),
            status:'not_accepted'
        }).then(()=>{
            dispatch({ type: "CREATE_REQUEST", request });
        }).catch((err)=>{
            dispatch({ type: "CREATE_REQUEST_ERROR", err });
        })
		
	};
};
