const nodemailer = require('nodemailer');
require('dotenv').config();

// Cấu hình transporter với Gmail (hoặc SMTP khác)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Email gửi
        pass: process.env.EMAIL_PASS  // Mật khẩu ứng dụng
    }
});

// Hàm gửi email
const sendEmail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        };

        await transporter.sendMail(mailOptions);
        console.log(`📧 Email đã gửi đến: ${to}`);
    } catch (error) {
        console.error('❌ Lỗi gửi email:', error);
    }
};

module.exports = { sendEmail };
