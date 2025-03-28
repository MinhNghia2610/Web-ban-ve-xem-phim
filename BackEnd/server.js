require('dotenv').config(); // Load biến môi trường từ file .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Khởi tạo Express server
const app = express();

// Middleware
app.use(express.json()); // Hỗ trợ JSON request body
app.use(cors({
    origin: ['http://localhost:5500', 'http://192.168.100.205:3000'], // Thêm frontend vào đây
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev')); // Log request trong môi trường phát triển

// Kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Timeout nếu không kết nối được
        });
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }
};
connectDB();

// Routes
const movieRoutes = require('./routes/movieRoutes'); // Đảm bảo route đúng
app.use('/api/movies', movieRoutes);

// Xử lý route không tồn tại (404)
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Xử lý lỗi server (500)
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Xử lý khi server tắt
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);
});
