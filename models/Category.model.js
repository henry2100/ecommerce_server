const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
// const { use } = require('../routes/user.route');

//Define Schema
const Schema = mongoose.Schema;

// Category Schema
const CategorySchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        subTag: [{
            type: String,
            required: false
        }],
        categoryName: {
            type: String,
            required: true
        }
    },
);


// Create model from schema
const Category = mongoose.model('category', CategorySchema);

// Export models
module.exports = Category;