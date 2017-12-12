import React, {Component} from 'react';
import {userDataMap, dataMapKeys} from './UserDataMap.js';
import { Route, Redirect } from 'react-router'
var hash = require('hash.js')

export class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            loggedIn: userDataMap.get(dataMapKeys.loginStatus)
        }
    }

    
    submitClicked(){
        //grab user and pass from fields
        const username = document.getElementById('usernameInput').value;
        
        //use this following line when database gets modified to account for hashed values.
        const passwordVal = document.getElementById('passwordInput').value;
        const password = hash.sha256().update(passwordVal).digest('hex');
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
                        userDataMap.set(dataMapKeys.showBanner, json.rows[0].showBanner);
                        userDataMap.set(dataMapKeys.bannerColor, json.rows[0].colorBanner);

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
        if(this.state.loggedIn){
            return(
                <Redirect to="/"/>                
            )
        } else{
            return(
                <div>
      <div className="imgcontainer">
        <img src="../Resources/login_Icon.png" alt="Picture Placeholder" className="avatar"/>
      </div>
    
      <div className="container">
        <label><b>Username</b></label>
        <input id='usernameInput' type="text" placeholder="Enter Username" name="uname"/>
    
        <label><b>Password</b></label>
        <input id='passwordInput' type="password" placeholder="Enter Password" name="psw"/>
    
        <button id='BigGreenButton' type="submit" onClick={this.submitClicked.bind(this)}>Login</button>
      </div>
                </div>
            );
        }
        
    }
}