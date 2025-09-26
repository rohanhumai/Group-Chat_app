const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// io server
io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("user-message", (message) => {
        console.log("A new User Message:", message);
        io.emit("message", message); // send to all clients
    });
});

// serve static files (like index.html, css, js)
app.use(express.static(path.resolve(__dirname, "public")));

// main route
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

server.listen(9000, () => console.log(`Server started on: http://localhost:9000`));
