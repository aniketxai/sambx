import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart size={48} className="text-surface-muted mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground font-display mb-2">Your wishlist is empty</h2>
          <p className="text-secondary-text text-sm mb-6">Save products you love for later.</p>
          <Link to="/products">
            <Button icon={ArrowRight}>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Saved" title="Your Wishlist" description="Products you have saved for later." />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-surface-container rounded-3xl overflow-hidden group"
            >
              <div className="relative aspect-square overflow-hidden bg-surface-muted">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-material group-hover:scale-105"
                  />
                </Link>
              </div>
              <div className="p-4">
                <p className="text-xs text-outline mb-1">{product.category}</p>
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-foreground text-sm mb-2 hover:text-primary transition-material line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-foreground mb-3">${product.price}</p>
                <div className="flex gap-2">
                  <Button size="sm" icon={ShoppingCart} onClick={() => addToCart(product)} className="flex-1">
                    Add to Cart
                  </Button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleWishlist(product.id)}
                    className="w-9 h-9 rounded-full bg-surface-muted flex items-center justify-center text-error hover:bg-error/10 transition-material"
                  >
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
