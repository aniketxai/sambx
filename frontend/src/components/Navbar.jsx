import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useApp } from '../context/useApp';
import logoImage from '../assets/logo.png'; // Add your logo image here

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cartCount, wishlist } = useApp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-material ${
          scrolled
            ? 'glass border-b border-surface-muted shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2">
            <Logo 
              useImage={true} 
              imageSrc={logoImage}
              size="lg" 
              className="text-foreground h-11 sm:h-12 w-auto max-w-[180px] sm:max-w-[220px] object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-material ${
                  location.pathname === link.to
                    ? 'bg-secondary-container text-primary metal-border'
                    : 'text-secondary-text hover:bg-surface-container hover:text-surface-bright'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-surface-container transition-material metal-border bg-white/5 shrink-0">
              <Heart size={20} className="text-secondary-text" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-surface-container transition-material metal-border bg-white/5 shrink-0">
              <ShoppingCart size={20} className="text-secondary-text" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-surface-container transition-material metal-border bg-white/5 shrink-0"
            >
              <Menu size={20} className="text-secondary-text" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-background shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-container transition-material"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-material ${
                      location.pathname === link.to
                        ? 'bg-secondary-container text-primary'
                        : 'text-secondary-text hover:bg-surface-container'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
