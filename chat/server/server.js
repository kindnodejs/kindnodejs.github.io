const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const PORT = process.env.PORT || 8080;

const app = express();
const clientPath = `${__dirname}/../client`;
console.log(`Serving client from ${clientPath}`);

app.use(express.static(clientPath));
const server = http.createServer(app); 

const io = socketio(server);

io.on('connection', (sock) => {
    console.log('Someone connected');
    sock.emit('message', 'Hello, you are connected to the server');

    sock.on('message', (text) => {
        io.emit('message', text);
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);

});

server.listen(PORT, () => {
    console.log('Chat app started on 8080');
});