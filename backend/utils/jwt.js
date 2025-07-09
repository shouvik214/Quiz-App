const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Function to generate a JWT token
const generateToken = (payload) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '7d',
                issuer: 'chat-app',
            }
        );

        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error("Token generation failed");
    }
};

// Function to verify a JWT token
const verifyToken = (token) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error);

        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        } else {
            throw new Error('Token verification failed');
        }
    }
};

module.exports = {
    generateToken,
    verifyToken
};
