export const toggleBanner = (username, boolz) => new Promise((resolve, reject) => {
    
    let sendBool = '';
    if(boolz === '1'){
        sendBool = false;
    }
    else{
        sendBool = true;
    }
    const query = 'http://localhost:5000/api/toggleBanner/:'+ username + '/:'+boolz;

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