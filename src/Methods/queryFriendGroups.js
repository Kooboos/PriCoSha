export const queryFriendGroups = (username) => new Promise((resolve, reject) => {
    
    const query = 'http://localhost:5000/api/getFriendGroups/:' + username;

    fetch(query, {
        mode: "cors",
        method: "GET"
    }
        ).then(response => {
            response.json().then(json=>{
                //This is the response after getting all FriendGroups
                // console.log('queryFriends json', json);
                resolve(json.rows);
            }).catch(error => {
                reject(error);
            })
    })
    
});