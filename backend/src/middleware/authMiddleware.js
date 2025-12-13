const { verify } = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Authentication Middleware
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Handle "Bearer <token>" format
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.slice(7) 
            : authHeader;

        // Verify token
        const payload = verify(token, JWT_SECRET);
        
        // Attach user data to request
        req.user = { 
            id: payload.id,
            email: payload.email,
            role: payload.role // if you have roles
        };

        next();

    } catch (error) {
        console.error('Auth error:', error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expired" });
        }
        
        return res.status(500).json({ error: "Authentication failed" });
    }
};

// Optional: Instructor-only middleware
const instructorMiddleware = (req, res, next) => {
    if (req.user.role !== 'instructor') {
        return res.status(403).json({ 
            error: "Access denied. Instructor role required" 
        });
    }
    next();
};

module.exports = { authMiddleware, instructorMiddleware };