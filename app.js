var express = require('express');
var mysql = require('mysql');
var socket = require('socket.io');

var nm = [];

var app = express();

var connection = mysql.createConnection({

    host: 'us-cdbr-east-06.cleardb.net',
    user: 'ba42621b801182',
    password: '0e5464dc',
    database: 'heroku_61c94d2cb2c1d53'
});

connection.connect(function(error){
    if(error){
        console.log('Error conecting sql');
    }
    else{
        console.log('sql connection success');
    }
});

var server = app.listen(process.env.PORT,function(){
    console.log('server connection made');
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
                if(!error){
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
            }
            });
            }
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

