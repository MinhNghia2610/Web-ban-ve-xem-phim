const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    movieID: { type: Number, required: true }, // Thêm movieID từ database
    title: { type: String, required: true },
    duration: { type: String, required: true }, // Chuyển từ Number sang String vì dữ liệu là "100 phút" 
    poster: { type: String, required: true },  // Dữ liệu đang có field "poster" thay vì "posterUrl"
    trailer: { type: String, required: true },  // Thêm trailer vì dữ liệu có sẵn
    description: { type: String, required: true }
});

const Movie = mongoose.model('movies', MovieSchema);
module.exports = Movie;
