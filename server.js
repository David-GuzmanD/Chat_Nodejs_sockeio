const path = require ('path');
const http = require ('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio (server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

    console.log('New Ws Connection...');
    //Mensaje solo al usuario que se conecta
    socket.emit('message', 'Welcome to chat');

    // Mensaje a todos los clientes o usuario, excepto el que se esta conectando al instante
    socket.broadcast.emit('message', 'Un usuario se ha conectado al chat');

    //Mensaje general
    io.emit('message', 'Welcome to chat');

    socket.on('chatMessage', msg => {
        console.log(msg);
        //mensaje a tdos los usuarios conectados en el socket
        io.emit('message', msg);
    });

});


const PORT = 3000 || Process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));