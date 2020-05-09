var express = require('express');
var mysql = require('mysql');

var mysql1 = 'create table member (id int(5),name varchar(25),username varchar(25),password varchar(25))';


var app = express();

var connection = mysql.createConnection({
    host : 'us-cdbr-east-06.cleardb.net',
    user : 'ba42621b801182',
    password : '0e5464dc',
    database : 'heroku_61c94d2cb2c1d53'
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
        //console.log(data[0].count());
    }
});