import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useApp();

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="text-surface-muted mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground font-display mb-2">Your cart is empty</h2>
          <p className="text-secondary-text text-sm mb-6">Add some products to get started.</p>
          <Link to="/products">
            <Button icon={ArrowRight}>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Shopping Cart" title="Your Cart" center={false} />

        <div className="space-y-4 mb-8">
          {cart.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-surface-container rounded-3xl p-4 flex gap-4 items-center"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-20 h-20 rounded-2xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`} className="font-semibold text-foreground text-sm hover:text-primary transition-material line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-xs text-outline mt-0.5">{item.category}</p>
                <p className="text-lg font-bold text-foreground mt-1">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center text-foreground hover:bg-surface-dim transition-material"
                >
                  <Minus size={14} />
                </motion.button>
                <span className="w-8 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center text-foreground hover:bg-surface-dim transition-material"
                >
                  <Plus size={14} />
                </motion.button>
              </div>
              <p className="text-sm font-bold text-foreground w-20 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => removeFromCart(item.id)}
                className="p-2 rounded-full hover:bg-error/10 text-outline hover:text-error transition-material"
              >
                <Trash2 size={16} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-surface-container rounded-3xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-secondary-text text-sm">Subtotal</span>
            <span className="font-semibold text-foreground">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-secondary-text text-sm">Shipping</span>
            <span className="text-sm text-success font-medium">Free</span>
          </div>
          <div className="border-t border-surface-muted pt-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground text-lg">Total</span>
              <span className="font-bold text-foreground text-2xl">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/checkout" className="flex-1">
              <Button size="lg" icon={ArrowRight} className="w-full">
                Checkout
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
