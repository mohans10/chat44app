//var socket = io.connect('http://localhost:8000');
var socket = io.connect('http://app44chat.herokuapp.com');
var user = document.getElementById('user');
var pass = document.getElementById('pass');
var login = document.getElementById('login');

login.addEventListener('click',function(){
    if(user.value=="" || pass.value==""){
        alert('Fields cannot be left blank');
    }else{
    socket.emit('login',{
        user : user.value,
        pass : pass.value,
        socketid : socket.id
    });
    }
});

socket.on('chatpage',function(data){
    socket.emit('online',data);
    window.location.href=data.url;
});

socket.on('failed',function(){
    alert("Username or Password not found");
});