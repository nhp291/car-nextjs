# Presentation Layer

Thư mục này chứa các controller, route, middleware, validator cho từng domain.
- controllers/: Xử lý request/response, gọi service
- routes/: Định nghĩa các route, gắn middleware
- middlewares/: Các middleware (auth, error, validation, ...)
- validators/: Định nghĩa Zod schema cho input

Controller KHÔNG xử lý logic nghiệp vụ, chỉ nhận request, validate, gọi service và trả response.
