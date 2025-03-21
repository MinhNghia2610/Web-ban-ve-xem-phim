const Showtime = require('../models/showtime');

/**
 * Tạo suất chiếu mới
 * @param {Object} showtimeData - Dữ liệu suất chiếu (movie, cinema, showtime, price)
 * @returns {Object} - Thông tin suất chiếu mới
 */
const createShowtime = async (showtimeData) => {
    return await Showtime.create(showtimeData);
};

/**
 * Lấy danh sách tất cả suất chiếu
 * @returns {Array} - Danh sách suất chiếu
 */
const getAllShowtimes = async () => {
    return await Showtime.find().populate('movie cinema');
};

/**
 * Lấy suất chiếu theo ID
 * @param {string} showtimeId - ID suất chiếu
 * @returns {Object} - Thông tin suất chiếu
 */
const getShowtimeById = async (showtimeId) => {
    const showtime = await Showtime.findById(showtimeId).populate('movie cinema');
    if (!showtime) {
        throw new Error('Không tìm thấy suất chiếu');
    }
    return showtime;
};

/**
 * Cập nhật suất chiếu
 * @param {string} showtimeId - ID suất chiếu
 * @param {Object} updateData - Dữ liệu cập nhật (showtime, price)
 * @returns {Object} - Suất chiếu đã cập nhật
 */
const updateShowtime = async (showtimeId, updateData) => {
    const updatedShowtime = await Showtime.findByIdAndUpdate(showtimeId, updateData, { new: true });
    if (!updatedShowtime) {
        throw new Error('Không tìm thấy suất chiếu');
    }
    return updatedShowtime;
};

/**
 * Xóa suất chiếu
 * @param {string} showtimeId - ID suất chiếu
 * @returns {Object} - Kết quả xóa
 */
const deleteShowtime = async (showtimeId) => {
    const deletedShowtime = await Showtime.findByIdAndDelete(showtimeId);
    if (!deletedShowtime) {
        throw new Error('Không tìm thấy suất chiếu');
    }
    return { message: 'Đã xóa suất chiếu thành công' };
};

module.exports = {
    createShowtime,
    getAllShowtimes,
    getShowtimeById,
    updateShowtime,
    deleteShowtime,
};
