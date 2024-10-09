const express = require('express');
const auth = require('../middlewares/auth');
const roleManager = require('../middlewares/roleManager');
const router = express.Router();
const {
    createCart,
    deleteCart,
    getUserCart,
    updateUserCart,
    updateCartOnLogout
} = require('../controllers/cart.controller');

router.get('/fetch/:id', [auth], getUserCart);
router.post('/store/:id', [auth], createCart);
router.put('/update/:id', [auth], updateUserCart);
router.put('/update/:id/logout', [auth], updateCartOnLogout);
router.delete('/delete/:id', [auth], deleteCart);

module.exports = router;