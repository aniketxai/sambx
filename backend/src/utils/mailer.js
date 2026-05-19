import nodemailer from 'nodemailer';

const DEFAULT_RECIPIENT = 'aniketxai@gmail.com';

function buildTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: { user, pass },
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value || 0));
}

function buildOrderEmail(order) {
  const recipient = process.env.ORDER_NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
  const from = process.env.MAIL_FROM || process.env.SMTP_USER || 'no-reply@sambx.local';
  const customerName = `${order.shipping.firstName} ${order.shipping.lastName}`.trim();
  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;">${item.name}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(item.price * item.quantity)}</td>
        </tr>`
    )
    .join('');

  return {
    from,
    to: recipient,
    subject: `New order received - ${order.orderNumber}`,
    text: [
      `Order: ${order.orderNumber}`,
      `Customer: ${customerName}`,
      `Email: ${order.shipping.email || 'N/A'}`,
      `Payment: ${order.payment.method}${order.payment.last4 ? ` ending ${order.payment.last4}` : ''}`,
      `Total: ${formatCurrency(order.total)}`,
      '',
      'Items:',
      ...order.items.map((item) => `- ${item.name} x${item.quantity} (${formatCurrency(item.price * item.quantity)})`),
      '',
      `Shipping address: ${order.shipping.address}, ${order.shipping.city}, ${order.shipping.zipCode}`,
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1f2937;max-width:720px;">
        <h2 style="margin:0 0 12px;">New order received</h2>
        <p style="margin:0 0 8px;"><strong>Order:</strong> ${order.orderNumber}</p>
        <p style="margin:0 0 8px;"><strong>Customer:</strong> ${customerName}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> ${order.shipping.email || 'N/A'}</p>
        <p style="margin:0 0 8px;"><strong>Shipping:</strong> ${order.shipping.address}, ${order.shipping.city}, ${order.shipping.zipCode}</p>
        <p style="margin:0 0 16px;"><strong>Payment:</strong> ${order.payment.method}${order.payment.last4 ? ` ending ${order.payment.last4}` : ''}</p>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          <thead>
            <tr>
              <th align="left" style="padding:8px 0;border-bottom:2px solid #ddd;">Item</th>
              <th align="center" style="padding:8px 0;border-bottom:2px solid #ddd;">Qty</th>
              <th align="right" style="padding:8px 0;border-bottom:2px solid #ddd;">Amount</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <p style="margin:4px 0;"><strong>Subtotal:</strong> ${formatCurrency(order.subtotal)}</p>
        <p style="margin:4px 0;"><strong>Shipping:</strong> ${formatCurrency(order.shippingFee)}</p>
        <p style="margin:4px 0 0;"><strong>Total:</strong> ${formatCurrency(order.total)}</p>
      </div>
    `,
  };
}

export async function sendOrderNotificationEmail(order) {
  const transport = buildTransport();
  if (!transport) {
    console.warn('SMTP is not configured. Skipping order notification email.');
    return null;
  }

  const mail = buildOrderEmail(order);
  return transport.sendMail(mail);
}