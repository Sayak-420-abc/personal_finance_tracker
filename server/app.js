import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './src/middleware/errorMiddleware.js';

// Route imports
import userRoutes from './src/routes/userRoutes.js';
import transactionRoutes from './src/routes/transactionRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import analyticsRoutes from './src/routes/analyticsRoutes.js';

const app = express();

// --- Security & Parsing ---
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "https://*.clerk.accounts.dev", "https://challenges.cloudflare.com"],
      "connect-src": ["'self'", "https://*.clerk.accounts.dev"],
      "img-src": ["'self'", "https://img.clerk.com", "https://*.clerk.accounts.dev"],
      "worker-src": ["'self'", "blob:"],
      "style-src": ["'self'", "'unsafe-inline'"],
      "frame-src": ["https://challenges.cloudflare.com"],
    },
  },
}));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// --- Health check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- API Routes ---
app.use('/api/users',        userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories',   categoryRoutes);
app.use('/api/analytics',    analyticsRoutes);

// --- Serve static assets in production ---
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const buildPath = path.join(__dirname, '../client/dist');

  app.use(express.static(buildPath));

  // Serve index.html for client-side routing, excluding API requests
  app.get(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// --- Error handling ---
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
