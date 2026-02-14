import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Allow all origins for now, restrict in production
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

import sosRoutes from './routes/sosRoutes.js';
import bloodRoutes from './routes/bloodRoutes.js';

app.use(cors());
app.use(express.json());

// Make io accessible to our router
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/blood', bloodRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
