# Web-ban-ve-xem-phim
# 🎬 Movie Ticket Booking System

## 📌 Giới Thiệu
Dự án **Movie Ticket Booking System** là một hệ thống đặt vé xem phim trực tuyến, giúp người dùng dễ dàng chọn phim, suất chiếu, ghế ngồi và thanh toán vé.

## 🚀 Công Nghệ Sử Dụng
- **Backend:** Node.js, MongoDB
- **Frontend:** HTML, CSS, JavaScript
- **API Testing:** Postman

## 🎯 Tính Năng Chính
- 🔍 **Xem danh sách phim**: Hiển thị các bộ phim đang chiếu
- 🎫 **Đặt vé trực tuyến**: Chọn suất chiếu, ghế ngồi và đặt vé
- 🏦 **Thanh toán vé**: Hỗ trợ các phương thức thanh toán cơ bản
- 📜 **Lịch sử đặt vé**: Người dùng có thể xem lại các vé đã đặt
- 🔐 **Quản lý tài khoản**: Đăng nhập, đăng ký và quản lý thông tin cá nhân

## ⚙️ Cách Chạy Dự Án
### **1. Clone repository**
```bash
git clone https://github.com/yourusername/movie-ticket-booking.git
cd movie-ticket-booking
```

### **2. Cài đặt backend**
```bash
cd backend
npm install
npm start
```
Backend sẽ chạy tại `http://localhost:5000`

### **3. Chạy frontend**
```bash
cd ../frontend
open index.html
```
Hoặc dùng Live Server nếu đang lập trình với VS Code.

## 🔌 API Endpoints
| Phương thức | Endpoint           | Mô tả |
|------------|-------------------|--------|
| GET        | `/movies`         | Lấy danh sách phim |
| GET        | `/movies/:id`     | Lấy chi tiết phim |
| POST       | `/bookings`       | Đặt vé |
| GET        | `/bookings/:user` | Xem lịch sử đặt vé |

---
💡 *Dự án này đang được phát triển liên tục! Hãy theo dõi để cập nhật những tính năng mới.* 🚀
