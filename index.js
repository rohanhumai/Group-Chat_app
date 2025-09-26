const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// socket.io with CORS setup
const io = new Server(server, {
    cors: {
        origin: "https://group-chat-app-axqm.onrender.com/", // later replace * with your frontend deployed URL
        methods: ["GET", "POST"],
    },
});

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

// ✅ use Render's port or default to 9000 locally
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Server started on: http://localhost:${PORT}`));
