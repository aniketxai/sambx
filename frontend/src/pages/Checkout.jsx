import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useApp();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground font-display mb-2">Order Placed</h2>
          <p className="text-secondary-text text-sm mb-6">Thank you for your order. You will receive a confirmation email shortly.</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary-text text-lg mb-4">Your cart is empty</p>
          <Link to="/products">
            <Button variant="outline" icon={ArrowLeft}>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground font-display mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-material ${
                step > i + 1 ? 'bg-success text-white' : step === i + 1 ? 'bg-primary text-white' : 'bg-surface-muted text-outline'
              }`}>
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </span>
              <span className={`text-sm font-medium hidden sm:inline ${
                step === i + 1 ? 'text-foreground' : 'text-outline'
              }`}>{s}</span>
              {i < 2 && <div className={`flex-1 h-0.5 rounded ${step > i + 1 ? 'bg-success' : 'bg-surface-muted'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handlePlaceOrder}>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface-container rounded-3xl p-6 sm:p-8 mb-6"
            >
              <h2 className="font-bold text-foreground text-lg mb-5">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">First Name</label>
                  <input type="text" required placeholder="John" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">Last Name</label>
                  <input type="text" required placeholder="Doe" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">Address</label>
                  <input type="text" required placeholder="123 Innovation Drive" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">City</label>
                  <input type="text" required placeholder="San Francisco" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">ZIP Code</label>
                  <input type="text" required placeholder="94107" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
              </div>
              <div className="mt-6">
                <Button type="button" size="lg" onClick={() => setStep(2)} className="w-full sm:w-auto">
                  Continue to Payment
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface-container rounded-3xl p-6 sm:p-8 mb-6"
            >
              <h2 className="font-bold text-foreground text-lg mb-5">Payment Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">Card Number</label>
                  <div className="relative">
                    <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                    <input type="text" required placeholder="4242 4242 4242 4242" className="w-full pl-11 pr-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-secondary-text mb-1.5">Expiry</label>
                    <input type="text" required placeholder="MM/YY" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-secondary-text mb-1.5">CVC</label>
                    <input type="text" required placeholder="123" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs text-outline">
                <Lock size={12} />
                <span>Your payment information is encrypted and secure.</span>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="button" size="lg" onClick={() => setStep(3)} className="flex-1 sm:flex-none">
                  Review Order
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface-container rounded-3xl p-6 sm:p-8 mb-6"
            >
              <h2 className="font-bold text-foreground text-lg mb-5">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-outline">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-surface-muted pt-3 mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-secondary-text text-sm">Subtotal</span>
                  <span className="font-semibold text-foreground">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-secondary-text text-sm">Shipping</span>
                  <span className="text-sm text-success font-medium">Free</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-bold text-foreground text-lg">Total</span>
                  <span className="font-bold text-foreground text-2xl">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                  Place Order
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
