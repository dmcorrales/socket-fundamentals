var socket = io();
var context = document.getElementById("root");

socket.on('connect', function() {
    buildMessage("Conexión establecida con el servidor");
});

socket.on('disconnect', function(){
    
})

socket.on('sendMessage', message => {
    buildMessage(message.message);
})

socket.emit('sendMessage', {
    message: 'Hello server!',
}, (response) => {
    console.log(response)
})

socket.on('generalMessage', (message) => {
    buildMessage(message.message);
})

buildMessage = (msg) => {
    var elem = document.createElement("label");
    elem.innerHTML = "<br>"+msg;
    context.appendChild(elem);
}

generalMessage = () => {
    socket.emit('generalMessage', {
       message: "Hola a todos!" 
    }, (response => {
        buildMessage(response.message);
    }))
}

let button = document.createElement("button");
button.setAttribute("onClick", "generalMessage()");
let p = document.createElement("p");
p.innerHTML = "Enviar mensaje global";
button.appendChild(p);
document.getElementById("root").appendChild(button);