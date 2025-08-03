# 🚗 CarFinder - Ứng dụng tìm kiếm và so sánh xe hơi

CarFinder là một ứng dụng web hiện đại được xây dựng với Next.js và Node.js, cung cấp trải nghiệm tìm kiếm và so sánh xe hơi toàn diện.

## ✨ Tính năng chính

### 🎯 Frontend (Next.js 15)
- **Giao diện hiện đại**: Thiết kế responsive với Tailwind CSS
- **Tìm kiếm nâng cao**: Bộ lọc theo hãng, giá, loại nhiên liệu, hộp số
- **So sánh xe**: So sánh tối đa 4 xe cùng lúc với bảng chi tiết
- **Xem 3D**: Trình xem xe 3D với Three.js
- **Authentication**: Hệ thống đăng nhập/đăng ký an toàn
- **Favorites**: Lưu và quản lý xe yêu thích
- **Admin Panel**: Giao diện quản lý cho admin

### 🔧 Backend (Node.js + Express)
- **API RESTful**: Thiết kế API chuẩn REST
- **Database**: PostgreSQL với Prisma ORM
- **Authentication**: JWT với refresh tokens
- **Rate Limiting**: Bảo vệ API khỏi spam
- **Logging**: Winston logger với file rotation
- **Error Handling**: Xử lý lỗi toàn diện
- **Validation**: Zod schema validation
- **Security**: Helmet, CORS, compression

## 🏗️ Cấu trúc dự án

```
car-app/
├── frontend/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/             # App Router
│   │   ├── components/      # React Components
│   │   │   ├── ui/         # UI Components (shadcn/ui)
│   │   │   ├── forms/      # Form Components
│   │   │   └── cars/       # Car-specific Components
│   │   ├── lib/            # Utilities & Hooks
│   │   │   ├── hooks/      # Custom Hooks
│   │   │   ├── utils.ts    # Utility Functions
│   │   │   ├── constants.ts # App Constants
│   │   │   └── validations.ts # Zod Schemas
│   │   └── types/          # TypeScript Types
│   └── public/             # Static Assets
├── backend/                 # Node.js Backend
│   ├── src/
│   │   ├── presentation/   # API Layer
│   │   │   ├── controllers/ # Route Controllers
│   │   │   ├── middleware/ # Express Middleware
│   │   │   ├── routes/     # API Routes
│   │   │   └── validators/ # Request Validation
│   │   ├── infrastructure/ # Infrastructure Layer
│   │   │   └── database/   # Database Services
│   │   ├── shared/         # Shared Utilities
│   │   │   ├── types/      # TypeScript Types
│   │   │   └── utils/      # Utility Functions
│   │   └── server.ts       # Express Server
│   └── prisma/             # Database Schema
└── docs/                   # Documentation
```

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- PostgreSQL 14+
- npm hoặc yarn

### 1. Clone repository
```bash
git clone https://github.com/your-username/car-app.git
cd car-app
```

### 2. Cài đặt dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Cấu hình database
```bash
# Tạo file .env trong backend/
cp .env.example .env

# Cập nhật thông tin database trong .env
DATABASE_URL="postgresql://username:password@localhost:5432/carfinder"
JWT_SECRET="your-secret-key"
```

### 4. Chạy migrations
```bash
cd backend
npx prisma generate
npx prisma db push
```

### 5. Chạy ứng dụng
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Truy cập ứng dụng tại: http://localhost:3000

## 🔧 Cấu hình môi trường

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=CarFinder
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

- **Frontend Developer**: [Your Name]
- **Backend Developer**: [Your Name]
- **UI/UX Designer**: [Your Name]

## 📞 Support

Nếu có vấn đề, vui lòng tạo issue hoặc liên hệ:
- Email: support@carfinder.com
- Discord: [CarFinder Community]

---

Made with ❤️ by CarFinder Team 