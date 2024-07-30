import logo from "/logo/vite.svg";
import "../styles/components/Style-NavBar.scss";
import {ConnectButton} from "@rainbow-me/rainbowkit";

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
          <ConnectButton
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            chainStatus={{
              smallScreen: 'none',
              largeScreen: 'full'
            }}
          />
        </div>
    </nav>
  );
}

export default NavBar;