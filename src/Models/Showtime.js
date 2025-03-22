const mongoose = require('mongoose');
const showtimeSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    time: { type: Date, required: true },
    availableSeats: { type: Number, required: true },
});
module.exports = mongoose.model('Showtime', showtimeSchema);