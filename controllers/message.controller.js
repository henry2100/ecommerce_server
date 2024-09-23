const MessageModel = require('../models/Message.model');
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

const resFunction = (res, status, data) => {
    return res.status(status).send(data);
}

io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for incoming messages
    socket.on('send_message', sendMessage(data))

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, text } = req.body;

        const newMessage = new MessageModel({ sender, receiver, text });
        await newMessage.save();

        io.emit('new_message', newMessage)

        return resFunction(res, 201, {
            message: 'Message sent successfully',
            data: newMessage
        });

    } catch (error) {
        return resFunction(res, 500, { message: error.message });
    }
}

const getMessage = async (req, res) => {
    const userId = req.params.userId;

    try {
        const messages = await MessageModel.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        }).sort({ timestamp: 1 });

        return resFunction(res, 200, {
            message: 'Messages fetched successfully',
            data: messages
        });

    } catch (error) {
        return resFunction(res, 500, { message: error.message });
    }
}

const updateMessage = async (req, res) => {
    const { messageId, newText } = req.body;

    try {
        const updatedMessage = await MessageModel.findByIdAndUpdate(
            messageId,
            { $set: { text: newText } },
            { new: true }
        );

        if (!updatedMessage) {
            return resFunction(res, 404, { message: 'Message not found' });
        }

        return resFunction(res, 200, {
            message: 'Message updated successfully',
            data: updatedMessage
        });

    } catch (error) {
        return resFunction(res, 500, { message: error.message });
    }
};

module.exports = {
    sendMessage,
    getMessage,
    updateMessage
}