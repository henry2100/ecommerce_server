const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const categoryRoute = require('./routes/category.route');
const orderRoute = require('./routes/order.route');

const app = express();
const portNumber = process.env.PORT || 3000;
const username = process.env.USER;
const password = process.env.PASSWD;
const dbName = process.env.DB_NAME;

// Configure MongoDB session store
// const sessionStore = MongoStore.create({
//     mongoUrl: `mongodb://${username}:${password}@localhost:27017/${dbName}`,
//     collectionName: 'sessions',
//     ttl: 24 * 60 * 60, // Session TTL in seconds (24 hours)
// });

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up headers to allow CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Session configuration
// app.use(session({
//     secret: process.env.JWT_SECRET_KEY || 'your-default-secret', // Use a strong secret key
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStore,
//     cookie: { secure: false } // Set to true if using HTTPS
// }));

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to Node.js - E-Commerce");
});

// Routes
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/categories', categoryRoute);
app.use('/orders', orderRoute);

// MongoDB connection
mongoose.connect(`mongodb+srv://${username}:${password}@mernstackappdb.gg0yse7.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbName}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => {
    app.listen(portNumber, () => {
        console.log("Database connected successfully");
    });
})
.catch(error => {
    console.log(`Error connecting to db - ${dbName}`, error.message);
});














// const express = require('express');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const mongodb = require('mongodb');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config()

// const userRoute = require('./routes/user.route');
// const productRoute = require('./routes/product.route');
// const categoryRoute = require('./routes/category.route');
// const orderRoute = require('./routes/order.route');

// const app = express();
// const portNumber = process.env.PORT;
// const username = process.env.USER;
// const password = process.env.PASSWD;
// const dbName = process.env.DB_NAME;

// const sessionStore = MongoStore.create({
//     mongoUrl: `mongodb://localhost:27017/${dbName}`, // your MongoDB URL
//     collectionName: 'sessions',
//     ttl: 24 * 60 * 60, // Time to live in seconds (24 hours)
// });

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
// app.use(session({
//     secret: process.env.JWT_SECRETE_KEY, // Change this to a strong secret key
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStore,
//     cookie: { secure: false } // Set to true if using HTTPS
//   }));

// // App root route
// app.get('/', (req, res) => {
//     res.send("Welcome to Nodejs - E-Commerce");
// });

// // App routes
// app.use('/users', userRoute); // user route
// app.use('/products', productRoute) // product route
// app.use('/categories', categoryRoute) // category route
// app.use('/orders', orderRoute) // order route

// // Mongo database connect
// mongoose.connect(`mongodb+srv://${username}:${password}@mernstackappdb.gg0yse7.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbName}`, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
// })
//     .then(() => {
//         app.listen(portNumber, () => {
//             console.log("Database connected successfully");
//         });
//     })
//     .catch(error => {
//         console.log(`Error connecting to db - ${dbName}`, error.message);
//     });