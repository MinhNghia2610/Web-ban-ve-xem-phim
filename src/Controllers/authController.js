//Đăng nhập, đăng ký
const User = require('../models/User');
exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    const newUser = new User({ username, password, email });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
};
exports.login = async (req, res) => {
    const { username, password } = req.body;
    // Implement login logic (e.g., check password)
    res.status(200).json({ message: 'Login successful' });
};