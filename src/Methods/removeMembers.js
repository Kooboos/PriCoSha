import {userDataMap, dataMapKeys} from '../Components/UserDataMap.js';

export const removeMembers = (groupName) => new Promise((resolve, reject) => {
 
    //remove group    

    const query = 'http://localhost:5000/api/removeFriendsFromMember/:' + groupName;
    
        fetch(query, {
            mode: "cors",
            method: "GET"
        }
            ).then(response => {
                response.json().then(json=>{
                    //This is the response after removing Members. If status === 'OK', proceed with adding users to group
                    if(json.status === 'OK'){
                        console.log('Members removed!!!');
                        resolve({status:'OK'});
                    }
                    else{
                        //Something went wrong
                        console.log('sommething went wrong while removing members');
                        resolve({status:'FAILED'})
                    }
                }).catch(error => {
                    reject(error);
                })
        })
    
});