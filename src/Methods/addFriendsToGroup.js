import {userDataMap, dataMapKeys} from '../Components/UserDataMap.js';
import {checkForExistingFriendGroup} from './checkForExistingFriendGroup.js';
import { removeGroup } from './removeFriendGroup';

export const addFriendsToGroup = (groupName, userNames, creator) => new Promise((resolve, reject) => {

    console.log('about to add Friends');
    const query = 'http://localhost:5000/api/addFriendToGroup/:' + groupName + '/:' + creator + '/:' + userNames;
    
        fetch(query, {
            mode: "cors",
            method: "GET"
        }
            ).then(response => {
                response.json().then(json=>{
                    console.log('addingFriendsResponse:', json);
                    //This is the response after Creating Group. If status === 'OK', proceed with adding users to group
                    if(json.status === 'OK'){
                        console.log('All Members Added Successfully');
                        resolve(json.status);
                    }
                    else if(json.status === 'FAILED'){
                        console.log('addFriendToGroup Failed, reverting create group');
                        removeGroup(groupName, creator).then(response =>{
                            console.log('this is the response after removing:', response);
                            resolve(response.status);
                        })
                    }

                }).catch(error => {
                    reject(error);
                })
        })
    
});