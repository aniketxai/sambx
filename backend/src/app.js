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

/* =========================
   CORS SETUP
========================= */
const allowedOrigins = process.env.CORS_ORIGIN
  ?.split(',')
  .map((s) => s.trim())
  .filter(Boolean) || [];

console.log('CORS_ORIGIN env:', process.env.CORS_ORIGIN);
console.log('Allowed Origins:', allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log('Incoming request origin:', origin);

      // Allow requests without origin (Postman, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      // Check allowed origins
      if (
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*')
      ) {
        return callback(null, true);
      }

      console.warn('Blocked by CORS:', origin);

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Handle preflight requests
app.options('*', cors());

/* =========================
   MIDDLEWARE
========================= */
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/* =========================
   HEALTH ROUTES
========================= */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'SAMBX API is running',
    health: '/api/health',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'SAMBX API is running',
  });
});

/* =========================
   API ROUTES
========================= */
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/orders', orderRoutes);

/* =========================
   ERROR HANDLERS
========================= */
app.use(notFound);
app.use(errorHandler);

export default app;