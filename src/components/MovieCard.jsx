
function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  onSelectMovie
}) {
  return (
    <article className="movie-card">
      <div className="poster-container">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="movie-poster"
          loading="lazy"
        />

        <button
          className={isFavorite ? "heart-button favorited" : "heart-button"}
          onClick={() => onToggleFavorite(movie.id)}
          aria-label={isFavorite ? "Remove from watchlist" : "Add to watchlist"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        <span className="rating">★ {movie.rating}</span>
      </div>

      <div className="movie-info">
        <p className="movie-meta">
          {movie.year} <span>•</span> {movie.genre}
        </p>

        <h3>{movie.title}</h3>

        <p className="movie-duration">{movie.duration}</p>

        <button
          className="details-button"
          onClick={() => onSelectMovie(movie)}
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
