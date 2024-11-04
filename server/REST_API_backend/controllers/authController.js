import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const loginUser = async (req, res, userService) => {
    try {
        const { username, password } = req.body;
        const user = await userService.findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        const isPasswordCorrect = await userService.comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', 
            maxAge: 60 * 60 * 1000
        });

        res.cookie('role', user.role, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'Login successful',
            role: user.role,
            token: token
        });
    } catch (error) {
        handleError(error.message);

    }
};

