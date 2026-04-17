\*"Tôi cần đấu nối Form thanh toán để nhận được dữ liệu khách hàng. Hãy cập nhật Component `Checkout.jsx` như sau:

1. **Gửi dữ liệu về Formspree:**  
   * Khi khách nhấn 'XÁC NHẬN ĐƠN HÀNG', hãy sử dụng lệnh `fetch` để gửi `formData` (Tên, Email, SĐT) tới URL: **https://formspree.io/f/xojydjdy**  
   * Đảm bảo việc gửi dữ liệu diễn ra **TRƯỚC** khi hiển thị mã QR.  
2. **Xử lý trạng thái (UX):**  
   * Trong lúc đang gửi (loading), hãy đổi chữ trên nút thành 'ĐANG XỬ LÝ...'.  
   * Sau khi gửi thành công, mới chuyển sang bước hiện mã QR (`setShowQR(true)`).  
3. **Lưu trữ cục bộ (Local Storage):**  
   * Lưu Email và SĐT của khách vào `localStorage` để sau này trang 'Thank You' hoặc trang 'Học' có thể nhận diện được họ ngay lập tức mà không cần bắt họ nhập lại.

Hãy viết code xử lý hàm `handleSubmit` thật gọn và chính xác."\*

