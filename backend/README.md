# Car Backend API

Backend API cho ứng dụng Car NextJS với đầy đủ CRUD operations.

## Cài đặt

```bash
npm install
```

## Cấu hình

Tạo file `.env` với các biến môi trường:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car_nextjs
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Chạy ứng dụng

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Đăng ký user
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin profile (Protected)
- `PUT /api/auth/profile` - Cập nhật profile (Protected)

### Cars

- `GET /api/cars` - Lấy danh sách xe (có pagination, search, filter)
- `GET /api/cars/:id` - Lấy thông tin xe theo ID
- `POST /api/cars` - Tạo xe mới (Protected)
- `PUT /api/cars/:id` - Cập nhật xe (Protected)
- `DELETE /api/cars/:id` - Xóa xe (Protected)
- `GET /api/cars/brand/:brand` - Lấy xe theo hãng
- `GET /api/cars/stats` - Thống kê xe

## Query Parameters cho Cars

- `page` - Trang hiện tại (default: 1)
- `limit` - Số item mỗi trang (default: 10)
- `search` - Tìm kiếm theo tên, hãng, model
- `brand` - Lọc theo hãng
- `fuelType` - Lọc theo loại nhiên liệu
- `minPrice` - Giá tối thiểu
- `maxPrice` - Giá tối đa

## Authentication

Sử dụng Bearer Token trong header:
```
Authorization: Bearer <token>
```

## Database Schema

### Car Model
- name, brand, model, year
- price, mileage, fuelType, transmission
- engineSize, power, color, description
- images[], features[], isAvailable

### User Model
- username, email, password
- role (user/admin), isActive
- createdAt, updatedAt

## Error Handling

API trả về error với format:
```json
{
  "message": "Error description"
}
```

## Status Codes

- 200 - Success
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 404 - Not Found
- 500 - Server Error 