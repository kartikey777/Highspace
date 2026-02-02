import FurnitureCard from './FurnitureCard';

export default function FurnitureSection({ category }) {
  return (
    <section className="furniture-section" id={category.id}>
      <header className="furniture-section__header">
        <h2 className="furniture-section__title">{category.title}</h2>
        {category.description && (
          <p className="furniture-section__description">{category.description}</p>
        )}
      </header>
      <div className="furniture-section__grid">
        {category.items.map((item) => (
          <FurnitureCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
