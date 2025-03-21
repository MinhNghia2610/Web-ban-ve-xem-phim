const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../utils/validateRequest');
const showtimeController = require('../controllers/showtimeController');

// Kiểm tra xem controller có bị undefined không
if (!showtimeController || Object.keys(showtimeController).length === 0) {
    console.error('❌ Lỗi: Không thể import showtimeController! Kiểm tra lại cách export trong showtimeController.js');
    process.exit(1);
}

const router = express.Router();

// 📌 Tạo suất chiếu mới
router.post('/showtimes',
    [
        body('movieId').notEmpty().withMessage('ID phim không được để trống'),
        body('cinemaId').notEmpty().withMessage('ID rạp chiếu không được để trống'),
        body('startTime').isISO8601().toDate().withMessage('Thời gian chiếu không hợp lệ'),
        body('ticketPrice').isFloat({ min: 0 }).withMessage('Giá vé phải lớn hơn 0')
    ],
    validateRequest,
    showtimeController.createShowtime
);

// 📌 Lấy danh sách suất chiếu
router.get('/showtimes', showtimeController.getAllShowtimes);

// 📌 Lấy thông tin suất chiếu theo ID
router.get('/showtimes/:id',
    param('id').isMongoId().withMessage('ID suất chiếu không hợp lệ'),
    validateRequest,
    showtimeController.getShowtimeById
);

// 📌 Cập nhật suất chiếu
router.put('/showtimes/:id',
    [
        param('id').isMongoId().withMessage('ID suất chiếu không hợp lệ'),
        body('movieId').optional().notEmpty().withMessage('ID phim không được để trống'),
        body('cinemaId').optional().notEmpty().withMessage('ID rạp chiếu không được để trống'),
        body('startTime').optional().isISO8601().toDate().withMessage('Thời gian chiếu không hợp lệ'),
        body('ticketPrice').optional().isFloat({ min: 0 }).withMessage('Giá vé phải lớn hơn 0')
    ],
    validateRequest,
    showtimeController.updateShowtime
);

// 📌 Xóa suất chiếu
router.delete('/showtimes/:id',
    param('id').isMongoId().withMessage('ID suất chiếu không hợp lệ'),
    validateRequest,
    showtimeController.deleteShowtime
);

module.exports = router;
