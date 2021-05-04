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
    socket.emit('message', 'Welcome to chat');

});


const PORT = 3000 || Process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));