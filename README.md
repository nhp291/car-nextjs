# 🚗 Car Next.js - Nền tảng tra cứu & trải nghiệm xe hiện đại

Dự án website về xe hơi được xây dựng bằng Next.js 14 với TypeScript, Tailwind CSS và các công nghệ hiện đại khác.

## ✨ Tính năng chính

### 🏠 Trang chủ
- Hero section với hiệu ứng 3D và animation
- Bộ lọc danh mục xe động
- Hiển thị xe nổi bật với Car3DViewer
- Tìm kiếm thông minh với gợi ý
- Responsive design cho mọi thiết bị

### 🚙 Trang xe hơi
- Danh sách xe với bộ lọc nâng cao
- Chi tiết xe với thông số kỹ thuật đầy đủ
- Viewer 3D tương tác với hiệu ứng ánh sáng
- So sánh xe (tối đa 3 xe)
- Yêu thích và đánh giá

### 👤 Hệ thống tài khoản
- Đăng ký/Đăng nhập với validation
- Quản lý thông tin cá nhân
- Lịch sử tìm kiếm và yêu thích
- Bảo mật với JWT

### 📰 Tin tức & Blog
- Danh sách bài viết tin tức
- Bộ lọc theo danh mục
- Tìm kiếm bài viết
- Like và chia sẻ

### 📞 Liên hệ
- Form liên hệ với validation
- Thông tin công ty
- FAQ
- Mạng xã hội

### ⚙️ Admin Dashboard
- Quản lý xe hơi (CRUD)
- Quản lý người dùng
- Phân tích thống kê
- Cài đặt hệ thống

## 🛠️ Công nghệ sử dụng

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animation
- **Three.js** - 3D graphics
- **React Hook Form** - Form handling
- **Zod** - Validation

### Backend (Mock Data)
- **JSON Server** - Mock API
- **Local Storage** - Client-side storage
- **Session Storage** - Temporary data

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Bước 1: Clone dự án
```bash
git clone <repository-url>
cd car-nextjs
```

### Bước 2: Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### Bước 3: Chạy dự án
```bash
npm run dev
# hoặc
yarn dev
```

### Bước 4: Mở trình duyệt
Truy cập [http://localhost:3000](http://localhost:3000)

## 📁 Cấu trúc thư mục

```
car-nextjs/
├── public/                 # Static files
│   ├── icons/             # SVG icons
│   └── images/            # Images
├── src/
│   ├── app/               # App router
│   │   ├── components/    # Reusable components
│   │   ├── mock/          # Mock data
│   │   ├── public/        # Public components
│   │   ├── utils/         # Utility functions
│   │   └── views/         # Page components
│   └── constants/         # Constants & types
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Components chính

### UI Components
- `CarCard` - Card hiển thị thông tin xe
- `SearchBar` - Thanh tìm kiếm với gợi ý
- `Modal` - Modal dialog
- `Toast` - Thông báo
- `LoadingSpinner` - Loading states

### Layout Components
- `Header` - Navigation header
- `Footer` - Site footer
- `Car3DViewer` - 3D car viewer

### Page Components
- `HomePage` - Trang chủ
- `CarDetail` - Chi tiết xe
- `AdminDashboard` - Admin panel

## 🎯 Tính năng nổi bật

### 3D Car Viewer
- Mô hình xe 3D tương tác
- Hiệu ứng ánh sáng và shadow
- Bánh xe quay động
- Nền và particles
- Camera controls

### Search & Filter
- Tìm kiếm thông minh với gợi ý
- Bộ lọc theo nhiều tiêu chí
- Lịch sử tìm kiếm
- Auto-complete

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions
- Performance optimized

### Animation & Effects
- Smooth transitions
- Hover effects
- Loading states
- Micro-interactions

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Tailwind CSS
Cấu hình trong `tailwind.config.js`:
```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
      },
      animation: {
        'bounce-slow': 'bounce-slow 2.5s infinite',
        'float': 'float 6s ease-in-out infinite',
      }
    }
  },
  plugins: []
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Heading**: Inter, sans-serif
- **Body**: Inter, sans-serif
- **Monospace**: JetBrains Mono

### Spacing
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ

- **Email**: contact@carnextjs.com
- **Website**: https://carnextjs.com
- **GitHub**: https://github.com/yourusername/car-nextjs

## 🙏 Cảm ơn

Cảm ơn bạn đã sử dụng Car Next.js! Nếu dự án này hữu ích, hãy cho chúng tôi một ⭐ trên GitHub.

---

**Made with ❤️ by Car Next.js Team**
