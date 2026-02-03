import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

const CART_STORAGE_KEY = 'highspace_cart';

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD': {
      return Array.isArray(action.payload) ? action.payload : [];
    }
    case 'ADD': {
      const { categoryId, categoryTitle, item } = action.payload;
      const existing = state.find(
        (x) => x.item.id === item.id && x.categoryId === categoryId
      );
      if (existing) {
        return state.map((x) =>
          x.item.id === item.id && x.categoryId === categoryId
            ? { ...x, quantity: x.quantity + 1 }
            : x
        );
      }
      return [
        ...state,
        {
          categoryId,
          categoryTitle,
          item: {
            id: item.id,
            name: item.name,
            description: item.description,
            images: item.images || [],
          },
          quantity: 1,
        },
      ];
    }
    case 'REMOVE': {
      const { itemId, categoryId } = action.payload;
      return state.filter(
        (x) => !(x.item.id === itemId && x.categoryId === categoryId)
      );
    }
    case 'UPDATE_QUANTITY': {
      const { itemId, categoryId, quantity } = action.payload;
      if (quantity < 1) {
        return state.filter(
          (x) => !(x.item.id === itemId && x.categoryId === categoryId)
        );
      }
      return state.map((x) =>
        x.item.id === itemId && x.categoryId === categoryId
          ? { ...x, quantity }
          : x
      );
    }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: 'LOAD', payload: parsed });
      }
    } catch (_) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (_) {
      // ignore
    }
  }, [cart]);

  const addToCart = useCallback((categoryId, categoryTitle, item) => {
    dispatch({ type: 'ADD', payload: { categoryId, categoryTitle, item } });
  }, []);

  const removeFromCart = useCallback((itemId, categoryId) => {
    dispatch({ type: 'REMOVE', payload: { itemId, categoryId } });
  }, []);

  const updateQuantity = useCallback((itemId, categoryId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, categoryId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const count = cart.reduce((acc, x) => acc + x.quantity, 0);

  const value = {
    cart,
    count,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
