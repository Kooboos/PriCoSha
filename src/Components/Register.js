import React, {Component} from 'react';
import {userDataMap, dataMapKeys} from './UserDataMap.js';
import { Route, Redirect } from 'react-router'
var hash = require('hash.js')



export class Register extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            registered: false
        }
    }

    submitClicked(){
        const username = document.getElementById('usernameInput').value;
        const passwordVal = document.getElementById('passwordInput').value;
        const firstName = document.getElementById('fnameInput').value;
        const lastName = document.getElementById('lnameInput').value;

        const password = hash.sha256().update(passwordVal).digest('hex');
        console.log('user:', username);
        console.log('pass:', password);


        const checkerQuery = 'http://localhost:5000/api/checkUser' + '/:' + username;
        
        fetch(checkerQuery, {
            mode: "cors",
            method: "GET"
        }
            ).then(response => {
                response.json().then(json=>{
                    //If response is empty, then username is taken.
                    if((json.rows.length === 0 && json.constructor === Object)){
                        //good registration. send new fetch

                        //use the first query when database gets modified to recieve larger queries hashing
                        // const registrationQuery = 'http://localhost:5000/api/registerUser' + '/:' + username + '/:' + password + '/:' + firstName + '/:' + lastName;
                        const registrationQuery = 'http://localhost:5000/api/registerUser' + '/:' + username + '/:' + password + '/:' + firstName + '/:' + lastName;
                        
                        fetch(registrationQuery, {
                            mode: "cors",
                            method: "GET"
                        }
                            ).then(response => {
                                response.json().then(json=>{
                                       //Assume that it worked. send user to Login page.                                 
                                    this.setState({registered:true})
                                })
                        })

                    } else{
                        //show message saying that username was taken
                        window.alert('Username already taken! Try again');
                    }
                })
        })
    }
    

    render(){
        if(this.state.registered){
            return(
                <Redirect to="/login"/>                
            )
        } else{
            return(
                <div>
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
    
        <button id='BigGreenButton' type="submit" onClick={this.submitClicked.bind(this)}>Register</button>
      </div>
                </div>
            );
        }
        
    }
}