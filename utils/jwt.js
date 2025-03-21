const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Tạo token JWT
 * @param {Object} payload - Dữ liệu muốn mã hóa trong token
 * @returns {string} - Token JWT đã tạo
 */
const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
};

/**
 * Xác minh token JWT
 * @param {string} token - Token cần xác minh
 * @returns {Object|null} - Trả về dữ liệu trong token nếu hợp lệ, hoặc null nếu không hợp lệ
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};

/**
 * Giải mã token JWT (không xác minh chữ ký)
 * @param {string} token - Token cần giải mã
 * @returns {Object} - Dữ liệu trong token
 */
const decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken
};
