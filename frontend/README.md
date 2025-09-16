# 🚗 NextSpark Frontend

Modern car search & comparison platform built with Next.js, React, and TypeScript.

## ✨ Key Features

### 🔍 Car Search & Discovery
- Real-time search with smart suggestions
- Advanced filtering (make, model, price, year)
- Interactive 3D car previews
- Detailed specifications
- Multi-dealer price comparison

### � Compare & Analyze
- Side-by-side comparison (up to 3 cars)
- Highlight key differences
- Technical specs comparison
- Price analysis
- PDF report export

### 👤 User Experience
- Personalized accounts
- Saved favorites
- Search history
- Price alerts
- Social sharing

### 🎨 Modern Interface
- Responsive design
- Dark/Light modes
- Smooth animations
- Progressive loading
- Accessibility focus

### 🛠 Admin Tools
- Analytics dashboard
- Inventory management
- User administration
- Content management
- System configuration

## 🎨 Components

### UI Components
- `CarCard` - Car information card with variants (default, compact, featured)
- `SearchBar` - Search bar with suggestions
- `Button` - Customizable button component
- `TextField` - Validated input field
- `LoadingSpinner` - Loading states
- `Modal` - Modal dialog
- `Toast` - Notifications

### Layout Components
- `Header` - Navigation with mobile menu
- `Footer` - Site footer
- `Car3DViewer` - Three.js car viewer

### Page Components
- `HomePage` - Landing page
- `CarDetail` - Car details with 3D
- `AdminDashboard` - Admin interface

## 🛠️ Development

### Prerequisites
- Node.js 20.5.0+
- npm 10.0.0+ 
- PostgreSQL 14+
- Redis (optional)
- Yarn 

### Setup
```bash
# Clone repository
git clone https://github.com/nhp291/car-nextjs.git

# Install dependencies 
npm install

# Build project
npm run build

# Start development
npm run dev
```

### Project Structure

```
src/
  ├── app/           # Next.js pages
  ├── components/    # React components
  ├── constants/     # Constants
  ├── contexts/     # React contexts
  ├── hooks/        # Custom hooks
  ├── public/       # Static files
  ├── services/     # API layer
  ├── styles/       # Global styles
  ├── types/        # TypeScript types
  └── utils/        # Utilities
```

### Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Production server
- `npm run lint` - ESLint check
- `npm run format` - Prettier format

### Environment Setup

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key_here
```

### Testing

```bash
# Unit tests
npm run test

# Integration
npm run test:integration

# End-to-end
npm run test:e2e
```

## 📝 Code Guidelines

### TypeScript
- Strict mode enabled
- Full type coverage
- No `any` types

### React
- Function components
- Props interfaces
- No inline styles
- Render optimization

### Testing
- Unit test utilities
- React Testing Library
- Cypress E2E

### Git
- Conventional Commits
- Feature branches
- PR workflow

## 🤝 Contributing

1. Fork project
2. Create feature branch
3. Commit changes
4. Push branch
5. Open Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.

## 👥 Team

- **Fullstack Developer**: nhp291 (nguyenhoaiphongdev@gmail.com)

## 🛠️ Tech Stack

### Core
- **Next.js 15.3.3** - App Router
- **React 19.0.0** - UI Library
- **TypeScript 5** - Type Safety
- **Tailwind CSS 4.1.10** - Styling

### 3D & Graphics
- **Three.js 0.177.0** - 3D Engine
- **@react-three/fiber 9.1.2** - React Three.js
- **@react-three/drei 10.3.0** - Three.js Helpers

### Development
- **ESLint 9** - Linting
- **PostCSS 8.5.5** - CSS Processing
- **Turbopack** - Fast Bundling

### Design
- **Geist Sans** - Primary Font
- **Geist Mono** - Monospace
- **Custom SVG Icons** - 20+ Icons

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features
- Mobile-first approach
- Adaptive layouts
- Touch interactions
- Performance optimized
- Progressive loading

## 🚀 Deployment

### Vercel
```bash
yarn build
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

## 📊 Performance

- Image optimization
- Code splitting
- Lazy loading
- CSS transforms
- Responsive assets

## 🔒 Security

- TypeScript safety
- Input validation
- XSS protection
- CSRF protection
- Secure headers

## 📞 Contact

- Email: nhp2901@gmail.com
- Email: nguyenhoaiphongdev@gmail.com
- GitHub: [@nhp291](https://github.com/nhp291)
- Website: [car-nextjs.com](https://car-nextjs.com)

---

**Made with ❤️ by NextSpark Team**
