import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminContent } from '../context/AdminContentContext';
import { useCart } from '../context/CartContext';
import './Nav.css';

export default function Nav() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { content } = useAdminContent();
  const { count: cartCount } = useCart();

  const cartLink = (
    <Link to="/cart" className="nav__link nav__link--cart" onClick={() => setMenuOpen(false)}>
      Cart {cartCount > 0 && <span className="nav__cart-count">{cartCount}</span>}
    </Link>
  );

  return (
    <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
      <Link to="/admin" className="nav__brand" title="Admin">{content.hero.title}</Link>
      <div className="nav__cart-bar">{cartLink}</div>
      <button
        type="button"
        className="nav__toggle"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="nav__toggle-bar" />
        <span className="nav__toggle-bar" />
        <span className="nav__toggle-bar" />
      </button>
      <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
        <li>
          <Link to="/" className={`nav__link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        {content.categories.map((cat) => (
          <li key={cat.id}>
            <Link to={`/${cat.id}`} className={`nav__link ${location.pathname === `/${cat.id}` ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{cat.title}</Link>
          </li>
        ))}
        <li className="nav__cart-in-menu">{cartLink}</li>
      </ul>
    </nav>
  );
}
