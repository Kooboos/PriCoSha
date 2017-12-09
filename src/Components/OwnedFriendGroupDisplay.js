import React, {Component} from 'react';
import {userDataMap, dataMapKeys} from './UserDataMap.js';
import {queryFriendGroups} from '../Methods/queryFriendGroups.js'

export class OwnedFriendGroupDisplay extends Component{
    constructor(props){
        super(props);

        this.state = {
            loggedIn: userDataMap.get(dataMapKeys.loginStatus),
            friendGroups: [],
            isTableCreated: false
        }

        if(this.props.friendGroups.length !== 0){
            this.setState({friendGroups: this.props.friendGroups});
        }

        if(this.state.loggedIn && this.props.friendGroups.length === 0){
            //prepare friendGroup stuff
            
            this.update();

        }
    }

    update(){
        console.log('inside Update');
        if(document.getElementById('friendGroupLogin') !== null){
            document.getElementById('friendGroupLogin').innerHTML = "";
        }
        queryFriendGroups(userDataMap.get(dataMapKeys.username)).then(list => {
            //do something with list of names
            console.log('list:', list);

            this.setState({friendGroups: list});
            if(list.length != 0){
                this.createHTMLTable();
                this.setState({isTableCreated: true});
            }
        })
    }

    createHTMLTable() {
        let myTableDiv = document.getElementById("friendGroupLogin")
        console.log('myTableDiv:', myTableDiv);
        let table = document.createElement('TABLE')
        let tableBody = document.createElement('TBODY')
    
        table.border = '1'
        table.appendChild(tableBody);
    
        const heading = new Array();
        heading[0] = "Group Name"
    
    
        //TABLE COLUMNS
        let tr = document.createElement('TR');
        tableBody.appendChild(tr);
        for (let i = 0; i < heading.length; i++) {
            let th = document.createElement('TH')
            th.width = '75';
            th.appendChild(document.createTextNode(heading[i]));
            tr.appendChild(th);
        }
    
        //TABLE ROWS
        for (let i = 0; i < this.state.friendGroups.length; i++) {
            let tr = document.createElement('TR');
            let td = document.createElement('TD')
            td.appendChild(document.createTextNode(this.state.friendGroups[i].group_name));
            tr.appendChild(td)
            tableBody.appendChild(tr);
        }  
        myTableDiv.appendChild(table)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.operation === 'Refresh_FriendGroups'){
            this.update();
        }
        this.props.finishOperation;
    }

    render(){
        if(this.state.loggedIn){
            if(this.state.friendGroups.length === 0){
                return(
                    <div id='friendGroupLogin'>
                        You have no friend groups :( Why don't you create a group!
                    </div>
                )
            }
            else{
                //return all friendGroups in a list here
                return(
                    <div id='friendGroupLoginContainer'>
                        <div id='friendGroupLogin'>
                            {/* display table here */}
                            
                        </div>
                    </div>
                    
                )
            }
            
        }
        else{
            return(
                <div id='friendGroupLogin'>
                    Please Log In To Access Your 'FriendGroups'
                </div>
            )
        }
        
    }
}