// AVL Tree Node class
class Node {
    constructor(movie) {
        this.movie = movie;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

// AVL Tree implementation for movie searching
class MovieAVLTree {
    constructor() {
        this.root = null;
    }

    // Get height of node
    height(node) {
        if (!node) return 0;
        return node.height;
    }

    // Get balance factor
    getBalance(node) {
        if (!node) return 0;
        return this.height(node.left) - this.height(node.right);
    }

    // Right rotate
    rightRotate(y) {
        let x = y.left;
        let T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        return x;
    }

    // Left rotate
    leftRotate(x) {
        let y = x.right;
        let T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        return y;
    }

    // Insert a movie
    insert(movie) {
        this.root = this._insert(this.root, movie);
    }

    _insert(node, movie) {
        if (!node) return new Node(movie);

        if (movie.title < node.movie.title)
            node.left = this._insert(node.left, movie);
        else if (movie.title > node.movie.title)
            node.right = this._insert(node.right, movie);
        else
            return node;

        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;

        let balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && movie.title < node.left.movie.title)
            return this.rightRotate(node);

        // Right Right Case
        if (balance < -1 && movie.title > node.right.movie.title)
            return this.leftRotate(node);

        // Left Right Case
        if (balance > 1 && movie.title > node.left.movie.title) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && movie.title < node.right.movie.title) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    // Search for movies by title prefix
    searchByPrefix(prefix) {
        const results = [];
        this._searchByPrefix(this.root, prefix.toLowerCase(), results);
        return results;
    }

    _searchByPrefix(node, prefix, results) {
        if (!node) return;

        const title = node.movie.title.toLowerCase();
        
        if (title.startsWith(prefix)) {
            results.push(node.movie);
        }

        if (prefix < title) {
            this._searchByPrefix(node.left, prefix, results);
        }
        
        this._searchByPrefix(node.right, prefix, results);
    }

    // Search by genre
    searchByGenre(genre) {
        const results = [];
        this._searchByGenre(this.root, genre.toLowerCase(), results);
        return results;
    }

    _searchByGenre(node, genre, results) {
        if (!node) return;

        if (node.movie.genre.toLowerCase().includes(genre)) {
            results.push(node.movie);
        }

        this._searchByGenre(node.left, genre, results);
        this._searchByGenre(node.right, genre, results);
    }
}

// Initialize the movie tree
const movieTree = new MovieAVLTree();

// Sample movie data
const sampleMovies = [
    {
        title: "The Avengers",
        rating: "4.5",
        image: "images/avengers.jpg",
        duration: "2h 30m",
        genre: "Comedy",
        releaseDate: "2012",
        director: "Joss Whedon"
    },
    {
        title: "The Dark Knight",
        rating: "5.0", 
        image: "images/dark-knight.jpg",
        duration: "2h 32m",
        genre: "Action",
        releaseDate: "2008",
        director: "Christopher Nolan"
    }
    // Add more sample movies as needed
];

// Insert sample movies into the tree
sampleMovies.forEach(movie => movieTree.insert(movie));

// Function to get all movies
function getAllMovies() {
    const allMovies = [];
    function inorderTraversal(node) {
        if (node) {
            inorderTraversal(node.left);
            allMovies.push(node.movie);
            inorderTraversal(node.right);
        }
    }
    inorderTraversal(movieTree.root);
    return allMovies;
}

// Event listeners for search and filter functionality
window.addEventListener('load', () => {
    // Display all movies initially
    displayMovies(getAllMovies());

    // Add genre filter functionality
    const genreButtons = document.querySelectorAll('.genre-button');
    genreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const genre = e.target.textContent;
            const movies = genre === 'All' ? 
                getAllMovies() : 
                movieTree.searchByGenre(genre);
            displayMovies(movies);
        });
    });
});

// Helper function to display movies in the UI
function displayMovies(movies) {
    const container = document.querySelector('.movie-container');
    if (!container) return;
    
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        container.appendChild(movieCard);
    });
}

// Helper function to create a movie card element
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <span class="rating">${movie.rating}/5</span>
        <img src="${movie.image}" alt="${movie.title}" class="movie-image">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-details">
                Duration: ${movie.duration}<br>
                Genre: ${movie.genre}<br>
                Release Date: ${movie.releaseDate}<br>
                Director: ${movie.director}
            </p>
            <button class="book-button">Book Now</button>
        </div>
    `;
    return card;
}
