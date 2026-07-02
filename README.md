# SmartVision Pro - React Landing Page

Dự án được tách thành hai phần:

- `frontend/`: ứng dụng React + Vite
- `backend/`: server Express với SQLite để lưu dữ liệu đăng ký, analytics và ảnh upload

## Cấu trúc

- `frontend/src/`: mã nguồn React
- `frontend/index.html`, `frontend/vite.config.js`: cấu hình frontend
- `backend/index.js`: API server Express + SQLite
- `backend/uploads/`: thư mục lưu ảnh upload
- `backend/package.json`: phụ thuộc backend

## Tính năng
- Hero section, feature section, thông số kỹ thuật, form đăng ký nhận tin
- Dark mode
- Chat widget hỗ trợ trả lời nhanh
- Frontend/backend phân tách rõ ràng
- SEO meta tags cơ bản
- Analytics gửi event tới backend
- Lưu dữ liệu bằng SQLite
- Hỗ trợ upload và lưu ảnh vào backend

## Chạy dự án
1. `npm install`
2. Từ thư mục gốc chạy `npm run dev` để khởi động cả frontend và backend cùng lúc
3. Frontend mở tại `http://localhost:4173` hoặc `http://localhost:4174` nếu cổng 4173 đang bận
4. Backend chạy ở `http://localhost:4000`

## Chạy riêng từng phần (tùy chọn)
- Frontend riêng: `npm run dev:frontend`
- Backend riêng: `npm run dev:backend`
- Build frontend: `npm run build`
- Chạy backend riêng: `npm run start`

## API chính
- `POST /api/newsletter`
- `POST /api/analytics`
- `POST /api/ai-response`
- `POST /api/upload-image`
- `GET /api/images`
- `GET /api/health`

## Cấu hình chatbot AI
Chatbot hiện chỉ dùng dữ liệu trả lời nội bộ và không yêu cầu cấu hình API bên ngoài.

Nếu bạn muốn thay đổi hành vi trả lời, chỉnh `backend/index.js` trong hàm `getAIResponse`.

> Không cần tạo `backend/.env` cho chatbot nếu bạn chỉ dùng tính năng mặc định.
