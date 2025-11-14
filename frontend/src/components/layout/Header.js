import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Header = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [search, setSearch] = useState('');
  let navigate = useNavigate();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: '/search',
      search: `?q=${encodeURIComponent(search)}`,
    });
    setSearch('');
  };

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

      <div className="search-bar">
        <label htmlFor="searchQuery" className="visually-hidden">
          Hledat
        </label>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="searchQuery" id="searchQuery" value={search} onChange={handleChange} />
          <button type="submit" aria-label="Hledat">
            🔎
          </button>
        </form>
      </div>

      <div className="user-actions">
        <Link to="/create" className="action-button search-button">
          Offer your keys
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
