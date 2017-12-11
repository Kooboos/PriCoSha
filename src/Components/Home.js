import React, {Component} from 'react';
import logo from '../logo.svg';

//User Data Map cpmponents
import {userDataMap, dataMapKeys} from './UserDataMap.js';

//Imported Components
import {LoggedIn} from './LoggedIn.js';
import {OwnedFriendGroupDisplay} from './OwnedFriendGroupDisplay.js';
import {SearchFriendGroups} from './SearchFriendGroups.js';

//Imported Methods
import {logout} from './Logout.js';
import {createGroup} from '../Methods/createGroup.js';
import { AddFriendsToFriendGroup } from './addFriendToFriendGroup';
import { ContentWindow } from './ContentWindow';
import { getGroupContent } from '../Methods/getGroupContent';
import { addContent } from '../Methods/addContent';
import { getMostRecentContent } from '../Methods/getMostRecentContent';
import { linkContentToGroup } from '../Methods/linkContentToGroup';
import { addComment } from '../Methods/addComment';
import { showComments } from '../Methods/showComments';

//TODO create line React Component
//TODO create welcome message React Component which will render message with username
//TODO create React Component which will render the number of followers the user has
let message;
let num;
let line;

export class Home extends Component{
    constructor(props){
        super(props);

        console.log('Login Status:', userDataMap.get(dataMapKeys.loginStatus));

        this.state = {
            loggedIn: userDataMap.get(dataMapKeys.loginStatus),
            operation: 'NO-OP',
            content: []
        }

    }
    
    logoutClicked(){
        logout();
        this.setState({loggedIn:false});
    }


    finishOperation(){
        this.setState({operation:'NO-OP'});
    }

    
    
    addFriendGroupClicked(){
        if(this.state.loggedIn){
            //add new Group
            let txt = '';
            const groupName = prompt("Please enter your Group Name:");
            const groupMemberNames = prompt("Please enter your friends usernames, seperated by a comma: ");
            const description = prompt("Please enter a description for the group:");
            if (groupName === null || groupName === "" || groupMemberNames === null || groupMemberNames === "" || description === null || description === '') {
                console.log('user canceled Operation.');
            } else {
                console.log('it worked, proceed with query to create DB');
                console.log('groupName:', groupName);
                console.log('groupMemberNames:', groupMemberNames);
                //take groupMemberNames, split by ',', then strip of whitespace.

                const splitMembers = groupMemberNames.split(',');
                let memberNames = [];
                for(let i=0; i< splitMembers.length; i++){
                    memberNames.push(splitMembers[i].trim());
                }

                createGroup(groupName, memberNames, description).then(response=>{
                    console.log('inside createGroup:', response);
                    this.refreshFriendGroups();
                });


            }
            


        }
    }

    refreshFriendGroups(){
        console.log('inside Home/Refreshgroups');
        this.setState({operation:'Refresh_FriendGroups'})
    }

    refreshFriendGroupsClicked(){
        if(this.state.loggedIn){
            //refreshGroups
            console.log('inside Home/Refreshgroups');
            this.setState({operation:'Refresh_FriendGroups'})
        }
    }

    removeGroupClicked(){
        if(this.state.loggedIn){
            console.log('removing Group');
            this.setState({operation:'Remove_Group'});
        }
    }

    lookupGroupContentClicked(){
        if(this.state.loggedIn && document.getElementById('lookupContentInput').value !== ''){
            const groupName = document.getElementById('lookupContentInput').value;          
            console.log('looking up group content');
            getGroupContent(groupName).then(response =>{
                console.log(response);
                this.setState({content: response.rows});
                this.setState({operation: 'Lookup_Group_Content'});
            })
        }
    }

    refreshContentClicked(){
        console.log('inside refreshContent');
        if(this.state.loggedIn){
            console.log('refreshing public content');
            this.setState({operation: 'Refresh_Content'});
        }
    }

    addContentClicked(){
        if(this.state.loggedIn){
            console.log('addingContent');
            const username = userDataMap.get(dataMapKeys.username);
            const comment = prompt('What is your Content Comment?');
            const contentName = prompt('What is the title of your content?');
            const publicOrNot = prompt('Do you want your content to be public? (true/false)');
            let numPublic = '';
            if(publicOrNot === 'true'){
                numPublic = '1';
            }
            else{
                numPublic = '0'
            }
            let friendGroup = '';
            if(numPublic === '1' || numPublic === '0'){
                if(numPublic ==='0'){
                    friendGroup = prompt('What is the name of the FriendGroup you want to share it to?');
                    addContent(username, comment, contentName, numPublic).then(response =>{
                        console.log('this is the response from adding content:', response);
                        getMostRecentContent().then(response =>{
                            console.log('this is the most recent Content:', response);
                            //now Link Content to Shared;
                            linkContentToGroup(response.rows[0].id, friendGroup, username).then(response =>{
                                console.log('response afterLink:', response)
                                if(response){
                                    alert('private content shared to group: ' + friendGroup + '!');
                                }
                                else{
                                    alert('something went wrong. talk to Santa Clause.');
                                }
                            })
                        })
                    })
                }
                else{
                    addContent(username, comment, contentName, numPublic).then(response =>{
                        console.log('this is the response from adding content:', response);
                        this.refreshContentClicked();
                    })
                }

            }
            else{
                alert('must input "true" or "false". Try Again');
            }
            

        }
    }

    addCommentClicked(){
        if(this.state.loggedIn && document.getElementById('addCommentInput').value !== ''){
            const id = document.getElementById('addCommentInput').value;
            const comment = prompt('Comment:');
            addComment(userDataMap.get(dataMapKeys.username), comment, id).then(response =>{
                console.log('response from addComment:', response);
                if(response.status === 'OK'){
                    alert('your comment has been successfully added');
                }
                else{
                    alert('Santa Clause said that the Content you want to comment on doesn\'t exist');
                }
            })
        }
    }

    showCommentsClicked(){
        if(this.state.loggedIn && document.getElementById('addCommentInput').value !== ''){
            const id = document.getElementById('addCommentInput').value;
            showComments(id).then(response =>{
                console.log('response from showComments:', response);
                if(response.status === 'OK'){
                    if(response.rows.length === 0){
                        alert('This Content item has 0 comments. Why don\'t you add one!?');                        
                    }
                    else{
                        let alertString = '';

                        for(let i=0; i< response.rows.length; i++){
                            alertString = alertString + i+1 + '. Comment: '+ response.rows[i].comment_text + '. Commented By: ' + response.rows[i].username + ', on: '+ response.rows[i].timest + '. \n';
                        }
                        alert(alertString);
                    }
                }
                else{
                    alert('These are not the droids you\'re looking for. There is also no content with id: '+id);
                }
            })
        }
    }



    render(){
        return(
            <div className="App">
            
            
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">Welcome to PriCoSha</h1>
              <h2 id='UnderTitle'>(Yes, we "borrowed" the React Logo...)</h2>
            </header>
    
            <div>
              
              <span>
                <a href="/login" style={{marginLeft: '5px',marginRight: '5px'}}>Login</a>
              </span>
              <span>
                <a href="/register" style={{marginLeft: '5px', marginRight: '5px'}}>Register</a>
              </span>
              <span>
                  <button onClick={this.logoutClicked.bind(this)}>Logout</button>
                {/* <a href="/logout" style={{marginLeft: '5px', marginRight: '5px'}}>Logout</a> */}
              </span>
              <span>
                <a href="/remove_account" style={{marginLeft: '5px', marginRight: '5px'}}>Remove Account</a>
              </span>
              <span>
                  <LoggedIn loggedIn={userDataMap.get(dataMapKeys.loginStatus)}/>
              </span>
              
              
              <a href="/tweets">View your tweets</a>
              <br/>
              <a href="/find_people">Find people to follow</a>
              <br/>
              <a href="/unfollow">Unfollow someone</a>
              <br/>
              <a href="/view_followed">View people you have followed</a>
              <br/>
    
            </div>
                <div>
                    <div id='FriendGroupComponent'>
                        <OwnedFriendGroupDisplay 
                        friendGroups = {[]}
                        operation = {this.state.operation}
                        finishOperation = {this.finishOperation.bind(this)}
                        />
                    </div>
                    
                    <div id='FriendGroupButtons'>
                        <button id='addFriendGroupButton' onClick={this.addFriendGroupClicked.bind(this)}>Add Group</button>
                        <button id='refreshFriendGroupsButton' onClick={this.refreshFriendGroupsClicked.bind(this)}>Refresh</button>
                        <button id='removeGroupButton' onClick={this.removeGroupClicked.bind(this)}>Remove Group</button>
                        <span>
                            <input id='removeFriendGroupInput' type='text' style={{width:'150px', height:'20px', marginLeft:'-10px', borderColor:'black', borderStyle:'solid', borderWidth:'5px'}}/>
                        </span>
                    </div>
                    <div id='SearchFriendGroups'>
                        <SearchFriendGroups/>
                    </div>
                    <div id='addFriendsToGroup'>
                        <AddFriendsToFriendGroup/>
                    </div>
                    <div id='ContentWindowContainer'>
                            <ContentWindow
                            homeState = {this.state}
                            publicContent = {[]}
                            operation = {this.state.operation}
                            finishOperation = {this.finishOperation.bind(this)}/>
                    </div>
                    <div id='ContentWindowButtons'>
                        <span>
                            <input id='lookupContentInput' type='text' placeholder='FriendGroup Name' style={{width:'150px', height:'20px', marginLeft:'-10px', borderColor:'black', borderStyle:'solid', borderWidth:'5px'}}/>
                        </span>
                        <button id='LookupContentButton' onClick={this.lookupGroupContentClicked.bind(this)}>Lookup Group Content</button>
                        <button id='refreshPublicContent' onClick={this.refreshContentClicked.bind(this)}>Refresh</button>
                        <button id='addContentButton' onClick={this.addContentClicked.bind(this)}>Add Content</button>
                        
                    </div>
                    <div id='commentButtons'>
                        <input
                        id='addCommentInput'
                        type='number' 
                        style={{width:'150px', height:'20px', borderColor:'black', borderStyle:'solid', borderWidth:'5px'}}
                        placeholder='Content ID'
                        />
                        <button id='addCommentButton' onClick={this.addCommentClicked.bind(this)}>Add Comment</button>
                        <button id='showCommentButton' onClick={this.showCommentsClicked.bind(this)}>Show All Comments</button>
                    </div>


                </div>
            
            
            </div>
        );
    }
}