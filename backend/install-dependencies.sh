#!/bin/bash

echo "🚀 Installing CarFinder Backend Dependencies..."

# Install production dependencies
npm install express@^4.18.2 \
  cors@^2.8.5 \
  helmet@^7.1.0 \
  compression@^1.7.4 \
  express-rate-limit@^7.1.5 \
  bcryptjs@^2.4.3 \
  jsonwebtoken@^9.0.2 \
  zod@^3.22.4 \
  winston@^3.11.0 \
  dotenv@^16.3.1 \
  @prisma/client@^5.7.1 \
  prisma@^5.7.1 \
  multer@^1.4.5-lts.1 \
  sharp@^0.33.1 \
  nodemailer@^6.9.7 \
  redis@^4.6.11 \
  class-validator@^0.14.0 \
  class-transformer@^0.5.1

# Install development dependencies
npm install --save-dev @types/express@^4.17.21 \
  @types/cors@^2.8.17 \
  @types/compression@^1.7.5 \
  @types/bcryptjs@^2.4.6 \
  @types/jsonwebtoken@^9.0.5 \
  @types/multer@^1.4.11 \
  @types/nodemailer@^6.4.14 \
  @types/node@^20.10.5 \
  @types/jest@^29.5.8 \
  @types/supertest@^6.0.2 \
  typescript@^5.3.3 \
  tsx@^4.6.2 \
  jest@^29.7.0 \
  ts-jest@^29.1.1 \
  supertest@^6.3.3 \
  eslint@^8.56.0 \
  @typescript-eslint/eslint-plugin@^6.15.0 \
  @typescript-eslint/parser@^6.15.0 \
  prettier@^3.1.1

echo "✅ Dependencies installed successfully!"

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🎉 Setup completed! You can now run:"
echo "  npm run dev    - Start development server"
echo "  npm run build  - Build for production"
echo "  npm start      - Start production server"