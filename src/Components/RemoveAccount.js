import React, {Component} from 'react';
import {userDataMap, dataMapKeys} from './UserDataMap.js';
import { Route, Redirect } from 'react-router';
import {logout} from './Logout.js';
import {removeMeFromMembers} from '../Methods/removeMeFromMembers';
import {removeMyFriendGroups} from '../Methods/removeMyFriendGroups';
import { removeTags } from '../Methods/removeTags';
import { removeMeFromShare } from '../Methods/removeMeFromShare';
import { removeMeFromComments } from '../Methods/removeMeFromComments';
import { removeMeFromContent } from '../Methods/removeMeFromContent';
var md5 = require('md5');


export class RemoveAccount extends Component{
    constructor(props){
        super(props);

        this.state = {
            removingAccount: true
        }
    }

    
    submitClicked(){
        //grab user and pass from fields
        const username = document.getElementById('usernameInput').value;
        const passwordVal = document.getElementById('passwordInput').value;
        const firstName = document.getElementById('fnameInput').value;
        const lastName = document.getElementById('lnameInput').value;
        const password = md5(passwordVal);
        console.log('first log');

        removeTags(username).then(response=>{
            if(response.status === 'OK'){
                removeMeFromComments(username).then(response=>{
                    if(response.status === 'OK'){
                        removeMeFromShare(username).then(response=>{
                            if(response.status === 'OK'){
                                removeMeFromContent(username).then(response=>{
                                    if(response.status === 'OK'){
                                        removeMeFromMembers(username).then(response=>{
                                            if(response.status === 'OK'){
                                                removeMyFriendGroups(username).then(response => {
                                                    if(response.status === 'OK'){
                                                        this.removeAccount(username, password, firstName, lastName);
                                                    }
                                                })     
                                            }
                                        })   
                                    }
                                })            
                            }
                        })
                    }
                })
            }
        })

        // removeMeFromMembers(username).then(response => {
        //     if(response.status === 'OK'){
        //         removeMeFromShare(username).then(response=>{
        //             if(response.status === 'OK'){
        //                 removeTags(username).then(response =>{
        //                     console.log('responsefrom removeTags:', response);
        //                     removeMeFromComments(username).then(response=>{
        //                         if(response.status === 'OK'){
        //                             removeMyFriendGroups(username).then(response => {
        //                                 if(response.status === 'OK'){
        //                                     this.removeAccount(username, password, firstName, lastName);                            
                                    
        //                                 }
        //                             })
        //                         }
        //                     })
                            
        //                 })
        //             }
        //         })
                
            
        //     }
        // })
        
    }

    removeAccount(username, password, firstName, lastName){
        console.log('user:', username);
        console.log('pass:', password);

        const removeAccountQuery = 'http://localhost:5000/api/removeAccount' + '/:' + username + '/:' + password + '/:' + firstName + '/:' + lastName;
        
        fetch(removeAccountQuery, {
            mode: "cors",
            method: "GET"
        }
            ).then(response => {
                console.log('response:', response);
                response.json().then(json=>{
                    console.log('json:', json);
                    // if status = deleted, then go back to home page. if not, stay on this page
                    if(json.status === 'deleted'){
                        console.log('Account removed');
                           logout()
                        this.setState({removingAccount: false});

                    } else {
                        //show message saying that removal was failed
                        window.alert('Credentials are incorrect, try again');
                    }
                })
        })
    }
    

    render(){
        if(!this.state.removingAccount){
            return(
                <Redirect to="/"/>                
            )
        } else{
            return(
                <div>
                    <div>In order to remove your account, all credentials must match!</div>
                    <div>This operation is irreversable!</div>
                    <div> NO ERROR CHECKING HERE. PLEASE TYPE IN CREDENTIALS EXACTLY. BETTER ERROR CHECKING IN FUTURE UPDATES</div>
      <div className="imgcontainer">
        <img src="../Resources/login_Icon.png" alt="Picture Placeholder" className="avatar"/>
      </div>
    
      <div className="container">
        <label><b>Username</b></label>
        <input id='usernameInput' type="text" placeholder="Enter Username"/>
    
        <label><b>Password</b></label>
        <input id='passwordInput' type="password" placeholder="Enter Password"/>

        <label><b>First Name</b></label>
        <input id='fnameInput' type="text" placeholder="First Name"/>

        <label><b>Last Name</b></label>
        <input id='lnameInput' type="text" placeholder="Last Name"/>

        <button id='BigGreenButton' type="submit" onClick={this.submitClicked.bind(this)}>Remove Account</button>
      </div>
                </div>
            );
        }
        
    }
}