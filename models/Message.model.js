const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        sender: { 
            type: String,
            required: true 
        },
        receiver: { 
            type: String,
            required: true 
        },
        text: { 
            type: String,
            required: true 
        },
        timestamp: { 
            type: Date, 
            default: Date.now 
        }


        // sender: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        // receiver: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        // text: {
        //     type: String,
        //     required: true
        // },
        // timestamp: {
        //     type: Date,
        //     default: Date.now
        // }
    }
);

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;