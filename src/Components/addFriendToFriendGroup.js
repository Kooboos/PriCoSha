import React, {Component} from 'react';
import {userDataMap, dataMapKeys} from './UserDataMap.js';
import { addFriendsToGroup } from '../Methods/addFriendsToGroup';

export class AddFriendsToFriendGroup extends Component{
    constructor(props){
        super(props);

    }

    addFriendToGroup(){
        const userName = document.getElementById('userNameToAdd').value;
        const groupName = document.getElementById('friendGroupTarget').value;
        const myUsername = userDataMap.get(dataMapKeys.username);

        addFriendsToGroup(groupName,userName, myUsername).then(response =>{
            console.log('response:', response);
        });

    }

    render(){
        if(userDataMap.get(dataMapKeys.loginStatus)){
            return(
                <div>
                    <div>----------------------------</div>                    
                    <div>
                        Add Friend to FriendGroup
                    </div>
                    <input id="userNameToAdd" type='text' placeholder="Enter Username" />
                    <input id="friendGroupTarget" type='text' placeholder="Enter Group Name" />
                    <button onClick={this.addFriendToGroup.bind(this)}>Add Friend!</button>
                </div>
            )
        }
        else{
            return(
                <div/>
            )
        }
        
    }
}