# 🤖 Copilot Instructions for CarFinder Codebase

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

## Integration & Data Flow
- **API**: RESTful, see backend `README.md` for endpoint list
- **Auth**: JWT, roles: USER, DEALER, ADMIN, SUPER_ADMIN
- **DB**: PostgreSQL, Prisma schema in `prisma/schema.prisma`
- **Caching**: Redis (optional, see infra)
- **3D/Media**: Frontend uses Three.js via `Car3DViewer`

## Examples & Patterns
- **Add new car**: Implement Zod schema → controller → service → Prisma
- **Add new API**: Add route in `routes/`, controller in `controllers/`, types in `shared/types/`
- **Validation**: Example in `car.validator.ts`
- **RBAC**: Example in `car.routes.ts` with `authorize(['ADMIN'])`
- **Error**: Throw `new AppError(message, statusCode)`
- **Response**: Always return `ApiResponse` type

## External Dependencies
- **Backend**: Express, Prisma, PostgreSQL, Zod, Winston, JWT, Redis, Helmet, Rate Limit
- **Frontend**: Next.js, React, Tailwind, Three.js, Zod, ESLint, Prettier

---

For more, see `backend/README.md` and `frontend/README.md`. If a pattern is unclear, ask for clarification or check the relevant directory for examples.
