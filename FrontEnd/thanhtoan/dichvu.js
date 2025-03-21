// Lấy thông tin đặt vé từ localStorage
let bookingInfo = JSON.parse(localStorage.getItem('bookingInfo')) || { totalPrice: 0 };

// Lấy tổng tiền đặt vé trước đó
let totalPrice = bookingInfo.totalPrice || 0;

// Hiển thị tổng tiền ban đầu
document.getElementById('cartTotal').textContent = `${totalPrice.toLocaleString()} VNĐ`;

let cart = [];

function addToCart(serviceName, price) {
    const existingItem = cart.find(item => item.name === serviceName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: serviceName,
            price: price,
            quantity: 1
        });
    }

    // Cập nhật tổng tiền vé + dịch vụ
    totalPrice += price;
    
    // Lưu lại vào localStorage
    bookingInfo.totalPrice = totalPrice;
    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));

    updateCartDisplay();
}
function updateQuantity(index, change) {
    const item = cart[index];
    if (!item) return;

    // Cập nhật tổng tiền trước khi thay đổi số lượng
    totalPrice += item.price * change;

    // Nếu số lượng giảm về 0 thì xóa khỏi giỏ hàng
    item.quantity += change;
    if (item.quantity <= 0) {
        cart.splice(index, 1);
    }

    // Lưu lại vào localStorage
    bookingInfo.totalPrice = totalPrice;
    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));

    updateCartDisplay();
}


        function updateCartDisplay() {
            const cartItems = document.getElementById('cartItems');
            cartItems.innerHTML = '';
            
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div>
                        <div>${item.name}</div>
                        <div>${item.price.toLocaleString()} VNĐ</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                `;
                cartItems.appendChild(itemElement);
            });

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('cartTotal').textContent = `${total.toLocaleString()} VNĐ`;
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Giỏ hàng của bạn đang trống!');
                return;
            }
        
            // Lấy thông tin đặt vé từ localStorage
            let bookingInfo = JSON.parse(localStorage.getItem('bookingInfo')) || { totalPrice: 0, ticketPrice: 0, servicePrice: 0 };
        
            // Tính tổng tiền dịch vụ
            let servicePrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
            // Lưu giá dịch vụ vào bookingInfo
            bookingInfo.servicePrice = servicePrice;
        
            // Cập nhật tổng tiền (vé + dịch vụ)
            bookingInfo.totalPrice = bookingInfo.ticketPrice + servicePrice;
            console.log("Booking Info Before Saving:", bookingInfo);
            // Lưu vào localStorage
            localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
        
            // Chuyển sang trang hóa đơn
            window.location.href = 'thanhtoan.html';
        }
        
        
        
        
        