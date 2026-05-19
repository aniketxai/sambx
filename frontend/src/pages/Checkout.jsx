import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../context/useApp';
import Button from '../components/Button';
import { formatINR } from '../utils/currency';
import { postOrder } from '../api';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useApp();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [shipping, setShipping] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', zipCode: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvc: '' });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    if (!form.reportValidity()) {
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images?.[0] || '',
        })),
        shipping,
        payment: {
          method: 'card',
          last4: payment.cardNumber.replace(/\s+/g, '').slice(-4),
        },
      };

      const response = await postOrder(payload);
      setOrderNumber(response?.data?.orderNumber || '');
      clearCart();
      setOrderPlaced(true);
    } catch (submitError) {
      setError(submitError.message || 'Unable to place order. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <p className="text-secondary-text text-sm mb-2">Thank you for your order. You will receive a confirmation email shortly.</p>
          {orderNumber && <p className="text-sm text-foreground/80 mb-6">Order number: {orderNumber}</p>}
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
          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
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
                  <input type="text" required value={shipping.firstName} onChange={(e) => setShipping(prev => ({ ...prev, firstName: e.target.value }))} placeholder="John" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">Last Name</label>
                  <input type="text" required value={shipping.lastName} onChange={(e) => setShipping(prev => ({ ...prev, lastName: e.target.value }))} placeholder="Doe" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">Email</label>
                  <input type="email" value={shipping.email} onChange={(e) => setShipping(prev => ({ ...prev, email: e.target.value }))} placeholder="you@example.com" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">Address</label>
                  <input type="text" required value={shipping.address} onChange={(e) => setShipping(prev => ({ ...prev, address: e.target.value }))} placeholder="123 Innovation Drive" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">City</label>
                  <input type="text" required value={shipping.city} onChange={(e) => setShipping(prev => ({ ...prev, city: e.target.value }))} placeholder="San Francisco" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">ZIP Code</label>
                  <input type="text" required value={shipping.zipCode} onChange={(e) => setShipping(prev => ({ ...prev, zipCode: e.target.value }))} placeholder="94107" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                </div>
              </div>
              <div className="mt-6">
                <Button type="submit" size="lg" className="w-full sm:w-auto">
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
                    <input type="text" required value={payment.cardNumber} onChange={(e) => setPayment(prev => ({ ...prev, cardNumber: e.target.value }))} placeholder="4242 4242 4242 4242" className="w-full pl-11 pr-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-secondary-text mb-1.5">Expiry</label>
                    <input type="text" required value={payment.expiry} onChange={(e) => setPayment(prev => ({ ...prev, expiry: e.target.value }))} placeholder="MM/YY" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-secondary-text mb-1.5">CVC</label>
                    <input type="text" required value={payment.cvc} onChange={(e) => setPayment(prev => ({ ...prev, cvc: e.target.value }))} placeholder="123" className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs text-outline">
                <Lock size={12} />
                <span>Your payment information is encrypted and secure.</span>
              </div>
              <div className="flex gap-3 mt-6">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" size="lg" className="flex-1 sm:flex-none">
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
                    <p className="text-sm font-semibold text-foreground">{formatINR(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-surface-muted pt-3 mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-secondary-text text-sm">Subtotal</span>
                  <span className="font-semibold text-foreground">{formatINR(cartTotal)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-secondary-text text-sm">Shipping</span>
                  <span className="text-sm text-success font-medium">Free</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-bold text-foreground text-lg">Total</span>
                  <span className="font-bold text-foreground text-2xl">{formatINR(cartTotal)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit" size="lg" className="flex-1 sm:flex-none" disabled={loading}>
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
