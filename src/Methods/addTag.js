export const addTag = (id, tagger, taggee) => new Promise((resolve, reject) => {
    
    const query = 'http://localhost:5000/api/addTag/:'+ id + '/:'+ tagger + '/:' + taggee;

    fetch(query, {
        mode: "cors",
        method: "GET"
    }
        ).then(response => {
            response.json().then(json=>{
                //This is the response after adding Tag
                resolve(json);
            }).catch(error => {
                reject(error);
            })
    })
    
});