# 🚗 NextSpark - Modern Car Search & Compare Platform

[English](README.md) 

## Overview
NextSpark is a modern web application built with Next.js and Node.js, providing comprehensive car search, comparison, and 3D visualization features.

## 🏗️ Architecture

```
carfinder/
├── frontend/          # Next.js 15+ frontend application
├── backend/          # Node.js + Express backend API
├── docs/            # Documentation & guides
└── shared/          # Shared types and utilities
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis (optional)
- yarn

### Setup & Installation

1. **Clone repository**
```bash
git clone https://github.com/nhp291/car-nextjs.git
cd car-nextjs
```

2. **Install Dependencies & Start Backend**
```bash
cd backend
yarn install
yarn dev
```

3. **Install Dependencies & Start Frontend**
```bash
cd frontend
yarn install
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- [Frontend Documentation](frontend/README.md)
- [Backend Documentation](backend/README.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](CARFINDER_DEPLOYMENT_GUIDE.md)
- [Migration Checklist](CARFINDER_MIGRATION_CHECKLIST.md)
- [Implementation Guide](CARFINDER_IMPLEMENTATION_GUIDE.md)
- [Modernization Plan](CARFINDER_MODERNIZATION_PLAN.md)

## ✨ Key Features

### Frontend
- Modern UI with Next.js 15+ and Tailwind CSS
- 3D Car Visualization with Three.js
- Advanced Search & Filtering
- Real-time Car Comparison
- Responsive Design & Dark Mode

### Backend
- RESTful API with Express & TypeScript
- Clean Architecture
- PostgreSQL with Prisma ORM
- JWT Authentication & RBAC
- Rate Limiting & Security

## 🛡️ Security & Performance

- JWT-based Authentication
- Role-based Access Control
- Rate Limiting & DDoS Protection
- Redis Caching (optional)
- CDN Integration Ready
- Performance Optimizations

## 🔄 CI/CD

- GitHub Actions for CI
- Automated Testing
- Docker Containerization
- Vercel/Railway Deployment
- Database Migrations

## � Status

![CI/CD](https://github.com/nhp291/car-nextjs/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/nhp291/car-nextjs)
![Version](https://img.shields.io/github/v/release/nhp291/car-nextjs)

## 📞 Contact

- **Email**: nguyenhoaiphongdev@gmail.com
- **Email**: nhp2901@gmail.com
- **Website**: https://car-nextjs
- **GitHub**: https://github.com/nhp291/car-nextjs

## 📄 License

This project is MIT licensed - see [LICENSE](LICENSE) for details.

---

Made with ❤️ by [NextSpark](https://car-nextjs)

## 🔧 Cấu hình môi trường

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=
```

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/carfinder"

# JWT
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Redis (optional)
REDIS_URL="redis://localhost:6379"
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/profile` - Thông tin user

### Cars
- `GET /api/cars` - Danh sách xe
- `GET /api/cars/:id` - Chi tiết xe
- `GET /api/cars/search` - Tìm kiếm xe
- `POST /api/cars/compare` - So sánh xe
- `GET /api/cars/favorites` - Xe yêu thích

## 🛠️ Scripts

### Frontend
```bash
npm run dev          # Development server
npm run build        # Build production
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

### Backend
```bash
npm run dev          # Development server
npm run build        # Build TypeScript
npm run start        # Start production server
npm run test         # Run tests
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test
npm run test:coverage
```

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Docker)
```bash
cd backend
docker build -t carfinder-backend .
docker run -p 5000:5000 carfinder-backend
```

## 🔒 Security

- **Authentication**: JWT với refresh tokens
- **Rate Limiting**: Bảo vệ API khỏi spam
- **Input Validation**: Zod schema validation
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **SQL Injection**: Prisma ORM protection

## 📈 Performance

- **Frontend**: Next.js 15 với App Router
- **Backend**: Express với compression
- **Database**: PostgreSQL với indexing
- **Caching**: Redis (optional)
- **CDN**: Static assets optimization

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👥 Team

- **Fullstack Developer**: nhp291 (nguyenhoaiphongdev@gmail.com)


## 📞 Support

Nếu có vấn đề, vui lòng tạo issue hoặc liên hệ:
- Email: nguyenhoaiphongdev@gmail.com
- Discord: [NextSpark Community](https://discord.gg/nextspark)

---

**Made with ❤️ by NextSpark Team**