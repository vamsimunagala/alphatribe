const socketio = require('socket.io');

let io;
module.exports = {
  init: (server) => {
    io = socketio(server);
    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('likePost', (postId) => {
        io.emit('postLiked', postId);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  },
  getIo: () => io
};
