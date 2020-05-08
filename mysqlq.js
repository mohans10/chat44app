var express = require('express');
var mysql = require('mysql');

var mysql1 = 'select count(*) from member';


var app = express();

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'mohans10',
    password : '',
    database : 'test'
});

app.listen(5000);

connection.connect(function(error){
    if(error){
        console.log('sql connection error');
    }
    else{
        console.log('sql connection success');
    }
});

connection.query(mysql1,function(error,data){
    if(error){
        console.log('query error');
    }
    else{
        console.log('query succesful');
        console.log(data[0].count());
    }
});