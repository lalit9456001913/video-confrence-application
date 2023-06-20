const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
// const mysql = require('mysql2');

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configure MySQL database connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'your-mysql-username',
//   password: 'your-mysql-password',
//   database: 'your-database-name',
// });

// Handle Socket.IO connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Add your socket event handlers here
// });

let countdownInterval;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('startTimer', (timer) => {
    console.log("=========",timer);
    clearInterval(countdownInterval);

    let countdown = timer;
    io.emit('timer', countdown);

    countdownInterval = setInterval(() => {
      countdown--;
      io.emit('timer', countdown);

      if (countdown === 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    clearInterval(countdownInterval);
  });
});
// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
