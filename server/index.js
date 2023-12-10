// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 4200;

// Store room information (name and password)
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('User connected');


    //handle creating a room 
    socket.on('createRoom', ({ roomName, roomPassword }, callback) => {
        if (!rooms.has(roomName))
            rooms.set(roomName, roomPassword);
        else{ const errorMessage = 'Room already exist with the same name!';
        callback(errorMessage);}
    })

    // Handle joining a room
    socket.on('joinRoom', ({ roomName, roomPassword, userName }, callback) => {
        // socket.on('joinRoom', ({ roomName, roomPassword, userName }) => {
        console.log('username:: ', userName)
        if (!rooms.has(roomName) || rooms.get(roomName) !== roomPassword) {
            const errorMessage = 'Invalid room name or password';
            callback(errorMessage);
            return;
        }

        socket.join(roomName);
        console.log(`User ${userName} joined room ${roomName}`);
    });

    // Handle leaving a room
    socket.on('leaveRoom', ({ roomName, roomPassword, userName }) => {
        socket.leave(roomName);
        console.log(`User ${userName} left room ${roomName}`);
    });

    // Handle chat messages
    socket.on('chat message', ({ roomName, message, sender }) => {
        io.to(roomName).emit('chat:message', { sender, message });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
