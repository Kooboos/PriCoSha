import {userDataMap, dataMapKeys} from '../Components/UserDataMap.js';

export const removeGroup = (groupName, creator) => new Promise((resolve, reject) => {
 
    //remove group    

    const query = 'http://localhost:5000/api/removeGroup/:' + groupName + '/:' + creator;
    
        fetch(query, {
            mode: "cors",
            method: "GET"
        }
            ).then(response => {
                response.json().then(json=>{
                    //This is the response after removing Group. If status === 'OK', proceed with adding users to group
                    if(json.status === 'OK'){
                        console.log('group removed!!!');
                        //Now we need to add all members from 'userNames' into friendGroup.
                        resolve({status:'OK'});
                    }
                    else{
                        //Something went wrong
                        console.log('sommething went wrong while removing friendGroup');
                        resolve({status:'FAILED'})
                    }
                }).catch(error => {
                    reject(error);
                })
        })
    
});