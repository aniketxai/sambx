import { useReducer, useCallback, useEffect, useRef, useState } from 'react';
import { AppContext } from './appContext';

const initialState = {
  cart: [],
  wishlist: [],
};

const normalizeId = (value) => String(value && typeof value === 'object' ? value.id : value);

// Load state from localStorage
const loadState = () => {
  try {
    const saved = localStorage.getItem('appState');
    return saved ? JSON.parse(saved) : initialState;
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return initialState;
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const wishlistId = normalizeId(action.payload);
      const inWishlist = state.wishlist.includes(wishlistId);
      return {
        ...state,
        wishlist: inWishlist
          ? state.wishlist.filter(id => id !== wishlistId)
          : [...state.wishlist, wishlistId],
      };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, loadState);
  const [notifications, setNotifications] = useState([]);
  const notificationTimers = useRef(new Map());

  const removeNotification = useCallback((id) => {
    setNotifications(current => current.filter(notification => notification.id !== id));

    const timerId = notificationTimers.current.get(id);
    if (timerId) {
      clearTimeout(timerId);
      notificationTimers.current.delete(id);
    }
  }, []);

  const notify = useCallback((notification) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setNotifications(current => [
      ...current,
      {
        id,
        title: notification.title,
        message: notification.message,
        type: notification.type || 'success',
        icon: notification.icon,
        actionLabel: notification.actionLabel,
        actionTo: notification.actionTo,
      },
    ]);

    const timerId = setTimeout(() => removeNotification(id), notification.duration || 3400);
    notificationTimers.current.set(id, timerId);
    return id;
  }, [removeNotification]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      console.log('Saving app state:', state);
      localStorage.setItem('appState', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }, [state]);

  useEffect(() => () => {
    notificationTimers.current.forEach(clearTimeout);
    notificationTimers.current.clear();
  }, []);

  const addToCart = useCallback((product) => {
    const existing = state.cart.find(item => item.id === product.id);
    dispatch({ type: 'ADD_TO_CART', payload: product });
    notify({
      title: existing ? 'Cart updated' : 'Added to cart',
      message: existing
        ? `${product.name} quantity increased in your cart.`
        : `${product.name} was added to your cart.`,
      icon: 'cart',
      type: 'cart',
      actionLabel: 'View cart',
      actionTo: '/cart',
    });
  }, [notify, state.cart]);
  const removeFromCart = useCallback((id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }), []);
  const updateQuantity = useCallback((id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const toggleWishlist = useCallback((product) => {
    const productId = normalizeId(product);
    const isSaved = state.wishlist.includes(productId);

    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });

    if (!isSaved) {
      notify({
        title: 'Saved to wishlist',
        message: `${product?.name || 'Product'} has been saved for later.`,
        icon: 'heart',
        type: 'wishlist',
        actionLabel: 'View wishlist',
        actionTo: '/wishlist',
      });
    }
  }, [notify, state.wishlist]);

  const cartTotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider value={{
      ...state,
      notifications,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      removeNotification,
      notify,
      cartTotal,
      cartCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}
