import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        
        req.user = { role: 'guest' };  
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};
