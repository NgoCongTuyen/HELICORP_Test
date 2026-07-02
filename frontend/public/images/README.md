# Thư mục hình ảnh

Thư mục này chứa ảnh mặc định cho Gallery. 

## Cách sử dụng

### Tùy chọn 1: Sử dụng ảnh local
Đặt ảnh vào thư mục này với tên:
- `iphone-design.jpg` - Thiết kế Titanium
- `iphone-camera.jpg` - Camera Fusion 48MP
- `iphone-display.jpg` - Màn hình Super Retina

### Tùy chọn 2: Upload ảnh qua giao diện
1. Chạy `npm run dev` từ thư mục gốc
2. Mở trang web
3. Cuộn tới Gallery section
4. Nhấp nút "📤 Thêm ảnh"
5. Chọn ảnh từ máy tính
6. Ảnh sẽ được lưu vào backend SQLite và hiển thị

## Tệp được lưu
- Ảnh được upload sẽ lưu vào: `backend/uploads/`
- Metadata ảnh sẽ lưu vào SQLite: `backend/data.sqlite`

## Fallback
Nếu ảnh local không tìm thấy, hệ thống sẽ sử dụng ảnh từ Unsplash CDN.
