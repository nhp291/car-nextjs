import { Express } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import env from './env.config';

export const configureApp = (app: Express): void => {
  // Security middlewares
  app.use(helmet());
  app.use(cors({ 
    origin: env.CORS_ORIGIN,
    credentials: true 
  }));

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Compression
  app.use(compression());

  // Trust proxy for rate limiting
  app.set('trust proxy', 1);
};
