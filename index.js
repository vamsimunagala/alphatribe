const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const socket = require('./sockets/socket');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/auth', authRoutes);
app.use(authMiddleware.authenticate);
app.use('/posts', postRoutes);
app.use('/posts/:postId/comments', commentRoutes);

// Default route
app.get('/', (req, res) => {
  res.render('index');
});

// Server and Socket.io setup
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
socket.init(server);
