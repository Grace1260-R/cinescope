
import MovieCard from "./MovieCard";

function MovieList({
  movies,
  favorites,
  onToggleFavorite,
  onSelectMovie
}) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <h3>No movies found</h3>
        <p>Try another search or choose a different genre.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </div>
  );
}

export default MovieList;
