// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//Emit events

btn.addEventListener('click',function(){
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    });
});

message.addEventListener('keypress',function(){
    socket.emit('typing', handle.value); 
});

//Listen for events
socket.on('chat',function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>'+ data.handle + ':<strong>'+data.message+'</p>';
    message.value="";
});

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>'+ data + ' is typing...</p>'
})

