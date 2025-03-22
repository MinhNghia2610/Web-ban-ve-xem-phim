//tạo đặt vé mới
const Booking = require('../models/Booking');
exports.createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: 'Error creating booking', error });
    }
};
// xem các vé đã đặt
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId movieId showtimeId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};
// Update a booking
exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: 'Error updating booking', error });
    }
};
// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error });
    }
};