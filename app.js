var express = require('express');
var mysql = require('mysql');
var socket = require('socket.io');
//const {Client} = require('pg');
var nm = [];
/*
const client =  new Client({
    host: 'ec2-52-72-65-76.compute-1.amazonaws.com',
    user: 'kfiryvxxsvrblt',
    password: '5c69564a3cdafaef85cc94c1f9a75d215d0c7691dfb2b811ef8a8cbc8f0ffc67',
    database: 'dctqfc8es2qjqe',
    port : 5432,
});

client.connect();*/

var app = express();

var connection = mysql.createConnection({

    host: 'ec2-52-72-65-76.compute-1.amazonaws.com',
    user: 'kfiryvxxsvrblt',
    password: '5c69564a3cdafaef85cc94c1f9a75d215d0c7691dfb2b811ef8a8cbc8f0ffc67',
    database: 'dctqfc8es2qjqe'
});

connection.connect(function(error){
    if(error){
        window.location.href='public/error.html';
        console.log('Error conecting sql');
    }
    else{
        console.log('sql connection success');
    }
});

var server = app.listen(process.env.PORT,function(){
    console.log('connection made');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection',function(socket){
    console.log('socket id is : '+socket.id);
    
    socket.on('register',function(data){
        var mysql1 = 'INSERT INTO member VALUES (1,?,?,?)';
        connection.query(mysql1,[data.naMe,data.username,data.password],function(error){
            if(error){
                console.log('error in reg query');
            }
            else{
                console.log('reg query success');
            }
           // client.end();
        });
    });

    socket.on('login',function(data){
        
        var mysql2 = 'SELECT * FROM member';
        connection.query(mysql2,function(error,rows,field){
            if(error){
                console.log('error in login query');
            }
            else{
                connection.query('SELECT sum(id) as cnt FROM member',function(error,no_rows){

                   for(var j=0;j<no_rows[0].cnt;j++){
                    if((rows[j].username==data.user)&&(rows[j].password==data.pass)){
                        console.log('login success');
                        var c = nm.push(rows[j].name); 
                        io.to(data.socketid).emit('chatpage',{ 
                            url : 'chatapp.html',
                            namE : nm,
                            count : c
                    });
                        break;
                    }
                    else{
                       if(j==(no_rows[0].cnt-1)){
                           socket.emit('failed',"error");
                       }
                    }
                }
                //client.end();
            });
            }
           // client.end();
        });
    });

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });

    socket.on('online',function(data){
        setTimeout(() => {
            io.sockets.emit('online',data);
        }, 500);
    });

    socket.on('remove',function(data){
        nm.splice(nm.indexOf(data),1);
        socket.broadcast.emit('online',{namE:nm});
    });
});

