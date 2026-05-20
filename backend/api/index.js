import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

const MONGO_URI = process.env.MONGO_URI;

// Ensure DB connection is established
let dbConnected = false;

async function ensureConnected() {
  if (!dbConnected && MONGO_URI) {
    try {
      await connectDB(MONGO_URI);
      dbConnected = true;
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }
}

// Export the app for Vercel serverless
export default async (req, res) => {
  try {
    await ensureConnected();
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
};
