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
    
    this.checkForPriCoSha.bind(this);
  }

  checkForPriCoSha(){
    console.log('runningCheck');
    fetch('http://localhost:5000/api/checkForDatabase', {
      mode: "cors",
      method: "GET"
  }
      ).then(response => {
          console.log('response:', response);
          response.json().then(json=>{
              console.log('json:', json);
              // If rows returned !== 0, then database exists, and we don't need to do anything
              if(json.rows.length === 0){
                  this.buildPriCoSha();
              } else{
              console.log('Database Present');           
              }
          })
  })

  }

  /*
  Build Database by fetching multiple queries.
  start with create Database named PriCoSha,
  then build each table. 
  */
  buildPriCoSha(){
    const DatabaseCreationQuery = 'http://localhost:5000/api/createDatabase';
    fetch(DatabaseCreationQuery, {
      mode: "cors",
      method: "GET"
  }
      ).then(response => {
          response.json().then(json=>{
                if(json.status === 'OK'){
                  //continue
                }
                else{
                  throw 'Error Creating Database';
                }
          })
  })



  .catch(function(reason) {
    console.log('error:', reason);
    window.alert('There has been an error building the database. Contact Santa Clause for Help.');
 });
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
