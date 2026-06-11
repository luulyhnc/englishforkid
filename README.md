# English Web

Website thi thử tiếng Anh trắc nghiệm cho bé theo nhiều độ tuổi.

## Cách mở

Mở file `index.html` bằng trình duyệt. Website chạy trực tiếp, không cần cài thêm phần mềm.

## Nội dung hiện có

- Chọn bài thi theo nhóm tuổi: 5-7, 8-10, 11-13.
- Khách được nộp thử 1 lần.
- Tài khoản đăng ký bằng Supabase Auth được nộp 8 lần.
- Admin được nộp không giới hạn.
- Mỗi lần bấm `Nộp bài` sẽ chấm điểm và chạy link affiliate nếu đã cấu hình.
- Giao diện tương thích điện thoại và máy tính.

## Tài khoản admin demo

```txt
Email: lethuhien211094@gmail.com
Mật khẩu: 123456
```

Lưu ý: đăng ký/đăng nhập dùng Supabase Auth giống project Nhà trọ. Lượt nộp của tài khoản được lưu trong user metadata trên Supabase; khách vẫn lưu lượt thử trên trình duyệt.

## Cách thêm câu hỏi

Mở `script.js`, tìm phần `const quizzes = { ... }`, sau đó thêm câu hỏi vào nhóm tuổi mong muốn theo mẫu:

```js
{ text: "Question here", options: ["A", "B", "C", "D"], answer: "A" }
```

## Cách gắn link affiliate

Mở `script.js`, tìm dòng:

```js
const AFFILIATE_LINK = "";
```

Dán link affiliate vào giữa hai dấu nháy kép. Ví dụ:

```js
const AFFILIATE_LINK = "https://example.com/affiliate-link";
```

Sau đó, mỗi lần bấm nút `Nộp bài`, website sẽ chấm điểm và mở/chạy link affiliate một lần.

## Đưa lên GitHub Pages

1. Tạo repository public trên GitHub, ví dụ `english-web`.
2. Đẩy thư mục này lên repository đó.
3. Vào `Settings` > `Pages`.
4. Chọn `Deploy from a branch`.
5. Chọn branch `main` và folder `/root`, sau đó bấm `Save`.
6. Chờ GitHub tạo link public dạng `https://ten-tai-khoan.github.io/english-web/`.
## Quản lý giao diện admin

Admin đăng nhập bằng email `lethuhien211094@gmail.com`, vào mục `Tài khoản`, phần `Quản lý giao diện` để sửa tiêu đề trang mở đầu, mô tả, link video giới thiệu và các chỉ số nổi bật. Nội dung sẽ đổi trực tiếp trên trang.

Để lưu thay đổi online cho mọi người cùng thấy, mở Supabase SQL Editor và chạy file:

```txt
supabase/english_web_site_settings.sql
```

Video hỗ trợ link YouTube, YouTube embed, Vimeo embed hoặc file `.mp4`.
