export const removeTags = (ids) => new Promise((resolve, reject) => {
    const query = 'http://localhost:5000/api/removeTagsID/:' + ids;

    fetch(query, {
        mode: "cors",
        method: "GET"
    }
        ).then(response => {
            response.json().then(json=>{
                resolve(json);
            }).catch(error => {
                reject(error);
            })
    })
    
});