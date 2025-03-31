import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import chatRouter from './routes/chatRouter.js';
import messageRouter from './routes/messageRouter.js';
import cors from 'cors';
import { Server } from 'socket.io';

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// CORS Configuration

const corsOptions = {
    origin:"https://mern-quick-chat-app.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
};

app.use(cors(corsOptions));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

app.get("/", (req, res) => {
    res.send('<h1>MERN Stack Chat App</h1>');
});

// WebSocket Setup
const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});

const io = new Server(server, {
    cors: corsOptions
});

// Socket Events
let onlineUsers = new Map();

io.on('connection', socket => {
    socket.on('join-room', userId => {
        console.log(`${userId} joined room`);
    });

    socket.on('send-message', message => {
        io.to(message?.members[0]).to(message?.members[1]).emit('receive-message', message);
    });

    socket.on('clear-unread-message', unreadMessage => {
        if (unreadMessage?.members[0] && unreadMessage?.members[1]) {
            io.to(unreadMessage?.members[0]).to(unreadMessage?.members[1]).emit('message-count-cleared', unreadMessage);
        }
    });

    socket.on('user-typing', typing => {
        io.to(typing?.members[0]).to(typing?.members[1]).emit('typing-started', typing);
    });

    socket.on('user-connected', userId => {
        socket.join(userId);
        onlineUsers.set(userId, socket.id);
        io.emit('online-users', Array.from(onlineUsers.keys()));
    });

    socket.on('user-disconnected', userId => {
        if (userId) {
            onlineUsers.delete(userId);
            io.emit('online-users', Array.from(onlineUsers.keys()));
        }
    });

    socket.on('disconnect', () => {
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                console.log(`${userId} disconnected`);
                break;
            }
        }
        io.emit('online-users', Array.from(onlineUsers.keys()));
    });
});

export default app;
