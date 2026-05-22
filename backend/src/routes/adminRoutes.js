import { Router } from 'express';
import {
  createAdminProduct,
  deleteAdminProduct,
  getDashboardSummary,
  listAdminContacts,
  listAdminOrders,
  listAdminProducts,
  listAdminQuotes,
  updateContactStatus,
  updateOrderStatus,
  updateAdminProduct,
  updateQuoteStatus,
  replyToContact,
  replyToQuote,
} from '../controllers/adminController.js';

const router = Router();

router.get('/summary', getDashboardSummary);

router.get('/products', listAdminProducts);
router.post('/products', createAdminProduct);
router.put('/products/:id', updateAdminProduct);
router.delete('/products/:id', deleteAdminProduct);

router.get('/orders', listAdminOrders);
router.patch('/orders/:id/status', updateOrderStatus);

router.get('/quotes', listAdminQuotes);
router.patch('/quotes/:id/status', updateQuoteStatus);

router.get('/contacts', listAdminContacts);
router.patch('/contacts/:id/status', updateContactStatus);
router.post('/contacts/:id/reply', replyToContact);
router.post('/quotes/:id/reply', replyToQuote);

export default router;