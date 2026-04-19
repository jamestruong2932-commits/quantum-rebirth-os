import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden:  { opacity: 0, filter: 'blur(8px)', y: 20 },
  visible: (d = 0) => ({
    opacity: 1, filter: 'blur(0px)', y: 0,
    transition: { duration: 1.2, ease: EASE, delay: d },
  }),
}

const glass = {
  background:           'rgba(17,24,39,0.55)',
  backdropFilter:       'blur(24px) saturate(140%)',
  WebkitBackdropFilter: 'blur(24px) saturate(140%)',
  border:               '1px solid rgba(0,212,192,0.10)',
  borderRadius:         '12px',
  boxShadow:            '0 8px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(0,212,192,0.05)',
}

/* ══════════════════════════════════════════════════════════════
   FAQ DATA — 3 BARRIERS
══════════════════════════════════════════════════════════════ */

const BARRIERS = [
  {
    tier: 'TẦNG 1',
    label: 'Rào Cản Logic',
    sub: 'Nỗi sợ của không gian 3D',
    question: '"Nếu tôi ngừng Hustle và bước vào trạng thái không gồng mình — tôi sẽ lấy gì để ăn? Nhỡ tôi buông tay và mất đi tất cả những gì đang có?"',
    accent: '#00D4C0',
    intro: 'Đây là nỗi sợ mất kiểm soát được ngụy trang thành câu hỏi thực tế. Bạn đang đánh đồng trạng thái không gồng mình với sự lười biếng. Đây là nhầm lẫn nguy hiểm nhất mà người tham vọng thường mắc phải.',
    blocks: [
      {
        label: 'ĐỊNH NGHĨA LẠI ĐÒN BẨY',
        body: 'Trạng thái không gồng mình không phải là không làm gì. Đó là hành động với lực ma sát bằng KHÔNG — nơi Cortisol không còn lái. Thay vì gửi 100 email vô hồn bằng sự gượng ép và bị từ chối liên tục — bạn dành 20 phút đồng bộ Tim-Não, đưa hệ thần kinh về Alpha, và gửi đúng 1 email bằng trực giác sắc bén nhất. Để chốt deal. Không phải làm ít hơn để kết quả ít hơn. Làm ít hơn để kết quả nhiều hơn — vì mỗi hành động đều mang tần số của sự đủ đầy thay vì tần số của sự sợ hãi.',
      },
      {
        label: 'BẰNG CHỨNG VẬT LÝ',
        body: 'Lần chốt đơn hàng 17 triệu của tôi xảy ra khi tôi dừng lại. Không phải khi tôi gửi thêm tin nhắn. Không phải khi tôi theo dõi thêm. Khi tôi dừng lại — thực hiện kỹ thuật Đồng bộ Tim-Não, rút hệ thần kinh ra khỏi chế độ Sinh tồn — và gửi đúng một tin nhắn từ trạng thái đủ đầy tuyệt đối. Đó là lần đầu tiên tôi hiểu: không phải nội dung tin nhắn thay đổi. Người gửi tin nhắn thay đổi. Và người đó khi đó là nhân viên mới, lương chưa đủ trả tiền nhà.',
        closing: 'Nếu trạng thái không gồng mình có thể tạo ra đòn bẩy đó trong hoàn cảnh đó — câu hỏi duy nhất là: bạn sẵn sàng thử chưa?',
      },
    ],
  },
  {
    tier: 'TẦNG 2',
    label: 'Rào Cản Nhận Thức',
    sub: 'Sự hoài nghi & Sức ỳ tích lũy',
    question: '"Tôi đã từng đi học thiền, từng đọc The Secret, từng thử suy nghĩ tích cực rồi — nhưng cuộc sống vẫn không thay đổi. Hệ thống này có gì khác hay lại là bình mới rượu cũ?"',
    accent: '#D97706',
    intro: 'Đây là câu hỏi của người thông minh. Của người đã đủ dũng cảm để thử — và đủ tỉnh táo để nhận ra mình đã bị lừa. Và tôi sẽ không cố thuyết phục bạn bằng cảm xúc. Tôi sẽ cho bạn thấy lý do khoa học tại sao mọi thứ bạn đã thử đều thất bại.',
    blocks: [
      {
        label: 'CHẨN ĐOÁN LÂM SÀNG',
        body: 'Luật hấp dẫn bề mặt bắt bạn suy nghĩ tích cực — nhưng trong khi bạn đang ngồi hình dung về sự đủ đầy, máu của bạn đang ngập Cortisol. Hạch hạnh nhân của bạn đang hoảng loạn. Hệ thần kinh giao cảm đang ở chế độ chiến đấu-hoặc-bỏ chạy. Bạn không thể thu hút bằng một cỗ máy sinh học đang ở chế độ sinh tồn. Đó giống như cố gắng phát wifi khi router đang bị chập điện. Tín hiệu không đi được đâu cả — dù bạn có ý định tốt đến đâu.',
      },
      {
        label: 'SỰ KHÁC BIỆT CỐT LÕI',
        body: 'Khóa học này không dạy bạn cầu nguyện. Khóa học này phẫu thuật lại mạng lưới thần kinh của bạn. Không phải "nghĩ tích cực" — mà là CBT (Liệu pháp Nhận thức Hành vi), phương pháp được kiểm chứng lâm sàng để thay đổi cấu trúc suy nghĩ. Không phải "hình dung" — mà là Neuroplasticity ứng dụng, được Dr. Richard Davidson chứng minh thiền định thực sự thay đổi cấu trúc vật lý của não bộ. Không phải "Luật hấp dẫn" — mà là Epigenetics của Dr. Bruce Lipton: cảm xúc của bạn thực sự bật tắt gen trong từng tế bào cơ thể.',
      },
      {
        label: 'VŨ KHÍ TỐI THƯỢNG — CAM KẾT PHÁ HỦY',
        body: 'Tôi sẽ không nói với bạn rằng hành trình này dễ dàng. Tôi sẽ nói thật: nó sẽ rất khó chịu. Nó sẽ không xoa dịu bạn. Nó sẽ đặt bạn đứng trước những sự thật mà bạn đã né tránh suốt nhiều năm. Chính sự thật thách thức đó — không phải lời hứa ngọt ngào — là lý do bạn có thể tin tưởng tuyệt đối vào hệ thống này.',
        closing: 'Nếu sau 21 ngày thực hành trung thực, bạn không thấy bất kỳ tín hiệu trồi sinh nào — hãy lấy lại tiền. Tôi không muốn giữ năng lượng của người mà hệ thống này không thể nâng cấp.',
      },
    ],
  },
  {
    tier: 'TẦNG 3',
    label: 'Rào Cản Sinh Học',
    sub: 'Kẻ thù lớn nhất — và nguy hiểm nhất',
    question: 'Đây là rào cản mà không ai nói với bạn trước — và vì thế hầu hết mọi người bỏ cuộc đúng lúc họ sắp thành công.',
    accent: '#00D4C0',
    intro: 'Ngay cả khi não logic của bạn đã bị thuyết phục ở Tầng 1 và Tầng 2 — cơ thể bạn vẫn sẽ kháng cự. Vì sâu thẳm bên trong, cơ thể bạn đã nghiện sự gồng mình. Đây không phải ẩn dụ. Đây là sinh hóa học. Sau nhiều năm sống trong trạng thái căng thẳng liên tục, các tế bào của bạn đã được lập trình để đòi hỏi Cortisol và Adrenaline như một chất gây nghiện. Khi bạn bắt đầu thực hành và cuộc đời trở nên bình yên — não bộ sẽ hoảng loạn vì thiếu hụt hóa chất quen thuộc. Bạn sẽ tự phá hoại bản thân. Cố tình tạo ra rắc rối. Hoặc âm thầm quay lại hustle để thỏa mãn cơn nghiện — mà không nhận ra mình đang làm vậy.',
    blocks: [
      {
        label: 'TIÊM VACCINE NHẬN THỨC',
        body: 'Tôi đang nói với bạn điều này trước — không phải để dọa bạn. Mà để khi những triệu chứng đó xuất hiện, bạn sẽ nhận ra chúng ngay:',
        bullets: [
          'Bứt rứt không rõ lý do',
          'Lo âu mơ hồ, cảm giác đang lãng phí thời gian',
          'Cảm giác mình đang "tụt hậu" dù không có bằng chứng nào',
          'Một xung động mạnh mẽ muốn quay lại làm việc ngay lập tức',
        ],
        closing: '"Đây không phải là tín hiệu tôi đang đi sai đường. Đây là cơ thể tôi đang cai nghiện Cortisol. Đây là BẰNG CHỨNG cho thấy con người cũ đang bị bức tử."',
      },
      {
        label: 'VŨ KHÍ ĐỐI PHÓ — BỘ CÔNG CỤ NGẮT MẠCH',
        body: 'Trong Module 4, tôi sẽ trang bị cho bạn Công cụ Ngắt mạch 60 giây — kỹ thuật khẩn cấp ngay tại chỗ: Đặt tay lên tim. Hít thở theo nhịp 4-6. Tái thiết lập sóng não về Alpha. Ngay trong khoảnh khắc cơn nghiện Cortisol vừa bùng phát — bạn có công cụ để bóp nghẹt nó trước khi nó kịp kiểm soát hành động của bạn.',
        closing: 'Không phải trong lý thuyết. Trong thực tế. Trong 60 giây.',
      },
    ],
  },
]

const EXTRA_FAQS = [
  {
    q: '"Tôi không có thêm thời gian cho một khóa học nữa."',
    a: 'Hệ thống này được thiết kế để trả lại thời gian cho bạn bằng cách triệt tiêu những hành động vô nghĩa (Force). Mỗi ngày bạn tiếp tục chạy hệ điều hành cũ, bạn đang đổ thêm giờ làm việc vào một cái xô thủng. Đây không phải thêm việc vào lịch — đây là thay đổi chất lượng của mọi giờ bạn đang có.',
  },
  {
    q: '"Khi nào tôi sẽ thấy kết quả?"',
    a: 'Có hai hệ quy chiếu đo lường. Bên trong (Inner Game): Thời gian phục hồi (Refractory Period) giảm từ 3 ngày hoảng loạn khi có rủi ro xuống 10 phút. Chỉ số ma sát hành động: số giờ trong trạng thái Flow tăng lên, tần suất tội lỗi khi nghỉ ngơi giảm về 0. Bên ngoài (Outer Game): Thu nhập Trường Không Điểm (tổng thu nhập ÷ số giờ làm việc thực tế) tăng lên trong khi tổng giờ giảm xuống. Tỷ lệ trồi sinh (Inbound) tăng: cơ hội tự tìm đến bạn, thay vì bạn phải đuổi theo.',
  },
]

/* ══════════════════════════════════════════════════════════════
   BARRIER CARD
══════════════════════════════════════════════════════════════ */

function BarrierCard({ barrier, inView, delay }) {
  return (
    <motion.div
      variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{
        ...glass,
        padding: '44px 48px',
        borderLeft: `2px solid ${barrier.accent}55`,
        marginBottom: '24px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '3.5px',
          color: barrier.accent,
          marginBottom: '10px',
        }}>
          {barrier.tier} · {barrier.label}
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '13px',
          color: 'rgba(190,196,208,0.70)',
          fontStyle: 'italic',
          marginBottom: '20px',
        }}>
          {barrier.sub}
        </p>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(18px, 1.9vw, 23px)',
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: 1.6,
          color: 'rgba(241,245,249,0.95)',
          margin: 0,
        }}>
          {barrier.question}
        </p>
      </div>

      {/* Inner divider */}
      <div style={{
        width: '32px', height: '1px',
        background: `linear-gradient(90deg, ${barrier.accent}44, transparent)`,
        marginBottom: '24px',
      }} />

      {/* Intro paragraph */}
      {barrier.intro && (
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '16px',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.82)',
          fontWeight: 300,
          marginBottom: '32px',
        }}>
          {barrier.intro}
        </p>
      )}

      {/* Content blocks */}
      {barrier.blocks.map((block, i) => (
        <div key={i} style={{ marginBottom: i < barrier.blocks.length - 1 ? '32px' : 0 }}>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '3px',
            color: `${barrier.accent}BB`,
            marginBottom: '10px',
          }}>
            {block.label}
          </p>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '16px',
            lineHeight: 2.0,
            color: 'rgba(203,213,225,0.82)',
            fontWeight: 300,
            margin: 0,
            marginBottom: block.bullets || block.closing ? '16px' : 0,
          }}>
            {block.body}
          </p>

          {/* Bullet list */}
          {block.bullets && (
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 16px 0',
            }}>
              {block.bullets.map((bullet, j) => (
                <li key={j} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '15px',
                  lineHeight: 1.85,
                  color: 'rgba(203,213,225,0.78)',
                  fontWeight: 300,
                  marginBottom: '6px',
                }}>
                  <span style={{ color: barrier.accent, flexShrink: 0, marginTop: '5px', fontSize: '8px' }}>◆</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          {/* Closing statement */}
          {block.closing && (
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              fontStyle: 'italic',
              lineHeight: 1.75,
              color: `${barrier.accent}CC`,
              margin: 0,
              paddingLeft: '16px',
              borderLeft: `2px solid ${barrier.accent}33`,
            }}>
              {block.closing}
            </p>
          )}
        </div>
      ))}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   EXTRA FAQ ACCORDION
══════════════════════════════════════════════════════════════ */

function ExtraFaq({ item, isOpen, onToggle, inView, delay }) {
  return (
    <motion.div
      variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{ borderBottom: '1px solid rgba(0,212,192,0.07)' }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', gap: '16px', padding: '24px 0',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none',
        }}
      >
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(15px, 1.4vw, 18px)',
          fontStyle: 'italic',
          lineHeight: 1.5,
          color: isOpen ? '#D8DCE6' : 'rgba(190,196,208,0.60)',
          margin: 0,
          transition: 'color 0.3s ease',
        }}>
          {item.q}
        </p>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ color: isOpen ? '#00D4C0' : 'rgba(190,196,208,0.30)', flexShrink: 0, marginTop: '2px' }}
        >
          <svg width="12" height="7" viewBox="0 0 14 8" fill="none">
            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="faq-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '16px',
              lineHeight: 2.0,
              color: 'rgba(203,213,225,0.82)',
              fontWeight: 300,
              padding: '0 0 24px',
              margin: 0,
            }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   4 TẦNG KHOA HỌC TÁI SINH DATA + CARD
══════════════════════════════════════════════════════════════ */

const SCIENCE_TIERS = [
  {
    tag: 'Vật Lý Lượng Tử',
    title: 'Observer Effect',
    body: 'Trạng thái của Người Quan Sát ảnh hưởng trực tiếp đến kết quả của thí nghiệm. Ý thức không chỉ ghi nhận thực tại — nó tham gia vào việc tạo ra nó.',
    accent: '#00D4C0',
    rgb: '0,212,192',
  },
  {
    tag: 'Dr. Bruce Lipton',
    title: 'Epigenetics',
    body: 'Môi trường và cảm xúc của bạn không chỉ phản ánh gen — chúng bật tắt gen. Bạn không bị giam cầm trong DNA mình thừa hưởng.',
    accent: '#D97706',
    rgb: '217,119,6',
  },
  {
    tag: 'Dr. Richard Davidson',
    title: 'Neuroplasticity',
    body: 'Thiền định không chỉ thay đổi trạng thái tâm lý — nó thay đổi cấu trúc vật lý của não bộ. Không có gì là cố định.',
    accent: '#00D4C0',
    rgb: '0,212,192',
  },
  {
    tag: 'HeartMath Institute',
    title: 'HeartMath',
    body: 'Trái tim phát ra từ trường điện từ đo được từ vài mét bên ngoài cơ thể. Khi tim-não đồng bộ, chất lượng của mọi quyết định và hành động đều thay đổi.',
    accent: '#D97706',
    rgb: '217,119,6',
  },
]

function ScienceTierCard({ tier }) {
  return (
    <motion.div
      whileHover={{
        y: -2,
        boxShadow: `0 0 0 1px rgba(${tier.rgb},0.35), 0 0 28px rgba(${tier.rgb},0.10), 0 12px 56px rgba(0,0,0,0.50)`,
      }}
      transition={{ duration: 0.25 }}
      style={{
        ...glass,
        padding: '32px 28px',
        cursor: 'default',
      }}
    >
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '3px',
        color: `rgba(${tier.rgb},0.60)`,
        marginBottom: '12px',
      }}>
        {tier.tag}
      </p>
      <p style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(20px, 1.8vw, 23px)',
        fontWeight: 600,
        color: '#D8DCE6',
        marginBottom: '14px',
        lineHeight: 1.2,
      }}>
        {tier.title}
      </p>
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '15px',
        lineHeight: 1.85,
        color: 'rgba(203,213,225,0.78)',
        fontWeight: 300,
        margin: 0,
      }}>
        {tier.body}
      </p>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   ANTI-GUARANTEE BLOCK
══════════════════════════════════════════════════════════════ */

function AntiGuarantee({ inView }) {
  return (
    <motion.div
      variants={fadeUp} custom={0.3}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{
        width: '100%',
        maxWidth: '620px',
        background: 'rgba(8,13,26,0.70)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(190,196,208,0.08)',
        borderRadius: '12px',
        padding: '52px 56px',
        textAlign: 'center',
        margin: '0 auto',
      }}
    >
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '3.5px',
        color: 'rgba(0,212,192,0.55)',
        marginBottom: '24px',
      }}>
        BẢO HÀNH 21 NGÀY
      </p>
      <p style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(20px, 2vw, 26px)',
        fontWeight: 500,
        lineHeight: 1.5,
        color: '#D8DCE6',
        marginBottom: '20px',
      }}>
        Bảo hành 21 ngày cho sự chuyển hóa tế bào.
      </p>
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '15px',
        lineHeight: 2.0,
        color: 'rgba(190,196,208,0.58)',
        fontWeight: 300,
        marginBottom: '24px',
      }}>
        Nếu sau 21 ngày, bạn vẫn cảm thấy "ma sát" với cuộc sống — nếu hạch hạnh nhân của bạn vẫn nghiện Cortisol và bạn không thấy bất kỳ tín hiệu trồi sinh nào — hãy lấy lại tiền.
      </p>
      <p style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(16px, 1.5vw, 19px)',
        fontStyle: 'italic',
        color: 'rgba(190,196,208,0.40)',
        margin: 0,
      }}>
        Chúng ta không ở đây để thử. Chúng ta ở đây để Tái Sinh.
      </p>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   FINAL CTA SECTION
══════════════════════════════════════════════════════════════ */

const TWO_PATHS = {
  left: {
    label: 'NẾU BẠN KHÔNG LÀM GÌ HÔM NAY',
    color: '#D97706',
    border: 'rgba(217,119,6,0.18)',
    items: [
      'Tiếp tục vòng lặp: làm việc nhiều hơn → kiệt sức → làm việc nhiều hơn',
      'Cortisol vẫn là CEO của mọi quyết định bạn đưa ra',
      'Tháng sau, năm sau — vẫn cùng một con người, cùng một mức sàn',
      'Mỗi cơ hội đến bạn vẫn đánh giá nó bằng não của kẻ thiếu thốn',
      'Và bạn vẫn sẽ tự hỏi: "Sao người khác có vẻ nhẹ nhàng thế?"',
    ],
  },
  right: {
    label: 'NẾU BẠN BƯỚC VÀO HÔM NAY',
    color: '#00D4C0',
    border: 'rgba(0,212,192,0.20)',
    items: [
      'Tuần 1: Nhận ra chính xác mạch thần kinh nào đang giữ bạn trong vòng lặp',
      'Tuần 2: Lần đầu tiên hành động từ trạng thái đủ đầy thay vì sợ hãi',
      'Tuần 3: Một quyết định — việc làm, mối quan hệ, tiền bạc — thay đổi hoàn toàn chất lượng',
      '21 ngày: Hệ điều hành mới bắt đầu chạy. Không phải lý thuyết. Trong thực tế.',
      'Và bạn sẽ nhớ lại khoảnh khắc này — và cảm ơn bản thân đã chọn đúng.',
    ],
  },
}

const INCLUDED_ITEMS = [
  { label: 'Hệ Thống Cốt Lõi', value: '5 Module · 21 Ngày Thực Chiến' },
  { label: 'Bộ Công Cụ Khẩn Cấp', value: 'Ngắt mạch 60 giây — dùng được ngay' },
  { label: 'Khoa Học Nền Tảng', value: 'CBT · Neuroplasticity · Epigenetics' },
  { label: 'Bảo Hành Tuyệt Đối', value: 'Hoàn tiền 100% sau 21 ngày nếu không có tín hiệu' },
  { label: 'Truy Cập', value: 'Trọn đời · Bao gồm mọi cập nhật tương lai' },
]

function FinalCTA({ inView, onCheckout }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '800px',
      textAlign: 'center',
    }}>
      {/* Eyebrow */}
      <motion.div
        variants={fadeUp} custom={0}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{ marginBottom: '28px' }}
      >
        <span className="eyebrow">TẤM VÉ LỰA CHỌN</span>
      </motion.div>

      {/* Headline */}
      <motion.h2
        variants={fadeUp} custom={0.1}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(30px, 3.8vw, 52px)',
          fontWeight: 500,
          lineHeight: 1.15,
          color: '#D8DCE6',
          letterSpacing: '-0.02em',
          margin: '0 0 10px',
        }}
      >
        Cánh cửa này chỉ mở ra
      </motion.h2>
      <motion.h2
        variants={fadeUp} custom={0.18}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(20px, 2.6vw, 36px)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.35,
          color: 'rgba(203,213,225,0.65)',
          margin: '0 0 64px',
        }}
      >
        cho những ai đã mệt mỏi với việc đóng vai nạn nhân của hoàn cảnh.
      </motion.h2>

      {/* Biological Urgency */}
      <motion.div
        variants={fadeUp} custom={0.22}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          ...glass,
          width: '100%',
          padding: '44px 52px',
          marginBottom: '32px',
          borderLeft: '2px solid rgba(217,119,6,0.45)',
          textAlign: 'left',
        }}
      >
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '3.5px',
          color: '#D97706',
          marginBottom: '24px',
        }}>
          LÝ DO KHÔNG TRÌ HOÃN · BIỂU SINH HỌC
        </p>

        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(17px, 1.7vw, 21px)',
          fontWeight: 500,
          fontStyle: 'italic',
          lineHeight: 1.6,
          color: '#D8DCE6',
          marginBottom: '28px',
        }}>
          Tôi muốn nói thật với bạn một điều về Biểu sinh học.
          <br />
          Cơ thể bạn không bao giờ đứng yên.
        </p>

        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '16px',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.82)',
          fontWeight: 300,
          marginBottom: '20px',
        }}>
          Ngay lúc này — trong khi bạn đang đọc những dòng này — từng tế bào trong cơ thể bạn đang được lập trình bởi cảm xúc bạn đang trải qua.
        </p>

        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '16px',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.82)',
          fontWeight: 300,
          marginBottom: '28px',
        }}>
          Nếu bạn rời khỏi trang này và quay lại với "tiếng ồn" cũ — với danh sách lo âu, với vòng lặp gồng mình — ngày mai cơ thể bạn lại tiếp tục sản xuất Cortisol. Các tế bào lại tiếp tục nhận tín hiệu của sự thiếu thốn. Những vết sẹo thần kinh cũ lại được củng cố thêm một lớp.
        </p>

        <div style={{
          borderTop: '1px solid rgba(217,119,6,0.15)',
          paddingTop: '24px',
        }}>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            fontStyle: 'italic',
            lineHeight: 1.8,
            color: 'rgba(203,213,225,0.70)',
            marginBottom: '12px',
          }}>
            Cái giá của việc "không làm gì cả" không phải là bạn đứng yên.
          </p>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            fontStyle: 'italic',
            lineHeight: 1.8,
            color: '#D97706',
            margin: 0,
            fontWeight: 500,
          }}>
            Cái giá là bạn đang tiếp tục xây thêm những bức tường nhà tù — bằng chính hóa chất do cơ thể mình sản xuất.
          </p>
        </div>
      </motion.div>

      {/* Two Paths */}
      <motion.div
        variants={fadeUp} custom={0.30}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4"
        style={{
          width: '100%',
          marginBottom: '64px',
          textAlign: 'left',
        }}
      >
        {[TWO_PATHS.left, TWO_PATHS.right].map((path, pi) => (
          <div key={pi} style={{
            ...glass,
            padding: '32px 28px',
            border: `1px solid ${path.border}`,
          }}>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '3px',
              color: path.color,
              marginBottom: '20px',
            }}>
              {path.label}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {path.items.map((item, j) => (
                <li key={j} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.9,
                  color: pi === 0 ? 'rgba(217,155,80,0.82)' : 'rgba(203,213,225,0.82)',
                  fontWeight: 300,
                  marginBottom: j < path.items.length - 1 ? '10px' : 0,
                }}>
                  <span style={{
                    color: path.color,
                    flexShrink: 0,
                    marginTop: '7px',
                    fontSize: pi === 0 ? '9px' : '8px',
                    opacity: pi === 0 ? 0.7 : 1,
                  }}>
                    {pi === 0 ? '✕' : '◆'}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* Body paragraphs */}
      {[
        'Hệ thống này không dành cho người muốn thêm thông tin. Không dành cho người muốn thêm chiến lược hay thêm kỹ năng. Nó dành cho người đã sẵn sàng thay đổi — tận gốc rễ — ai họ là.',
        'Nếu bạn đang đọc đến đây và có một phần nào đó trong bạn thầm nhận ra: "Đây chính xác là điều tôi đã tìm kiếm" — đừng để não logic bước vào và phá vỡ khoảnh khắc đó. Phần nhận ra đó mới là phần thật.',
      ].map((p, i) => (
        <motion.p
          key={i}
          variants={fadeUp} custom={0.3 + i * 0.08}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(15px, 1.4vw, 17px)',
            lineHeight: 2.0,
            color: 'rgba(203,213,225,0.78)',
            fontWeight: 300,
            marginBottom: i === 0 ? '20px' : '56px',
            maxWidth: '620px',
          }}
        >
          {p}
        </motion.p>
      ))}

      {/* What's Included */}
      <motion.div
        variants={fadeUp} custom={0.46}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          ...glass,
          padding: 'clamp(24px, 4vw, 44px)',
          marginBottom: '32px',
          width: '100%',
          textAlign: 'left',
          overflow: 'hidden',
        }}
      >
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '3.5px',
          color: 'rgba(0,212,192,0.65)',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          BẠN NHẬN ĐƯỢC
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {INCLUDED_ITEMS.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-y-2 md:gap-x-4" style={{
              paddingBottom: '14px',
              borderBottom: i < INCLUDED_ITEMS.length - 1 ? '1px solid rgba(0,212,192,0.06)' : 'none',
            }}>
              <span style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(203,213,225,0.75)',
                letterSpacing: '0.3px',
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(203,213,225,0.55)',
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4 Tầng Khoa Học Tái Sinh */}
      <motion.div
        variants={fadeUp} custom={0.50}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{ width: '100%', marginBottom: '52px' }}
      >
        {/* Lead-in: Đông / Tây hội tụ */}
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.72)',
          fontWeight: 300,
          marginBottom: '16px',
        }}>
          Hàng ngàn năm, các thiền sư phương Đông đã nói rằng ý thức tạo ra thực tại. Rằng thế giới bên ngoài là sự phản chiếu của thế giới bên trong.
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.72)',
          fontWeight: 300,
          marginBottom: '32px',
        }}>
          Khoa học cổ điển — cơ học Newton — gọi đó là mê tín. Hai dòng chảy song song nhau qua lịch sử, không bao giờ gặp nhau.
        </p>

        {/* Dramatic moment */}
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(22px, 2.4vw, 30px)',
          fontWeight: 600,
          color: '#D8DCE6',
          letterSpacing: '-0.01em',
          marginBottom: '32px',
          lineHeight: 1.3,
        }}>
          Cho đến bây giờ.
        </p>

        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.72)',
          fontWeight: 300,
          marginBottom: '40px',
        }}>
          Lần đầu tiên trong lịch sử nhân loại, khoa học hiện đại đang xác nhận những gì người xưa đã biết — chỉ bằng ngôn ngữ khác:
        </p>

        {/* 4 science cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: '48px' }}>
          {SCIENCE_TIERS.map((tier, i) => (
            <ScienceTierCard key={i} tier={tier} />
          ))}
        </div>

        {/* Synthesis */}
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(16px, 1.6vw, 20px)',
          fontWeight: 500,
          lineHeight: 1.75,
          color: '#D8DCE6',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          Bốn nhánh khoa học độc lập. Bốn ngôn ngữ nghiên cứu khác nhau. Cùng nói về một sự thật.
        </p>

        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.72)',
          fontWeight: 300,
          marginBottom: '20px',
        }}>
          Chúng ta đang đứng ở{' '}
          <strong style={{ fontWeight: 600, color: '#D8DCE6' }}>điểm hội tụ của một làn sóng nhận thức</strong>{' '}
          — thời điểm mà khoa học và trí tuệ cổ xưa gặp nhau sau hàng ngàn năm.
        </p>

        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.72)',
          fontWeight: 300,
          marginBottom: '20px',
        }}>
          Những người hiểu nguyên lý này hôm nay sẽ vận hành cuộc đời từ một tầng hoàn toàn khác. Không phải vì họ may mắn hơn, tài năng hơn, hay có xuất phát điểm tốt hơn — mà vì họ đang dùng đúng hệ điều hành trong khi phần còn lại của thế giới vẫn đang chạy công thức cũ: làm nhiều hơn, gồng mình hơn, kiệt sức hơn, và tự hỏi tại sao kết quả không xứng với nỗ lực.
        </p>

        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.72)',
          fontWeight: 300,
          marginBottom: '32px',
        }}>
          Cuộc sống — dù muốn hay không — sẽ phải đi theo khoa học. Không phải ngược lại.
        </p>

        {/* Framing question */}
        <div style={{
          borderTop: '1px solid rgba(0,212,192,0.10)',
          paddingTop: '32px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(14px, 1.3vw, 16px)',
            lineHeight: 2.0,
            color: 'rgba(203,213,225,0.55)',
            fontWeight: 300,
            marginBottom: '10px',
            letterSpacing: '0.2px',
          }}>
            Câu hỏi không phải là <em>liệu</em> sự dịch chuyển này có xảy ra không.
          </p>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(14px, 1.3vw, 16px)',
            lineHeight: 2.0,
            color: 'rgba(203,213,225,0.55)',
            fontWeight: 300,
            margin: 0,
            letterSpacing: '0.5px',
          }}>
            Câu hỏi là:{' '}
            <strong style={{ fontWeight: 600, color: '#D8DCE6' }}>
              bạn đang ở bên nào của nó — và bạn chọn bên nào từ hôm nay.
            </strong>
          </p>
        </div>
      </motion.div>

      {/* Micro-commitment */}
      <motion.div
        variants={fadeUp} custom={0.54}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          ...glass,
          padding: '36px 44px',
          marginBottom: '52px',
          width: '100%',
          borderLeft: '2px solid rgba(0,212,192,0.30)',
        }}
      >
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(15px, 1.4vw, 18px)',
          fontStyle: 'italic',
          lineHeight: 1.85,
          color: 'rgba(203,213,225,0.72)',
          margin: '0 0 18px',
        }}>
          Trước khi bạn nhấn nút, hãy làm một điều nhỏ:
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '15px',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.70)',
          fontWeight: 300,
          margin: '0 0 20px',
        }}>
          Hít một hơi thật sâu. Thả lỏng cơ hàm. Và để lồng ngực bạn mở ra một chút.
        </p>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(15px, 1.4vw, 18px)',
          lineHeight: 1.8,
          color: '#D8DCE6',
          fontWeight: 500,
          margin: 0,
        }}>
          Nếu bạn cảm thấy lồng ngực vừa nhẹ đi một chút —{' '}
          <em style={{ color: '#00D4C0', fontStyle: 'italic' }}>
            đó là phần sâu nhất trong bạn đang nhận ra rằng đã đến lúc rồi.
          </em>
        </p>
      </motion.div>

      {/* Final CTA button */}
      <motion.div
        variants={fadeUp} custom={0.62}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', marginBottom: '36px' }}
      >
        <MagneticButton className="cta-btn-mobile" onClick={onCheckout}>
          Tôi Chọn Tái Sinh — Nhận Quyền Truy Cập Ngay
        </MagneticButton>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '12px',
          color: 'rgba(190,196,208,0.50)',
          letterSpacing: '0.5px',
          lineHeight: 1.9,
          textAlign: 'center',
        }}>
          Mức đầu tư: 1.790.000đ &nbsp;·&nbsp; Bảo hành 21 ngày hoàn tiền 100% &nbsp;·&nbsp; Truy cập trọn đời
        </p>
      </motion.div>

      {/* Closing quote */}
      <motion.div
        variants={fadeUp} custom={0.70}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          marginTop: '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
        }}
      >
        {/* Divider */}
        <div style={{
          width: '40px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,192,0.35), transparent)',
          marginBottom: '8px',
        }} />

        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(15px, 1.5vw, 18px)',
          fontStyle: 'italic',
          lineHeight: 1.7,
          color: 'rgba(203,213,225,0.55)',
          margin: 0,
          textAlign: 'center',
        }}>
          Không phải vì tôi yêu cầu bạn.
        </p>

        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(20px, 2.2vw, 28px)',
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: 1.5,
          color: '#D8DCE6',
          margin: 0,
          textAlign: 'center',
          letterSpacing: '-0.01em',
        }}>
          Mà vì con người bạn đang trở thành —
          <br />
          <em style={{ color: '#00D4C0' }}>đã chờ đủ lâu rồi.</em>
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */

function Footer({ inView, onLegal }) {
  const linkStyle = {
    fontFamily: '"Inter", sans-serif',
    fontSize: '11px',
    letterSpacing: '1px',
    color: 'rgba(190,196,208,0.28)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'none',
    transition: 'color 0.25s ease',
  }
  const handleLegalHover = (e, enter) => {
    e.currentTarget.style.color = enter ? 'rgba(0,212,192,0.65)' : 'rgba(190,196,208,0.28)'
  }

  return (
    <motion.footer
      variants={fadeUp} custom={0.2}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{
        width: '100%',
        borderTop: '1px solid rgba(0,212,192,0.07)',
        paddingTop: '48px',
        textAlign: 'center',
      }}
    >
      <p style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '15px',
        fontStyle: 'italic',
        color: 'rgba(190,196,208,0.25)',
        marginBottom: '16px',
      }}>
        © 2026 James Trương · Quantum Rebirth OS
      </p>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {['Chính sách bảo mật', 'Điều khoản sử dụng', 'Chính sách hoàn tiền'].map((label, i) => (
          <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onLegal}
              style={linkStyle}
              onMouseEnter={e => handleLegalHover(e, true)}
              onMouseLeave={e => handleLegalHover(e, false)}
            >
              {label}
            </button>
            {i < 2 && <span style={{ color: 'rgba(190,196,208,0.12)', fontSize: '10px' }}>·</span>}
          </span>
        ))}
      </div>
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '12px',
        lineHeight: 1.8,
        color: 'rgba(190,196,208,0.14)',
        maxWidth: '560px',
        margin: '0 auto',
        fontWeight: 300,
      }}>
        Trang này chứa thông tin về một chương trình chuyển hóa cá nhân dựa trên các nghiên cứu về Neuroplasticity, Epigenetics và Cognitive Behavioral Therapy. Kết quả cá nhân có thể khác nhau tùy theo mức độ cam kết thực hành của từng người.
      </p>
    </motion.footer>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */

export default function TheGuarantee({ onCheckout, onLegal }) {
  const faqRef    = useRef(null)
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' })

  const guaranteeRef    = useRef(null)
  const guaranteeInView = useInView(guaranteeRef, { once: true, margin: '-80px' })

  const ctaRef    = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  const footerRef    = useRef(null)
  const footerInView = useInView(footerRef, { once: true, margin: '-60px' })

  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      {/* ── SECTION 9: FAQ — 3 BARRIERS ── */}
      <section
        ref={faqRef}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '160px 24px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          variants={fadeUp} custom={0}
          initial="hidden" animate={faqInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '28px' }}
        >
          <span className="eyebrow">BA TẦNG RÀO CẢN</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} custom={0.1}
          initial="hidden" animate={faqInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 500,
            lineHeight: 1.2,
            color: '#D8DCE6',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            margin: '0 0 12px',
          }}
        >
          Tôi biết chính xác bạn đang nghĩ gì lúc này.
        </motion.h2>

        <motion.p
          variants={fadeUp} custom={0.18}
          initial="hidden" animate={faqInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            fontStyle: 'italic',
            lineHeight: 1.7,
            color: 'rgba(190,196,208,0.42)',
            textAlign: 'center',
            marginBottom: '72px',
            maxWidth: '520px',
          }}
        >
          Não bộ của bạn sẽ dựng lên 3 tầng kháng cự — theo đúng thứ tự này. Hãy để tôi tháo gỡ từng tầng một.
        </motion.p>

        {/* Barrier cards */}
        <div style={{ width: '100%', maxWidth: '760px' }}>
          {BARRIERS.map((barrier, i) => (
            <BarrierCard
              key={i}
              barrier={barrier}
              inView={faqInView}
              delay={0.25 + i * 0.1}
            />
          ))}

          {/* Extra FAQs */}
          <motion.div
            variants={fadeUp} custom={0.6}
            initial="hidden" animate={faqInView ? 'visible' : 'hidden'}
            style={{ marginTop: '16px', borderTop: '1px solid rgba(0,212,192,0.07)' }}
          >
            {EXTRA_FAQS.map((item, i) => (
              <ExtraFaq
                key={i}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                inView={faqInView}
                delay={0.65 + i * 0.08}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ANTI-GUARANTEE ── */}
      <section
        ref={guaranteeRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 24px 160px',
        }}
      >
        <AntiGuarantee inView={guaranteeInView} />
      </section>

      {/* ── SECTION 10: FINAL CTA ── */}
      <section
        ref={ctaRef}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '160px 24px 120px',
          overflow: 'hidden',
        }}
      >
        <FinalCTA inView={ctaInView} onCheckout={onCheckout} />
      </section>

      {/* ── FOOTER ── */}
      <div
        ref={footerRef}
        style={{ padding: '0 24px 64px' }}
      >
        <Footer inView={footerInView} onLegal={onLegal} />
      </div>
    </>
  )
}
