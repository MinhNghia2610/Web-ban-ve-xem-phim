const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: [String], required: true },
    duration: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    director: { type: String, required: true },
    cast: { type: [String], required: true },
    posterUrl: { type: String, required: true }
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
