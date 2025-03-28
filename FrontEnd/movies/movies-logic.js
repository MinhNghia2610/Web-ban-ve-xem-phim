const API_BASE_URL = 'http://localhost:5000/api';

// Fetch movies from API
async function fetchMovies() {
    try {
        const response = await fetch(`${API_BASE_URL}/movies`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Status: ${response.status}`);
        }

        const movies = await response.json();
        if (!Array.isArray(movies)) {
            throw new Error("Dữ liệu không hợp lệ!");
        }

        displayMovies(movies);
    } catch (error) {
        console.error('❌ Lỗi khi tải phim:', error);
        alert('Không thể tải danh sách phim.');
    }
}

// Hiển thị danh sách phim
function displayMovies(movies) {
    const container = document.querySelector('.movie-container');
    if (!container) return;
    
    container.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <span class="rating">${movie.rating || 'N/A'}/5</span>
            <img src="${movie.image || 'default.jpg'}" alt="${movie.title}" class="movie-image">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Thời lượng: ${movie.duration || 'N/A'}<br>
                Thể loại: ${movie.genre || 'Không rõ'}<br>
                Ngày phát hành: ${movie.releaseDate || 'Không rõ'}</p>
                <button class="book-button">Đặt vé</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Load movies when page loads
document.addEventListener('DOMContentLoaded', fetchMovies);
