import {userDataMap, dataMapKeys} from '../Components/UserDataMap.js';
import {checkForExistingFriendGroup} from './checkForExistingFriendGroup.js';

export const createGroup = (groupName, userNames, description) => new Promise((resolve, reject) => {
 

    //create friendGroup
    

    const creator = userDataMap.get(dataMapKeys.username);


    checkForExistingFriendGroup(creator,groupName).then(response =>{
        if(response.status ==='OK'){
            //continue
            const query = 'http://localhost:5000/api/createGroup/:' + groupName + '/:' + creator + '/:' + description;
            
                fetch(query, {
                    mode: "cors",
                    method: "GET"
                }
                    ).then(response => {
                        response.json().then(json=>{
                            //This is the response after Creating Group. If status === 'OK', proceed with adding users to group
                            if(json.status === 'OK'){
                                console.log('group created!!!');
                                //Now we need to add all members from 'userNames' into friendGroup.

                            }
                        }).catch(error => {
                            reject(error);
                        })
                })




        }
        else{
            alert('Cannot create FriendGroup, as it already exists!');
        }
    })


    


    //for each name in Username, send fetch query to server.


    // const query = 'http://localhost:5000/api/getFriendsFromGroups/:' + groupName + '/:' + username;

    // fetch(query, {
    //     mode: "cors",
    //     method: "GET"
    // }
    //     ).then(response => {
    //         response.json().then(json=>{
    //             //This is the response after getting all users from FriendGroup
    //             resolve(json.rows);
    //         }).catch(error => {
    //             reject(error);
    //         })
    // })
    
});