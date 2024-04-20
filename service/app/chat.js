import { Server } from 'socket.io';


const connectedUsers = new Map();

const initializeChatServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for the 'join' event from the client
    socket.on('join', (userId) => {
      console.log(`User ${userId} joined`);
      connectedUsers.set(socket.id, userId);
      socket.join(userId); // Join a room with the userId

      // Broadcast the updated user count
      io.emit('userCount', connectedUsers.size);
    });

    // Listen for the 'message' event from the client
    socket.on('message', (data) => {
      const { sender, message, username } = data;
      io.emit('message', { sender, message, username }); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      connectedUsers.delete(socket.id);

      // Broadcast the updated user count
      io.emit('userCount', connectedUsers.size);
    });

  });
};

export default initializeChatServer;