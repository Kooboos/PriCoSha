import {userDataMap, dataMapKeys} from './UserDataMap';
import React, {Component} from 'react';
import { getPublicContent } from '../Methods/getPublicContent';

export class ContentWindow extends Component{
    constructor(props){
        super(props);

        this.state = {
            loggedIn: userDataMap.get(dataMapKeys.loginStatus),
            publicContent: [],
            isTableCreated: false
        }

        if(this.props.publicContent.length !== 0){
            this.setState({publicContent: this.props.publicContent});
        }

        if(this.state.loggedIn && this.props.publicContent.length === 0){
            //prepare friendGroup stuff
            
            this.update();

        }

    }

    update(){
        console.log('inside Update');
        if(document.getElementById('contentTable') !== null){
            document.getElementById('contentTable').innerHTML = "";
        }

        //Content Query HERE
        getPublicContent().then(response=>{
            console.log('these are the public Content Items: ', response);
            
            let publicContent = [];
            for(let i = 0; i< response.rows.length; i++){
                publicContent.push([
                    response.rows[i].id, 
                    response.rows[i].username, 
                    response.rows[i].timest, 
                    response.rows[i].content_name, 
                    response.rows[i].file_path
                ])
            }

            this.setState({publicContent:publicContent});

            if(response.rows.length != 0){
                this.createHTMLTable();
                this.setState({isTableCreated: true});
            }
        })

    }

    setGroupTable(){
        if(this.state.publicContent.length !== 0){
            document.getElementById('contentTable').innerHTML = "";
            this.createHTMLTable();
        }
                
    }

    createHTMLTable() {
        let myTableDiv = document.getElementById("contentTable")
        console.log('myTableDiv:', myTableDiv);
        let table = document.createElement('TABLE')
        let tableBody = document.createElement('TBODY')
    
        table.border = '1'
        table.appendChild(tableBody);
    
        const heading = new Array();
        heading[0] = "ID";
        heading[1] = 'posted by';
        heading[2] = 'timestamp';
        heading[3] = 'content name';
        heading[4] = 'text';
    
    
        //TABLE COLUMNS
        let tr = document.createElement('TR');
        for (let i = 0; i < heading.length; i++) {
            let th = document.createElement('TH')
            th.width = '75';
            th.appendChild(document.createTextNode(heading[i]));
            tr.appendChild(th);
        }
        tableBody.appendChild(tr);
        

        for (let i = 0; i < this.state.publicContent.length; i++) {
            let tr = document.createElement('TR');
            for(let j = 0; j < 5; j++){
                let td = document.createElement('TD');
                td.appendChild(document.createTextNode(this.state.publicContent[i][j]));
                tr.appendChild(td)    
            }
            tableBody.appendChild(tr);
        }  
        
        myTableDiv.appendChild(table)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.operation === 'Refresh_Content'){
            console.log('refreshing Content')
            this.update();
            this.props.finishOperation;
        }

        if(nextProps.operation === 'Lookup_Group_Content'){
            console.log('setting groupContent into window');
            if(document.getElementById('friendGroupLogin') !== null){
                document.getElementById('friendGroupLogin').innerHTML = "";
            }
            let groupContent = [];
            const friendGroupContent = nextProps.homeState.content;

            for(let i = 0; i< friendGroupContent.length; i++){
                groupContent.push([
                    friendGroupContent[i].id, 
                    friendGroupContent[i].username, 
                    friendGroupContent[i].timest, 
                    friendGroupContent[i].content_name, 
                    friendGroupContent[i].file_path
                ])
            }

            console.log('groupContent:', groupContent);
            this.setState({publicContent:groupContent});

            this.props.finishOperation;
            //updateTable using state.
            this.setGroupTable();
        }

    }

    render(){
        if(this.state.loggedIn){
            if(this.state.publicContent.length === 0){
                return(
                    <div id='contentWindow'>
                        There is no Content right now. ask Santa Clause to make some Content.
                    </div>
                )
            }
            else{
                return(
                    <div id='contentWindow'>
                        <div id='contentTable'>
                            {/* display table here */}
                            
                        </div>
                    </div>
                )
            }
        }
        else{
            return(
                <div id='contentTable'>
                    Log in to see public content.
                </div>
            )
        }
        
    }
}