var express = require('express'); // Import Express
var socketIO = require('socket.io'); // Import Socket.IO

// Create the app
var app = express();

// Start the server using Express
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server is running at http://' + host + ':' + port);
});

// Attach Socket.IO to the Express server
var io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// WebSocket connections
io.sockets.on('connection', function (socket) {
  console.log('A user connected: ' + socket.id);

  // Handle 'mouse' event from the client
  socket.on('mouse', function (data) {
    console.log('Received: ' + data.x + ' ' + data.y);
    socket.broadcast.emit('mouse', data);
  });

  // Handle client disconnection
  socket.on('disconnect', function () {
    console.log('User disconnected: ' + socket.id);
  });
});