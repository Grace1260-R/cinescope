
import { useEffect, useState } from "react";
import movies from "./data/movies";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [activePage, setActivePage] = useState("discover");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("cinescope-favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  // Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem(
      "cinescope-favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // Get all unique genres
  const genres = [
    "All",
    ...new Set(movies.map((movie) => movie.genre)),
  ];

  // Add or remove a movie from favorites
  const toggleFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId]
    );
  };

  // Filter movies by search and genre
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" ||
      movie.genre === selectedGenre;

    const matchesPage =
      activePage === "discover" ||
      favorites.includes(movie.id);

    return matchesSearch && matchesGenre && matchesPage;
  });

  return (
    <div>
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        favoritesCount={favorites.length}
      />

      <main className="main-content">
        <section className="hero">
          <p className="eyebrow">YOUR NEXT MOVIE NIGHT STARTS HERE</p>
          <h1>Discover Your Next Favorite Story</h1>
          <p>
            Explore movies, find hidden gems, and build your
            personal watchlist.
          </p>
        </section>

        <section className="catalog">
          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search movies by title..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="genre-filters">
            {genres.map((genre) => (
              <button
                key={genre}
                className={
                  selectedGenre === genre
                    ? "genre-chip selected"
                    : "genre-chip"
                }
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          <MovieList
            movies={filteredMovies}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectMovie={setSelectedMovie}
          />
        </section>
      </main>

      <footer className="footer">
        <p>
          <span className="brand-icon">▶</span> CineScope
        </p>
        <span>Find your next favorite story.</span>
      </footer>

      {selectedMovie && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedMovie(null)}
        >
          <section
            className="movie-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedMovie.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedMovie(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <img
              src={selectedMovie.poster}
              alt={`${selectedMovie.title} poster`}
              className="modal-poster"
            />

            <div className="modal-content">
              <p className="eyebrow">MOVIE DETAILS</p>
              <h2>{selectedMovie.title}</h2>

              <p className="modal-meta">
                {selectedMovie.year} · {selectedMovie.genre} ·{" "}
                {selectedMovie.duration}
              </p>

              <p className="modal-rating">
                ★ {selectedMovie.rating} / 10
              </p>

              <p>{selectedMovie.description}</p>

              <button
                className="details-button"
                onClick={() => toggleFavorite(selectedMovie.id)}
              >
                {favorites.includes(selectedMovie.id)
                  ? "♥ Remove from Watchlist"
                  : "♡ Add to Watchlist"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
