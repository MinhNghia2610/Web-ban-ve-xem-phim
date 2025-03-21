const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gán thông tin user vào req
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token không hợp lệ!' });
    }
};
