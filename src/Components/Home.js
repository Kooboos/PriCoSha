import React, {Component} from 'react';
import logo from '../logo.svg';

//User Data Map cpmponents
import {userDataMap, dataMapKeys} from './UserDataMap.js';

//Imported Components
import {LoggedIn} from './LoggedIn.js';

//Imported Methods
import {logout} from './Logout.js';

//TODO create line React Component
//TODO create welcome message React Component which will render message with username
//TODO create React Component which will render the number of followers the user has
let message;
let num;
let line;

export class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            loggedIn: userDataMap.get(dataMapKeys.loginStatus)
        }

    }
    
    logoutClicked(){
        logout();
        this.setState({loggedIn:false});
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
    
              <h4>15 most recent tweets from you and your followers:</h4>
              <br/>
    
              {/* Create React component which will query DB and return all 15 last tweets */}
              <p>{line}</p>
            </div>
            
            
            
            </div>
        );
    }
}