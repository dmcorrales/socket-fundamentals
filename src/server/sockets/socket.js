
const {io} = require("../index");
io.on('connection', socket => {
    console.log('Nueva conexión establecida.');

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    socket.on('generalMessage', (data, callback) => {
        if(data.message)
            callback({
                message:'Se ha creado un mensaje global.'
            });
        else
            callback({
                message:'No se ha recibido el mensaje'
            })

        socket.broadcast.emit('generalMessage', {
            message: data.message
        })
    })

    socket.on('sendMessage', (data, callback) => {
    
        if(data.message)
            callback({
                message:'Se ha recibido el mensaje!'
            });
        else
            callback({
                message:'No se ha recibido el mensaje'
            })

    });

    socket.emit('sendMessage', {
        message: 'Hola cliente!'
    })
});
