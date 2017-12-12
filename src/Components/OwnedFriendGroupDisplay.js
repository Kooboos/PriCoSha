import React, {Component} from 'react';
import {userDataMap, dataMapKeys} from './UserDataMap.js';
import {queryFriendGroups} from '../Methods/queryFriendGroups.js';
import {removeGroup} from '../Methods/removeFriendGroup';
import {removeMembers} from '../Methods/removeMembers';
import { getFriendGroup } from '../Methods/removeFriendGroupMethods/getFG';
import { getShared } from '../Methods/removeFriendGroupMethods/getShared';
import { queryFriendsFromGroup } from '../Methods/queryFriendsFromGroup';
import { getMembers } from '../Methods/getMembers';
import { getContent } from '../Methods/removeFriendGroupMethods/getContent';
import { removeComments } from '../Methods/removeFriendGroupMethods/removeComments';
import { removeTags } from '../Methods/removeFriendGroupMethods/removeTags';
import { removeContent } from '../Methods/removeFriendGroupMethods/removeContent';
import { removeShared } from '../Methods/removeFriendGroupMethods/removeShared';
import { removeFg } from '../Methods/removeFriendGroupMethods/removeFG';

export class OwnedFriendGroupDisplay extends Component{
    constructor(props){
        super(props);

        this.state = {
            loggedIn: userDataMap.get(dataMapKeys.loginStatus),
            friendGroups: [],
            isTableCreated: false
        }

        if(this.props.friendGroups.length !== 0){
            this.setState({friendGroups: this.props.friendGroups});
        }

        if(this.state.loggedIn && this.props.friendGroups.length === 0){
            //prepare friendGroup stuff
            
            this.update();

        }
    }

    update(){
        console.log('inside Update');
        if(document.getElementById('friendGroupLogin') !== null){
            document.getElementById('friendGroupLogin').innerHTML = "";
        }
        queryFriendGroups(userDataMap.get(dataMapKeys.username)).then(list => {
            //do something with list of names
            console.log('list:', list);

            this.setState({friendGroups: list});
            if(list.length != 0){
                this.createHTMLTable();
                this.setState({isTableCreated: true});
            }
        })
    }

    createHTMLTable() {
        let myTableDiv = document.getElementById("friendGroupLogin")
        console.log('myTableDiv:', myTableDiv);
        let table = document.createElement('TABLE')
        let tableBody = document.createElement('TBODY')
    
        table.border = '1'
        table.appendChild(tableBody);
    
        const heading = new Array();
        heading[0] = "Group Name"
    
    
        //TABLE COLUMNS
        let tr = document.createElement('TR');
        tableBody.appendChild(tr);
        for (let i = 0; i < heading.length; i++) {
            let th = document.createElement('TH')
            th.width = '75';
            th.appendChild(document.createTextNode(heading[i]));
            tr.appendChild(th);
        }
    
        //TABLE ROWS
        for (let i = 0; i < this.state.friendGroups.length; i++) {
            let tr = document.createElement('TR');
            let td = document.createElement('TD')
            td.appendChild(document.createTextNode(this.state.friendGroups[i].group_name));
            tr.appendChild(td)
            tableBody.appendChild(tr);
        }  
        myTableDiv.appendChild(table)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.operation === 'Refresh_FriendGroups'){
            this.update();
            this.props.finishOperation;    
        }

        if(nextProps.operation === 'Remove_Group'){
            console.log('removing from ownedFriendGroupDisplay');
            const groupName = document.getElementById('removeFriendGroupInput').value;
            console.log('groupName:', groupName);
            if(groupName !== '' && groupName !== null){
                //run sql to remove group, then run 'this.update();

                // removeMembers(groupName).then(response =>{
                //     console.log('response in ownedFriendGroups:', response);
                //     if(response.status === 'OK'){
                //         //remove group.
                //         removeGroup(groupName, userDataMap.get(dataMapKeys.username)).then(response =>{
                //             if(response.status === 'OK'){
                //                 this.update();
                //             }
                //             else{
                //                 alert('No friendGroup with such a name exists. Try again!');
                //             }
                //         });
                //     }
                //     else{
                //         console.log('something went wrong');
                //         alert('Something bad happened. Ask Santa Clause For Help');
                //     }


                // })

                getFriendGroup(groupName).then(getgroupResponse=>{
                    console.log('responseFromGetGroup:', getgroupResponse);
                    if(getgroupResponse.status === 'OK' && getgroupResponse.rows.length !== 0 ){
                        
                        getMembers(groupName, userDataMap.get(dataMapKeys.username)).then(getMembersResponse =>{
                            console.log('getMembersResponse:', getMembersResponse);
                            if(getMembersResponse.status === 'OK'){
                                getShared(userDataMap.get(dataMapKeys.username), groupName).then(getSharedResponse=>{
                                    console.log('SharedResponse:', getSharedResponse);
                                    if(getSharedResponse.status === 'OK'){
                                        //need the ID from sharedResponse, use that to delete rows from Content table
                                        let allIDs=[];
                                        for(let i = 0; i < getSharedResponse.rows.length; i++){
                                            allIDs.push((getSharedResponse.rows[i].id).toString()); 
                                        }
                                        console.log('ppushingIDS:', allIDs);
                                        getContent(allIDs).then(contentResponse=>{
                                            console.log('contentResponse:', contentResponse);
                                            //using contentResponse.id, remove all tags and all comments. then remove content
                                            let allIDs=[];
                                            for(let i = 0; i < contentResponse.rows.length; i++){
                                                allIDs.push((contentResponse.rows[i].id).toString()); 
                                            }
                                            console.log('removing Comments:');
                                            removeComments(allIDs).then(removeCommentsResponse=>{
                                                if(removeCommentsResponse.status === 'OK'){
                                                    console.log('removing tags');
                                                    removeTags(allIDs).then(removeTagsResponse=>{
                                                        if(removeTagsResponse.status === 'OK'){
                                                            //remove Content based on contentResponse
                                                            console.log('removingShared');
                                                            removeShared(allIDs).then(removeSharedResponse=>{
                                                                if(removeSharedResponse.status === 'OK'){
                                                                    console.log('remomvingContent');
                                                                    removeContent(allIDs).then(removeContentResponse=>{
                                                                        if(removeContentResponse.status ==='OK'){
                                                                            console.log('removingFG');
                                                                            removeFg(groupName, userDataMap.get(dataMapKeys.username)).then(removeFGResponse=>{
                                                                                console.log('removeFGResponse:', removeFGResponse);
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                    }
                                })
                            }
                        })
                    }
                })


























            }
            this.props.finishOperation;    
        }
    }

    render(){
        if(this.state.loggedIn){
            if(this.state.friendGroups.length === 0){
                return(
                    <div id='friendGroupLogin'>
                        You have no friend groups :( Why don't you create a group!
                    </div>
                )
            }
            else{
                //return all friendGroups in a list here
                return(
                    <div id='friendGroupLoginContainer'>
                        <div id='friendGroupLogin'>
                            {/* display table here */}
                            
                        </div>
                    </div>
                    
                )
            }
            
        }
        else{
            return(
                <div id='friendGroupLogin'>
                    Please Log In To Access Your 'FriendGroups'
                </div>
            )
        }
        
    }
}