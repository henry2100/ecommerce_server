const User = require('../models/User.model');
const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    handleRefreshToken,
    generateResetToken,
    veryResetToken
} = require('../middlewares/authTokens');
const {createCart} = require('./cart.controller');
const { Session } = require('express-session');
const updateCartMiddleware = require('../middlewares/updateCart');
const updateUserCart = require('./cart.controller');

const handleForgotPassword = async (req, res) => {
    console.log("req:", req.body.email);
    try {
        const user = await User.findOne({ email: req.body.email });

        console.log("user:", {
            id: user.id
        });

        const resetToken = generateResetToken(user);

        user.resetToken = resetToken;

        const updatedUser = await User.findByIdAndUpdate({ email: req.body.email }, user);

        console.log("updatedUser:", updatedUser);

        if (updateUser) {
            res.status(200).send({ data: updatedUser, message: "Password reset token was generated successfully" });
        } else {
            res.status(400).send({ message: "Something went wrong" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const addUser = asyncHandler(async (req, res) => {

    try {
        const doesUserExist_by_email = await User.findOne({ email: req.body.email });

        if (doesUserExist_by_email) {
            return res.status(400).send({ message: `${req.body.email} has already been registered` });
        } else {
            const hashedPasswd = await bcrypt.hash(req.body.password, 10);

            // await createCart

            const newUser = await User({
                ...req.body,
                password: hashedPasswd
            });

            await newUser.save();
            return res.status(200).send({ message: "New User created successfully" });

            
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

const getAuthUser = async (req, res) => {
    try {
        res.status(200).send({ message: `Welcome ${req.user.username}` });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (user) {
//             const userPasswd = await bcrypt.compare(password, user.password);

//             if (userPasswd) {
//                 // Create access and refresh tokens
//                 const accessToken = await generateAccessToken(user);
//                 const refreshToken = await generateRefreshToken(user);

//                 // Create session
//                 req.session.userId = user._id; // Save user ID in session
//                 req.session.accessToken = accessToken; // Optionally store token in session

//                 console.log('Session:', {
//                     userId: req.session.userId,
//                     accessToken: req.session.accessToken
//                 });

//                 res.status(200).send({
//                     data: user,
//                     token: {
//                         accessToken: accessToken,
//                         refreshToken: refreshToken
//                     },
//                     message: "Authentication Successful"
//                 });
//             } else {
//                 res.status(401).send({ message: "Incorrect password" });
//             }
//         } else {
//             res.status(404).send({ message: "User not found" });
//         }
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const userPasswd = await bcrypt.compare(password, user.password);

            if (userPasswd) {
                const accessToken = await generateAccessToken(user);
                const refreshToken = await generateRefreshToken(user);
                // await updateUserCart();
                // await updateCartMiddleware(req, res, next);

                res.status(200).send({
                    data: user,
                    token: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    },
                    message: "Authentication Successful"
                });
            } else {
                res.status(401).send({ message: "Incorrect password" });
            }
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }   
}

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ message: 'Could not log out. Please try again.' });
        }
        res.status(200).send({ message: 'Logout successful' });
    });
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        } else {
            return res.status(200).send({ data: user, message: "User retrieved successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.status(200).send({ data: allUsers, message: "Success" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        const editUser = await User.findByIdAndUpdate(id, req.body);

        // const editUser = await User.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        console.log('editUser:', editUser);

        if (!editUser) {
            return res.status(404).send({ message: "User not found" });
        } else {
            const updatedUser = await User.findById(id);
            return res.status(200).send({ data: updatedUser, message: "User profile updated successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const removeUser = async (req, res) => {
    try {
        const { id } = req.params;
        const removedUser = await User.findByIdAndDelete(id);

        if (!removedUser) {
            return res.status(404).send({ message: "User not found" });
        } else {
            return res.status(200).send({ message: "User profile was deleted successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const removeAllUsers = async (req, res) => {
    try {
        const clearAllUsers = await User.remove();

        if (!clearAllUsers) {
            return res.status(400).send({ message: "Something went wrong" });
        } else {
            return res.status(200).send({ message: "All User profiles have been deleted successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    removeUser,
    removeAllUsers,
    loginUser,
    logoutUser,
    getAuthUser,
    handleForgotPassword,
    // authorize
}