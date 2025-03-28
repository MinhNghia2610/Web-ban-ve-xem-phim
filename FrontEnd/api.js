const API_URL = 'http://localhost:5000/api';

// Hàm gọi API lấy danh sách phim
async function fetchMovies() {
    const response = await fetch(`${API_URL}/movies`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return await response.json();
}

// Hàm thêm phim mới
async function addMovie(movieData) {
    const response = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
    });
    if (!response.ok) throw new Error('Failed to add movie');
    return await response.json();
}