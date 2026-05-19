import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, ArrowLeft, Package, Ruler, Clock, Layers, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import api from '../api';
import { useApp } from '../context/useApp';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import BlurBlob from '../components/BlurBlob';
import { formatINR } from '../utils/currency';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    setLoading(true);

    api.fetchProductById(id)
      .then(p => { if (active) setProduct(p); })
      .catch(() => { if (active) setProduct(null); });

    api.fetchProducts()
      .then(list => { if (active) setProducts(list); })
      .catch(() => { if (active) setProducts([]); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [id]);
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <p className="text-secondary-text text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary-text text-lg mb-4">Product not found</p>
          <Link to="/products">
            <Button variant="outline" icon={ArrowLeft}>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isWished = wishlist.includes(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const specIcons = {
    material: Package,
    dimensions: Ruler,
    weight: Package,
    printTime: Clock,
  };

  return (
    <div className="pt-24 pb-20 min-h-screen relative">
      <BlurBlob className="w-100 h-100 top-20 -left-20 bg-secondary-container" />
      <BlurBlob className="w-75 h-75 bottom-20 right-0 bg-accent-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-outline mb-8">
          <Link to="/products" className="hover:text-primary transition-material">Products</Link>
          <ChevronRight size={14} />
          <span className="text-secondary-text">{product.category}</span>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-surface-container rounded-3xl overflow-hidden aspect-square mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden transition-material cursor-pointer ${
                    selectedImage === i
                      ? 'ring-2 ring-primary ring-offset-2'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {product.badge && (
              <span className="inline-block bg-primary text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <p className="text-xs text-outline font-medium mb-1">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-display mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(product.rating) ? 'fill-warning text-warning' : 'text-surface-muted'}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-outline">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-outline line-through">{formatINR(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-secondary-text leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground text-sm mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map(f => (
                  <span key={f} className="text-xs bg-surface-container px-3 py-1.5 rounded-full text-secondary-text">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground text-sm mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.specifications).map(([key, value]) => {
                  const Icon = specIcons[key] || Layers;
                  return (
                    <div key={key} className="bg-surface-container rounded-2xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={14} className="text-primary" />
                        <span className="text-xs text-outline capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button size="lg" icon={ShoppingCart} onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
              <Button
                variant={isWished ? 'primary' : 'outline'}
                size="lg"
                icon={Heart}
                onClick={() => toggleWishlist(product.id)}
              >
                {isWished ? 'Wishlisted' : 'Wishlist'}
              </Button>
              <Button variant="secondary" size="lg">
                Custom Order
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground font-display mb-6">Related Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
