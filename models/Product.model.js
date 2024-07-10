const mongoose = require('mongoose');
const User = require('./User.model');
const Category = require('./Category.model');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        sellerId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false,
            default: "No description available"
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        category: {
            type: String,
            // required: true
        },
        currency: {
            type: String,
            required:true
        },
        tags: [{
            type: String
        }],
        imageUrl: [{
            type: String,
            required: false
        }]
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;