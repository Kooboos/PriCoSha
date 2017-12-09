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
            operation: 'NO-OP'
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
        if(this.setState.loggedIn){
            //refreshGroups
            console.log('inside Home/Refreshgroups');
            this.setState({operation:'Refresh_FriendGroups'})
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
                    </div>
                    <div id='SearchFriendGroups'>
                        <SearchFriendGroups/>
                    </div>

                </div>
            
            
            </div>
        );
    }
}