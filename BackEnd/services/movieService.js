const Movie = require('../models/movie');

/**
 * Thêm phim mới
 * @param {Object} movieData - Dữ liệu phim (title, genre, duration, releaseDate)
 * @returns {Object} - Thông tin phim vừa tạo
 */
const createMovie = async (movieData) => {
    return await Movie.create(movieData);
};

/**
 * Lấy danh sách tất cả phim
 * @returns {Array} - Danh sách phim
 */
const getAllMovies = async () => {
    return await Movie.find();
};

/**
 * Lấy thông tin phim theo ID
 * @param {string} movieId - ID phim
 * @returns {Object} - Chi tiết phim
 */
const getMovieById = async (movieId) => {
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new Error('Không tìm thấy phim');
    }
    return movie;
};

/**
 * Cập nhật thông tin phim
 * @param {string} movieId - ID phim
 * @param {Object} updateData - Dữ liệu cập nhật (title, genre, duration, releaseDate)
 * @returns {Object} - Phim đã được cập nhật
 */
const updateMovie = async (movieId, updateData) => {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
    if (!updatedMovie) {
        throw new Error('Không tìm thấy phim');
    }
    return updatedMovie;
};

/**
 * Xóa phim khỏi danh sách
 * @param {string} movieId - ID phim
 * @returns {Object} - Kết quả xóa
 */
const deleteMovie = async (movieId) => {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) {
        throw new Error('Không tìm thấy phim');
    }
    return { message: 'Đã xóa phim thành công' };
};

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
};
