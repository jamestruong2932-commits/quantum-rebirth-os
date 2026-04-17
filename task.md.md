**"Hãy cập nhật hoàn chỉnh Component `Checkout.jsx` để vận hành thanh toán thực tế với thông tin sau. CẤM SÁNG TẠO NGOÀI LUỒNG, GIỮ ĐÚNG STYLE QUIET LUXURY.**

**1\. Thông tin định danh của tôi:**

* Ngân hàng: **Techcombank**  
* Mã Ngân hàng (BIN): **TCB**  
* Số tài khoản: **2903888888**  
* Tên chủ tài khoản: **TRUONG CHIEN PHUOC**  
* Số tiền: **1.790.000**

**2\. Logic vận hành (State Management):**

* Tạo một `state` để quản lý việc hiển thị: `showQR` (mặc định là false).  
* Khi khách điền đầy đủ Họ tên, Email, SĐT và nhấn 'XÁC NHẬN ĐƠN HÀNG', hãy đổi `showQR` thành true để hiện Modal/khối nội dung chứa mã QR.

**3\. Hiển thị QR Code (VietQR API):**

* Sử dụng thẻ `<img>` với `src` động: `https://img.vietqr.io/image/TCB-2903888888-compact2.png?amount=1790000&addInfo=QUANTUM%20${formData.phone}&accountName=TRUONG%20CHIEN%20PHUOC`  
* **Lưu ý:** Biến `${formData.phone}` phải được lấy từ dữ liệu khách vừa nhập để nội dung chuyển khoản tự động là 'QUANTUM \[Số điện thoại khách\]'.

**4\. Giao diện (UI/UX):**

* **Khu vực QR:** Nằm trong một khối kính mờ (Glassmorphism), có bo góc mịn. Hiển thị rõ số tiền và nội dung chuyển khoản bên dưới mã QR để khách đối chiếu.  
* **Nút hành động:** Thêm một nút 'TÔI ĐÃ CHUYỂN KHOẢN' màu Teal rực rỡ bên dưới mã QR. Khi nhấn nút này, hãy dùng `router.push('/thank-you')` hoặc hiển thị một thông báo xác nhận sang trọng.

**5\. Mobile-First:** Đảm bảo trên điện thoại (Pixel 7/iPhone), mã QR hiển thị to, rõ ràng ở giữa màn hình, không bị tràn viền.

Hãy thực thi ngay lập tức để tôi cập nhật lên Vercel."

