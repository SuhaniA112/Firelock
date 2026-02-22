import express from "express";
import http from "http";
import { Server } from "socket.io";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

const port = new SerialPort({
  path: "COM4",
  baudRate: 115200,
});

port.on("error", (err) => {
  console.log("Serial error:", err.message);
});

const parser = port.pipe(
  new ReadlineParser({ delimiter: "\r\n" })
);

parser.on("data", (data) => {
  console.log("Arduino says:", data);
  io.emit("arduino-data", data);
});

io.on("connection", (socket) => {
//   console.log("Client connected");

  socket.on("buttonPress", (data) => {
    console.log("Button pressed!", data);
    port.write('go\n');
  })
})

server.listen(3001, "0.0.0.0", () => {
  console.log("Server running on port 3001");
});