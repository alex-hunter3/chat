const express = require("express");

const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => socket.on("message", (msg) => io.emit("message", msg)));

http.listen(3001, () => {
    console.log("listening on *:3001");
});

