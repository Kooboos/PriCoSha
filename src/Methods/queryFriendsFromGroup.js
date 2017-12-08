export const queryFriendsFromGroup = (groupName, username) => new Promise((resolve, reject) => {
    
    const query = 'http://localhost:5000/api/getFriendsFromGroups/:' + groupName + '/:' + username;

    fetch(query, {
        mode: "cors",
        method: "GET"
    }
        ).then(response => {
            response.json().then(json=>{
                //This is the response after getting all users from FriendGroup
                resolve(json.rows);
            }).catch(error => {
                reject(error);
            })
    })
    
});