import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import app from './app';
import { logger } from './shared/utils/logger.util';

dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    logger.info('Starting CarFinder Backend...');
    await prisma.$connect();
    logger.info('Database connected ✅');

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} 🚀`);
    });
  } catch (err: any) {
    logger.error('Server startup error:', err.message);
    process.exit(1);
  }
}

// Graceful shutdown
const shutdown = async (signal: string) => {
  logger.info(`${signal} received. Closing...`);
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

startServer();
