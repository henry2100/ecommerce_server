const mongoose = require('mongoose');

//Define Schema
const Schema = mongoose.Schema;

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
        username: {
            type: String,
            required: false,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            street: {
                type: String,
                required: false
            },
            city: {
                type: String,
                required: false
            },
            state: {
                type: String,
                required: false
            }
        },
        settlementInfo: {
            bankName: {
                type: String,
                required: false
            },
            bankCode: {
                type: String,
                required: false
            },
            accountNumber: {
                type: String,
                required: false
            },
            accountName: {
                type: String,
                required: false
            }
        },
        debitCardInfo: {
            cardName: {
                type: String,
                required: false
            },
            cardNumber: {
                type: String,
                required: false
            },
            cardType: {
                type: String,
                required: false
            },
            expiryDate: {
                type: String,
                required: false
            },
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