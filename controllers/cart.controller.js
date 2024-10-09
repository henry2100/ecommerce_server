const CartModel = require('../models/Cart.model');

const resFunction = (req, res, status, data) => {
    return res.status(status).send(data);
}

const createCart = async (req, res) => {
    try {
        const newCart = await CartModel.create(req.body);

        if (!newCart) {
            resFunction(req, res, 400, 'Bad request');
        } else {
            resFunction(req, res, 200, {
                data: {
                    cartId: newCart._id
                },

                message: 'Cart created successfully'
            });
        }
    } catch (error) {
        resFunction(req, res, 500, { message: error.message });
    }
}

const getUserCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userCart = await CartModel.findById(id);

        if (!userCart) {
            resFunction(req, res, 404, 'Cart not found');
        } else {
            resFunction(req, res, 200, {
                data: userCart,
                message: 'Cart retrieved successfully'
            });
        }

    } catch (error) {
        resFunction(req, res, 500, { message: error.message });
    }
}

const updateUserCart = async (req, res) => {
    try {
        const { id } = req.params;
        const newItems = req.body.products;

        // if (!newItems || newItems.length === 0) {
        //     return resFunction(req, res, 400, { message: 'No products provided to update' });
        // }

        const existingCart = await CartModel.findById(id);

        if (!existingCart) {
            return resFunction(req, res, 4040, { nessage: "Cart not found" });
        } else {
            let cartModified = false;

            newItems.forEach(newItem => {
                const existingItem = existingCart.products.find(
                    item => item.id.toString() === newItem.id.toString()
                )

                if (existingItem) {
                    console.log('Updating existing item:', existingItem);
                    existingItem.quantity += newItem.quantity;
                    cartModified = true;
                } else {
                    console.log('Adding new item:', newItem);
                    existingCart.products.push(newItem);
                    cartModified = true;
                }
            });

            if (cartModified) {
                const updatedCart = await existingCart.save();

                return resFunction(req, res, 200, {
                    data: updatedCart,
                    message: "Cart updated successfully with new or updated items"
                })
            } else {
                return resFunction(req, res, 200, {
                    data: existingCart,
                    message: 'No changes were made to the cart',
                });
            }
        }

    } catch (error) {
        resFunction(req, res, 500, {message: error.message});
    }
}

const updateCartOnLogout = async (req, res) => {
    try {
        const { id } = req.params;  
        const cartData = req.body;  

        console.log({
            cartId: id,
            cartData: cartData
        });

        const updatedCart = await CartModel.findByIdAndUpdate(id, cartData, { new: true, upsert: true });

        resFunction(req, res, 200, {
            message: "Logout successful and cart updated",
            data: updatedCart
        });
    } catch (error) {
        resFunction(req, res, 500, { message: error.message });
    }
};

const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cartToRemove = await CartModel.findByIdAndDelete(id);

        if (!cartToRemove) {
            resFunction(req, res, 404, { message: 'Cart not found' });
        } else {
            resFunction(req, res, 200, { message: 'Cart deleted successfully' });
        }
    } catch (error) {
        resFunction(req, res, 500, { message: error.message });
    }
}

module.exports = {
    createCart,
    deleteCart,
    getUserCart,
    updateUserCart,
    updateCartOnLogout
}