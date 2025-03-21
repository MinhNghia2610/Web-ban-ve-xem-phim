const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Import model User
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const SALT_ROUNDS = 10;

/**
 * Đăng ký người dùng mới
 * @param {Object} userData - Dữ liệu người dùng (name, email, password)
 * @returns {Object} - Thông tin người dùng đã tạo (ẩn password)
 */
const registerUser = async (userData) => {
    const { name, email, password } = userData;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email đã được sử dụng');
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Tạo người dùng mới
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    };
};

/**
 * Đăng nhập người dùng
 * @param {string} email - Email đăng nhập
 * @param {string} password - Mật khẩu
 * @returns {Object} - Token JWT và thông tin người dùng
 */
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }

    // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '7d',
    });

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

/**
 * Xác minh token JWT
 * @param {string} token - Token JWT cần kiểm tra
 * @returns {Object|null} - Thông tin người dùng từ token hoặc null nếu lỗi
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyToken,
};
