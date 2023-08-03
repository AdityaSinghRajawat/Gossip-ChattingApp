const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 8000


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log("Connected...");

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
});