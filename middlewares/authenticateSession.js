module.exports = (req, res, next) => {
    if (req.session.userId) {
        next(); // User is authenticated
    } else {
        res.status(401).send({ message: 'Unauthorized' }); // User is not authenticated
    }
};