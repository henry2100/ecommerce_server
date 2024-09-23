const express = require('express');
const Server = require('socket.io');
const app = express();
// const http = require('http');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const categoryRoute = require('./routes/category.route');
const orderRoute = require('./routes/order.route');
const cartRouter = require('./routes/cart.route');
const messageRouter = require('./routes/message.route');

const portNumber = process.env.PORT || 3000;
const username = process.env.USER;
const password = process.env.PASSWD;
const dbName = process.env.DB_NAME;

// Middleware setup
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up headers to allow CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin-Mismatch', true);
    next();
});

// MongoDB connection
const mongodbServer = mongoose.connect(`mongodb+srv://${username}:${password}@mernstackappdb.gg0yse7.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbName}`)

    .then(() => {
        app.listen(portNumber, () => console.log("Database connected successfully"));
    })

    .catch(error => {
        console.log(`Error connecting to db - ${dbName}`, error.message);
    });
    

const io = require('socket.io')(mongodbServer, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3002",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Create connection
io.on('connection', (socket) => {
    console.log("Connected to socket.io");

    socket.on('setup', (userData) => {
        socket.join(userData.id);
        console.log("userdata:", userData);
        socket.emit('connected');
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined room: ' + room);
    })
})

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to Node.js - E-Commerce");
});

// Routes
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/categories', categoryRoute);
app.use('/orders', orderRoute);
app.use('/cart', cartRouter);
app.use('/messages', messageRouter);
