import rateLimit from 'express-rate-limit';
import env from '../../config/env.config';

export const rateLimiter = rateLimit({
  windowMs: Number(env.RATE_LIMIT_WINDOW) * 60 * 1000, // 15 minutes by default
  max: Number(env.RATE_LIMIT_MAX), // 100 requests per window by default
  message: {
    status: 'error',
    message: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});
