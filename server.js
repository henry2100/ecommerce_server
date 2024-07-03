const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const categoryRoute = require('./routes/category.route');

const app = express();
const portNumber = process.env.PORT;
const username = process.env.USER;
const password = process.env.PASSWD;
const dbName = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// App root route
app.get('/', (req, res) => {
    res.send("Welcome to Nodejs - E-Commerce");
});

// root routes
app.use('/users', userRoute); // user route
app.use('/products', productRoute) // product route
app.use('/categories', categoryRoute) // category route

// Mongo database connect
mongoose.connect(`mongodb+srv://${username}:${password}@mernstackappdb.gg0yse7.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbName}`)
    .then(() => {
        app.listen(portNumber, () => {
            console.log("Database connected successfully");
        });
    })
    .catch(error => {
        console.log(`Error connecting to db - ${dbName}`, error.message);
    });