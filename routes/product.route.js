const express = require('express');
const auth = require('../middlewares/auth');
const roleManager = require('../middlewares/roleManager');
const router = express.Router();
const {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    removeProduct,
} = require('../controllers/product.controller');

router.get('/', getAllProducts);
router.get('/product/:id', getProduct);
router.post('/add', [auth, roleManager], addProduct);
router.put('/update/:id', [auth, roleManager], updateProduct);
router.delete('/remove/:id', [auth, roleManager], removeProduct);

module.exports = router;