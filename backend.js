var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var cors = require('cors');
var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'PriCoSha'
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

// app.use(cors({
//     allowedOrigins: [
//         'localhost', 'localhost:3000/login'
//     ]
// }))

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });



// app.get('/api/loginq/:username/:password', function(req, res){
//     res.send(req.params.username);
//     console.log(req.params.username);
//     console.log(req.params.password);
// })
app.listen(5000);