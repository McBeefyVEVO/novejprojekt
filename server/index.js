const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("message", (data) => {
        socket.emit("message-received", ({payload: "Your message was received"}))
        io.emit("message", data);
    });
});

httpServer.listen(3000);