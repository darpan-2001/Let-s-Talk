const express = require("express");
const app = express();
const http = require("http").createServer(app);

app.use(express.static(__dirname+"/Public"));

const PORT = process.env.PORT || 5000;

http.listen(PORT, (req,res) => {
    console.log(`Server running on ${PORT}`);
});

//End Points
app.get("/", (req,res) => {
    res.sendFile(__dirname+"/chat.html");
});

//Socket
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("Connected..");

    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
    });
});