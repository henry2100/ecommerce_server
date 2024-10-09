const Cart = require('../models/Cart.model');

const updateCartMiddleware = async (req, res, next) => {

    // console.log("updateCartMiddleware:", req);

    try {
        const userId = req.user.id; 
        const newCartItems = req.body.cartItems || [];

        let userCart = await Cart.findOne({ userId });

        if (!userCart) {
            userCart = new Cart({ userId, items: newCartItems });
        } else {
            newCartItems.forEach(newItem => {
                const existingItemIndex = userCart.items.findIndex(item => item.productId.equals(newItem.productId));

                if (existingItemIndex !== -1) {
                    userCart.items[existingItemIndex].quantity += newItem.quantity;
                } else {
                    userCart.items.push(newItem);
                }
            });
        }

        await userCart.save();

        next(); 
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: 'Failed to update cart' });
    }
};

module.exports = updateCartMiddleware;