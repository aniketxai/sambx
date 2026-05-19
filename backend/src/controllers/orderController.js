import { Order } from '../models/Order.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendOrderNotificationEmail } from '../utils/mailer.js';

function makeOrderNumber() {
  return `SBX-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 900 + 100)}`;
}

export const createOrder = asyncHandler(async (req, res) => {
  const { items, shipping, payment = {}, notes = '' } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('Order items are required');
  }
  if (!shipping?.firstName || !shipping?.lastName || !shipping?.address || !shipping?.city || !shipping?.zipCode) {
    res.status(400);
    throw new Error('Shipping information is incomplete');
  }

  const normalizedItems = items.map((item) => ({
    productId: String(item.productId ?? item.id ?? ''),
    name: String(item.name ?? ''),
    price: Number(item.price),
    quantity: Number(item.quantity),
    image: String(item.image ?? item.images?.[0] ?? ''),
  }));

  const normalizedShipping = {
    firstName: String(shipping.firstName).trim(),
    lastName: String(shipping.lastName).trim(),
    email: String(shipping.email ?? '').trim(),
    address: String(shipping.address).trim(),
    city: String(shipping.city).trim(),
    zipCode: String(shipping.zipCode).trim(),
  };

  const normalizedPayment = {
    method: String(payment.method ?? 'card'),
    last4: String(payment.last4 ?? '').slice(-4),
  };

  const subtotal = normalizedItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const order = await Order.create({
    orderNumber: makeOrderNumber(),
    items: normalizedItems,
    shipping: normalizedShipping,
    payment: normalizedPayment,
    subtotal,
    shippingFee,
    total,
    status: 'pending',
    notes: String(notes ?? '').trim(),
  });

  await sendOrderNotificationEmail(order).catch((emailError) => {
    console.error('Order email notification failed:', emailError);
  });

  res.status(201).json({
    success: true,
    message: 'Order created',
    data: order,
  });
});
