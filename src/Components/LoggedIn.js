import React, {Component} from 'react';
import {userDataMap, dataMapKeys} from './UserDataMap.js';


export class LoggedIn extends Component{
    constructor(props){
        super(props);

    }

    render(){
        if(this.props.loggedIn === true){
            return(
                <div>
                    Logged in as: {userDataMap.get(dataMapKeys.firstName)} {userDataMap.get(dataMapKeys.lastName)}
                </div>
            )
        }
        else{
            return(
                <div>
                    Not Logged In
                </div>
            )
        }
    }
}    