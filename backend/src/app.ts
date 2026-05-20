import express, {
  Application,
  Request,
  Response,
} from 'express';

import cors from 'cors';

import routes from './routes/index';

import { errorHandler } from './middlewares/error.middleware';

const app: Application =
  express();

// CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://smart-leads-dashboard-sho2.vercel.app',
    ],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Health check
app.get(
  '/health',
  (
    req: Request,
    res: Response
  ) => {
    res.status(200).json({
      success: true,
      message:
        'Server is running',
    });
  }
);

// Root route
app.get(
  '/',
  (
    req: Request,
    res: Response
  ) => {
    res.status(200).json({
      success: true,
      message:
        'Smart Leads Backend Running 🚀',
    });
  }
);

// Routes
app.use(
  '/api/v1',
  routes
);

// 404 handler
app.use(
  (
    req: Request,
    res: Response
  ) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`,
    });
  }
);

// Error handler
app.use(errorHandler);

export default app;
