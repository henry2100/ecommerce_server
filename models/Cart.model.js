const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    productImg: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    init_price: {
        type: Number,
        required: true
    },
    quantity_in_stock: {
        type: Number,
        required: true
    }
}, { _id: false });

const CartSchema = new Schema(
    {
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        },
        products: [ProductSchema],
    },
    {
        timestamps: true
    }
);

const CartModel = model('Cart', CartSchema);

module.exports = CartModel;