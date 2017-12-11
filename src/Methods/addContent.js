export const addContent = (username, comment, contentName, publicOrNot) => new Promise((resolve, reject) => {
    
    const query = 'http://localhost:5000/api/addContent/:'+ username + '/:' + comment + '/:' + contentName + '/:' + publicOrNot;

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