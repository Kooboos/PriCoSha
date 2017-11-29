import React, {Component} from 'react';
import {userDataMap, dataMapKeys} from './UserDataMap.js';
import { Route, Redirect } from 'react-router'

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
        
        //use this following line when database gets modified to account for hashed values.
        // const passwordVal = document.getElementById('passwordInput').value;
        // const password = hash.sha256().update(passwordVal).digest('hex');
        console.log('user:', username);
        console.log('pass:', password);

        const query = 'http://localhost:5000/api/loginQuery' + '/:' + username + '/:' + password;

        fetch(query, {
            mode: "cors",
            method: "GET"
        }
            ).then(response => {
                response.json().then(json=>{
                    //if it is not empty, go back to homepage, store username in global map
                    if(!(json.rows.length === 0 && json.constructor === Object)){
                        console.log('login successful');
                        userDataMap.set(dataMapKeys.username, json.rows[0].username);
                        userDataMap.set(dataMapKeys.firstName, json.rows[0].first_name);
                        userDataMap.set(dataMapKeys.lastName, json.rows[0].last_name);
                        userDataMap.set(dataMapKeys.loginStatus, true);

                        //go back to homePage with new Info
                        this.setState({loggedIn: true});
                        // window.history.back();

                    } else {
                        //show message saying that login was failed
                        window.alert('Username or Password is incorrect, try again');
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