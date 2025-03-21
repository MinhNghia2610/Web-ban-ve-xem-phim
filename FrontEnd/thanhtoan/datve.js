 // Tạo danh sách ghế
 const seatContainer = document.getElementById('seats');
 const totalSeats = 50;
 const pricePerSeat = 75000; // 75,000 VND per seat

 // Lưu trữ thông tin đặt vé
 let bookingInfo = {
     selectedSeats: [],
     totalPrice: 0,
     promotion: 0
 };

 for (let i = 1; i <= totalSeats; i++) {
     const seat = document.createElement('div');
     seat.classList.add('seat');
     seat.textContent = i;
     // Removed occupied class to make seats available
     seatContainer.appendChild(seat);

     // Add click event to toggle seat selection
     seat.addEventListener('click', () => {
         seat.classList.toggle('selected');
         updateTotalPrice();
     });
 }

 // Cập nhật tổng tiền
 // Cập nhật tổng tiền
function updateTotalPrice() {
    const selectedSeats = document.querySelectorAll('.seat.selected').length;
    const promotionValue = document.getElementById('promotion').value;
    
    const ticketTotal = selectedSeats * pricePerSeat; // Giá vé chưa giảm
    const discount = ticketTotal * (promotionValue / 100);
    const total = ticketTotal - discount; // Tổng tiền sau khuyến mãi

    bookingInfo.selectedSeats = Array.from(document.querySelectorAll('.seat.selected')).map(seat => seat.textContent);
    bookingInfo.ticketPrice = ticketTotal; // Lưu giá vé chưa giảm
    bookingInfo.totalPrice = total; // Lưu tổng tiền sau giảm giá
    bookingInfo.promotion = promotionValue;
    
    document.getElementById('total-price').textContent = total.toLocaleString();
}


 // Sự kiện khi thay đổi khuyến mãi
 document.getElementById('promotion').addEventListener('change', updateTotalPrice);

 // Sự kiện khi nhấn nút đặt vé
 document.getElementById('book-ticket-btn').addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    if (selectedSeats.length === 0) {
        alert('Vui lòng chọn ít nhất một ghế!');
        return;
    }

    // Lưu thông tin đặt vé
    bookingInfo.ticketPrice = bookingInfo.totalPrice;
    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));

    // Chuyển hướng sang trang dịch vụ
    window.location.href = 'dichvu.html'; // Đảm bảo đường dẫn đúng
});
