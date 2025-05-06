# Trang Web Spotify Clone

## Giới thiệu

Dự án "Spotify Clone" là một ứng dụng web được phát triển với mục tiêu mô phỏng lại các chức năng của nền tảng nghe nhạc trực tuyến Spotify. Ứng dụng này cho phép người dùng phát nhạc trực tuyến, tạo và quản lý danh sách phát cá nhân, đồng thời khám phá các nghệ sĩ, bài hát và album theo sở thích. Mục tiêu chính của dự án là xây dựng một hệ thống phát nhạc trực tuyến hiện đại, dễ sử dụng, có giao diện trực quan và khả năng phản hồi nhanh trên nhiều thiết bị. Về mặt công nghệ, dự án sử dụng React để xây dựng giao diện người dùng linh hoạt và thân thiện và Django đảm nhận vai trò xử lý dữ liệu và cung cấp API cho phía máy chủ.

## Công nghệ sử dụng

### Frontend

- **React**: Thư viện JavaScript để xây dựng giao diện người dùng
- **Vite**: Công cụ build và dev server
- **React Router**: Điều hướng giữa các trang
- **Axios**: Gửi yêu cầu HTTP đến backend
- **tailwindcss**: Stylesheet cho styling

### Backend

- **Django**: Web framework Python
- **Django REST Framework**: Hỗ trợ xây dựng RESTful API
- **MySQL**: Cơ sở dữ liệu quan hệ

## Cài đặt

### Yêu cầu hệ thống

- Python 3.8+
- Node.js 20.16.0
- npm 6.0+ hoặc yarn 1.22+
- MySQL

### Các bước thực hiện

1. Clone repository:

```bash
git clone https://github.com/angsongji/Spotify.git
cd frontend
npm install
npm run dev
```

2. Tạo và kích hoạt môi trường ảo:

```bash
python -m venv venv
source venv/bin/activate
```

3. Cài đặt thư viện python:

```bash
pip install -r requirements.txt
```

4. Thiết lập cơ sở dữ liệu:

```bash
cd backend
python manage.py migrate
```

5. Khởi chạy Server Django:

```bash
python manage.py runserver
```

## Tính năng

### Tính năng người dùng

- **Đăng ký và đăng nhập**: Hệ thống xác thực người dùng
- **Tìm kiếm âm nhạc**: Tìm kiếm bài hát, album và nghệ sĩ
- **Nghe nhạc**: Phát và tạm dừng bài hát, điều chỉnh âm lượng, chế độ lặp lại, chế độ phát ngẫu nhiên
- **Tạo playlist**: Tạo và quản lý danh sách phát cá nhân
- **Lưu bài hát yêu thích**: Đánh dấu và lưu bài hát ưa thích
- **Khám phá nghệ sĩ**: Xem thông tin chi tiết về nghệ sĩ và album


### Tính năng quản trị

- **Quản lý nội dung**: Thêm, sửa, xóa bài hát, album và nghệ sĩ
- **Quản lý người dùng**: Xem và quản lý tài khoản người dùng
- **Phân tích dữ liệu**: Xem thống kê về lượt phát và hoạt động người dùng