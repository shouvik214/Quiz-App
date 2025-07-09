const { verifyToken } = require('../utils/jwt');

// Validation middleware
const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        return res.status(400).json({ 
            success: false,
            message: 'Validation failed',
            errors: err.errors 
        });
    }
};

// JWT Authentication middleware
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const decoded = verifyToken(token);
        req.user = decoded; // Add user info to request object
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message || 'Invalid token'
        });
    }
};

module.exports = {
    validate,
    authenticate
};