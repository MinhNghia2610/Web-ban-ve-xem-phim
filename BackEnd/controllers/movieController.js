const Movie = require('../models/Movie'); // Kiểm tra xem Movie có được import đúng không

// Tạo phim mới
exports.createMovie = async (req, res) => {
    try {
        const { title, description, genre, duration, releaseDate, director, cast, posterUrl } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!title || !description || !genre || !duration || !releaseDate || !director || !cast || !posterUrl) {
            return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
        }

        const newMovie = new Movie({
            title,
            description,
            genre,
            duration,
            releaseDate,
            director,
            cast,
            posterUrl
        });

        await newMovie.save();
        res.status(201).json({ message: 'Phim đã được tạo!', movie: newMovie });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Lấy danh sách phim
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        console.log("📌 Dữ liệu từ MongoDB:", movies);
        res.status(200).json(movies);
    } catch (error) {
        console.error("❌ Lỗi lấy danh sách phim:", error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};
