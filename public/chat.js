
//var socket = io.connect('http://localhost:8000');
var socket = io.connect('http://app4chat.herokuapp.com');

var output = document.getElementById('output');
var handler = document.getElementById('handle');
var msg = document.getElementById('message');
var btn = document.getElementById('send');
var logout = document.getElementById('logout');
var feed = document.getElementById('feed');
var chat = document.getElementById('chatspace');
var bar = document.getElementById('bar');
var info = document.getElementById('label');

btn.addEventListener('click',function(){
    socket.emit('chat',{
        handler : handler.value,
        message : msg.value,
        socketid : socket.id
    });
    msg.value="";
    handler.style.backgroundColor='#00ff00';
});

logout.addEventListener('click',function(){
    socket.emit('remove',handler.value);
    window.location.href="index.html";
});

socket.on('chat',function(data){
    feed.innerHTML="";
    if(data.handler !="" && data.message !=""){
        if(data.handler==handler.value){
            data.handler="You";
        }
        output.innerHTML += '<span id="bar"><strong>'+data.handler+'</strong> : '+data.message+'</span><br><br>';   
    }
});

msg.addEventListener('keypress',function(){
    socket.emit('typing',handler.value);
});
msg.addEventListener('keyup',function(){
    socket.emit('typing',handler.value);
});

socket.on('typing',function(data){
    if(data!=""){
        feed.innerHTML = '<p><em>'+data+' is typing...</em></p>';
    }
});

socket.on('online',function(data){

    if(handler.value=="") handler.value = data.namE[data.count-1];
    info.innerHTML="";
    data.namE.forEach(name => {
        info.innerHTML += name + '<br>'; 
    });
});