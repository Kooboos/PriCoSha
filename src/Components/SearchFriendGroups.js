import React, {Component} from 'react';
import {userDataMap, dataMapKeys} from './UserDataMap.js';
import {queryFriendsFromGroup} from '../Methods/queryFriendsFromGroup'


export class SearchFriendGroups extends Component{
    constructor(props){
        super(props);

        this.state = {
            loggedIn: userDataMap.get(dataMapKeys.loginStatus),
        }

    }

    searchForFriendGroupsClicked(){
        const groupName = document.getElementById('searchFriendGroupsInput').value.trim();

        console.log('groupName:', groupName);
        //query for all members in group -> groupName
        queryFriendsFromGroup(groupName, userDataMap.get(dataMapKeys.username)).then(json=>{
            console.log('this is the response from the query:', json);

            let userList = []
            for(let i = 0; i < json.length; i++){
                userList.push(json[i].username);
            }
            alert('The following friends are part of ' + groupName + ': ' + userList);
        })
    }


    render(){
        if(this.state.loggedIn){
            //Show search bar with Search Button
            return(
                <div>
                    <div>Type in the name of your friendGroup to find the names of people in the group!</div>
                    <div>
                        <input
                        id='searchFriendGroupsInput'
                        type='text'
                        style={{width:'200px', height:'20px', marginLeft:'-30px', borderColor:'black', borderStyle:'solid', borderWidth:'5px'}}
                        />
                    </div>
                    <span>
                        <button onClick={this.searchForFriendGroupsClicked.bind(this)}>Search</button>
                    </span>

                    <div id='FriendGroupSearchResults'/>
                    

                </div>
            )
        }
        else{
            //show Nothing
            return(
                <div/>
            )
        }
        
    }

}