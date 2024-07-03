module.exports = function (req, res, next) {
    // Uncomment for debugging purposes
    // console.log("User Role:", req.body);

    if (req.body.user.role !== 'seller') {
        return res.status(403).send({message: 'Access Denied: Only Sellers can perform this action.'});
    }
    
    next();
};
