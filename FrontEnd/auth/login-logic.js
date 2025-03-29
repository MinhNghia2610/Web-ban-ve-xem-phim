function validateForm(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const form = document.getElementById('loginForm');

    const isRegisterPage = !!document.getElementById('email');

    if (isRegisterPage) {
        // Đăng ký
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Vui lòng nhập địa chỉ email hợp lệ.');
            return;
        }

        // Kiểm tra số điện thoại (10 số)
        if (!phone.match(/^\d{10}$/)) {
            showError('Số điện thoại phải có 10 chữ số.');
            return;
        }

        // Kiểm tra độ dài mật khẩu
        if (password.length < 8) {
            showError('Mật khẩu phải có ít nhất 8 ký tự.');
            return;
        }

        // Kiểm tra xác nhận mật khẩu
        if (password !== confirmPassword) {
            showError('Mật khẩu không khớp.');
            return;
        }

        // Gửi yêu cầu đăng ký đến API
        fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, phone, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                window.location.href = 'login.html';
            } else {
                showError(data.message);
            }
        })
        .catch(() => showError('Lỗi kết nối đến server.'));
    } else {
        // Đăng nhập
        fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("loggedInUser", JSON.stringify(data.user));
                alert('Đăng nhập thành công!');
                updateUserStatus();
                window.location.href = '../home/index.html';
            } else {
                showError('Tên đăng nhập hoặc mật khẩu không hợp lệ.');
            }
        })
        .catch(() => showError('Lỗi kết nối đến server.'));
    }
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        // Hiệu ứng rung
        errorMessage.style.animation = 'none';
        errorMessage.offsetHeight;
        errorMessage.style.animation = 'shake 0.5s ease';

        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
}

function updateUserStatus() {
    const userStatus = document.getElementById("userStatus");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

    if (userStatus) {
        if (loggedInUser.username) {
            userStatus.innerHTML = `👤 ${loggedInUser.username}`;
            userStatus.setAttribute("onclick", "openUserProfile()");
        } else {
            userStatus.innerHTML = "Đăng nhập";
            userStatus.setAttribute("onclick", "handleLoginClick()");
        }
    }
}

// Cập nhật giao diện ngay khi trang tải
document.addEventListener("DOMContentLoaded", updateUserStatus);
