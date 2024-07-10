const mongoose = require('mongoose');

//Define Schema
const Schema = mongoose.Schema;

// Address Schema
const AddressSchema = new Schema({
    houseNum: { type: String, required: false },
    street: { type: String, required: false },
    busStop: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false }
}, { _id: false });

// User Schema
const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
            index: {
                unique: false
            }
        },
        lastname: {
            type: String,
            required: true,
            index: {
                unique: false
            }
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: AddressSchema,
            required: true
        },
        country: {
            type: Object,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['seller', 'buyer'],
            default: 'buyer'
        },
        imageUrl: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;