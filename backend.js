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
            console.log('Successful Query!');
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

app.listen(5000);