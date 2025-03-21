const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    cinemaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cinema',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    seatsAvailable: {
        type: Number,
        required: true,
        min: 0
    },
    totalSeats: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Showtime = mongoose.model('Showtime', showtimeSchema);
module.exports = Showtime;
