const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../utils/validateRequest');
const movieController = require('../controllers/movieController'); // Kiểm tra đường dẫn này

const router = express.Router();

// Tạo phim mới
router.post('/',
    [
        body('title').notEmpty().withMessage('Tên phim không được để trống'),
        body('description').notEmpty().withMessage('Mô tả không được để trống'),
        body('genre').isArray({ min: 1 }).withMessage('Phim phải có ít nhất một thể loại'),
        body('duration').isInt({ min: 1 }).withMessage('Thời lượng phim phải lớn hơn 0'),
        body('releaseDate').isISO8601().toDate().withMessage('Ngày phát hành không hợp lệ'),
        body('director').notEmpty().withMessage('Đạo diễn không được để trống'),
        body('cast').isArray({ min: 1 }).withMessage('Phải có ít nhất một diễn viên'),
        body('posterUrl').isURL().withMessage('URL poster không hợp lệ')
    ],
    validateRequest,
    movieController.createMovie
);

// Lấy danh sách phim
router.get('/', movieController.getAllMovies);

module.exports = router;
