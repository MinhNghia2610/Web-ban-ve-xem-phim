const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinemaController');

// Route thêm rạp chiếu
router.post('/cinemas', cinemaController.createCinema);

// Route lấy danh sách rạp chiếu
router.get('/cinemas', cinemaController.getAllCinemas);

// Route lấy thông tin rạp chiếu theo ID
router.get('/cinemas/:id', cinemaController.getCinemaById);

// Route cập nhật rạp chiếu
router.put('/cinemas/:id', cinemaController.updateCinema);

// Route xóa rạp chiếu
router.delete('/cinemas/:id', cinemaController.deleteCinema);

module.exports = router;
