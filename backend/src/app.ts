import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { stream } from './shared/utils/logger.util';

// Routes
import authRoutes from './presentation/routes/auth.routes';
import carRoutes from './presentation/routes/car.routes';
import { authLimiter, generalLimiter } from './presentation/middlewares/rate-limit.middleware';
import { errorHandler } from './presentation/middlewares/error.middleware';

const app = express();

// Security middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined', { stream }));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Rate limiting
app.use('/api/', generalLimiter);
app.use('/api/auth', authLimiter);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// 404
app.use('*', (req, res) => res.status(404).json({ success: false, message: 'Not Found' }));

// Error handling
app.use(errorHandler);

export default app;
