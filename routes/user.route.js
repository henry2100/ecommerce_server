const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();
const {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    removeUser,
    removeAllUsers,
    loginUser,
    handleForgotPassword
} = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.get('/user/:id', getUser);
router.post('/user/add', addUser);
router.put('/update/:id', updateUser);
router.delete('/remove/:id', removeUser);
router.delete('/remove/all', removeAllUsers);
router.post('/user/login', loginUser);
router.post('/user/reset_password', handleForgotPassword);

module.exports = router;