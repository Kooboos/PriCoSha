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
    
    const query = 'INSERT INTO `Person` (username, password, first_name, last_name, showBanner, colorBanner) VALUES ('+ username + ', '+ password + ', ' + firstName + ', ' + lastName +', true, 000000)'; 
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
            response.json({status:'OK', rows:rows});    
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
            console.log('query:---------------:', query);
            console.log('-------------------------',error);
            console.log('Problem with removing Friends Query!');
            response.json({status:'FAILED'});
        } else {
            console.log('Successfully removed Friends from group Query!');
            response.json({status:'OK'});
                      
        }
    })
});

//remove Me from Share
app.get('/api/removeMeFromShare/:username',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";    

    const query = "DELETE from `Share` WHERE username = " + username;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log('query:---------------:', query);
            console.log('-------------------------',error);
            console.log('Problem with Me from Share Query!');
            response.json({status:'FAILED'});
        } else {
            console.log('Successfully removed Friends from group Query!');
            response.json({status:'OK'});
                      
        }
    })
});

//remove Me from Comments
app.get('/api/removeMeFromComments/:username',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";    

    const query = "DELETE from `Comment` WHERE username = " + username;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log('query:---------------:', query);
            console.log('-------------------------',error);
            console.log('Problem with Me from Comments Query!');
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
            console.log('query:---------------:', query);
            console.log('-------------------------',error);
            console.log('Problem with removing Friends Query!');
            response.json({status:'FAILED'});
        } else {
            console.log('Successfully removed Friends from group Query!');
            response.json({status:'OK'});
                      
        }
    })
});

//remove me from Content
app.get('/api/removeMeFromContent/:username',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";    

    const query = "DELETE from `Content` WHERE username = " + username;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log('query:---------------:', query);
            console.log('-------------------------',error);
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
            console.log('query:---------------:', query);
            console.log('-------------------------',error);
            console.log('Problem with removing Friends Query!');
            response.json({status:'FAILED'});
        } else {
            console.log('Successfully removed all friendGroups of' + memberName);
            response.json({status:'OK'});
                      
        }
    })
});

//Get All public content
app.get('/api/getPublicContent',function(request, response){

    const query = "SELECT * FROM `Content` WHERE public = true";

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successfully got public content!');
            response.json({rows:rows});
                      
        }
    })
});

//Get Group public content
app.get('/api/getGroupContent/:groupName',function(request, response){
    const groupName = "'" + (request.params.groupName).substr(1) + "'";    

    const query = "Select * From `Content` where id in (select id from `Share` where group_name = "+ groupName + ")";
    // const query1 = "SELECT * FROM `Content` WHERE public = true";
    
    console.log('Taking all groupContent from: ', groupName);
        connection.query(query,
        function(error, rows, fields){
            if(error){
                console.log(error);
                console.log('Problem with Query!');
            } else {
                console.log('Successfully got group content!');
                response.json({rows:rows});
                          
            }
        })
});

//add a content item
app.get('/api/addContent/:username/:file_path/:content_name/:public', function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";
    const file_path = "'" + (request.params.file_path).substr(1) + "'";
    const content_name = "'" + (request.params.content_name).substr(1) + "'";
    const public = "'" + (request.params.public).substr(1) + "'";
    

    const query = "Insert Into `Content` (username, file_path, content_name, public) Values ("+username + ", " + file_path + ", " + content_name + ", " + public +")";
    // const query1 = "SELECT * FROM `Content` WHERE public = true";
    
        connection.query(query,
        function(error, rows, fields){
            if(error){
                console.log(error);
                console.log('Problem with Query!');
            } else {
                console.log('Successfully added a content item!');
                response.json({rows:rows});
                          
            }
        })
});

//Link Content Item to Group
app.get('/api/linkContentToGroup/:id/:groupname/:username', function(request, response){
    const groupName = "'" + (request.params.groupname).substr(1) + "'";    
    const username = "'" + (request.params.username).substr(1) + "'";    
    const idx = "'" + (request.params.id).substr(1) + "'";    

    const query = "Insert into `Share` (id, group_name, username) values ("+ idx + ", " + groupName + ", " + username+")";
    
        connection.query(query,
        function(error, rows, fields){
            if(error){
                console.log(error);
                console.log('Problem with Query!');
                response.json({status:'FAILED'});
            } else {
                console.log('Successfully got group content!');
                response.json({status:'OK'});
                          
            }
        })
});

//Get Most Recent content item
app.get('/api/getLastContent',function(request, response){
    
        const query = "SELECT * FROM `Content` where id = (SELECT max(id) from `Content`)";
    
        connection.query(query,
        function(error, rows, fields){
            if(error){
                console.log(error);
                console.log('Problem with Query!');
            } else {
                console.log('Successfully got public content!');
                response.json({rows:rows});
                          
            }
        })
});

//add comment to content
app.get('/api/addComment/:id/:username/:comment',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";
    const id = "'" + (request.params.id).substr(1) + "'";
    const comment = "'" + (request.params.comment).substr(1) + "'";
    
    const query = "Insert Into `Comment` (id, username, comment_text) values ("+ id + ", " + username + ", " + comment + ")";
    
    connection.query(query,
    function(error, rows, fields){
        if(error){
            response.json({status:'FAILED'})
            console.log('Problem adding comment!');
        } else {
            console.log('Successfully Added Comment to content: ', id);
            response.json({status:'OK'});
                      
        }
    })
    
});

//add comment to content
app.get('/api/showComments/:id',function(request, response){
    const id = "'" + (request.params.id).substr(1) + "'";
    
    const query = "Select * from `Comment` where id= "+ id;
    
    connection.query(query,
    function(error, rows, fields){
        if(error){
            response.json({status:'FAILED'})
            console.log('Problem adding comment!');
        } else {
            console.log('Successfully Added Comment to content: ', id);
            response.json({status:'OK', rows:rows});
                      
        }
    })
    
});

//add tag to content
app.get('/api/addTag/:id/:tagger/:tagee',function(request, response){
    const tagger = "'" + (request.params.tagger).substr(1) + "'";
    const id = "'" + (request.params.id).substr(1) + "'";
    const taggee = "'" + (request.params.tagee).substr(1) + "'";
    
    const query = "Insert Into `Tag` (id, username_tagger, username_taggee, status) values ("+ id + ", " + tagger + ", " + taggee + ", 0)";
    
    connection.query(query,
    function(error, rows, fields){
        if(error){
            response.json({status:'FAILED'})
            console.log(error);
            console.log('Problem adding Tag!');
        } else {
            console.log('Successfully Added Tag to content: ', id);
            response.json({status:'OK'});
                      
        }
    })
    
});

//show all verified Tag of content
app.get('/api/showTags/:id',function(request, response){
    const id = "'" + (request.params.id).substr(1) + "'";
    
    const query = "Select * from `Tag` where id= "+ id + 'AND status = 1';
    
    connection.query(query,
    function(error, rows, fields){
        if(error){
            response.json({status:'FAILED'})
            console.log('Problem adding comment!');
        } else {
            console.log('Successfully Added Comment to content: ', id);
            response.json({status:'OK', rows:rows});
                      
        }
    })
    
});

//show all Pending Tags
app.get('/api/showPendingTags/:username',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";
    
    const query = "Select * from `Tag` where username_taggee= "+ username + 'AND status = 0';
    
    connection.query(query,
    function(error, rows, fields){
        if(error){
            response.json({status:'FAILED'})
            console.log('Problem showing Pending Tags!');
        } else {
            console.log('Successfully returned pending tags');
            response.json({status:'OK', rows:rows});
                      
        }
    })
    
});

//Update Pending Tags given content id
app.get('/api/updatePendingTags/:id/:tagger',function(request, response){
    const id = "'" + (request.params.id).substr(1) + "'";
    const tagger = "'" + (request.params.tagger).substr(1) + "'";
    
    const query = "UPDATE `Tag` SET status = 1 where username_tagger= "+ tagger + ' AND status = 0';
    
    connection.query(query,
    function(error, rows, fields){
        if(error){
            response.json({status:'FAILED'})
            console.log('Problem showing Pending Tags!');
        } else {
            console.log('Successfully returned pending tags');
            response.json({status:'OK', rows:rows});
                      
        }
    })
    
});

//Toggle Banner
app.get('/api/toggleBanner/:username/:boolz',function(request, response){
    const boolz = "'" + (request.params.boolz).substr(1) + "'";
    const username = "'" + (request.params.username).substr(1) + "'";
    
    const query = "UPDATE `Person` SET showBanner = " + boolz + " where username= "+ username;
    
    connection.query(query,
    function(error, rows, fields){
        if(error){
            response.json({status:'FAILED'})
            console.log('Problem showing Pending Tags!');
        } else {
            console.log('Successfully returned pending tags');
            response.json({status:'OK', rows:rows});
                      
        }
    })
    
});

//Banner Color
app.get('/api/changeBannerColor/:username/:color',function(request, response){
    const color = "'" + (request.params.color).substr(1) + "'";
    const username = "'" + (request.params.username).substr(1) + "'";
    
    const query = "UPDATE `Person` SET colorBanner = " + color + " where username= "+ username;
    
    connection.query(query,
    function(error, rows, fields){
        if(error){
            response.json({status:'FAILED'})
            console.log('Problem showing Pending Tags!');
        } else {
            console.log('Successfully returned pending tags');
            response.json({status:'OK', rows:rows});
                      
        }
    })
    
});

//Remove all Tags
app.get('/api/removeTags/:username',function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'";
    
    const query = "Delete From `Tag` WHERE username_tagger = "+ username + " OR username_taggee = "+ username;
    console.log('remove Person Query:', query);
    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log('Problem Removing Tags-------------------------------------------------------!');
            console.log(error);
            response.json({status:'FAILED'})
        } else {
            console.log('Successfully returned pending tags');
            response.json({status:'OK', rows:rows});
                      
        }
    })
    
});

//GetSpecifiv FriendGroup
app.get('/api/getFriendGroup/:groupname', function(request, response){
    const groupname = "'" + (request.params.groupname).substr(1) + "'"
    const query = "SELECT * FROM `FriendGroup` WHERE group_name = " + groupname;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({status:'OK', rows:rows});
            
            
        }
    })
})

//GetSpecifiv FriendGroup
app.get('/api/getShared/:username/:groupname', function(request, response){
    const username = "'" + (request.params.username).substr(1) + "'"
    const groupname = "'" + (request.params.groupname).substr(1) + "'"
    
    const query = "SELECT * FROM `Share` WHERE group_name = " + groupname +" AND username = "+ username;

    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({status:'OK', rows:rows});
            
            
        }
    })
})

//Get Content given array of ID's
app.get('/api/getContent/:ids', function(request, response){
    const ids = request.params.ids.split(',');
    console.log('allIDS:', ids);
    let allID = '(';
    for(let i=0; i< ids.length; i++){
        if(i === 0){
            allID = allID + ids[i].substr(1) + ', ';
        }
        else{
            allID = allID + ids[i] + ', ';    
        }
    }

    let allValues = allID.substring(0, allID.length -2);
    const query = "SELECT * FROM `Content` WHERE id IN " + allValues + ')';

    console.log('allContentQuery------', query);
    connection.query(query,
    function(error, rows, fields){
        if(error){
            console.log(error);
            console.log('Problem with Query!');
        } else {
            console.log('Successful Query!');
            response.json({status:'OK', rows:rows});
            
            
        }
    })
})


//Remove comments given array of IDS
app.get('/api/removeComments/:ids', function(request, response){
    const ids = request.params.ids.split(',');
    console.log('allIDS:', ids);
    let allID = '(';
    for(let i=0; i< ids.length; i++){
        if(i === 0){
            allID = allID + ids[i].substr(1) + ', ';
        }
        else{
            allID = allID + ids[i] + ', ';    
        }
    }

    let allValues = allID.substring(0, allID.length -2);

    const query = "DELETE FROM `Comment` WHERE id IN " + allValues + ')';

    console.log('allContentQuery------', query);
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
})

//Remove tags given array of IDS
app.get('/api/removeTagsID/:ids', function(request, response){
    const ids = request.params.ids.split(',');
    console.log('allIDS:', ids);
    let allID = '(';
    for(let i=0; i< ids.length; i++){
        if(i === 0){
            allID = allID + ids[i].substr(1) + ', ';
        }
        else{
            allID = allID + ids[i] + ', ';    
        }
    }

    let allValues = allID.substring(0, allID.length -2);

    const query = "DELETE FROM `Tag` WHERE id IN " + allValues + ')';

    console.log('allContentQuery------', query);
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
})

//Remove tags given array of IDS
app.get('/api/removeContent/:ids', function(request, response){
    const ids = request.params.ids.split(',');
    console.log('allIDS:', ids);
    let allID = '(';
    for(let i=0; i< ids.length; i++){
        if(i === 0){
            allID = allID + ids[i].substr(1) + ', ';
        }
        else{
            allID = allID + ids[i] + ', ';    
        }
    }

    let allValues = allID.substring(0, allID.length -2);

    const query = "DELETE FROM `Content` WHERE id IN " + allValues + ')';

    console.log('allContentQuery------', query);
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
})

//Remove tags given array of IDS
app.get('/api/removeShared/:ids', function(request, response){
    const ids = request.params.ids.split(',');
    console.log('allIDS:', ids);
    let allID = '(';
    for(let i=0; i< ids.length; i++){
        if(i === 0){
            allID = allID + ids[i].substr(1) + ', ';
        }
        else{
            allID = allID + ids[i] + ', ';    
        }
    }

    let allValues = allID.substring(0, allID.length -2);

    const query = "DELETE FROM `Share` WHERE id IN " + allValues + ')';

    console.log('allContentQuery------', query);
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
})


//Remove tags given array of IDS
app.get('/api/removefg/:groupname/:username', function(request, response){
    const groupname = "'" + (request.params.groupname).substr(1) + "'";
    const username = "'" + (request.params.username).substr(1) + "'";
    
    const query = "DELETE FROM `FriendGroup` WHERE group_name = " + groupname + 'AND username = '+ username;

    console.log('allContentQuery------', query);
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
})

//Change Pass
app.get('/api/changePass/:password/:username', function(request, response){
    const password = "'" + (request.params.password).substr(1) + "'";
    const username = "'" + (request.params.username).substr(1) + "'";
    
    const query = "Update Person SET password = "+ password + " Where username = "+ username;

    console.log('allContentQuery------', query);
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
})

//remove Members
app.get('/api/removeMembers/:groupname', function(request, response){
    const groupname = "'" + (request.params.groupname).substr(1) + "'";
    
    const query = "Delete From `Member` Where group_name = "+ groupname;

    console.log('removeMembers------', query);
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
})

app.listen(5000);
