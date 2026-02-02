import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../pages/CartPage.css';

const WHATSAPP_NUMBER = '917024628281';
const WHATSAPP_MESSAGE = 'Please provide the rental prices of these products.';

function buildWhatsAppUrl(cart) {
  const lines = [WHATSAPP_MESSAGE, ''];
  cart.forEach((entry, i) => {
    lines.push(`${i + 1}. ${entry.item.name}`);
    (entry.item.images || []).slice(0, 3).forEach((url) => {
      lines.push(`   ${url}`);
    });
    lines.push('');
  });
  const text = lines.join('\n').trim();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <h1 className="cart-page__title">Your cart is empty</h1>
        <p className="cart-page__text">Add items from the category pages to request rental prices.</p>
        <Link to="/" className="cart-page__link">Browse collections</Link>
      </div>
    );
  }

  const checkoutUrl = buildWhatsAppUrl(cart);

  const handleCheckout = () => {
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
    clearCart();
  };

  return (
    <div className="cart-page">
      <header className="cart-page__header">
        <h1 className="cart-page__title">Cart</h1>
        <p className="cart-page__subtitle">Request rental prices via WhatsApp</p>
      </header>

      <ul className="cart-list">
        {cart.map((entry) => (
          <li key={`${entry.categoryId}-${entry.item.id}`} className="cart-item">
            <div className="cart-item__image">
              {entry.item.images?.[0] ? (
                <img src={entry.item.images[0]} alt={entry.item.name} />
              ) : (
                <div className="cart-item__placeholder">No image</div>
              )}
            </div>
            <div className="cart-item__details">
              <h3 className="cart-item__name">{entry.item.name}</h3>
              <p className="cart-item__category">{entry.categoryTitle}</p>
              <div className="cart-item__quantity">
                <button
                  type="button"
                  className="cart-item__qty-btn"
                  onClick={() => updateQuantity(entry.item.id, entry.categoryId, entry.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="cart-item__qty-value">{entry.quantity}</span>
                <button
                  type="button"
                  className="cart-item__qty-btn"
                  onClick={() => updateQuantity(entry.item.id, entry.categoryId, entry.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="button"
              className="cart-item__remove"
              onClick={() => removeFromCart(entry.item.id, entry.categoryId)}
              aria-label="Remove from cart"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-page__actions">
        <button type="button" className="cart-page__clear" onClick={clearCart}>
          Clear cart
        </button>
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cart-page__checkout"
          onClick={handleCheckout}
        >
          Checkout via WhatsApp
        </a>
      </div>

      <p className="cart-page__hint">
        Checkout opens WhatsApp to +91 7024628281 with your selected products and their images. You can send the message to request rental prices.
      </p>
    </div>
  );
}
