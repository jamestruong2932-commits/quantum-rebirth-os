\*"Tôi muốn tạo một thanh điều hướng cố định (Sticky Navbar) trên cùng để tối ưu chuyển đổi, nhưng BẮT BUỘC phải tuân thủ nghiêm ngặt phong cách 'Quiet Luxury'.

Hãy làm theo các bước sau: **1\. Tạo Component mới `src/components/PhantomNavbar.jsx` với đặc tả sau:**

* Sử dụng `framer-motion` để theo dõi thao tác cuộn (`useScroll`).  
* **Quy tắc tàng hình:** Thanh này ban đầu bị ẩn (opacity 0, y: \-100%). Nó CHỈ xuất hiện (từ từ trượt xuống mượt mà) khi người dùng đã cuộn xuống qua khoảng 600px (qua khỏi Hero Section).  
* **Thiết kế UI (Glassmorphism):** Nền không màu đặc. Hãy dùng nền Midnight Navy cực kỳ trong suốt kết hợp làm mờ kính: `bg-slate-950/60 backdrop-blur-md border-b border-white/5`. Chiều cao thanh phải nhỏ gọn (ví dụ `h-16`).  
* **Bố cục (Flex justify-between):**  
  * Cạnh trái: Chữ 'Quantum Rebirth OS' nhỏ, tinh tế, phông Serif (`font-serif text-slate-300`).  
  * Ở giữa (Thì thầm Early Bird): Dòng chữ nhỏ `text-sm tracking-widest uppercase` với nội dung: 'Đặc quyền Early Bird — Tiết kiệm 65%'. Dùng màu Vàng Đồng (`text-amber-500/80`) để tạo sự khan hiếm tĩnh lặng.  
  * Cạnh phải: Một nút CTA nhỏ gọn 'TÁI SINH NGAY', nền màu Quantum Teal, chữ đen, có hiệu ứng glow nhẹ khi hover.

**2\. Tích hợp:** Hãy import `PhantomNavbar` vào file `App.jsx` và đặt nó ở vị trí cao nhất (ngoài cùng) để nó trượt trên mọi section khác."\*

**1\. LOGIC TÀNG HÌNH (Vị trí cuộn \- Scroll Position):**

* KHÔNG dùng logic cuộn lên/cuộn xuống. Hãy dùng `useScroll` của framer-motion để bắt tọa độ `scrollY`.  
* **Khi `scrollY < 600` (Người dùng đang ở Hero Section):** Navbar BẮT BUỘC phải tàng hình hoàn toàn (`y: "-100%", opacity: 0`).  
* **Khi `scrollY >= 600`:** Navbar mới từ từ trượt xuống (`y: 0, opacity: 1`) và LUÔN LUÔN CỐ ĐỊNH hiển thị ở trên cùng, bất kể người dùng cuộn lên hay cuộn xuống, miễn là tọa độ vẫn \> 600\.

**2\. GIAO DIỆN & NỘI DUNG:**

* XÓA BỎ các thẻ Navigation Link (Cơ chế, Chương trình, v.v.).  
* Khung: `fixed top-0 left-0 w-full z-50 bg-slate-950/60 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-8`.  
* Bên trái: Chữ 'Quantum Rebirth OS' (`font-serif italic text-slate-300`).  
* CỞ GIỮA: Một dòng chữ duy nhất 'ĐẶC QUYỀN EARLY BIRD — TIẾT KIỆM 65%' (`text-sm tracking-widest text-amber-500 uppercase font-medium`). KHÔNG CÓ LINK GÌ CẢ.  
* Bên phải: Nút CTA nhỏ 'TÁI SINH NGAY' (`bg-teal-400 text-slate-950 px-6 py-2 rounded-full text-sm font-bold tracking-wide hover:shadow-[0_0_15px_rgba(45,212,191,0.4)] transition-all`). Khi bấm vào nút này, nó sẽ tự động cuộn (scroll) mượt mà đến khu vực bảng giá (ID `#pricing`).

Dừng ngay việc sáng tạo ngoài luồng và thi công chính xác yêu cầu này."\*

