
import nodemailer from 'nodemailer';

const DEFAULT_RECIPIENT = 'aniketxai@gmail.com';

function buildRecipient() {
  return process.env.ORDER_NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
}

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
    secure:
      process.env.SMTP_SECURE === 'true' ||
      port === 465,

    auth: {
      user,
      pass,
    },
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(Number(value || 0));
}

function buildOrderEmail(order) {
  const recipient = buildRecipient();

  const from =
    process.env.MAIL_FROM ||
    process.env.SMTP_USER ||
    'no-reply@sambx.local';

  const customerName =
    `${order.shipping.firstName} ${order.shipping.lastName}`.trim();

  const paymentMethod =
    order.payment?.method === 'cod'
      ? 'Cash on Delivery'
      : 'Online Payment';

  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;">
            ${item.name}
          </td>

          <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
            ${item.quantity}
          </td>

          <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
            ${formatCurrency(
              item.price * item.quantity
            )}
          </td>
        </tr>
      `
    )
    .join('');

  return {
    from,

    to: recipient,

    subject: `🛒 New Order - ${order.orderNumber}`,

    text: [
      `Order Number: ${order.orderNumber}`,

      `Customer: ${customerName}`,

      `Phone: ${order.shipping.phone || 'N/A'}`,

      `Email: ${order.shipping.email || 'N/A'}`,

      `Payment Method: ${paymentMethod}`,

      `Total: ${formatCurrency(order.total)}`,

      '',

      'Shipping Address:',

      `${order.shipping.address}`,

      `${order.shipping.apartment || ''}`,

      `${order.shipping.landmark || ''}`,

      `${order.shipping.city}, ${order.shipping.state}`,

      `${order.shipping.country || 'India'} - ${order.shipping.zipCode}`,

      '',

      'Items:',

      ...order.items.map(
        (item) =>
          `- ${item.name} x${item.quantity} (${formatCurrency(
            item.price * item.quantity
          )})`
      ),
    ].join('\n'),

    html: `
      <div
        style="
          font-family:Arial,sans-serif;
          background:#f5f5f5;
          padding:24px;
          color:#111827;
        "
      >
        <div
          style="
            max-width:720px;
            margin:auto;
            background:white;
            border-radius:16px;
            overflow:hidden;
          "
        >

          <div
            style="
              background:#111827;
              color:white;
              padding:24px;
            "
          >
            <h1 style="margin:0;font-size:24px;">
              New Order Received 🚀
            </h1>

            <p style="margin-top:10px;">
              Order Number:
              <strong>${order.orderNumber}</strong>
            </p>
          </div>

          <div style="padding:24px;">

            <h2 style="margin-top:0;">
              Customer Information
            </h2>

            <p>
              <strong>Name:</strong>
              ${customerName}
            </p>

            <p>
              <strong>Phone:</strong>
              ${order.shipping.phone || 'N/A'}
            </p>

            <p>
              <strong>Email:</strong>
              ${order.shipping.email || 'N/A'}
            </p>

            <p>
              <strong>Address:</strong><br/>

              ${order.shipping.address}<br/>

              ${
                order.shipping.apartment
                  ? `${order.shipping.apartment}<br/>`
                  : ''
              }

              ${
                order.shipping.landmark
                  ? `${order.shipping.landmark}<br/>`
                  : ''
              }

              ${order.shipping.city},
              ${order.shipping.state}<br/>

              ${order.shipping.country || 'India'} -
              ${order.shipping.zipCode}
            </p>

            <hr style="margin:24px 0;" />

            <h2>
              Payment Information
            </h2>

            <p>
              <strong>Method:</strong>
              ${paymentMethod}
            </p>

            ${
              order.codCharge
                ? `
                  <p>
                    <strong>COD Charges:</strong>
                    ${formatCurrency(order.codCharge)}
                  </p>
                `
                : ''
            }

            <hr style="margin:24px 0;" />

            <h2>
              Ordered Items
            </h2>

            <table
              cellpadding="0"
              cellspacing="0"
              style="
                width:100%;
                border-collapse:collapse;
                margin-top:10px;
              "
            >
              <thead>
                <tr style="background:#f3f4f6;">
                  <th
                    align="left"
                    style="
                      padding:10px;
                      border-bottom:2px solid #ddd;
                    "
                  >
                    Product
                  </th>

                  <th
                    align="center"
                    style="
                      padding:10px;
                      border-bottom:2px solid #ddd;
                    "
                  >
                    Qty
                  </th>

                  <th
                    align="right"
                    style="
                      padding:10px;
                      border-bottom:2px solid #ddd;
                    "
                  >
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="margin-top:24px;">

              <p>
                <strong>Subtotal:</strong>
                ${formatCurrency(order.subtotal)}
              </p>

              <p>
                <strong>Shipping:</strong>
                ${formatCurrency(order.shippingFee)}
              </p>

              ${
                order.codCharge
                  ? `
                    <p>
                      <strong>COD Charges:</strong>
                      ${formatCurrency(order.codCharge)}
                    </p>
                  `
                  : ''
              }

              <h2 style="margin-top:14px;">
                Total:
                ${formatCurrency(order.total)}
              </h2>
            </div>

            ${
              order.notes
                ? `
                  <hr style="margin:24px 0;" />

                  <h2>
                    Customer Notes
                  </h2>

                  <p>
                    ${order.notes}
                  </p>
                `
                : ''
            }
          </div>
        </div>
      </div>
    `,
  };
}

function buildContactEmail(contact) {
  const recipient = buildRecipient();

  return {
    from: process.env.MAIL_FROM || process.env.SMTP_USER || 'no-reply@sambx.local',

    to: recipient,

    subject: `📩 New Contact Message - ${contact.subject || 'No Subject'}`,

    text: [
      `Name: ${contact.name || 'N/A'}`,
      `Email: ${contact.email || 'N/A'}`,
      `Subject: ${contact.subject || 'N/A'}`,
      '',
      'Message:',
      `${contact.message || ''}`,
    ].join('\n'),

    html: `
      <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:24px;color:#111827;">
        <div style="max-width:720px;margin:auto;background:white;border-radius:16px;overflow:hidden;">
          <div style="background:#111827;color:white;padding:24px;">
            <h1 style="margin:0;font-size:24px;">New Contact Message 📩</h1>
            <p style="margin-top:10px;">
              Subject: <strong>${contact.subject || 'No Subject'}</strong>
            </p>
          </div>

          <div style="padding:24px;">
            <p><strong>Name:</strong> ${contact.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${contact.email || 'N/A'}</p>
            <p><strong>Subject:</strong> ${contact.subject || 'N/A'}</p>

            <h2 style="margin-top:24px;">Message</h2>
            <div style="padding:16px;background:#f9fafb;border-radius:12px;white-space:pre-wrap;line-height:1.6;">
              ${contact.message || ''}
            </div>
          </div>
        </div>
      </div>
    `,

    replyTo: contact.email || process.env.SMTP_USER,
  };
}

export async function sendContactNotificationEmail(contact) {
  try {
    const transport = buildTransport();
    const recipient = buildRecipient();

    if (!transport) {
      console.log('SMTP NOT CONFIGURED: check SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS');
      console.log('SMTP NOT CONFIGURED');
      return null;
    }

    if (!process.env.ORDER_NOTIFICATION_EMAIL) {
      console.log('ORDER_NOTIFICATION_EMAIL is missing');
      return null;
    }

    console.log('Sending contact email to:', recipient);

    await transport.verify();

    await transport.sendMail(buildContactEmail(contact));

    console.log('CONTACT MAIL SENT');

    return true;
  } catch (error) {
    console.log('CONTACT EMAIL ERROR');
    console.log(error);

    return null;
  }
}

export async function sendOrderNotificationEmail(order) {
  try {
    const transport = buildTransport();

    if (!transport) {
      console.log('SMTP NOT CONFIGURED');
      return null;
    }

    await transport.verify();

    console.log('SMTP CONNECTED');

    // ADMIN EMAIL
    const adminMail = buildOrderEmail(order);

    await transport.sendMail({
      ...adminMail,

      from: `"Sambx Forge" <${process.env.SMTP_USER}>`,

      replyTo:
        order.shipping.email ||
        process.env.SMTP_USER,
    });

    console.log('ADMIN MAIL SENT');

    // CUSTOMER EMAIL
    if (order.shipping.email) {
      const customerName =
        `${order.shipping.firstName} ${order.shipping.lastName}`.trim();

      const customerItems = order.items
        .map(
          (item) => `
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eee;">
                ${item.name}
              </td>

              <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
                ${item.quantity}
              </td>

              <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
                ${formatCurrency(
                  item.price * item.quantity
                )}
              </td>
            </tr>
          `
        )
        .join('');

      await transport.sendMail({
        from: `"Sambx Forge" <${process.env.SMTP_USER}>`,

        to: order.shipping.email,

        subject: `Order Confirmation - ${order.orderNumber}`,

        html: `
          <div
            style="
              font-family:Arial,sans-serif;
              background:#f5f5f5;
              padding:24px;
            "
          >
            <div
              style="
                max-width:700px;
                margin:auto;
                background:white;
                border-radius:16px;
                overflow:hidden;
              "
            >

              <div
                style="
                  background:#111827;
                  color:white;
                  padding:24px;
                  text-align:center;
                "
              >
                <h1 style="margin:0;">
                  Thank You For Your Order ❤️
                </h1>

                <p style="margin-top:10px;">
                  Order Number:
                  <strong>${order.orderNumber}</strong>
                </p>
              </div>

              <div style="padding:24px;">

                <p>
                  Hi ${customerName},
                </p>

                <p>
                  Your order has been placed successfully.
                  We will contact you soon regarding shipping updates.
                </p>

                <h2>
                  Order Summary
                </h2>

                <table
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    width:100%;
                    border-collapse:collapse;
                    margin-top:10px;
                  "
                >
                  <thead>
                    <tr style="background:#f3f4f6;">
                      <th
                        align="left"
                        style="padding:10px;"
                      >
                        Product
                      </th>

                      <th
                        align="center"
                        style="padding:10px;"
                      >
                        Qty
                      </th>

                      <th
                        align="right"
                        style="padding:10px;"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    ${customerItems}
                  </tbody>
                </table>

                <div style="margin-top:24px;">

                  <p>
                    <strong>Total:</strong>
                    ${formatCurrency(order.total)}
                  </p>

                  <p>
                    <strong>Payment:</strong>
                    ${
                      order.payment.method === 'cod'
                        ? 'Cash on Delivery'
                        : 'Online Payment'
                    }
                  </p>
                </div>

                <div
                  style="
                    margin-top:30px;
                    padding:16px;
                    background:#f9fafb;
                    border-radius:12px;
                  "
                >
                  <p style="margin:0;">
                    Thank you for shopping with Sambx 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        `,
      });

      console.log('CUSTOMER MAIL SENT');
    }

    return true;

  } catch (error) {
    console.log('EMAIL ERROR');
    console.log(error);

    return null;
  }
}

export async function sendCustomEmail({ to, subject, text, html, from, replyTo }) {
  try {
    const transport = buildTransport();

    if (!transport) {
      console.log('SMTP NOT CONFIGURED: cannot send custom email');
      return null;
    }

    await transport.verify();

    const mail = {
      from: from || (`"Sambx Forge" <${process.env.SMTP_USER || 'no-reply@sambx.local'}>`),
      to,
      subject,
      text,
      html,
      replyTo,
    };

    await transport.sendMail(mail);

    console.log('CUSTOM MAIL SENT to', to);
    return true;
  } catch (error) {
    console.log('CUSTOM EMAIL ERROR', error);
    return null;
  }
}

export async function sendOrderCancellationEmail(order, cancellationReason = '') {
  try {
    const transport = buildTransport();

    if (!transport) {
      console.log('SMTP NOT CONFIGURED');
      return null;
    }

    await transport.verify();

    const customerName = `${order.shipping.firstName} ${order.shipping.lastName}`.trim();
    const customerEmail = order.shipping.email;

    if (!customerEmail) {
      console.log('Customer email not available');
      return null;
    }

    const customerItems = order.items
      .map(
        (item) => `
          <tr>
            <td style="padding:10px;border-bottom:1px solid #eee;">
              ${item.name}
            </td>

            <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
              ${item.quantity}
            </td>

            <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
              ${formatCurrency(item.price * item.quantity)}
            </td>
          </tr>
        `
      )
      .join('');

    // ADMIN NOTIFICATION
    await transport.sendMail({
      from: `"Sambx Forge" <${process.env.SMTP_USER}>`,
      to: process.env.ORDER_NOTIFICATION_EMAIL || 'aniketxai@gmail.com',
      replyTo: customerEmail,
      subject: `❌ Order Cancelled - ${order.orderNumber}`,
      html: `
        <div
          style="
            font-family:Arial,sans-serif;
            background:#f5f5f5;
            padding:24px;
            color:#111827;
          "
        >
          <div
            style="
              max-width:720px;
              margin:auto;
              background:white;
              border-radius:16px;
              overflow:hidden;
            "
          >

            <div
              style="
                background:#dc2626;
                color:white;
                padding:24px;
              "
            >
              <h1 style="margin:0;font-size:24px;">
                Order Cancelled ❌
              </h1>

              <p style="margin-top:10px;">
                Order Number:
                <strong>${order.orderNumber}</strong>
              </p>
            </div>

            <div style="padding:24px;">

              <h2 style="margin-top:0;">
                Customer Information
              </h2>

              <p>
                <strong>Name:</strong>
                ${customerName}
              </p>

              <p>
                <strong>Email:</strong>
                ${customerEmail}
              </p>

              <p>
                <strong>Phone:</strong>
                ${order.shipping.phone || 'N/A'}
              </p>

              ${
                cancellationReason
                  ? `
                    <hr style="margin:24px 0;" />

                    <h2>
                      Cancellation Reason
                    </h2>

                    <p>
                      ${cancellationReason}
                    </p>
                  `
                  : ''
              }

              <hr style="margin:24px 0;" />

              <h2>
                Order Items
              </h2>

              <table
                cellpadding="0"
                cellspacing="0"
                style="
                  width:100%;
                  border-collapse:collapse;
                  margin-top:10px;
                "
              >
                <thead>
                  <tr style="background:#f3f4f6;">
                    <th
                      align="left"
                      style="
                        padding:10px;
                        border-bottom:2px solid #ddd;
                      "
                    >
                      Product
                    </th>

                    <th
                      align="center"
                      style="
                        padding:10px;
                        border-bottom:2px solid #ddd;
                      "
                    >
                      Qty
                    </th>

                    <th
                      align="right"
                      style="
                        padding:10px;
                        border-bottom:2px solid #ddd;
                      "
                    >
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  ${customerItems}
                </tbody>
              </table>

              <div style="margin-top:24px;">
                <p>
                  <strong>Total Amount:</strong>
                  ${formatCurrency(order.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    console.log('ADMIN CANCELLATION MAIL SENT');

    // CUSTOMER NOTIFICATION
    await transport.sendMail({
      from: `"Sambx Forge" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject: `Order Cancellation Confirmation - ${order.orderNumber}`,
      html: `
        <div
          style="
            font-family:Arial,sans-serif;
            background:#f5f5f5;
            padding:24px;
          "
        >
          <div
            style="
              max-width:700px;
              margin:auto;
              background:white;
              border-radius:16px;
              overflow:hidden;
            "
          >

            <div
              style="
                background:#dc2626;
                color:white;
                padding:24px;
                text-align:center;
              "
            >
              <h1 style="margin:0;">
                Order Cancelled ❌
              </h1>

              <p style="margin-top:10px;">
                Order Number:
                <strong>${order.orderNumber}</strong>
              </p>
            </div>

            <div style="padding:24px;">

              <p>
                Hi ${customerName},
              </p>

              <p>
                We wanted to confirm that your order has been successfully cancelled.
              </p>

              <h2>
                Cancelled Order Summary
              </h2>

              <table
                cellpadding="0"
                cellspacing="0"
                style="
                  width:100%;
                  border-collapse:collapse;
                  margin-top:10px;
                "
              >
                <thead>
                  <tr style="background:#f3f4f6;">
                    <th
                      align="left"
                      style="padding:10px;"
                    >
                      Product
                    </th>

                    <th
                      align="center"
                      style="padding:10px;"
                    >
                      Qty
                    </th>

                    <th
                      align="right"
                      style="padding:10px;"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  ${customerItems}
                </tbody>
              </table>

              <div style="margin-top:24px;">

                <p>
                  <strong>Total Amount:</strong>
                  ${formatCurrency(order.total)}
                </p>

                ${
                  cancellationReason
                    ? `
                      <p>
                        <strong>Reason:</strong>
                        ${cancellationReason}
                      </p>
                    `
                    : ''
                }

                <p>
                  <strong>Payment Method:</strong>
                  ${
                    order.payment.method === 'cod'
                      ? 'Cash on Delivery'
                      : 'Online Payment'
                  }
                </p>
              </div>

              <div
                style="
                  margin-top:30px;
                  padding:16px;
                  background:#fef2f2;
                  border-radius:12px;
                  border-left:4px solid #dc2626;
                "
              >
                <p style="margin:0;">
                  If you paid online for this order, the amount will be refunded to your original payment method within 3-5 business days.
                </p>
              </div>

              <div
                style="
                  margin-top:20px;
                  padding:16px;
                  background:#f9fafb;
                  border-radius:12px;
                "
              >
                <p style="margin:0;">
                  If you have any questions, please feel free to contact us. Thank you for your understanding! 🙏
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    console.log('CUSTOMER CANCELLATION MAIL SENT');

    return true;
  } catch (error) {
    console.log('CANCELLATION EMAIL ERROR');
    console.log(error);
    return null;
  }
}