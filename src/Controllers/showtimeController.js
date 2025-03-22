//Quản lý suất chiếu
// Get all showtimes
const Showtime = require('../models/Showtime');
exports.getShowtimes = async (req, res) => {
    try {
        const showtimes = await Showtime.find();
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching showtimes', error });
    }
};
// Add a new showtime
exports.addShowtime = async (req, res) => {
    const newShowtime = new Showtime(req.body);
    try {
        const savedShowtime = await newShowtime.save();
        res.status(201).json(savedShowtime);
    } catch (error) {
        res.status(400).json({ message: 'Error adding showtime', error });
    }
};
// Update an existing showtime
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
// Delete a showtime
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