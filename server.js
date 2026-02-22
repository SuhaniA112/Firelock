const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Change this to your Arduino's port (check with `arduino-cli board list` or Arduino IDE)
const port = new SerialPort.SerialPort({ path: "COM3", baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

/*
// Serve React build (if production)
app.use(express.static("build"));
*/

// Listen for serial data
parser.on("data", (data) => {
  console.log("Arduino says:", data);
  io.emit("arduino-data", data); // Send to React via WebSocket
});

io.on("connection", (socket) => {
  console.log("React client connected");
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
