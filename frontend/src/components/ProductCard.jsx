import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { formatINR } from '../utils/currency';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWished = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <div className="bg-surface-container rounded-3xl overflow-hidden transition-material hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-surface-muted">
          <Link to={`/products/${product.id}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              width="500"
              height="500"
              decoding="async"
              className="w-full h-full object-contain object-center transition-material group-hover:scale-105 bg-white/5"
              loading="lazy"
            />
          </Link>

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-material">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleWishlist(product.id)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-material ${
                isWished
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface-dim/90 backdrop-blur-sm text-primary border border-primary/30 hover:bg-surface-container'
              }`}
            >
              <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
            </motion.button>
            <Link to={`/products/${product.id}`}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-dim/90 backdrop-blur-sm text-primary border border-primary/30 hover:bg-surface-container transition-material"
              >
                <Eye size={16} />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-outline font-medium mb-1">{product.category}</p>
          <Link to={`/products/${product.id}`}>
            <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 line-clamp-2 hover:text-primary transition-material">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star size={12} className="fill-warning text-warning" />
            <span className="text-xs font-medium text-secondary-text">{product.rating}</span>
            <span className="text-xs text-outline">({product.reviews})</span>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-outline line-through">{formatINR(product.originalPrice)}</span>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(product)}
              className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:shadow-md transition-material"
            >
              <ShoppingCart size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
