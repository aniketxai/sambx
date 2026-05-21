import { X, Package, MapPin, CreditCard, Clock } from 'lucide-react';
import { formatINR } from '../../utils/currency';

export function OrderDetailModal({ isOpen, order, onClose }) {
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
            <X size={20} />
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
              <Clock size={14} />
              {formatDate(createdAt)}
            </p>
          )}
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Package size={18} />
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
            <MapPin size={18} />
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
            <CreditCard size={18} />
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

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
