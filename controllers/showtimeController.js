const Showtime = require('../models/Showtime');

// 📌 Lấy danh sách suất chiếu
exports.getAllShowtimes = async (req, res) => {
    try {
        const showtimes = await Showtime.find();
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching showtimes', error });
    }
};

// 📌 Lấy thông tin suất chiếu theo ID
exports.getShowtimeById = async (req, res) => {
    try {
        const showtime = await Showtime.findById(req.params.id);
        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }
        res.status(200).json(showtime);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching showtime', error });
    }
};

// 📌 Tạo suất chiếu mới
exports.createShowtime = async (req, res) => {
    try {
        const newShowtime = new Showtime(req.body);
        const savedShowtime = await newShowtime.save();
        res.status(201).json(savedShowtime);
    } catch (error) {
        res.status(400).json({ message: 'Error adding showtime', error });
    }
};

// 📌 Cập nhật suất chiếu
exports.updateShowtime = async (req, res) => {
    try {
        const updatedShowtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedShowtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }
        res.status(200).json(updatedShowtime);
    } catch (error) {
        res.status(400).json({ message: 'Error updating showtime', error });
    }
};

// 📌 Xóa suất chiếu
exports.deleteShowtime = async (req, res) => {
    try {
        const deletedShowtime = await Showtime.findByIdAndDelete(req.params.id);
        if (!deletedShowtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting showtime', error });
    }
};
