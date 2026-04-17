**"YÊU CẦU SỬA LỖI TRÀN CHỮ TRÊN NÚT CTA (PRICING SECTION) NGAY LẬP TỨC:**

**1\. Tại Component `PricingAndOffer.jsx` (hoặc nơi chứa các nút lớn):**

* **Nút 'TÔI CHỌN TÁI SINH...':**  
  * Trên mobile (dưới `md`): Giảm size chữ xuống `text-[11px]` hoặc `text-xs`.  
  * Thêm `leading-tight` và `tracking-tighter` để các chữ sít lại một chút một cách tinh tế.  
  * Thay vì `whitespace-nowrap`, hãy dùng `whitespace-normal` để chữ có thể tự động ngắt dòng nếu cần, hoặc đảm bảo `px-2` để chữ không chạm viền.  
  * Đảm bảo nút có `w-full` (chiếm hết chiều ngang thẻ cha) nhưng không vượt quá màn hình.

**2\. Nút Teal 'TÔI GIA NHẬP COHORT SÁNG LẬP':**

* Tương tự, giảm size chữ mobile xuống `text-[11px]` hoặc `text-xs`.  
* Đảm bảo `padding` ngang (`px-4`) đủ để chữ nằm gọn bên trong khối màu Teal.

**3\. Nguyên tắc chung:** Tuyệt đối không để bất kỳ đoạn text nào của nút bấm thò ra ngoài viền của card hay viền của chính nó. Hãy dùng `flex items-center justify-center text-center` cho nội dung bên trong nút."

