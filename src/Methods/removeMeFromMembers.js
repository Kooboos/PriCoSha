import {userDataMap, dataMapKeys} from '../Components/UserDataMap.js';

export const removeMeFromMembers = (creator) => new Promise((resolve, reject) => {
 
    //remove group    

    const query = 'http://localhost:5000/api/removeMeFromMember/:' + creator;
    
        fetch(query, {
            mode: "cors",
            method: "GET"
        }
            ).then(response => {
                response.json().then(json=>{
                    //This is the response after removing me from `Member`.
                    if(json.status === 'OK'){
                        console.log('group removed!!!');
                        //Now we need to add all members from 'userNames' into friendGroup.
                        resolve({status:'OK'});
                    }
                    else{
                        //Something went wrong
                        console.log('sommething went wrong while removing me from member');
                        resolve({status:'FAILED'})
                    }
                }).catch(error => {
                    reject(error);
                })
        })
    
});