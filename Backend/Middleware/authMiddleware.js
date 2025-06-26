const {verifyToken} = require('../config/jwt');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token format

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    console.log(token)

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = {authMiddleware};