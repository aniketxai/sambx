import { ContactMessage } from '../models/ContactMessage.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('All contact fields are required');
  }

  const contactMessage = await ContactMessage.create({ name, email, subject, message });

  res.status(201).json({
    success: true,
    message: 'Message received',
    data: contactMessage,
  });
});
