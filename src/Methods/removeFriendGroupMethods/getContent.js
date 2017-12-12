export const getContent = (ids) => new Promise((resolve, reject) => {
    console.log('ids:', ids);
    const query = 'http://localhost:5000/api/getContent/:' + ids;

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