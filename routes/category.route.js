const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategory,
    addCategory,
    updateCategory,
    removeCategory,
} = require('../controllers/category.controller');

router.get('/', getAllCategories);
router.get('/category/:id', getCategory);
router.post('/add', addCategory);
router.put('/update/:id', updateCategory);
router.delete('/remove/:id', removeCategory);

module.exports = router;