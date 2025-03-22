const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seats: { type: [Number], required: true },
});
module.exports = mongoose.model('Booking', bookingSchema);