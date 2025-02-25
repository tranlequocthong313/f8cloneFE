# F8 Clone FE - Frontend (ReactJS)

**F8 Clone FE** là phần frontend của một nền tảng E-learning, được phát triển bằng ReactJS, mô phỏng lại các tính năng chính của [Fullstack.edu.vn](https://fullstack.edu.vn/). Dự án này cung cấp giao diện người dùng trực quan để học lập trình, xem khóa học, và tương tác với các bài học.

## Tính năng chính

- **Trang chủ**: Hiển thị các khóa học nổi bật, danh mục khóa học, và thông tin giới thiệu.
- **Khóa học**: Xem danh sách khóa học, chi tiết khóa học, và các bài học trong khóa học.
- **Bài học**: Xem nội dung bài học, bao gồm video, tài liệu, và bài tập.
- **Tài khoản**: Đăng ký, đăng nhập, và quản lý thông tin cá nhân.
- **Tìm kiếm**: Tìm kiếm khóa học và bài học theo từ khóa.
- **Phân quyền**: Phân quyền người dùng (học viên, giảng viên, admin).

## Công nghệ sử dụng

- **Frontend**: ReactJS, React Router, Redux (hoặc Context API)
- **Styling**: CSS, SCSS, hoặc CSS-in-JS (Styled Components, Emotion)
- **API**: Kết nối với backend thông qua RESTful API hoặc GraphQL
- **State Management**: Redux Toolkit (nếu sử dụng Redux)
- **UI Library**: Material-UI, Ant Design, hoặc Bootstrap (tùy chọn)
- **Build Tool**: Webpack (được cấu hình sẵn bởi Create React App)

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js (phiên bản 14.x trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. **Clone dự án**:
   ```bash
   git clone https://github.com/tranlequocthong313/f8cloneFE.git
   cd f8cloneFE
   ```

2. **Cài đặt các dependencies**:
   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. **Chạy dự án**:
   ```bash
   npm start
   # hoặc
   yarn start
   ```

4. **Truy cập ứng dụng**:
   - Mở trình duyệt và truy cập vào địa chỉ: `http://localhost:3000`

### Cấu hình môi trường

Tạo file `.env` trong thư mục gốc của dự án và thêm các biến môi trường cần thiết (nếu có):

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

## Cấu trúc thư mục

```
f8cloneFE/
├── public/                  # Thư mục chứa các file tĩnh (index.html, favicon, v.v.)
├── src/                     # Source code chính
│   ├── assets/              # Hình ảnh, font, và các file tĩnh khác
│   ├── components/          # Các component ReactJS
│   ├── pages/               # Các trang chính của ứng dụng
│   ├── services/            # Các service để gọi API
│   ├── store/               # Redux store (nếu sử dụng Redux)
│   ├── styles/              # File CSS/SCSS hoặc CSS-in-JS
│   ├── utils/               # Các hàm tiện ích
│   ├── App.js               # Component chính
│   ├── index.js             # File entry point
│   └── routes.js            # Cấu hình React Router
├── .env                     # File cấu hình môi trường
├── package.json             # Danh sách dependencies và scripts
└── README.md                # Tài liệu hướng dẫn
```

## Các trang chính

- **Trang chủ**: Hiển thị các khóa học nổi bật, danh mục khóa học, và thông tin giới thiệu.
- **Trang khóa học**: Hiển thị danh sách khóa học và chi tiết từng khóa học.
- **Trang bài học**: Hiển thị nội dung bài học, bao gồm video, tài liệu, và bài tập.
- **Trang tài khoản**: Quản lý thông tin cá nhân, lịch sử học tập, và cài đặt tài khoản.
- **Trang tìm kiếm**: Tìm kiếm khóa học và bài học theo từ khóa.

## Kết nối với Backend

Frontend kết nối với backend thông qua các API endpoints sau (ví dụ):

- **Khóa học**:
  - `GET /api/courses` - Lấy danh sách khóa học.
  - `GET /api/courses/{id}` - Lấy thông tin chi tiết của một khóa học.
- **Bài học**:
  - `GET /api/lessons` - Lấy danh sách bài học.
  - `GET /api/lessons/{id}` - Lấy thông tin chi tiết của một bài học.
- **Tài khoản**:
  - `POST /api/auth/register` - Đăng ký tài khoản mới.
  - `POST /api/auth/login` - Đăng nhập và nhận JWT token.
  - `GET /api/users/{id}` - Lấy thông tin người dùng.

## Đóng góp

Nếu bạn muốn đóng góp vào dự án, vui lòng làm theo các bước sau:

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/YourFeatureName`)
3. Commit các thay đổi (`git commit -m 'Add some feature'`)
4. Push lên branch (`git push origin feature/YourFeatureName`)
5. Mở một Pull Request

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ:

- **Tên**: Trần Lê Quốc Thông
- **Email**: tranlequocthong313@gmail.com
- **GitHub**: [tranlequocthong313](https://github.com/tranlequocthong313)
