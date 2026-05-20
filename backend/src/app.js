import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = process.env.CORS_ORIGIN
        ?.split(',')
        .map(s => s.trim())
        .filter(Boolean) || [];

      // Allow requests with no origin (like mobile apps or Curl requests)
      if (!origin) return callback(null, true);

      // If CORS_ORIGIN is configured, check against it
      if (allowedOrigins.length > 0) {
        if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
          return callback(null, true);
        }
        return callback(new Error('CORS not allowed'));
      }

      // In development, allow localhost
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true);
      }

      // Fallback: allow all origins if CORS_ORIGIN is not set
      // (set CORS_ORIGIN in production for security)
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'SAMBX API is running',
    health: '/api/health',
  });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'SAMBX API is running' });
});

app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
