# 🚗 Car Next.js - Nền tảng tra cứu & trải nghiệm xe hiện đại

Dự án website về xe hơi được xây dựng bằng Next.js 15 với TypeScript, Tailwind CSS v4 và các công nghệ hiện đại khác.

## ✨ Tính năng chính

### 🏠 Trang chủ
- Hero section với hiệu ứng 3D và animation particles
- Bộ lọc danh mục xe động (Sedan, SUV, Hatchback, Coupe, Convertible, Wagon, Pickup, Van, Supercar)
- Hiển thị xe nổi bật với Car3DViewer Mercedes-AMG
- Tìm kiếm thông minh với gợi ý
- Tin tức mới nhất với layout responsive
- Features section giới thiệu tính năng nổi bật
- CTA section kêu gọi hành động

### 🚙 Trang xe hơi
- Danh sách xe với bộ lọc nâng cao (hãng xe, loại xe, khoảng giá)
- Phân trang thông minh
- Tìm kiếm theo tên xe và hãng xe
- Hiển thị thông tin chi tiết: giá, đánh giá, thông số kỹ thuật

### 📄 Chi tiết xe
- Thông tin đầy đủ với tabs (Tổng quan, Thông số, Đánh giá)
- Viewer 3D Mercedes-AMG C-Class tương tác với hiệu ứng ánh sáng
- Hệ thống đánh giá và bình luận
- Thông số kỹ thuật chi tiết
- Nút yêu thích và chia sẻ

### 👤 Hệ thống tài khoản
- Đăng nhập với validation và social login (Facebook, Twitter)
- Form đăng ký với validation
- Ghi nhớ đăng nhập
- Quên mật khẩu
- UI/UX hiện đại với gradient và animation

### 📰 Tin tức & Blog
- Danh sách bài viết tin tức với mock data
- Bộ lọc theo danh mục
- Tìm kiếm bài viết
- Hiển thị thông tin tác giả, lượt xem, like
- SEO optimization

### ⚙️ Admin Dashboard
- Dashboard với thống kê tổng quan
- Quản lý xe hơi (CRUD) với status tracking
- Quản lý người dùng với role-based access
- Phân tích dữ liệu
- Cài đặt hệ thống

### 🎨 Components chính

#### UI Components
- `CarCard` - Card hiển thị thông tin xe với 3 variants (default, compact, featured)
- `SearchBar` - Thanh tìm kiếm với gợi ý
- `Button` - Button component với nhiều variants và states
- `TextField` - Input field với validation
- `LoadingSpinner` - Loading states với fullscreen option
- `Modal` - Modal dialog
- `Toast` - Thông báo

#### Layout Components
- `Header` - Navigation header với mobile menu, search, social links
- `Footer` - Site footer với links và social media
- `Car3DViewer` - 3D car viewer với Three.js

#### Page Components
- `HomePage` - Trang chủ với hero section và sections
- `CarDetail` - Chi tiết xe với tabs và 3D viewer
- `AdminDashboard` - Admin panel với multiple tabs

## 🛠️ Công nghệ sử dụng

### Frontend
- **Next.js 15.3.3** - React framework với App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **Three.js 0.177.0** - 3D graphics library
- **@react-three/fiber 9.1.2** - React renderer for Three.js
- **@react-three/drei 10.3.0** - Useful helpers for React Three Fiber

### Development Tools
- **ESLint 9** - Code linting
- **PostCSS 8.5.5** - CSS processing
- **Turbopack** - Fast bundler (dev mode)

### Fonts & Icons
- **Geist Sans** - Primary font
- **Geist Mono** - Monospace font
- **Custom SVG Icons** - Icon system với 20+ icons

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 18+ 
- Yarn

### Bước 1: Clone dự án
```bash
git clone <repository-url>
cd car-nextjs
```

### Bước 2: Cài đặt dependencies
```bash
yarn install
```

### Bước 3: Chạy dự án
```bash
yarn dev
```

### Bước 4: Mở trình duyệt
Truy cập [http://localhost:3000](http://localhost:3000)

## 📁 Cấu trúc thư mục

```
car-nextjs/
├── public/                 # Static files
│   ├── icons/             # SVG icons (20+ icons)
│   └── images/            # Images (hero-bg.png, car.png, etc.)
├── src/
│   ├── app/               # App router
│   │   ├── components/    # Reusable components
│   │   │   ├── Car3DViewer.tsx    # 3D car viewer
│   │   │   ├── CarCard.tsx        # Car display cards
│   │   │   ├── header.tsx         # Navigation header
│   │   │   ├── footer.tsx         # Site footer
│   │   │   └── ...                # Other UI components
│   │   ├── mock/          # Mock data
│   │   │   ├── cars.mock.ts       # Car data (10+ cars)
│   │   │   ├── news.mock.ts       # News articles
│   │   │   └── users.mock.ts      # User data
│   │   ├── public/        # Public assets
│   │   │   ├── icons/     # SVG icon components
│   │   │   └── images/    # Image assets
│   │   ├── views/         # Page components
│   │   │   ├── homePage/  # Home page component
│   │   │   └── product/   # Product detail component
│   │   ├── auth/          # Authentication pages
│   │   ├── cars/          # Car listing & detail pages
│   │   ├── news/          # News pages
│   │   ├── admin/         # Admin dashboard
│   │   ├── globals.css    # Global styles & animations
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   └── constants/         # Constants & types
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Tính năng nổi bật

### 3D Car Viewer (Mercedes-AMG C-Class)
- Mô hình xe 3D tương tác với Three.js
- Hiệu ứng ánh sáng và shadow
- Bánh xe quay động
- Particles animation
- Camera controls (OrbitControls)
- Auto-rotation
- Loading overlay
- Responsive design

### Search & Filter System
- Tìm kiếm thông minh với gợi ý
- Bộ lọc theo nhiều tiêu chí (hãng, loại, giá)
- Real-time filtering
- Pagination
- Reset filters functionality

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions
- Performance optimized
- Breakpoints: Mobile (<768px), Tablet (768px-1024px), Desktop (>1024px)

### Animation & Effects
- Custom CSS animations (bounce-slow, float, pulse-glow, etc.)
- Smooth transitions
- Hover effects
- Loading states
- Micro-interactions
- Gradient backgrounds
- Glass morphism effects

### Mock Data System
- Comprehensive car data (10+ cars with full specs)
- News articles with SEO data
- User management data
- Realistic pricing and specifications

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#64748b)
- **Accent**: Light Gray (#f1f5f9)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)
- **Gradients**: Blue to Indigo gradients

### Typography
- **Heading**: Geist Sans, sans-serif
- **Body**: Geist Sans, sans-serif
- **Monospace**: Geist Mono

### Spacing & Layout
- **Container**: max-w-7xl mx-auto
- **Padding**: px-4 (mobile), responsive
- **Gap**: gap-4, gap-6, gap-8
- **Border Radius**: rounded-2xl, rounded-3xl

### Components
- **Cards**: White background, shadow-lg, hover effects
- **Buttons**: Multiple variants (primary, secondary, accent)
- **Forms**: Rounded inputs, focus states
- **Navigation**: Sticky header, mobile menu

## 🔧 Cấu hình

### Next.js Config
```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Config options
};

export default nextConfig;
```

### TypeScript Config
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind CSS v4
```css
@import "tailwindcss";

:root {
  --primary: #3b82f6;
  --secondary: #64748b;
  /* Custom CSS variables */
}

/* Custom animations */
@keyframes bounce-slow { /* ... */ }
@keyframes float { /* ... */ }
@keyframes pulse-glow { /* ... */ }
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
```bash
yarn build
vercel --prod
```

### Netlify
```bash
yarn build
netlify deploy --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

## 📊 Performance Features

- **Turbopack** for fast development
- **Image optimization** with Next.js Image component
- **Code splitting** with dynamic imports
- **Lazy loading** for 3D components
- **Optimized animations** with CSS transforms
- **Responsive images** with proper sizing

## 🔒 Security Features

- **TypeScript** for type safety
- **Input validation** on forms
- **XSS protection** with proper escaping
- **CSRF protection** (when backend is added)
- **Secure headers** (when deployed)

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📞 Liên hệ

- **Email**: nguyenhoaiphongdev@gmail.com
- **Email**: nhp2901@gmail.com
- **Website**: https://car-nextjs.com
- **GitHub**: https://github.com/nhp291/car-nextjs

## 🙏 Cảm ơn

Cảm ơn bạn đã sử dụng Car Next.js! Nếu dự án này hữu ích, hãy cho tôi một ⭐ trên GitHub.

---

**Made with ❤️ by Car Next.js Team**
