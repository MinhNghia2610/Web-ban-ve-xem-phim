const Cinema = require('../models/Cinema');

// Thêm rạp chiếu mới
exports.createCinema = async (req, res) => {
    try {
        const { name, location, totalScreens } = req.body;

        const newCinema = new Cinema({
            name,
            location,
            totalScreens
        });

        await newCinema.save();
        res.status(201).json({ message: 'Thêm rạp chiếu thành công!', cinema: newCinema });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Lấy danh sách tất cả rạp chiếu
exports.getAllCinemas = async (req, res) => {
    try {
        const cinemas = await Cinema.find();
        res.json({ cinemas });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Lấy thông tin chi tiết của một rạp chiếu theo ID
exports.getCinemaById = async (req, res) => {
    try {
        const cinema = await Cinema.findById(req.params.id);
        if (!cinema) return res.status(404).json({ message: 'Không tìm thấy rạp!' });

        res.json({ cinema });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Cập nhật thông tin rạp chiếu
exports.updateCinema = async (req, res) => {
    try {
        const { name, location, totalScreens } = req.body;
        const updatedCinema = await Cinema.findByIdAndUpdate(
            req.params.id,
            { name, location, totalScreens },
            { new: true } // Trả về bản cập nhật
        );

        if (!updatedCinema) return res.status(404).json({ message: 'Không tìm thấy rạp!' });

        res.json({ message: 'Cập nhật rạp thành công!', cinema: updatedCinema });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Xóa rạp chiếu
exports.deleteCinema = async (req, res) => {
    try {
        const deletedCinema = await Cinema.findByIdAndDelete(req.params.id);
        if (!deletedCinema) return res.status(404).json({ message: 'Không tìm thấy rạp!' });

        res.json({ message: 'Xóa rạp thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};
