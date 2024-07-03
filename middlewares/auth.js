const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRETE_KEY;

module.exports = function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).send({ message: 'Access Denied. No token provided.' });

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.body.user = decoded;
        console.log("Decode:", req.body.user);

        next();
    } catch (error) {
        res.status(400).send({message: 'Invalid token!'})
    }
}