const Booking = require('../models/booking');
const Showtime = require('../models/showtime');
const User = require('../models/user');

/**
 * Đặt vé xem phim
 * @param {Object} bookingData - Dữ liệu đặt vé (userId, showtimeId, seats)
 * @returns {Object} - Thông tin đơn đặt vé
 */
const createBooking = async (bookingData) => {
    const { userId, showtimeId, seats } = bookingData;

    // Kiểm tra suất chiếu có tồn tại không
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
        throw new Error('Suất chiếu không tồn tại');
    }

    // Kiểm tra ghế đã được đặt chưa
    const bookedSeats = showtime.bookedSeats || [];
    const isSeatTaken = seats.some((seat) => bookedSeats.includes(seat));
    if (isSeatTaken) {
        throw new Error('Một số ghế đã có người đặt');
    }

    // Cập nhật danh sách ghế đã đặt
    showtime.bookedSeats.push(...seats);
    await showtime.save();

    // Tạo đơn đặt vé
    const newBooking = await Booking.create({
        user: userId,
        showtime: showtimeId,
        seats,
    });

    return newBooking;
};

/**
 * Lấy thông tin đặt vé theo ID
 * @param {string} bookingId - ID của đặt vé
 * @returns {Object} - Chi tiết đặt vé
 */
const getBookingById = async (bookingId) => {
    const booking = await Booking.findById(bookingId)
        .populate('user', 'name email')
        .populate('showtime');
    if (!booking) {
        throw new Error('Không tìm thấy đặt vé');
    }
    return booking;
};

/**
 * Lấy danh sách vé của một người dùng
 * @param {string} userId - ID người dùng
 * @returns {Array} - Danh sách vé đã đặt
 */
const getUserBookings = async (userId) => {
    const bookings = await Booking.find({ user: userId })
        .populate('showtime')
        .sort({ createdAt: -1 }); // Sắp xếp mới nhất trước
    return bookings;
};

/**
 * Hủy đặt vé
 * @param {string} bookingId - ID đặt vé cần hủy
 * @returns {Object} - Thông tin đơn đặt vé đã hủy
 */
const cancelBooking = async (bookingId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new Error('Không tìm thấy đặt vé');
    }

    // Cập nhật danh sách ghế trống trong suất chiếu
    const showtime = await Showtime.findById(booking.showtime);
    showtime.bookedSeats = showtime.bookedSeats.filter(
        (seat) => !booking.seats.includes(seat)
    );
    await showtime.save();

    // Xóa đặt vé
    await Booking.findByIdAndDelete(bookingId);

    return { message: 'Đã hủy đặt vé thành công' };
};

module.exports = {
    createBooking,
    getBookingById,
    getUserBookings,
    cancelBooking,
};
