var hash = require('hash.js')

export const changePass = (newPass, username) => new Promise((resolve, reject) => {
    
    const password = hash.sha256().update(newPass).digest('hex');
    
    const query = 'http://localhost:5000/api/changePass/:' + password + '/:' + username;

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