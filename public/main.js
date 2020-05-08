//var socket = io.connect('http://localhost:8000');
var socket = io.connect('http://app44chat.herokuapp.com');
var register = document.getElementById('register');
var naMe = document.getElementById('name');
var username  = document.getElementById('username');
var password = document.getElementById('password');

register.addEventListener('click',function(){
    if(naMe.value=="" || username.value=="" || password.value==""){
        alert('Fields cannot be left blank');
    }else{
    socket.emit('register',{
        naMe : naMe.value,
        username : username.value,
        password : password.value,
    });
    alert('Registration Success');
    window.location.href='index.html';
    }
});