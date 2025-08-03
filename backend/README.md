# 🚗 CarFinder Backend - Modern TypeScript API

A modern, scalable backend API for CarFinder built with TypeScript, Express, Prisma, and PostgreSQL.

## 🏗️ Architecture

This backend follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── application/          # Business Logic Layer
├── domain/              # Domain Layer (Entities, Repositories)
├── infrastructure/      # Infrastructure Layer (Database, External Services)
├── presentation/        # Presentation Layer (Controllers, Routes, Middleware)
└── shared/             # Shared utilities and types
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

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

**Built with ❤️ by the CarFinder Team**