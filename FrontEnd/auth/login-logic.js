function validateForm(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const form = document.getElementById('loginForm');
    
    const isRegisterPage = !!document.getElementById('email');
    
    if (isRegisterPage) {
        const email = document.getElementById('email').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Vui Lòng Nhập Địa Chỉ Mail Hợp Lệ');
            return false;
        }

        if (password.length < 8) {
            showError('Mật khẩu phải có ít nhất 8 ký tự.');
            return false;
        }
        
        if (password !== confirmPassword) {
            showError('Mật khẩu không khớp.');
            return false;
        }
        
        console.log('Registration successful:', { username, email });
        localStorage.setItem('registeredUser', JSON.stringify({ username, email }));
        form.reset();
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
        
    } else {
        const storedUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
        
        if (username === storedUser.username) {
            console.log('Login successful:', username);
            form.reset();
            alert('Login successful!');
            window.location.href = '../home/index.html';
        } else {
            showError('Tên đăng nhập hoặc mật khẩu không hợp lệ.');
        }
    }
    
    return false;
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    errorMessage.style.animation = 'none';
    errorMessage.offsetHeight;
    errorMessage.style.animation = 'shake 0.5s ease';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        document.getElementById('errorMessage').style.display = 'none';
    });
});
