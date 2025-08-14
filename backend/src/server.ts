import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './presentation/middleware/error.middleware';
import { generalLimiter, authLimiter } from './presentation/middleware/rate-limit.middleware';
import { logger, stream } from './shared/utils/logger.util';

// Routes
import authRoutes from './presentation/routes/auth.routes';
import carRoutes from './presentation/routes/car.routes';

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Compression middleware
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('combined', { stream }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CarFinder Backend API',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'CarFinder API Documentation',
    version: '2.0.0',
    endpoints: {
      auth: '/api/auth',
      cars: '/api/cars',
      health: '/health',
    },
    documentation: '/api/docs',
  });
});

// Rate limiting
app.use('/api/', generalLimiter);
app.use('/api/auth', authLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server
async function startServer() {
  try {
    logger.info('Starting CarFinder Backend Server...');
    
    // Test database connection
    await prisma.$connect();
    logger.info('Database connection established successfully');
    
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      logger.info('🚗 CarFinder Backend is ready!');
    });
  } catch (error: any) {
    logger.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

// Graceful shutdown handlers
const handleShutdown = async (signal: string) => {
  logger.info(`${signal} received, shutting down gracefully`);
  
  try {
    await prisma.$disconnect();
    logger.info('Database connection closed');
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
};

// Process event handlers
process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Promise Rejection:', err.message);
  process.exit(1);
});
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err.message);
  process.exit(1);
});

startServer();

export default app;