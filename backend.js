var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var cors = require('cors');
var app = express();

const databaseName = 'PriCoSha';

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: databaseName
})

connection.connect(function(error){
    if(error){
        console.log('Error');
    } else{
        console.log('Success!');
    }
});

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    next();
});


app.get('/api/loginQuery/:username/:password',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";
    const password = "'" + (request.params.password).substr(1) + "'";

    connection.query("SELECT * From `Person` WHERE username =" + username + " AND password = "+ password,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({rows:rows});
            
            
        }
    })
});

app.get('/api/checkUser/:username',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";

    connection.query("SELECT * From `Person` WHERE username =" + username,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({rows:rows});
            
            
        }
    })
});

app.get('/api/registerUser/:username/:password/:firstName/:lastName',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";
    const password = "'" + (request.params.password).substr(1) + "'";
    const firstName = "'" + (request.params.firstName).substr(1) + "'";
    const lastName = "'" + (request.params.lastName).substr(1) + "'";
    
    const query = 'INSERT INTO `Person` (username, password, first_name, last_name) VALUES ('+ username + ', '+ password + ', ' + firstName + ', ' + lastName +')'; 
    console.log('registrationQuery:', query);
    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({rows:rows});
            
            
        }
    })
});

app.get('/api/removeAccount/:username/:password/:firstName/:lastName',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";
    const password = "'" + (request.params.password).substr(1) + "'";
    const firstName = "'" + (request.params.firstName).substr(1) + "'";
    const lastName = "'" + (request.params.lastName).substr(1) + "'";
    
    const query = 'DELETE FROM `Person` WHERE username = '+ username + ' AND password = ' + password + ' AND first_name = ' + firstName + ' AND last_name = ' + lastName; 
    console.log('removeAccountQuery:', query);
    connection.query(query,
    function(error, OkPacket){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Account successfully removed!!');
            if(OkPacket.affectedRows === 0){
                response.json({status: 'NOT_FOUND'});
            }
            else{
                response.json({status:'deleted'});
            }
            
            
        }
    })
});

app.get('/api/checkForDatabase',function(request, response){
    
    const query = ("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '" + databaseName + "'");

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log('Problem with Query!');
            console.log(error);
        } else {
            console.log('Successful Query!');
            console.log('rows:', rows);
            response.json({rows:rows});
            
        }
    })
});

app.get('/api/createDatabase',function(request, response){
    
    const query = ("CREATE DATABASE " + databaseName + ";");

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log('Problem with Query!');
            console.log(error);
        } else {
            console.log('Successful Query!');
            console.log('rows:', rows);
            response.json({status:'OK'});
            
        }
    })
});

app.get('/api/getFriendGroups/:username', function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'"
    console.log(username);
    const query = "SELECT group_name FROM `FriendGroup` WHERE username = " + username;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({rows:rows});
            
            
        }
    })
})

//Check to see if FriendGroup Exists
app.get('/api/checkFriendGroups/:username/:groupName',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";
    const groupName = "'" + (request.params.groupName).substr(1) + "'";

    const query = "SELECT * FROM `FriendGroup` WHERE username = " + username + "AND group_name = " + groupName;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({rows:rows});
            
            
        }
    })
});

//Get the names of all friends who are part of this group
app.get('/api/getFriendsFromGroups/:username/:groupName',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";
    const groupName = "'" + (request.params.groupName).substr(1) + "'";

    const query = "SELECT * FROM `Member` WHERE username_creator = " + username + "AND group_name = " + groupName;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({rows:rows});
                      
        }
    })
});

//create group
app.get('/api/createGroup/:groupName/:creator/:description',function(request, response){
    
    const creator = "'" + (request.params.creator).substr(1) + "'";
    const groupName = "'" + (request.params.groupName).substr(1) + "'";
    const description = "'" + (request.params.description).substr(1) + "'";

    const query = "INSERT INTO `FriendGroup` (group_name, username, description) VALUES ("+groupName+', '+ creator+', '+ description+")";
    
    console.log('query:', query);
    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({status:'OK'});
                      
        }
    })
});

//remove group
app.get('/api/removeGroup/:groupName/:creator',function(request, response){
    
    const creator = "'" + (request.params.creator).substr(1) + "'";
    const groupName = "'" + (request.params.groupName).substr(1) + "'";

    const query = "DELETE FROM `FriendGroup` WHERE username = " + creator +" AND group_name = " + groupName;
    
    console.log('removing Group:', groupName);
    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({status:'OK'});
                      
        }
    })
});

//Add person to a FriendGroup
app.get('/api/addFriendToGroup/:groupName/:creator/:userNames',function(request, response){
    const creator = "'" + (request.params.creator).substr(1) + "'";
    const groupName = "'" + (request.params.groupName).substr(1) + "'";    
    const groupMembers = request.params.userNames.split(',');
    console.log('groupMembers:', groupMembers);

    //construct query string to add to normal query string
    let construct = '';

    for(let i=0; i<groupMembers.length; i++){
        if(i === 0){
            construct = construct + '(' + "'" + groupMembers[i].substr(1) + "'" + ', ' + groupName + ', ' + creator + '), ';
            
        }
        else{
            construct = construct + '(' + "'" + groupMembers[i] + "'" + ', ' + groupName + ', ' + creator + '), ';    
        }
    }

    const allValues = construct.substring(0, construct.length -2);

    const query = "INSERT INTO `Member` (username, group_name, username_creator) VALUES " + allValues;
    console.log('query!!!!!!!!!!!!:', query);
    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log('Problem with Adding Friends Query!');
            response.json({status:'FAILED'});
        } else {
            console.log('Successfully Added Friends to group Query!');
            response.json({status:'OK'});
                      
        }
    })
});

//remove People from Member
app.get('/api/removeFriendsFromMember/:groupName',function(request, response){
    const groupName = "'" + (request.params.groupName).substr(1) + "'";    

    const query = "DELETE from `Member` WHERE group_name = " + groupName;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log('Problem with removing Friends Query!');
            response.json({status:'FAILED'});
        } else {
            console.log('Successfully removed Friends from group Query!');
            response.json({status:'OK'});
                      
        }
    })
});

//remove memberName from all FriendGroups
app.get('/api/removeMeFromMember/:memberName',function(request, response){
    const memberName = "'" + (request.params.memberName).substr(1) + "'";    

    const query = "DELETE from `Member` WHERE username_creator = " + memberName;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log('Problem with removing Friends Query!');
            response.json({status:'FAILED'});
        } else {
            console.log('Successfully removed Friends from group Query!');
            response.json({status:'OK'});
                      
        }
    })
});

//remove all of memberName's friendGroups
app.get('/api/removeMyFriendGroups/:memberName',function(request, response){
    const memberName = "'" + (request.params.memberName).substr(1) + "'";    

    const query = "DELETE from `FriendGroup` WHERE username = " + memberName;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log('Problem with removing Friends Query!');
            response.json({status:'FAILED'});
        } else {
            console.log('Successfully removed all friendGroups of' + memberName);
            response.json({status:'OK'});
                      
        }
    })
});


app.listen(5000);
