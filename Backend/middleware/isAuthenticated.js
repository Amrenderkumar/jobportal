import jwt from 'jsonwebtoken';

export const AuthenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'token missing', success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401)
                .json({ message: 'decoded token invalid', success: false });
        }
        req.id = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized error', success: false });
    }
};
