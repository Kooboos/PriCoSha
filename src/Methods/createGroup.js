import {userDataMap, dataMapKeys} from '../Components/UserDataMap.js';
import {checkForExistingFriendGroup} from './checkForExistingFriendGroup.js';
import { addFriendsToGroup } from './addFriendsToGroup';

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
                            console.log('groupCreatedQuery Ran:', json);
                            if(json.status === 'OK'){
                                console.log('group created!!!');
                                //Now we need to add all members from 'userNames' into friendGroup.

                                addFriendsToGroup(groupName, userNames, creator).then(json => {
                                    if(json === 'OK'){
                                        console.log('resolving after AddingFriends');
                                        resolve({status: json});
                                    }
                                    else{
                                        console.log('something went Wrong. Speak to Santa Clause Please');
                                        resolve({status: 'Failed'});
                                    }
                                })

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
    
});