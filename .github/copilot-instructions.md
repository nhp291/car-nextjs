# 🤖 Copilot Instructions for NextSpark Codebase

## Big Picture Architecture
- **Monorepo**: `backend/` (Node.js, Express, TypeScript, Prisma, PostgreSQL), `frontend/` (Next.js 15+, TypeScript, Tailwind CSS)
- **Backend** follows Clean Architecture:
  - `src/application/`: Business logic
  - `src/domain/`: Entities, repositories
  - `src/infrastructure/`: DB, external services
  - `src/presentation/`: Controllers, routes, middleware
  - `src/shared/`: Types, utils
- **Frontend** uses feature-based structure, atomic design, and modern Next.js App Router.

## Developer Workflows
- **Install backend dependencies**: `cd backend && ./install-dependencies.sh`
- **Setup DB**: `npm run db:migrate` (migration), `npm run db:seed` (optional seed)
- **Start backend**: `npm run dev` (dev), `npm run build` + `npm start` (prod)
- **Test backend**: `npm run test`, `npm run test:watch`, `npm run test:coverage`
- **Prisma**: `npx prisma generate` (after schema change)
- **Frontend**: `cd frontend && npm install && npm run dev`

## Project-Specific Conventions
- **TypeScript everywhere**; all data must be typed (see `src/shared/types/`)
- **Validation**: All input (body, params, query) must be validated with Zod (see `src/presentation/validators/`)
- **Controllers**: Only handle request/response, call service layer for business logic
- **Services**: (if present) handle business logic, DB access via Prisma
- **Response format**: Always use `{ success, message, data, timestamp }` (see `ApiResponse` in `src/shared/types/api.types.ts`)
- **Error handling**: Use custom `AppError` and centralized error middleware
- **RBAC**: Use `authorize` middleware for role checks (see `auth.middleware.ts`)
- **Logging**: Use Winston (`logger.util.ts`)
- **Testing**: Use Jest + Supertest for backend, colocate tests with code or in `__tests__/`
- **Frontend**: Use atomic/feature-based structure, Tailwind for styling, Zod for validation, React context for auth

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the NextSpark Team**

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

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

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---
**Built with ❤️ by the NextSpark Team**