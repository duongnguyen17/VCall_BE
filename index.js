// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(
//   server
//   // , {
//   // 	cors: {
//   // 		origin: "http://localhost:3000",
//   // 		methods: [ "GET", "POST" ]
//   // 	}
//   // }
// );

// io.on("connection", (socket) => {
//   console.log("client connected");
//   socket.emit("me", socket.id);

//   socket.on("disconnect", () => {
//     socket.broadcast.emit("callEnded");
//   });

//   socket.on("callUser", (data) => {
//     io.to(data.userToCall).emit("callUser", {
//       signal: data.signalData,
//       from: data.from,
//       name: data.name,
//     });
//   });

//   socket.on("answerCall", (data) => {
//     io.to(data.to).emit("callAccepted", data.signal);
//   });
// });

// server.listen(3000);

  
'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

