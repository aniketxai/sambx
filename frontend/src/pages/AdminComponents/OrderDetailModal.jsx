import { X, Package, MapPin, CreditCard, Clock, AlertCircle } from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { useState } from 'react';
import { cancelOrder } from '../../api/index.js';

export function OrderDetailModal({ isOpen, order, onClose, onOrderUpdated }) {
  const [isCanceling, setIsCanceling] = useState(false);
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelError, setCancelError] = useState('');

  if (!isOpen || !order) return null;

  const {
    orderNumber,
    items = [],
    shipping = {},
    payment = {},
    subtotal = 0,
    shippingFee = 0,
    total = 0,
    status = 'pending',
    notes = '',
    createdAt,
    codCharge = 0,
  } = order;

  const handleCancelOrder = async () => {
    try {
      setIsCanceling(true);
      setCancelError('');
      
      await cancelOrder(order._id, cancelReason);
      
      // Update parent with new order state
      if (onOrderUpdated) {
        onOrderUpdated({ ...order, status: 'cancelled' });
      }
      
      setShowCancelPrompt(false);
      setCancelReason('');
      
      // Close modal after a brief delay
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      setCancelError(error.message || 'Failed to cancel order');
    } finally {
      setIsCanceling(false);
    }
  };

  const canCancel = status !== 'cancelled' && status !== 'delivered';

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusColors = {
    pending: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
    paid: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    processing: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
    shipped: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
    delivered: 'bg-teal-500/15 text-teal-300 border-teal-500/25',
    cancelled: 'bg-red-500/15 text-red-300 border-red-500/25',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/8 bg-background p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Order Details</h2>
            <p className="text-sm text-secondary-text mt-1">{orderNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold capitalize border ${
              statusColors[status] || statusColors.pending
            }`}
          >
            {status}
          </span>
          {createdAt && (
            <p className="text-xs text-secondary-text mt-2 flex items-center gap-2">
              <Clock className="w-[14px] h-[14px]" />
              {formatDate(createdAt)}
            </p>
          )}
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Package className="w-[18px] h-[18px]" />
            Order Items
          </h3>
          <div className="space-y-2 bg-white/5 rounded-2xl p-4">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 pb-2 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-secondary-text">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-foreground">{formatINR(item.price * item.quantity)}</p>
                    <p className="text-xs text-secondary-text">{formatINR(item.price)} each</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-secondary-text">No items in this order</p>
            )}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="mb-6 bg-white/5 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-secondary-text">Subtotal</span>
            <span className="text-foreground">{formatINR(subtotal)}</span>
          </div>
          {shippingFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-secondary-text">Shipping Fee</span>
              <span className="text-foreground">{formatINR(shippingFee)}</span>
            </div>
          )}
          {codCharge > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-secondary-text">COD Charge</span>
              <span className="text-foreground">{formatINR(codCharge)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-2 mt-2">
            <span className="text-foreground">Total</span>
            <span className="text-primary">{formatINR(total)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-[18px] h-[18px]" />
            Shipping Address
          </h3>
          <div className="bg-white/5 rounded-2xl p-4 space-y-1">
            <p className="font-semibold text-foreground">
              {shipping.firstName} {shipping.lastName}
            </p>
            <p className="text-sm text-secondary-text">{shipping.address}</p>
            {shipping.apartment && (
              <p className="text-sm text-secondary-text">{shipping.apartment}</p>
            )}
            {shipping.landmark && (
              <p className="text-sm text-secondary-text">Landmark: {shipping.landmark}</p>
            )}
            <p className="text-sm text-secondary-text">
              {shipping.city}, {shipping.state} {shipping.zipCode}
            </p>
            {shipping.country && (
              <p className="text-sm text-secondary-text">{shipping.country}</p>
            )}
            {shipping.email && (
              <p className="text-sm text-secondary-text mt-2">Email: {shipping.email}</p>
            )}
            {shipping.phone && (
              <p className="text-sm text-secondary-text">Phone: {shipping.phone}</p>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CreditCard className="w-[18px] h-[18px]" />
            Payment Information
          </h3>
          <div className="bg-white/5 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-secondary-text">Method</span>
              <span className="font-semibold text-foreground capitalize">
                {payment.method || 'Not specified'}
              </span>
            </div>
            {payment.last4 && (
              <div className="flex justify-between">
                <span className="text-secondary-text">Card (Last 4)</span>
                <span className="font-semibold text-foreground">****{payment.last4}</span>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Order Notes</h3>
            <div className="bg-white/5 rounded-2xl p-4">
              <p className="text-sm text-secondary-text whitespace-pre-wrap">{notes}</p>
            </div>
          </div>
        )}

        {/* Cancel Prompt */}
        {showCancelPrompt && (
          <div className="mb-6 bg-red-500/15 border border-red-500/25 rounded-2xl p-4">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-[20px] h-[20px] text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-300 mb-2">Cancel Order</h4>
                <p className="text-sm text-red-200 mb-4">
                  Are you sure you want to cancel this order? A cancellation email will be sent to the customer.
                </p>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter cancellation reason (optional)"
                  className="w-full bg-red-500/10 border border-red-500/25 rounded-lg p-2 text-sm text-foreground placeholder-secondary-text focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
                  rows="3"
                />
                {cancelError && (
                  <p className="text-xs text-red-300 mt-2">{cancelError}</p>
                )}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleCancelOrder}
                    disabled={isCanceling}
                    className="flex-1 px-3 py-2 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60 transition-colors"
                  >
                    {isCanceling ? 'Cancelling...' : 'Confirm Cancel'}
                  </button>
                  <button
                    onClick={() => {
                      setShowCancelPrompt(false);
                      setCancelReason('');
                      setCancelError('');
                    }}
                    disabled={isCanceling}
                    className="flex-1 px-3 py-2 rounded-full border border-white/8 bg-white/5 text-foreground text-sm font-semibold hover:bg-white/10 disabled:opacity-60 transition-colors"
                  >
                    Keep Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {canCancel && !showCancelPrompt && (
            <button
              onClick={() => setShowCancelPrompt(true)}
              className="flex-1 px-4 py-3 rounded-full bg-red-600/20 text-red-300 border border-red-600/30 font-semibold hover:bg-red-600/30 transition-colors"
            >
              Cancel Order
            </button>
          )}
          <button
            onClick={onClose}
            className={`${canCancel && !showCancelPrompt ? 'flex-1' : 'w-full'} px-4 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
