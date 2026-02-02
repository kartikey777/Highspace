import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminContent } from '../context/AdminContentContext';
import Hero from '../components/Hero';
import '../pages/HomePage.css';

export default function HomePage() {
  const location = useLocation();
  const { content } = useAdminContent();

  useEffect(() => {
    if (location.hash === '#sections') {
      const el = document.getElementById('sections');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <Hero />
      <section id="sections" className="home-sections">
        <div className="home-sections__inner">
          <h2 className="home-sections__title">{content.homeSectionsTitle}</h2>
          <div className="home-sections__grid">
            {content.categories.map((cat) => (
              <Link key={cat.id} to={`/${cat.id}`} className="section-card">
                {cat.coverImage && (
                  <span className="section-card__img-wrap">
                    <img src={cat.coverImage} alt="" className="section-card__img" />
                  </span>
                )}
                <span className="section-card__title">{cat.title}</span>
                <span className="section-card__desc">{cat.description}</span>
                <span className="section-card__cta">View all →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
