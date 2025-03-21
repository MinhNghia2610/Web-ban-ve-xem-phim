const Cinema = require('../models/cinema');

/**
 * Tạo rạp mới
 * @param {Object} cinemaData - Dữ liệu rạp (name, location, screens)
 * @returns {Object} - Thông tin rạp vừa tạo
 */
const createCinema = async (cinemaData) => {
    return await Cinema.create(cinemaData);
};

/**
 * Lấy danh sách tất cả rạp chiếu phim
 * @returns {Array} - Danh sách rạp
 */
const getAllCinemas = async () => {
    return await Cinema.find();
};

/**
 * Lấy thông tin rạp theo ID
 * @param {string} cinemaId - ID rạp
 * @returns {Object} - Chi tiết rạp
 */
const getCinemaById = async (cinemaId) => {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
        throw new Error('Không tìm thấy rạp');
    }
    return cinema;
};

/**
 * Cập nhật thông tin rạp
 * @param {string} cinemaId - ID rạp
 * @param {Object} updateData - Dữ liệu cập nhật (name, location, screens)
 * @returns {Object} - Rạp đã được cập nhật
 */
const updateCinema = async (cinemaId, updateData) => {
    const updatedCinema = await Cinema.findByIdAndUpdate(cinemaId, updateData, { new: true });
    if (!updatedCinema) {
        throw new Error('Không tìm thấy rạp');
    }
    return updatedCinema;
};

/**
 * Xóa rạp chiếu phim
 * @param {string} cinemaId - ID rạp
 * @returns {Object} - Kết quả xóa
 */
const deleteCinema = async (cinemaId) => {
    const deletedCinema = await Cinema.findByIdAndDelete(cinemaId);
    if (!deletedCinema) {
        throw new Error('Không tìm thấy rạp');
    }
    return { message: 'Đã xóa rạp thành công' };
};

module.exports = {
    createCinema,
    getAllCinemas,
    getCinemaById,
    updateCinema,
    deleteCinema,
};
