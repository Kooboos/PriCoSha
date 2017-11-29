import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import {Login} from './Components/Login.js';
import {Home} from './Components/Home.js';
import {Register} from './Components/Register.js';
import {RemoveAccount} from './Components/RemoveAccount.js';
import {userDataMap, dataMapKeys} from './Components/UserDataMap.js';



class App extends Component {
  constructor(props){
    super(props);
    userDataMap.set(dataMapKeys.loginStatus, false);
    
  }

  checkForPriCoSha(){
    
  }

  buildPriCoSha(){

  }


  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/remove_account' component={RemoveAccount}/>
      </Switch>
      
    );
  }
}

export default App;
