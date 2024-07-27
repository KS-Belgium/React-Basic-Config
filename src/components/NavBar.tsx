import logo from "/logo/vite.svg";
import "../styles/components/Style-NavBar.scss";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
        <div className="navbar-menu">
          <a href="/" className="navbar-item">
            Home
          </a>
          <a href="/about" className="navbar-item">
            About
          </a>
        </div>
    </nav>
  );
}

export default NavBar;