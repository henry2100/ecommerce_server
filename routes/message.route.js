const express = require('express');
const auth = require('../middlewares/auth');
const roleManager = require('../middlewares/roleManager');
const router = express.Router();
const {
    sendMessage,
    getMessage,
    updateMessage
} = require('../controllers/message.controller');

router.post('/message/send', [auth], sendMessage);
router.put('/message/update', [auth], updateMessage);
router.get('/:userId', [auth], getMessage);

module.exports = router;