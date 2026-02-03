import { useState } from 'react';
import ImageSlider from './ImageSlider';
import { useCart } from '../context/CartContext';
import './FurnitureCard.css';

export default function FurnitureCard({ item, categoryId, categoryTitle }) {
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (categoryId && categoryTitle) {
      addToCart(categoryId, categoryTitle, item);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2500);
    }
  };

  return (
    <article className="furniture-card">
      <ImageSlider images={item.images} alt={item.name} />
      <div className="furniture-card__content">
        <h3 className="furniture-card__title">{item.name}</h3>
        <p className="furniture-card__description">{item.description}</p>
        {categoryId && categoryTitle && (
          <div className="furniture-card__add-wrap">
            <button
              type="button"
              className="furniture-card__add"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            {showAdded && (
              <span className="furniture-card__added" role="status">Added to cart</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
