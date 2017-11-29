import React, {Component} from 'react';
import {userDataMap, dataMapKeys} from './UserDataMap.js';
import { Route, Redirect } from 'react-router';
import {logout} from './Logout.js';

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
        const password = document.getElementById('passwordInput').value;
        const firstName = document.getElementById('fnameInput').value;
        const lastName = document.getElementById('lnameInput').value;

        // const password = hash.sha256().update(passwordVal).digest('hex');
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