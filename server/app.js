// import express, { urlencoded } from 'express'
// import authRouter from './routes/authRouter.js'
// import userRouter from './routes/userRouter.js'
// import cookieParser from 'cookie-parser'
// import chatRouter from './routes/chatRouter.js'
// import messageRouter from './routes/messageRouter.js'
// import cors from 'cors'
// import http from 'http'
// import { Server } from 'socket.io'


// const app = express()


// app.use(express.json({ limit: "50mb" }))
// app.use(urlencoded({ extended: true, limit: "16kb" }))
// app.use(cookieParser())

// const server = http.createServer(app)

// app.use(cors({
//     origin: "https://mern-quick-chat-app.vercel.app",
//     methods: ["GET", "POST"],
//     credentials: true,
// }));

// const io = new Server(server, {
//     cors: {
//         origin: 'https://mern-quick-chat-app.vercel.app',
//         methods: ['GET', 'POST'],
//     }
// })



// app.use('/api/auth', authRouter)
// app.use('/api/user', userRouter)
// app.use('/api/chat', chatRouter)
// app.use('/api/message', messageRouter)

// app.get("/", (req, res) => {
//     res.send('<h1> My name is riday modal </h1>')
// })

// //test soket connection from client
// let onlineUsers = new Map();
// io.on('connection', socket => {
//     socket.on('join-room', userId => {


//     })

//     socket.on('send-message', (message) => {
//         // console.log(message)
//         io
//             .to(message?.members[0])
//             .to(message?.members[1])
//             .emit('receive-message', message)
//     })

//     socket.on('clear-unread-message', (unreadMessage) => {
//         // console.log(unreadMessage)
//         // console.log(unreadMessage?.members[0])
//         if (unreadMessage?.members[0] && unreadMessage?.members[1]) {
//             io
//                 .to(unreadMessage?.members[0])
//                 .to(unreadMessage?.members[1])
//                 .emit('message-count-cleared', unreadMessage)
//         } else {
//             return
//         }

//     })

//     socket.on('user-typing', (typing) => {
//         console.log(typing)
//         io
//             .to(typing?.members[0])
//             .to(typing?.members[1])
//             .emit('typing-started', typing)
//     })

//     socket.on("user-connected", (userId) => {
//         socket.join(userId)
//         onlineUsers.set(userId, socket.id);
//         console.log("user connected", userId)
//         io.emit('online-users', Array.from(onlineUsers.keys()));
//     })

//     socket.on("user-disconnected", (userId) => {
//         if (userId) {
//             onlineUsers.delete(userId)
//             io.emit('online-users', Array.from(onlineUsers.keys()));
//         }
//     })






//     // Handle user disconnection
//     socket.on('disconnect', () => {
//         // Find the userId for the disconnected socket
//         for (let [userId, socketId] of onlineUsers.entries()) {
//             if (socketId === socket.id) {
//                 onlineUsers.delete(userId); // Remove the user from the Map
//                 console.log(`${userId} disconnected`);
//                 break;
//             }
//         }

//         io.emit('online-users', Array.from(onlineUsers.keys()));
//     });
// })

// export default server




import express, { urlencoded } from 'express'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser'
import chatRouter from './routes/chatRouter.js'
import messageRouter from './routes/messageRouter.js'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app = express()

// Middleware
app.use(express.json({ limit: "50mb" }))
app.use(urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

// Create HTTP server
const server = http.createServer(app)
app.options('*', cors());

// Configure Express CORS middleware
app.use(cors({
    origin: "https://mern-quick-chat-app.vercel.app", 
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
}));

// Configure Socket.IO with CORS (including credentials)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"],
        credentials: true,
    },
});

// API Routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)

app.get("/", (req, res) => {
    res.send('<h1> My name is riday modal </h1>')
})

// Socket.IO connection and events
let onlineUsers = new Map();

io.on('connection', socket => {
    socket.on('join-room', userId => {
        // Optionally join a room here
    })

    socket.on('send-message', (message) => {
        io.to(message?.members[0])
            .to(message?.members[1])
            .emit('receive-message', message)
    })

    socket.on('clear-unread-message', (unreadMessage) => {
        if (unreadMessage?.members[0] && unreadMessage?.members[1]) {
            io.to(unreadMessage?.members[0])
                .to(unreadMessage?.members[1])
                .emit('message-count-cleared', unreadMessage)
        }
    })

    socket.on('user-typing', (typing) => {
        console.log(typing)
        io.to(typing?.members[0])
            .to(typing?.members[1])
            .emit('typing-started', typing)
    })

    socket.on("user-connected", (userId) => {
        socket.join(userId)
        onlineUsers.set(userId, socket.id)
        console.log("user connected", userId)
        io.emit('online-users', Array.from(onlineUsers.keys()))
    })

    socket.on("user-disconnected", (userId) => {
        if (userId) {
            onlineUsers.delete(userId)
            io.emit('online-users', Array.from(onlineUsers.keys()))
        }
    })

    socket.on('disconnect', () => {
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId)
                console.log(`${userId} disconnected`)
                break
            }
        }
        io.emit('online-users', Array.from(onlineUsers.keys()))
    });
})

export default server
