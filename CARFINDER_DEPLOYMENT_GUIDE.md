# 🚗 CarFinder - Deployment & Best Practices Guide (Part 3)

## 🔧 DEVELOPMENT TOOLS CONFIGURATION (Continued)

### 1. ESLint Configuration (Continued)

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn",
    "no-debugger": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  },
  "overrides": [
    {
      "files": ["*.test.ts", "*.test.tsx", "*.spec.ts", "*.spec.tsx"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
}
```

### 2. Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 3. Husky & Lint-staged Configuration

```json
// package.json (scripts section)
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
npm run type-check
```

```bash
# .husky/pre-push
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test
npm run build
```

### 4. Jest Configuration

```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

```javascript
// jest.setup.js
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:5000/api';
```

---

## 🧪 TESTING STRATEGY

### 1. Unit Tests Examples

```typescript
// src/shared/utils/__tests__/format.utils.test.ts
import { formatPrice, formatNumber, formatDate } from '../format.utils';

describe('Format Utils', () => {
  describe('formatPrice', () => {
    it('should format price correctly', () => {
      expect(formatPrice(1000000)).toBe('₫1,000,000');
      expect(formatPrice(1500000.5)).toBe('₫1,500,001');
      expect(formatPrice(0)).toBe('₫0');
    });

    it('should handle negative prices', () => {
      expect(formatPrice(-1000)).toBe('-₫1,000');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toBe('15/01/2024');
    });
  });
});

// src/components/atoms/Button/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });
});
```

### 2. Integration Tests

```typescript
// src/features/cars/__tests__/CarGrid.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CarGrid } from '../components/CarGrid/CarGrid';
import { mockCars } from '../__mocks__/cars.mock';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('CarGrid Integration', () => {
  it('renders cars correctly', async () => {
    renderWithProviders(
      <CarGrid cars={mockCars} loading={false} />
    );

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
      expect(screen.getByText('Honda CR-V')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    renderWithProviders(
      <CarGrid cars={[]} loading={true} />
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows empty state when no cars', () => {
    renderWithProviders(
      <CarGrid cars={[]} loading={false} />
    );

    expect(screen.getByText('No cars found')).toBeInTheDocument();
  });
});
```

### 3. E2E Tests with Playwright

```typescript
// tests/e2e/car-search.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Car Search Flow', () => {
  test('should search and filter cars', async ({ page }) => {
    await page.goto('/cars');

    // Search for a car
    await page.fill('[data-testid="search-input"]', 'Toyota');
    await page.waitForTimeout(500); // Wait for debounce

    // Check if results are filtered
    await expect(page.locator('[data-testid="car-card"]')).toContainText('Toyota');

    // Apply price filter
    await page.click('[data-testid="price-filter"]');
    await page.fill('[data-testid="min-price"]', '1000000');
    await page.fill('[data-testid="max-price"]', '2000000');

    // Check if results are updated
    await expect(page.locator('[data-testid="results-count"]')).toBeVisible();
  });

  test('should navigate to car detail page', async ({ page }) => {
    await page.goto('/cars');
    
    // Click on first car card
    await page.click('[data-testid="car-card"]:first-child');
    
    // Should navigate to detail page
    await expect(page).toHaveURL(/\/cars\/[^\/]+$/);
    await expect(page.locator('[data-testid="car-detail"]')).toBeVisible();
  });
});
```

---

## 🚀 DEPLOYMENT GUIDE

### 1. Environment Configuration

```bash
# Backend .env.example
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/carfinder?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=30d

# CORS
FRONTEND_URL=https://your-frontend-domain.com

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Redis (Optional for caching)
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

```bash
# Frontend .env.local.example
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry (Optional)
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn

# Feature Flags (Optional)
NEXT_PUBLIC_ENABLE_3D_VIEWER=true
NEXT_PUBLIC_ENABLE_COMPARISON=true
```

### 2. Docker Configuration

```dockerfile
# Backend Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER nodejs

EXPOSE 5000

ENV PORT 5000

CMD ["npm", "start"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: carfinder
      POSTGRES_USER: carfinder
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U carfinder"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql://carfinder:password@postgres:5432/carfinder
      REDIS_URL: redis://redis:6379
      JWT_SECRET: your-jwt-secret
      NODE_ENV: production
    ports:
      - "5000:5000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./backend/uploads:/app/uploads

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      NEXT_PUBLIC_API_URL: http://backend:5000/api
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
```

### 3. Railway Deployment

```json
// railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "sleepApplication": false,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

```bash
# Backend deployment script
#!/bin/bash
echo "🚀 Deploying CarFinder Backend to Railway..."

# Install Railway CLI if not exists
if ! command -v railway &> /dev/null; then
    npm install -g @railway/cli
fi

# Login to Railway
railway login

# Deploy backend
cd backend
railway up --service backend

# Run database migrations
railway run --service backend npx prisma migrate deploy
railway run --service backend npx prisma db seed

echo "✅ Backend deployed successfully!"
```

### 4. Vercel Deployment (Frontend)

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "@vercel/node"
    }
  },
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend-url.railway.app/api/:path*"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### 5. GitHub Actions CI/CD

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
      
      - name: Install dependencies
        working-directory: ./backend
        run: npm ci
      
      - name: Generate Prisma client
        working-directory: ./backend
        run: npx prisma generate
        
      - name: Run database migrations
        working-directory: ./backend
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      
      - name: Run tests
        working-directory: ./backend
        run: npm test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
          JWT_SECRET: test-secret
      
      - name: Run linting
        working-directory: ./backend
        run: npm run lint

  test-frontend:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      
      - name: Run type checking
        working-directory: ./frontend
        run: npm run type-check
      
      - name: Run tests
        working-directory: ./frontend
        run: npm test
      
      - name: Run linting
        working-directory: ./frontend
        run: npm run lint
      
      - name: Build application
        working-directory: ./frontend
        run: npm run build

  deploy-backend:
    needs: test-backend
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Railway
        uses: railway-app/railway-action@v1
        with:
          api-token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
          
  deploy-frontend:
    needs: test-frontend
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
```

---

## 📊 PERFORMANCE OPTIMIZATION

### 1. Backend Optimizations

```typescript
// src/shared/utils/cache.util.ts
import Redis from 'redis';

class CacheService {
  private client: Redis.RedisClientType;

  constructor() {
    this.client = Redis.createClient({
      url: process.env.REDIS_URL,
    });
    
    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });
    
    this.client.connect();
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      await this.client.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async flush(): Promise<void> {
    try {
      await this.client.flushAll();
    } catch (error) {
      console.error('Cache flush error:', error);
    }
  }
}

export const cacheService = new CacheService();

// Usage in service
export class CarService {
  async getCars(query: CarQueryDto): Promise<PaginatedResponse<Car>> {
    const cacheKey = `cars:${JSON.stringify(query)}`;
    
    // Try to get from cache first
    const cached = await cacheService.get<PaginatedResponse<Car>>(cacheKey);
    if (cached) {
      return cached;
    }

    // If not in cache, fetch from database
    const result = await this.fetchCarsFromDatabase(query);
    
    // Cache the result for 5 minutes
    await cacheService.set(cacheKey, result, 300);
    
    return result;
  }
}
```

### 2. Frontend Optimizations

```typescript
// src/shared/hooks/useInfiniteScroll.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export const useInfiniteCarScroll = (filters: CarFilters) => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['cars', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      carsAPI.getAll({ ...filters, page: pageParam, limit: 12 }),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNext 
        ? lastPage.pagination.page + 1 
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    status,
    ref,
  };
};

// src/components/organisms/VirtualizedCarGrid/VirtualizedCarGrid.tsx
import { FixedSizeGrid as Grid } from 'react-window';
import { CarCard } from '@/features/cars/components/CarCard/CarCard';

interface VirtualizedCarGridProps {
  cars: Car[];
  width: number;
  height: number;
  columnCount: number;
  rowHeight: number;
}

export const VirtualizedCarGrid: React.FC<VirtualizedCarGridProps> = ({
  cars,
  width,
  height,
  columnCount,
  rowHeight,
}) => {
  const rowCount = Math.ceil(cars.length / columnCount);

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    const car = cars[index];

    if (!car) return null;

    return (
      <div style={style}>
        <div className="p-2">
          <CarCard car={car} />
        </div>
      </div>
    );
  };

  return (
    <Grid
      columnCount={columnCount}
      columnWidth={width / columnCount}
      height={height}
      rowCount={rowCount}
      rowHeight={rowHeight}
      width={width}
    >
      {Cell}
    </Grid>
  );
};
```

### 3. Image Optimization

```typescript
// src/components/atoms/OptimizedImage/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};
```

---

## 📈 MONITORING & ANALYTICS

### 1. Error Tracking with Sentry

```typescript
// src/shared/utils/sentry.util.ts
import * as Sentry from '@sentry/nextjs';

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    beforeSend(event) {
      // Filter out development errors
      if (process.env.NODE_ENV === 'development') {
        return null;
      }
      return event;
    },
  });
};

export const captureException = (error: Error, context?: any) => {
  Sentry.captureException(error, {
    contexts: {
      custom: context,
    },
  });
};
```

### 2. Performance Monitoring

```typescript
// src/shared/utils/analytics.util.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export const reportWebVitals = (metric: any) => {
  // Send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 4
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
};

// Measure Core Web Vitals
export const measureWebVitals = () => {
  getCLS(reportWebVitals);
  getFID(reportWebVitals);
  getFCP(reportWebVitals);
  getLCP(reportWebVitals);
  getTTFB(reportWebVitals);