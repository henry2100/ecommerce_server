const express = require('express');
const auth = require('../middlewares/auth');
const roleManager = require('../middlewares/roleManager');
const router = express.Router();
const {
    createOrderInvoice,
    updateOrderInfo,
    getOrderInvoice,
    getAllOrderInvoices,
    deleteOrderInvoice
} = require('../controllers/order.controller');

router.post('/create', [auth], createOrderInvoice);
router.put('/update/:id', [auth || roleManager], updateOrderInfo);
router.get('/order/:id', getOrderInvoice);
router.get('/all', getAllOrderInvoices);
router.delete('/delete/:id', [auth], deleteOrderInvoice);

module.exports = router;