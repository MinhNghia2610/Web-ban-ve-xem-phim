const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

// Hàm xử lý thanh toán
const processPayment = async (amount, currency, paymentMethodId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Đơn vị tính là cent
            currency,
            payment_method: paymentMethodId,
            confirm: true
        });

        console.log(`💳 Thanh toán thành công: ${paymentIntent.id}`);
        return { success: true, paymentIntent };
    } catch (error) {
        console.error('❌ Lỗi thanh toán:', error);
        return { success: false, error };
    }
};

module.exports = { processPayment };
