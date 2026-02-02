import ImageSlider from './ImageSlider';
import { useCart } from '../context/CartContext';
import './FurnitureCard.css';

export default function FurnitureCard({ item, categoryId, categoryTitle }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (categoryId && categoryTitle) {
      addToCart(categoryId, categoryTitle, item);
    }
  };

  return (
    <article className="furniture-card">
      <ImageSlider images={item.images} alt={item.name} />
      <div className="furniture-card__content">
        <h3 className="furniture-card__title">{item.name}</h3>
        <p className="furniture-card__description">{item.description}</p>
        {categoryId && categoryTitle && (
          <button
            type="button"
            className="furniture-card__add"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
}
