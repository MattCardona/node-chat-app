const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.on('disconnect', function() {
    console.log('Client has disconnected');
  });

  socket.emit('newMessage', {
    from: 'Rosie',
    text: 'I like to swim',
    createdAt: 1324
  });

  socket.on('createMessage', function(message) {
    console.log('Created message', message);
  });

});

server.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});