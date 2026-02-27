export default function Nav({ page, setPage, user, logout }) {
  const navItems = [
    { key: "home",     label: "Home"     },
    { key: "about",    label: "About Us" },
    { key: "products", label: "Products" },
  ];

  return (
    <nav className="nav">
      <button className="nav__logo" onClick={() => setPage("home")}>
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&q=80"
          alt="Coffeecient logo"
        />
        Coffeecient
      </button>

      <div className="nav__links">
        {navItems.map(({ key, label }) => (
          <button
            key={key}
            className={`nav__link${page === key ? " nav__link--active" : ""}`}
            onClick={() => setPage(key)}
          >
            {label}
          </button>
        ))}

        {user ? (
          <div className="nav__user">
            <div className="nav__avatar">{user.name[0].toUpperCase()}</div>
            <span>Hi, {user.name.split(" ")[0]}</span>
            <button className="btn btn--nav" onClick={logout}>Logout</button>
          </div>
        ) : (
          <>
            <button className="nav__link" onClick={() => setPage("login")}>Login</button>
            <button className="btn btn--nav" onClick={() => setPage("register")}>Join Us</button>
          </>
        )}
      </div>
    </nav>
  );
}
