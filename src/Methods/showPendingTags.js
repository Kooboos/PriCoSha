export const showPendingTags = (username) => new Promise((resolve, reject) => {
    
    const query = 'http://localhost:5000/api/showPendingTags/:'+ username;

    fetch(query, {
        mode: "cors",
        method: "GET"
    }
        ).then(response => {
            response.json().then(json=>{
                //This is the response after getting all public tag from Tag
                resolve(json);
            }).catch(error => {
                reject(error);
            })
    })
    
});