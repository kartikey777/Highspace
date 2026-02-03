import { useParams, Link } from 'react-router-dom';
import { useAdminContent, getCategoryByIdFromContent } from '../context/AdminContentContext';
import FurnitureCard from '../components/FurnitureCard';
import '../pages/SectionPage.css';

export default function SectionPage() {
  const { sectionId } = useParams();
  const { content } = useAdminContent();
  const category = getCategoryByIdFromContent(content, sectionId);

  if (!category) {
    return (
      <div className="section-page section-page--not-found">
        <p>Section not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="section-page">
      <div className="section-page__header">
        <Link to="/" className="section-page__back">← Home</Link>
        <h1 className="section-page__title">{category.title}</h1>
        {category.description && (
          <p className="section-page__description">{category.description}</p>
        )}
      </div>
      <div className="section-page__grid">
        {category.items.map((item) => (
          <FurnitureCard
            key={item.id}
            item={item}
            categoryId={category.id}
            categoryTitle={category.title}
          />
        ))}
      </div>
    </div>
  );
}
