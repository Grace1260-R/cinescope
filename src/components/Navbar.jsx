
function Navbar({ favoriteCount }) {
  return (
    <nav className="navbar">
      <h2 className="brand">
        <span className="brand-icon">▶</span>
        CineScope
      </h2>

      <div className="nav-links">
        <span className="nav-link">
          My Watchlist{" "}
          <span className="count">{favoriteCount}</span>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
