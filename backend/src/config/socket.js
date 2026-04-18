const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Authentication middleware for socket
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.user.displayName);

    // Join property-specific room
    socket.on('join-property', (propertyId) => {
      socket.join(`property-${propertyId}`);
    });

    // Leave property room
    socket.on('leave-property', (propertyId) => {
      socket.leave(`property-${propertyId}`);
    });

    // Handle new message
    socket.on('send-message', async (data) => {
      // Message handling logic will be implemented in messageService
      io.to(`property-${data.propertyId}`).emit('new-message', {
        ...data,
        sender: socket.user.displayName,
        timestamp: new Date(),
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.user.displayName);
    });
  });

  return io;
};

module.exports = initializeSocket;