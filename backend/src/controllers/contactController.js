import { ContactMessage } from '../models/ContactMessage.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    subject,
    message,
  } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);

    throw new Error('All contact fields are required');
  }

  const contactMessage = await ContactMessage.create({
    name,
    email,
    subject,
    message,
  });

  // EMAIL NOTIFICATION
  await sendEmail({
    to: process.env.EMAIL_USER,

    subject: `New Contact Message - ${subject}`,

    html: `
      <h2>New Contact Form Message</h2>

      <p>
        <strong>Name:</strong>
        ${name}
      </p>

      <p>
        <strong>Email:</strong>
        ${email}
      </p>

      <p>
        <strong>Subject:</strong>
        ${subject}
      </p>

      <p>
        <strong>Message:</strong>
      </p>

      <div style="padding:12px;background:#f5f5f5;border-radius:8px;">
        ${message}
      </div>
    `,
  });

  res.status(201).json({
    success: true,
    message: 'Message received',
    data: contactMessage,
  });
});