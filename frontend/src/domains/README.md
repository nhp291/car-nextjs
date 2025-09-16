# Domains

Mỗi domain là một folder riêng, chứa các module liên quan: components, services, types, hooks, views...
Ví dụ: cars/, auth/, admin/, news/

- components/: Component UI riêng cho domain
- services/: Gọi API, xử lý dữ liệu domain
- types/: Định nghĩa type cho domain
- hooks/: Custom hook cho domain
- views/: Page, màn hình chính của domain

Giúp tách biệt logic, dễ mở rộng và bảo trì.
