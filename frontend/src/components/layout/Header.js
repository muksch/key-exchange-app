import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <header className="main-header">
      <Link to="/" className="logo-link">
        <span className="logo-icon" role="img" aria-label="Key icon">
          🔑
        </span>
        <span className="logo-text">Key Exchange</span>
        <span className="logo-icon" role="img" aria-label="House icon">
          🏠
        </span>
      </Link>

      <nav className="main-navigation">
        <ul className="nav-list">
          <li>
            <Link to="/listings">My Homes</Link>
          </li>
          <li>
            <Link to="/how-it-works">How It Works</Link>
          </li>
          <li>
            <Link to="/points">My Points</Link>
          </li>
        </ul>
      </nav>

      <div className="user-actions">
        <Link to="/search" className="action-button search-button">
          Search
        </Link>

        {!isLoggedIn ? (
          <button className="action-button signup-button" onClick={() => login()}>
            Sign Up
          </button>
        ) : (
          <button className="action-button signup-button" onClick={() => logout()}>
            UserName
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
