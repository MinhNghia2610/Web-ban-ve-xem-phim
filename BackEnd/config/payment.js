const crypto = require('crypto');
require('dotenv').config();

/**
 * Giả lập tích hợp cổng thanh toán (VD: VNPay, Momo, PayPal, Stripe)
 * Ở môi trường thực tế, bạn cần gọi API của cổng thanh toán thật.
 */

// Khóa bí mật dùng để tạo và xác minh giao dịch (thay bằng key thật)
const PAYMENT_SECRET = process.env.PAYMENT_SECRET || 'default_payment_secret';

/**
 * Tạo yêu cầu thanh toán (giả lập)
 * @param {Object} paymentData - Dữ liệu thanh toán
 * @returns {Object} - Thông tin giao dịch
 */
const createPayment = (paymentData) => {
    const transactionId = crypto.randomUUID(); // Tạo ID giao dịch ngẫu nhiên
    const status = 'pending'; // Trạng thái ban đầu: chờ thanh toán

    return {
        transactionId,
        status,
        amount: paymentData.amount,
        userId: paymentData.userId,
        createdAt: new Date(),
    };
};

/**
 * Kiểm tra trạng thái thanh toán (giả lập)
 * @param {string} transactionId - ID giao dịch
 * @returns {Object} - Kết quả kiểm tra thanh toán
 */
const checkPaymentStatus = (transactionId) => {
    // Giả lập một số trạng thái thanh toán (trong thực tế sẽ gọi API cổng thanh toán)
    const statuses = ['pending', 'success', 'failed'];
    const status = statuses[Math.floor(Math.random() * statuses.length)]; // Chọn trạng thái ngẫu nhiên

    return {
        transactionId,
        status,
        checkedAt: new Date(),
    };
};

/**
 * Hoàn tiền giao dịch (giả lập)
 * @param {string} transactionId - ID giao dịch cần hoàn tiền
 * @returns {Object} - Kết quả hoàn tiền
 */
const refundPayment = (transactionId) => {
    return {
        transactionId,
        status: 'refunded',
        refundedAt: new Date(),
    };
};

module.exports = {
    createPayment,
    checkPaymentStatus,
    refundPayment,
};
