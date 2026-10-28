
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import movies from "./data/movies";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [activePage, setActivePage] = useState("discover");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("cinescope-favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cinescope-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const genres = ["All", ...new Set(movies.map((movie) => movie.genre))];

  function toggleFavorite(movieId) {
    setFavorites((previousFavorites) =>
      previousFavorites.includes(movieId)
        ? previousFavorites.filter((id) => id !== movieId)
        : [...previousFavorites, movieId]
    );
  }

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    const matchesPage =
      activePage === "discover" || favorites.includes(movie.id);

    return matchesSearch && matchesGenre && matchesPage;
  });

  function changePage(page) {
    setActivePage(page);
    setSearch("");
    setSelectedGenre("All");
    setSelectedMovie(null);
  }

  return (
    <div className="app">
      <Navbar
        favoriteCount={favorites.length}
      />

      <main className="main-content">
        <section className="hero">
          <p className="eyebrow">YOUR NEXT FAVORITE MOVIE AWAITS</p>

          <h1>
            Discover your next
            <br />
            <span>cinematic adventure.</span>
          </h1>

          <p className="hero-description">
            Explore movies, find hidden gems, and build your personal watchlist.
          </p>
        </section>

        <section className="catalog">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                {activePage === "discover" ? "THE COLLECTION" : "YOUR PERSONAL PICKS"}
              </p>
              <h2>
                {activePage === "discover" ? "Explore Movies" : "My Watchlist"}
              </h2>
            </div>

            <span className="result-count">
              {filteredMovies.length} movies
            </span>
          </div>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search movies by title..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                ×
              </button>
            )}
          </div>

          <div className="genre-filters">
            {genres.map((genre) => (
              <button
                key={genre}
                className={selectedGenre === genre ? "genre-chip selected" : "genre-chip"}
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
        <p><span className="brand-icon">▶</span> CineScope</p>
        <span>Find your next favorite story.</span>
      </footer>

      {selectedMovie && (
        <div className="modal-backdrop" onClick={() => setSelectedMovie(null)}>
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
                {selectedMovie.year} · {selectedMovie.genre} · {selectedMovie.duration}
              </p>
              <p className="modal-rating">★ {selectedMovie.rating} / 10</p>
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
