export const checkForExistingFriendGroup = (username, groupName) => new Promise((resolve, reject) => {
    
    const query = 'http://localhost:5000/api/checkFriendGroups/:' + username + '/:' + groupName;

    fetch(query, {
        mode: "cors",
        method: "GET"
    }
        ).then(response => {
            response.json().then(json=>{
                //This is the response after getting all FriendGroups. Check status to see if group exists
                console.log('checkExisting json', json);
                if(json.rows.length === 0){
                    //this means we can proceed. resolve Status === 'OK'
                    resolve({status:'OK'})
                }
                else{
                    //if anny rows are returned, this means that there is an existing FriendsGroup Present.
                    resolve({status:'DENY'})
                }
            })
    })
    
});