window.onload = function() {
    let bookingInfo = JSON.parse(localStorage.getItem('bookingInfo')) || { ticketPrice: 0, servicePrice: 0,totalPrice: 0 };
    // Get ticket price from datve.js
    const ticketPrice = bookingInfo.ticketPrice || 0;
    const servicePrice = bookingInfo.servicePrice || 0;
    const totalPrice = bookingInfo.totalPrice || 0;

    // Display prices with proper formatting
    document.getElementById('ticket-price').textContent = formatCurrency(ticketPrice);
    document.getElementById('service-price').textContent = formatCurrency(servicePrice); 
    document.getElementById('total-price').textContent = formatCurrency(totalPrice);

    // Get customer details if available
    const customerName = localStorage.getItem('customerName');
    const customerEmail = localStorage.getItem('customerEmail');
    const customerPhone = localStorage.getItem('customerPhone');

    // Set input values instead of text content
    if (customerName) {
        document.getElementById('name').value = customerName;
    }
    if (customerEmail) {
        document.getElementById('email').value = customerEmail;
    }
    if (customerPhone) {
        document.getElementById('phone').value = customerPhone;
    }

    // Load any previously selected payment method
    const savedPaymentMethod = localStorage.getItem('paymentMethod');
    if (savedPaymentMethod) {
        const paymentEl = document.querySelector(`[data-method="${savedPaymentMethod}"]`);
        if (paymentEl) {
            paymentEl.classList.add('selected');
        }
    }
}

// Helper function to format currency
function formatCurrency(amount) {
    return parseInt(amount).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
}

function selectPayment(element) {
    // Remove selected class from all payment methods
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
    });
    // Add selected class to clicked payment method
    element.classList.add('selected');
    // Save selected payment method immediately
    localStorage.setItem('paymentMethod', element.dataset.method);
}

document.querySelector('.payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const selectedPayment = document.querySelector('.payment-method.selected');
    if (!selectedPayment) {
        alert('Vui lòng chọn phương thức thanh toán!');
        return;
    }

    // Save customer details
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    localStorage.setItem('customerName', name);
    localStorage.setItem('customerEmail', email);
    localStorage.setItem('customerPhone', phone);

    // Save final prices for hoadon.html
    localStorage.setItem('finalTicketPrice', document.getElementById('ticket-price').textContent);
    localStorage.setItem('finalServicePrice', document.getElementById('service-price').textContent);
    localStorage.setItem('finalTotalPrice', document.getElementById('total-price').textContent);

    alert('Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.');
    
    // Clear booking data
    localStorage.removeItem('ticketPrice');
    localStorage.removeItem('servicePrice');
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('cart');
    
    // Redirect to invoice page
    window.location.href = 'hoadon.html';
});