import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden:  { opacity: 0, filter: 'blur(8px)', y: 20 },
  visible: (d = 0) => ({
    opacity: 1, filter: 'blur(0px)', y: 0,
    transition: { duration: 1.2, ease: EASE, delay: d },
  }),
}

/* ══════════════════════════════════════════════════════════════
   MODULE DATA
══════════════════════════════════════════════════════════════ */

const MODULES = [
  {
    num: '00',
    title: 'Lời Mời Thức Tỉnh',
    subtitle: 'The Awakening Invitation',
    goal: 'Phá vỡ thực tại ảo và cài đặt niềm tin tuyệt đối vào hệ thống mới.',
    body: [
      'Bạn không thể tháo gỡ một nhà tù nếu bạn không biết mình đang bị giam cầm. Ở đây, chúng ta phá vỡ Culturescape, vạch trần những Brule — cả những Brule xã hội lẫn những Brule Tự Phát sinh ra từ tổn thương gia đình.',
      'Và đặt lại câu hỏi nền tảng: Bạn đang leo ngọn núi nào? Vì có một sự khác biệt giữa Mục tiêu Phương tiện (tiền, danh vọng, được công nhận) và Mục tiêu Cuối cùng (trạng thái tự do, bình an, đủ đầy, và được yêu thương).',
    ],
    warning: 'Đây là module nguy hiểm nhất — vì nó sẽ đặt bạn đứng trước một sự thật mà bạn có thể đã né tránh suốt nhiều năm.',
    accent: '#D97706',
  },
  {
    num: '01',
    title: 'Giải Thể Con Người Cũ',
    subtitle: 'The Deconstruction',
    goal: 'Ngắt kết nối các mạch thần kinh cũ (Neural Pruning) và dọn sạch năng lượng tắc nghẽn.',
    body: [
      'Đây là module đau nhất. Và quan trọng nhất. Chúng ta thực hiện Cuộc Kiểm toán Lịch sử — đi vào tận gốc rễ của những tổn thương, xác định chính xác sự kiện nào đã tạo ra Brule nào đang kiểm soát cuộc đời bạn hôm nay.',
      'Sau đó, chúng ta vẽ Bản đồ Nhà tù — đặt tên cho từng Brule, từng xích xiềng, từng cảm xúc sinh tồn mà cơ thể bạn đang nghiện.',
      'Kết thúc bằng Nghi thức Tha thứ Chủ động — không phải đạo đức, mà là kỹ thuật giải phóng RAM: rút phích cắm của mọi ký ức chưa được hòa giải đang tiêu tốn năng lượng vô ích.',
    ],
    accent: '#00D4C0',
  },
  {
    num: '02',
    title: 'Bản Thiết Kế',
    subtitle: 'The Blueprint',
    goal: 'Kích hoạt các mạch thần kinh mới (Neural Sprouting) và định hình nhân dạng mới.',
    body: [
      'Bạn không thể cài đặt hệ điều hành mới vào màn hình trống. Chúng ta xây dựng Bản Thiết kế Lượng tử — không phải danh sách mục tiêu trên giấy. Mà là một dấu ấn cảm xúc về nhân dạng tương lai được neo vào cơ thể của bạn.',
      'Sau đó, chúng ta ứng dụng Quy luật Hebbian: "Neurons that fire together, wire together." Mỗi lần bạn lặp lại Tuyên ngôn Nhân dạng Mới với cảm xúc thật sự — bạn đang đi dây lại bộ não của mình. Đây không phải ẩn dụ — đây là sinh học thần kinh.',
    ],
    accent: '#D97706',
  },
  {
    num: '03',
    title: 'Cỗ Máy Vận Hành',
    subtitle: 'The Operations Engine',
    goal: 'Đưa trạng thái mới vào cơ thể (Embodiment) thông qua thực hành hàng ngày.',
    body: [
      'Giao thức Thiền định Tái sinh 4 giai đoạn — công cụ hàng ngày của bạn:',
    ],
    stages: [
      { label: 'Giai đoạn 1', title: 'Đồng bộ Tim-Não (HeartMath)', desc: 'Tắt tín hiệu sinh tồn. Đưa hệ thần kinh về trạng thái an toàn. Điều kiện tiên quyết — bạn không thể cài đặt phần mềm mới vào một hệ thống đang ở chế độ Emergency.' },
      { label: 'Giai đoạn 2', title: 'Lòng biết ơn', desc: 'Kích hoạt DHEA — hormone chống lão hóa và tăng cường miễn dịch — để nâng tần số cơ thể trước khi bước vào giai đoạn cài đặt.' },
      { label: 'Giai đoạn 3', title: 'Ký ức về Tương lai', desc: 'Nhìn thấy, nghe thấy, cảm nhận phiên bản tương lai với đủ chi tiết để não bộ không phân biệt được đó là thực hay ảo. Đây là cách bạn bật những gen của sự đủ đầy, tắt những gen của sự thiếu thốn.' },
      { label: 'Giai đoạn 4', title: 'Kích hoạt Tuyên ngôn', desc: 'Khoảnh khắc cài đặt trực tiếp vào tiềm thức khi các sóng não đang ở trạng thái mở nhất.' },
    ],
    accent: '#00D4C0',
  },
  {
    num: '04',
    title: 'Dòng Sông của Sự Thay Đổi',
    subtitle: 'The River of Change',
    goal: 'Quản trị sự hỗn loạn và ngăn chặn việc bỏ cuộc.',
    body: [
      'Khi bạn thực sự bắt đầu thay đổi tần số — mọi thứ sẽ trở nên tồi tệ hơn trước khi tốt hơn. Con người cũ sẽ không chịu chết im lặng. Tâm lý học hành vi gọi đây là Extinction Burst — Cơn Bùng phát Dập tắt.',
      '"Sự khó chịu này không phải là tín hiệu bạn đang đi sai đường. Đây là cơ thể đang thải độc tố cảm xúc cũ. Đây là bằng chứng nhân dạng mới đang trồi sinh."',
      'Tôi sẽ trang bị cho bạn Công cụ Ngắt mạch 60 giây — kỹ thuật khẩn cấp ngay tại chỗ để xử lý những cơn đó trong thực tế, không phải trong lý thuyết.',
    ],
    accent: '#D97706',
  },
  {
    num: '05',
    title: 'Sự Hiện Thân',
    subtitle: 'The Embodiment',
    goal: 'Sống như thể mọi thứ đã xảy ra và tương tác với Vũ trụ.',
    body: [
      'Nhân dạng mới không phải là thứ bạn suy nghĩ về. Đó là thứ bạn trở thành — trong từng hành động, từng quyết định, từng hơi thở.',
      'Chúng ta học cách phân biệt Hành động từ Force (nỗi sợ hãi, sự chứng minh, sự "đói khát" kết quả) và Hành động từ Power (sự đủ đầy, trực giác, nhân dạng đã được định hình). Một hành động từ Power có đòn bẩy bằng 100 hành động từ Force.',
    ],
    accent: '#00D4C0',
  },
  {
    num: '06',
    title: 'Trò Chơi Vô Hạn',
    subtitle: 'The Infinite Game',
    goal: 'Duy trì đà phát triển và mở rộng giới hạn mãi mãi.',
    body: [
      'Bạn không leo đến một đỉnh rồi dừng lại. Ở đây, chúng ta đặt câu hỏi Socratic cuối cùng — không phải để trả lời ngay, mà để bạn mang nó theo suốt phần đời còn lại:',
    ],
    closing: '"Nếu mọi giới hạn chỉ là giả tưởng của con người cũ — phiên bản vĩ đại nhất của bạn đang muốn trải nghiệm điều gì tiếp theo?"',
    accent: '#D97706',
  },
]

/* ══════════════════════════════════════════════════════════════
   ACCORDION ROW
══════════════════════════════════════════════════════════════ */

function ModuleRow({ mod, isOpen, onToggle, index, inView }) {
  return (
    <motion.div
      variants={fadeUp} custom={0.2 + index * 0.06}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{
        borderBottom: '1px solid rgba(0,212,192,0.08)',
      }}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '28px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          outline: 'none',
        }}
      >
        {/* Module number */}
        <span style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '3px',
          color: isOpen ? mod.accent : 'rgba(190,196,208,0.35)',
          minWidth: '28px',
          transition: 'color 0.3s ease',
        }}>
          {mod.num}
        </span>

        {/* Titles */}
        <span style={{ flex: 1 }}>
          <span style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            fontWeight: 500,
            color: isOpen ? '#D8DCE6' : '#BEC4D0',
            display: 'block',
            lineHeight: 1.2,
            marginBottom: '4px',
            transition: 'color 0.3s ease',
          }}>
            {mod.title}
          </span>
          <span style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '10px',
            letterSpacing: '3.5px',
            color: isOpen ? '#2DD4BF' : 'rgba(45,212,191,0.45)',
            fontStyle: 'italic',
            textTransform: 'uppercase',
            transition: 'color 0.3s ease',
          }}>
            {mod.subtitle}
          </span>
        </span>

        {/* Chevron */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isOpen ? mod.accent : 'rgba(190,196,208,0.30)',
            transition: 'color 0.3s ease',
          }}
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>

      {/* Content panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 0 36px 48px' }}>
              {/* Goal */}
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '2.5px',
                color: `${mod.accent}99`,
                marginBottom: '16px',
              }}>
                MỤC TIÊU: {mod.goal}
              </p>

              {/* Body paragraphs */}
              {mod.body.map((p, i) => (
                <p key={i} style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '15px',
                  lineHeight: 2.0,
                  color: 'rgba(190,196,208,0.68)',
                  fontWeight: 300,
                  marginBottom: i < mod.body.length - 1 ? '16px' : (mod.stages || mod.closing ? '24px' : 0),
                }}>
                  {p}
                </p>
              ))}

              {/* Stages (Module 03 only) */}
              {mod.stages && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {mod.stages.map((s, i) => (
                    <div key={i} style={{
                      paddingLeft: '20px',
                      borderLeft: `1px solid ${mod.accent}44`,
                    }}>
                      <p style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: mod.accent,
                        opacity: 0.75,
                        marginBottom: '6px',
                      }}>
                        {s.label} · {s.title}
                      </p>
                      <p style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '14px',
                        lineHeight: 1.85,
                        color: 'rgba(190,196,208,0.60)',
                        fontWeight: 300,
                        margin: 0,
                      }}>
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Closing quote (Module 06 only) */}
              {mod.closing && (
                <p style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(16px, 1.5vw, 19px)',
                  fontStyle: 'italic',
                  lineHeight: 1.75,
                  color: 'rgba(190,196,208,0.55)',
                  paddingLeft: '20px',
                  borderLeft: `1px solid ${mod.accent}44`,
                  margin: 0,
                }}>
                  {mod.closing}
                </p>
              )}

              {/* Warning (Module 00 only) */}
              {mod.warning && (
                <p style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '14px',
                  fontStyle: 'italic',
                  lineHeight: 1.75,
                  color: 'rgba(217,119,6,0.55)',
                  marginTop: '20px',
                  marginBottom: 0,
                }}>
                  * {mod.warning}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */

export default function TheCurriculum() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '160px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Eyebrow */}
      <motion.div
        variants={fadeUp} custom={0}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{ marginBottom: '28px' }}
      >
        <span className="eyebrow">LỘ TRÌNH 21 NGÀY</span>
      </motion.div>

      {/* Headline */}
      <motion.h2
        variants={fadeUp} custom={0.1}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(32px, 4vw, 54px)',
          fontWeight: 500,
          lineHeight: 1.18,
          color: '#D8DCE6',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          margin: '0 0 12px',
        }}
      >
        Phác đồ Tái Sinh
      </motion.h2>

      <motion.h3
        variants={fadeUp} custom={0.18}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(22px, 2.8vw, 38px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(190,196,208,0.45)',
          textAlign: 'center',
          margin: '0 0 32px',
        }}
      >
        7 tầng chuyển hóa có hệ thống
      </motion.h3>

      {/* Subheadline */}
      <motion.p
        variants={fadeUp} custom={0.25}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(14px, 1.3vw, 16px)',
          lineHeight: 2.0,
          color: 'rgba(190,196,208,0.55)',
          fontWeight: 300,
          textAlign: 'center',
          maxWidth: '560px',
          marginBottom: '80px',
        }}
      >
        Quantum Rebirth OS thực hiện đúng một việc: thay thế hoàn toàn nhân dạng cũ của bạn. Không phải bằng motivation. Không phải bằng thêm kỹ năng. Bằng{' '}
        <strong style={{ fontWeight: 500, color: '#BEC4D0' }}>
          phẫu thuật thần kinh có hệ thống
        </strong>{' '}
        — được xây dựng trên Neuroplasticity, Epigenetics, CBT và cơ học lượng tử ứng dụng.
      </motion.p>

      {/* Accordion */}
      <div style={{ width: '100%', maxWidth: '760px' }}>
        {/* Top border */}
        <motion.div
          variants={fadeUp} custom={0.18}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ borderTop: '1px solid rgba(0,212,192,0.08)' }}
        />

        {MODULES.map((mod, i) => (
          <ModuleRow
            key={mod.num}
            mod={mod}
            index={i}
            inView={inView}
            isOpen={openIdx === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {/* 21-day note */}
      <motion.div
        variants={fadeUp} custom={0.85}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          marginTop: '72px',
          textAlign: 'center',
          maxWidth: '480px',
        }}
      >
        <span className="divider-teal" style={{ display: 'block', marginBottom: '40px' }} />
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '17px',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.82)',
          fontWeight: 300,
        }}>
          21 ngày không phải con số marketing. Đó là thời gian tối thiểu để não bộ{' '}
          <strong style={{ fontWeight: 600, color: '#E2E8F0' }}>
            bắt đầu cắt tỉa các mạch thần kinh cũ
          </strong>{' '}
          và hình thành những con đường mòn mới đủ vững để đứng.
        </p>
      </motion.div>
    </section>
  )
}
