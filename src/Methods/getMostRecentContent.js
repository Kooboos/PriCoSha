export const getMostRecentContent = () => new Promise((resolve, reject) => {
    
    const query = 'http://localhost:5000/api/getLastContent';

    fetch(query, {
        mode: "cors",
        method: "GET"
    }
        ).then(response => {
            response.json().then(json=>{
                //This is the response after getting all users from FriendGroup
                resolve(json);
            }).catch(error => {
                reject(error);
            })
    })
    
});