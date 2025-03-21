const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../utils/validateRequest');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/bookings',
    [
        body('userId').notEmpty().withMessage('User ID không được để trống'),
        body('movieId').notEmpty().withMessage('Movie ID không được để trống'),
        body('cinemaId').notEmpty().withMessage('Cinema ID không được để trống'),
        body('seatNumbers').isArray({ min: 1 }).withMessage('Phải chọn ít nhất một ghế'),
        body('paymentMethod').isIn(['credit_card', 'paypal', 'momo']).withMessage('Phương thức thanh toán không hợp lệ')
    ],
    validateRequest,
    bookingController.createBooking
);

module.exports = router;
