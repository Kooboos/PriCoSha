export const updatePendingTags = (id, taggee) => new Promise((resolve, reject) => {
    
    const query = 'http://localhost:5000/api/updatePendingTags/:'+ id + '/:'+taggee;

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