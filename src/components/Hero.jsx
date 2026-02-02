import { Link, useLocation } from 'react-router-dom';
import { useAdminContent } from '../context/AdminContentContext';
import './Hero.css';

export default function Hero() {
  const location = useLocation();
  const { content } = useAdminContent();
  const { title, subtitle, backgroundImage } = content.hero;

  const handleExploreClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('sections')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className="hero"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="hero__inner">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>
        <Link to="/#sections" className="hero__cta" onClick={handleExploreClick}>
          Explore collections
        </Link>
      </div>
    </header>
  );
}
