# 🚗 NextSpark Backend - Modern TypeScript API

A modern, scalable TypeScript backend API for NextSpark, built with Clean Architecture principles.

## 🏗️ Architecture

### Clean Architecture

The backend follows a layered architecture pattern:

```
src/
├── application/     # Use Cases & Business Logic
│   ├── services/   # Business logic implementation
│   └── interfaces/ # Service interfaces
├── domain/         # Business Rules
│   ├── entities/   # Domain models
│   └── repos/      # Repository interfaces
├── infrastructure/ # External Interfaces
│   ├── database/   # Database implementation
│   └── services/   # External services
├── presentation/   # External Layer
│   ├── controllers/# Request handlers
│   ├── routes/     # API routes
│   ├── middleware/ # Express middleware
│   └── validators/ # Request validation
└── shared/         # Shared Code
    ├── types/      # TypeScript types
    └── utils/      # Utilities
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Tech Stack

- **TypeScript 5** - Type Safety
- **Express 4.18** - Web Framework
- **Prisma 5.4** - ORM
- **PostgreSQL 15** - Database
- **Jest** - Testing
- **Redis** - Caching (Optional)

### Installation

1. **Install dependencies:**
```bash
chmod +x install-dependencies.sh
./install-dependencies.sh
```

2. **Setup environment variables:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Setup database:**
```bash
# Create database
createdb carfinder

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

### Environment Variables

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/carfinder"

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Redis Cache (Optional)
REDIS_URL=redis://localhost:6379
```

## 📦 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout user

### Cars
- `GET /api/cars` - List cars
- `GET /api/cars/:id` - Get car details
- `POST /api/cars` - Create car (Auth)
- `PUT /api/cars/:id` - Update car (Auth)
- `DELETE /api/cars/:id` - Delete car (Auth)

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update user profile
- `GET /api/users/:id` - Get user by ID (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Admin
- `GET /api/admin/stats` - Get system stats
- `GET /api/admin/users` - List all users
- `POST /api/admin/cars/import` - Bulk import cars

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- auth.test.ts

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

## 🔒 Security

- JWT Authentication
- Role-Based Access Control
- Request Validation
- Rate Limiting
- Secure Headers
- CORS Protection

## 🚀 Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3001:3001"
    env_file: .env
    depends_on:
      - db
      - redis
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: carfinder
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
  redis:
    image: redis:alpine
```

## 📝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

This project is MIT licensed. See [LICENSE](./LICENSE) for details.

4. **Start development server:**
```bash
npm run dev
```

## 📊 Database Schema

### Core Models

- **User** - User accounts with roles (USER, DEALER, ADMIN)
- **Car** - Car listings with detailed specifications
- **Dealer** - Car dealerships
- **Category** - Car categories
- **Review** - User reviews for cars
- **Favorite** - User favorite cars
- **TestDrive** - Test drive bookings
- **Inquiry** - Car inquiries

### New Features

- **Social Features** - Follow users, posts, comments, likes
- **Notifications** - Real-time notifications
- **Price History** - Track price changes
- **AI Scoring** - AI-powered car recommendations

## 🔐 Authentication & Authorization

### JWT Authentication
- Access tokens with 30-day expiration
- Role-based access control (RBAC)
- Secure password hashing with bcrypt

### Roles & Permissions
- **USER** - Basic user permissions
- **DEALER** - Can manage own car listings
- **ADMIN** - Full system access
- **SUPER_ADMIN** - Complete administrative control

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - User login
GET    /api/auth/profile      - Get user profile
PUT    /api/auth/profile      - Update profile
POST   /api/auth/logout       - Logout user
```

### Cars
```
GET    /api/cars              - Get all cars (with filters)
GET    /api/cars/:id          - Get car by ID
GET    /api/cars/slug/:slug   - Get car by slug
POST   /api/cars              - Create new car (Dealer+)
PUT    /api/cars/:id          - Update car (Dealer+)
DELETE /api/cars/:id          - Delete car (Dealer+)
GET    /api/cars/search       - Search cars
GET    /api/cars/featured     - Get featured cars
POST   /api/cars/:id/favorite - Toggle favorite
```

### Advanced Features
```
POST   /api/cars/:id/test-drive    - Schedule test drive
POST   /api/cars/:id/inquiry       - Send inquiry
GET    /api/cars/:id/similar       - Get similar cars
POST   /api/cars/:id/view          - Increment view count
```

## 🛡️ Security Features

### Input Validation
- **Zod schemas** for request validation
- **Input sanitization** to prevent XSS
- **SQL injection protection** via Prisma ORM

### Rate Limiting
- **General API**: 100 requests/15 minutes
- **Authentication**: 5 requests/15 minutes  
- **Car endpoints**: 20 requests/minute

### Security Headers
- **Helmet.js** for security headers
- **CORS** configuration
- **Content Security Policy**

## 📈 Performance & Monitoring

### Caching
- **Redis** for API response caching
- **Database query optimization**
- **Prisma connection pooling**

### Logging
- **Winston** for structured logging
- **Request/response logging**
- **Error tracking and monitoring**

### Monitoring
- **Health check endpoint** at `/`
- **Database connection monitoring**
- **Performance metrics tracking**

## 🧪 Testing

### Test Structure
```bash
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### Test Types
- **Unit tests** - Individual functions/methods
- **Integration tests** - API endpoints
- **E2E tests** - Complete user flows

## 🚀 Deployment

### Environment Variables
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL="postgresql://user:pass@host:5432/carfinder"
JWT_SECRET="your-super-secret-key"
REDIS_URL="redis://localhost:6379"
```

### Docker Deployment
```bash
# Build image
docker build -t carfinder-backend .

# Run container
docker run -p 5000:5000 carfinder-backend
```

### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway up
```

## 📝 Development Guidelines

### Code Style
- **TypeScript** for type safety
- **ESLint + Prettier** for code formatting
- **Conventional commits** for git messages

### API Response Format
```typescript
{
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  timestamp: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

### Error Handling
- **Centralized error handling** middleware
- **Custom error classes** for different error types
- **Proper HTTP status codes**
- **Detailed error logging**

## 🔄 Migration from Old Backend

### Database Migration
1. **Export MongoDB data**
2. **Transform data** to match new schema
3. **Import to PostgreSQL** using migration scripts
4. **Verify data integrity**

### API Changes
- **Standardized response format**
- **Enhanced validation** with Zod
- **New authentication flow**
- **Additional endpoints** for new features

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the NextSpark Team**