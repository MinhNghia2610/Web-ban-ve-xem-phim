document.getElementById('addMovieForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const movieData = {
        maPhim: document.getElementById('maPhim').value,
        maLP: document.getElementById('maLP').value,
        tenphim: document.getElementById('tenphim').value,
        dienvien: document.getElementById('dienvien').value,
        thongtinphim: document.getElementById('thongtinphim').value,
        tinhtrangphim: document.getElementById('tinhtrangphim').value,
        daodien: document.getElementById('daodien').value,
        thoiluongphim: document.getElementById('thoiluongphim').value + 'h',
        namsanxuat: document.getElementById('namsanxuat').value,
        hinhanh: '#'
    };

    try {
        const response = await fetch('http://localhost:3000/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieData)
        });

        if (response.ok) {
            alert('Phim đã được thêm thành công!');
            document.getElementById('addMovieForm').reset();
        } else {
            alert('Có lỗi xảy ra khi thêm phim!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi kết nối với server!');
    }
});