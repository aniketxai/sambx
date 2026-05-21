import { Loader, Save, Reply, Eye } from 'lucide-react';
import { SectionCard, StatusPill } from './Helpers';
import { formatINR } from '../../utils/currency';

export function OrdersSection({
  orderFilter,
  setOrderFilter,
  filteredOrders,
  handleOrderStatusSave,
  savingOrderId,
  handleViewOrder,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Orders Management"
        description="Update order statuses and manage fulfillment."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {['All', 'pending', 'paid', 'processing', 'shipped', 'delivered'].map((option) => (
              <button
                key={option}
                onClick={() => setOrderFilter(option)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-material ${orderFilter === option ? 'bg-primary text-white' : 'bg-white/5 text-secondary-text hover:bg-white/10'}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {(filteredOrders || []).length > 0 ? (
              filteredOrders.map((order) => {
                const customerName = order.shipping?.firstName && order.shipping?.lastName 
                  ? `${order.shipping.firstName} ${order.shipping.lastName}`
                  : order.customerName || 'Unknown';
                
                return (
                  <div key={order._id || order.id} className="rounded-3xl border border-white/8 bg-black/20 p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <p className="font-semibold text-foreground truncate">{order.orderNumber || order._id}</p>
                          <StatusPill status={order.status} />
                        </div>
                        <p className="text-sm text-secondary-text mb-1">
                          {customerName} · {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                        </p>
                        {order.shipping?.email && (
                          <p className="text-xs text-secondary-text truncate">{order.shipping.email}</p>
                        )}
                        {order.createdAt && (
                          <p className="text-xs text-outline mt-1">{formatDate(order.createdAt)}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs font-semibold text-foreground hover:bg-white/10 transition-material"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <div className="flex items-center gap-2">
                          <select
                            defaultValue={order.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              if (newStatus !== order.status) {
                                handleOrderStatusSave(order._id || order.id, newStatus);
                              }
                            }}
                            disabled={savingOrderId === (order._id || order.id)}
                            className="rounded-full border border-white/8 bg-black/20 px-3 py-2 text-xs font-semibold capitalize text-foreground outline-none disabled:opacity-60"
                          >
                            {['pending', 'paid', 'processing', 'shipped', 'delivered'].map((status) => (
                              <option key={status} value={status} className="bg-background">
                                {status}
                              </option>
                            ))}
                          </select>
                          {savingOrderId === (order._id || order.id) && (
                            <span className="inline-flex items-center gap-2 text-xs text-foreground">
                              <Loader size={14} className="animate-spin" />
                              Updating...
                            </span>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-outline">Total</p>
                          <p className="text-lg font-bold">{formatINR(order.total || order.totalAmount || 0)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-3xl border border-white/8 bg-black/20 p-8 text-center">
                <p className="text-secondary-text">No orders found</p>
              </div>
            )}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export function EnquiriesSection({
  enquiryFilter,
  setEnquiryFilter,
  filteredEnquiries,
  handleRespondToEnquiry,
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Enquiries Management"
        description="Respond to contact messages and quote requests."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {['All', 'new', 'in-review', 'quoted', 'replied'].map((option) => (
              <button
                key={option}
                onClick={() => setEnquiryFilter(option)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-material ${enquiryFilter === option ? 'bg-primary text-white' : 'bg-white/5 text-secondary-text hover:bg-white/10'}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {(filteredEnquiries || []).map((item, idx) => (
              <div key={`${item._id || idx}`} className="rounded-3xl border border-white/8 bg-black/20 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <p className="font-semibold text-foreground">{item.companyName || item.name}</p>
                      <StatusPill status={item.status || 'new'} />
                    </div>
                    <p className="text-sm text-secondary-text truncate">{item.subject || item.message?.substring(0, 40)}</p>
                    <p className="text-xs text-outline mt-1">
                      {item.email || item.contactEmail || 'N/A'}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleRespondToEnquiry(item)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs font-semibold text-foreground hover:bg-white/10 transition-material">
                    Respond
                    <Reply size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
