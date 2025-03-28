const API_BASE_URL = 'http://localhost:5000/api'; // Địa chỉ backend

// Fetch danh sách phim từ API
async function fetchMovies() {
    try {
        console.log(`📌 Đang lấy phim từ: ${API_BASE_URL}/movies`);

        const response = await fetch(`${API_BASE_URL}/movies`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Status: ${response.status}`);
        }

        const movies = await response.json();
        console.log("✅ Dữ liệu nhận được:", movies);

        if (!Array.isArray(movies)) {
            throw new Error("Dữ liệu API không hợp lệ!");
        }

        displayMovies(movies);
    } catch (error) {
        console.error('❌ Lỗi khi tải phim:', error);
        alert('Không thể tải danh sách phim. Vui lòng thử lại sau.');
    }
}

// Hiển thị phim lên trang web
function displayMovies(movies) {
    const movieGrid = document.querySelector('#moviesGrid');
    if (!movieGrid) {
        console.error("❌ Không tìm thấy phần tử #moviesGrid trong HTML.");
        return;
    }

    movieGrid.innerHTML = ''; // Xóa dữ liệu cũ

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.poster || 'default-poster.jpg'}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3>${movie.title || 'Không có tiêu đề'}</h3>
                <p>${movie.duration || 'N/A'} phút</p>
                <button class="btn" onclick="bookTicket('${movie._id}', '${movie.title}')">Đặt vé</button>
            </div>
        `;
        movieGrid.appendChild(movieCard);
    });
}

// Khi trang tải xong, tự động fetch phim
document.addEventListener('DOMContentLoaded', fetchMovies);
