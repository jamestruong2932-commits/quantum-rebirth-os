**"YÊU CẦU SỬA LỖI FORM KHÔNG GỬI ĐƯỢC DỮ LIỆU VỀ FORMSPREE:**

1. **Kiểm tra thuộc tính `name`: Đảm bảo tất cả các thẻ `<input>` trong `Checkout.jsx` đều có thuộc tính `name` tương ứng (ví dụ: `name="full_name"`, `name="email"`, `name="phone"`). Không có `name`, Formspree sẽ bỏ qua dữ liệu.**  
2. **Sửa logic `handleSubmit`:**  
   * **Phải sử dụng `async/await` để đảm bảo lệnh `fetch` gửi dữ liệu đi thành công TRƯỚC KHI thực hiện `setShowQR(true)` hoặc chuyển trang.**  
   * **Thêm `console.log` để kiểm tra phản hồi từ Formspree. Nếu lỗi, phải báo cho người dùng biết thay vì cho qua.**

**Cấu trúc gửi phải là:**  
**JavaScript**  
**const response \= await fetch("LINK\_FORMSPREE\_CUA\_BAN", {**  
  **method: "POST",**  
  **body: formData, // Đảm bảo formData đã được chuyển đổi đúng định dạng**  
  **headers: { 'Accept': 'application/json' }**  
**});**  
**if (response.ok) { // Chỉ khi thành công mới đi tiếp**  
  **setShowQR(true);**  
**}**

*   
3. **Validation: Đảm bảo nút 'XÁC NHẬN' sẽ hiện trạng thái 'ĐANG GỬI...' để khách không nhấn liên tục.**

**Hãy viết lại đoạn code xử lý Form này thật chắc chắn và báo cho tôi khi hoàn thành."**

