import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'
import CardSpotlight from './CardSpotlight'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden:  { opacity: 0, filter: 'blur(8px)', y: 20 },
  visible: (d = 0) => ({
    opacity: 1, filter: 'blur(0px)', y: 0,
    transition: { duration: 1.2, ease: EASE, delay: d },
  }),
}

const glass = {
  background:           'rgba(15,23,42,0.35)',
  backdropFilter:       'blur(24px) saturate(140%)',
  WebkitBackdropFilter: 'blur(24px) saturate(140%)',
  border:               '1px solid rgba(255,255,255,0.08)',
  borderRadius:         '12px',
  boxShadow:            '0 8px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.04)',
}

/* ══════════════════════════════════════════════════════════════
   VALUE STACK DATA
══════════════════════════════════════════════════════════════ */

const VALUE_ITEMS = [
  {
    icon: '◈',
    label: 'Chương trình chính',
    name: 'Quantum Rebirth OS 2.0',
    desc: 'Toàn bộ 7 Module · Hơn 20 bài học thực hành · Video + bài tập từng ngày. Lộ trình 21 ngày có cấu trúc, có thứ tự, được thiết kế để không cho bạn bị kẹt ở bất kỳ điểm nào. Xây dựng trên nền tảng CBT, Neuroplasticity, Epigenetics và cơ học lượng tử ứng dụng.',
    value: '3.979.000đ',
    accent: '#00D4C0',
    isStar: false,
  },
  {
    icon: '◈',
    label: 'Bonus 1',
    name: 'Sổ tay "Kiểm toán Lịch sử"',
    desc: 'Công cụ chẩn đoán và vô hiệu hóa chính xác các mã độc đang chạy trong tiềm thức của bạn. Không phải bài tập viết nhật ký chung chung — mà là một quy trình có hệ thống để truy tìm chính xác sự kiện nào, ở độ tuổi nào, đã tạo ra Brule nào đang kiểm soát cuộc đời bạn hôm nay.',
    value: '99.000đ',
    accent: '#D97706',
    isStar: false,
  },
  {
    icon: '◈',
    label: 'Bonus 2',
    name: 'Audio "Zero-Point Meditator"',
    desc: 'Công nghệ âm thanh được thiết kế đặc biệt để đưa sóng não về Alpha/Theta — cửa ngõ trực tiếp vào tiềm thức. Đây không phải âm thanh thư giãn thông thường. Đây là công cụ phẫu thuật — để mỗi lần bạn ngồi thiền, bạn tiếp cận được đúng lớp tâm thức nơi việc cài đặt nhân dạng mới xảy ra.',
    value: '99.000đ',
    accent: '#D97706',
    isStar: false,
  },
  {
    icon: '★',
    label: 'Bonus 3 — Độc quyền',
    name: 'The Reality Architect Protocol',
    desc: 'Nếu Quantum Rebirth OS là việc quét sạch virus và cài lại hệ điều hành — thì đây là phần mềm ứng dụng tối thượng để bạn bắt đầu thực sự kiến tạo tài chính, mối quan hệ và sự nghiệp. Chương trình Neuro-hacking chuyên sâu 4 tầng — được thiết kế để nâng cấp "tải trọng" của hệ thần kinh, thu hẹp khoảng cách giữa suy nghĩ và vật chất.',
    value: '999.000đ',
    accent: '#D97706',
    isStar: true,
  },
]

const BONUS3_TIERS = [
  {
    name: 'Tầng 1 — Làm Chủ Cờ Tàn',
    sub: 'The Endgame',
    desc: 'Luyện tập vi mô với các đối tượng vật lý để đạt 5 giây tập trung thuần khiết không gián đoạn — đủ để "sụp đổ hàm sóng" và chọn một thực tại cụ thể từ vô số khả năng đang tồn tại đồng thời.',
  },
  {
    name: 'Tầng 2 — Xây Dựng Vùng Mềm',
    sub: 'The Soft Zone',
    desc: 'Học cách hấp thụ mọi sự hỗn loạn bên ngoài để làm nhiên liệu cho ý định. Hành động không có ma sát — như nước chảy quanh chướng ngại vật mà vẫn đến đích. Đây là nguyên lý của Vô Vi thực sự.',
  },
  {
    name: 'Tầng 3 — Mã Hóa Giác Quan 5D',
    sub: 'Sensory Stacking',
    desc: 'Nâng từ "phim 2D trong tâm trí" sang "thực tế ảo 5D" — kích hoạt đủ 5 giác quan để hệ thống hóa học cơ thể phản ứng như thể trải nghiệm đó đang xảy ra ngay lúc này. Dopamine, Serotonin, Oxytocin được sản xuất. Biểu sinh học thay đổi. Cơ thể bắt đầu tin rằng tương lai đã xảy ra.',
  },
  {
    name: 'Tầng 4 — Chữ Ký Cảm Xúc',
    sub: 'Emotional Signature & Surrender',
    desc: 'Bước mà hầu hết mọi người bỏ qua và vì thế mọi thứ sụp đổ — kỹ thuật gieo ý định vào Trường Thống Nhất và lùi lại để thực tại tự sắp xếp. Vì sự kiểm soát ám ảnh chính là bằng chứng bạn chưa thực sự là người đó. Người đã có điều đó rồi không cần phải kiểm soát nó.',
  },
]

const TABLE_ROWS = [
  { label: 'Chương trình chính: Quantum Rebirth OS 2.0', value: '3.979.000đ', dim: true },
  { label: 'Bonus 1: Sổ tay Kiểm toán Lịch sử',          value: '99.000đ',    dim: true },
  { label: 'Bonus 2: Audio Zero-Point Meditator',          value: '99.000đ',    dim: true },
  { label: 'Bonus 3: The Reality Architect Protocol',      value: '999.000đ',   dim: true },
]

/* ══════════════════════════════════════════════════════════════
   VALUE CARD
══════════════════════════════════════════════════════════════ */

function ValueCard({ item, inView, delay }) {
  return (
    <motion.div
      variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{
        ...glass,
        padding: '32px 36px',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
        ...(item.isStar ? {
          border: '1px solid rgba(217,119,6,0.25)',
          boxShadow: '0 0 40px rgba(217,119,6,0.05), 0 8px 48px rgba(0,0,0,0.40)',
        } : {}),
      }}
    >
      <span style={{
        fontSize: '18px',
        color: item.accent,
        opacity: 0.8,
        marginTop: '2px',
        flexShrink: 0,
      }}>
        {item.icon}
      </span>
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '3px',
          color: `${item.accent}99`,
          marginBottom: '8px',
        }}>
          {item.label}
        </p>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(17px, 1.6vw, 21px)',
          fontWeight: 500,
          color: '#D8DCE6',
          marginBottom: '10px',
          lineHeight: 1.25,
        }}>
          {item.name}
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '16px',
          lineHeight: 2.1,
          color: 'rgba(226,232,240,0.88)',
          fontWeight: 300,
          marginBottom: '14px',
        }}>
          {item.desc}
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '12px',
          color: 'rgba(190,196,208,0.30)',
          textDecoration: 'line-through',
        }}>
          Trị giá: {item.value}
        </p>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   BONUS 3 CARD (with expandable accordion)
══════════════════════════════════════════════════════════════ */

function Bonus3Card({ item, inView, delay }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{
        ...glass,
        padding: '32px 36px',
        border: '1px solid rgba(217,119,6,0.25)',
        boxShadow: '0 0 40px rgba(217,119,6,0.05), 0 8px 48px rgba(0,0,0,0.40)',
      }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '18px', color: item.accent, opacity: 0.8, marginTop: '2px', flexShrink: 0 }}>
          {item.icon}
        </span>
        <div style={{ flex: 1 }}>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '3px',
            color: `${item.accent}99`,
            marginBottom: '8px',
          }}>
            {item.label}
          </p>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(17px, 1.6vw, 21px)',
            fontWeight: 500,
            color: '#D8DCE6',
            marginBottom: '10px',
            lineHeight: 1.25,
          }}>
            {item.name}
          </p>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '16px',
            lineHeight: 2.1,
            color: 'rgba(226,232,240,0.88)',
            fontWeight: 300,
            marginBottom: '20px',
          }}>
            {item.desc}
          </p>

          {/* Expand/Collapse button */}
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: open ? 'rgba(217,119,6,0.12)' : 'rgba(217,119,6,0.06)',
              border: '1px solid rgba(217,119,6,0.30)',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontFamily: '"Inter", sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '2px',
              color: '#D97706',
              textTransform: 'uppercase',
              marginBottom: '4px',
              transition: 'background 0.2s',
            }}
          >
            <span style={{
              display: 'inline-block',
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s ease',
              fontSize: '10px',
            }}>▶</span>
            {open ? 'Thu gọn' : 'Xem 4 tầng chi tiết'}
          </button>

          {/* Accordion Panel */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="bonus3-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  marginTop: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(217,119,6,0.12)',
                }}>
                  {BONUS3_TIERS.map((tier, i) => (
                    <div key={i} style={{
                      paddingLeft: '16px',
                      borderLeft: '2px solid rgba(217,119,6,0.30)',
                    }}>
                      <p style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#D97706',
                        marginBottom: '2px',
                        letterSpacing: '0.5px',
                      }}>
                        {tier.name}
                      </p>
                      <p style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '2.5px',
                        color: 'rgba(217,119,6,0.55)',
                        textTransform: 'uppercase',
                        fontStyle: 'italic',
                        marginBottom: '8px',
                      }}>
                        {tier.sub}
                      </p>
                      <p style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '15px',
                        lineHeight: 1.9,
                        color: 'rgba(203,213,225,0.80)',
                        fontWeight: 300,
                      }}>
                        {tier.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '12px',
            color: 'rgba(190,196,208,0.30)',
            textDecoration: 'line-through',
            marginTop: '16px',
          }}>
            Trị giá: {item.value}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */

export default function PricingAndOffer() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const earlyRef    = useRef(null)
  const earlyInView = useInView(earlyRef, { once: true, margin: '-80px' })

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
      {/* ── Eyebrow ── */}
      <motion.div
        variants={fadeUp} custom={0}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{ marginBottom: '28px' }}
      >
        <span className="eyebrow">LỜI ĐỀ NGHỊ</span>
      </motion.div>

      {/* ── Headline ── */}
      <motion.h2
        variants={fadeUp} custom={0.1}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(30px, 3.8vw, 52px)',
          fontWeight: 500,
          lineHeight: 1.18,
          color: '#D8DCE6',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          margin: '0 0 8px',
        }}
      >
        Tất cả những gì bạn nhận được
      </motion.h2>
      <motion.h3
        variants={fadeUp} custom={0.18}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(20px, 2.6vw, 36px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(190,196,208,0.40)',
          textAlign: 'center',
          margin: '0 0 72px',
        }}
      >
        khi bước vào Quantum Rebirth OS 2.0
      </motion.h3>

      {/* ── Value Stack Cards ── */}
      <div style={{ width: '100%', maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '72px' }}>
        {VALUE_ITEMS.map((item, i) =>
          item.isStar
            ? <Bonus3Card key={i} item={item} inView={inView} delay={0.25 + i * 0.08} />
            : <ValueCard key={i} item={item} inView={inView} delay={0.25 + i * 0.08} />
        )}
      </div>

      {/* ── Price Card ── */}
      <motion.div
        variants={fadeUp} custom={0.6}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{ width: '100%', maxWidth: '560px', marginBottom: '40px' }}
      >
      <CardSpotlight
        style={{
          background: 'rgba(23,33,58,0.85)',
          backdropFilter: 'blur(32px) saturate(150%)',
          WebkitBackdropFilter: 'blur(32px) saturate(150%)',
          borderRadius: '16px',
          boxShadow: '0 0 100px rgba(45,212,191,0.20), 0 0 50px rgba(45,212,191,0.10), 0 24px 80px rgba(0,0,0,0.55)',
          padding: '52px 52px',
          textAlign: 'center',
        }}
      >
        {/* Total value */}
        <div style={{ marginBottom: '32px' }}>
          {TABLE_ROWS.map((row, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid rgba(0,212,192,0.06)',
            }}>
              <span style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '13px',
                color: 'rgba(203,213,225,0.72)',
                fontWeight: 300,
                textAlign: 'left',
                lineHeight: 1.4,
              }}>
                {row.label}
              </span>
              <span style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '13px',
                color: 'rgba(203,213,225,0.38)',
                textDecoration: 'line-through',
                flexShrink: 0,
                marginLeft: '16px',
              }}>
                {row.value}
              </span>
            </div>
          ))}

          {/* Total row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 0 0',
          }}>
            <span style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '13px',
              color: 'rgba(203,213,225,0.75)',
              fontWeight: 500,
            }}>
              Tổng giá trị
            </span>
            <span style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '15px',
              color: 'rgba(203,213,225,0.42)',
              textDecoration: 'line-through',
            }}>
              5.176.000đ
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: '48px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,192,0.40), transparent)',
          margin: '0 auto 32px',
        }} />

        {/* Price */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(45,212,191,0.10)',
            border: '1px solid rgba(45,212,191,0.30)',
            color: '#2DD4BF',
            fontFamily: '"Inter", sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            boxShadow: '0 0 15px rgba(45,212,191,0.20)',
          }}>
            MỨC ĐẦU TƯ EARLY BIRD
          </span>
        </div>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(44px, 6vw, 72px)',
          fontWeight: 500,
          color: '#D8DCE6',
          lineHeight: 1,
          marginBottom: '8px',
          letterSpacing: '-0.03em',
          textShadow: '0 0 60px rgba(0,212,192,0.15)',
        }}>
          1.790.000đ
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '13px',
          color: 'rgba(217,119,6,0.70)',
          letterSpacing: '1px',
          marginBottom: '36px',
        }}>
          Tiết kiệm 65% — 3.386.000đ
        </p>

        {/* CTA */}
        <div id="cta-main" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <MagneticButton variant="primary">
            Tôi Gia Nhập Cohort Sáng Lập
          </MagneticButton>
        </div>

        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '12px',
          color: 'rgba(148,163,184,0.75)',
          letterSpacing: '0.5px',
          lineHeight: 1.7,
        }}>
          Early Bird · Thanh toán một lần · Truy cập trọn đời
        </p>
      </CardSpotlight>
      </motion.div>

      {/* ── Early Bird Explanation ── */}
      <div
        ref={earlyRef}
        style={{ width: '100%', maxWidth: '640px', marginBottom: '0' }}
      >
        {/* Divider */}
        <motion.div
          variants={fadeUp} custom={0}
          initial="hidden" animate={earlyInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '52px', textAlign: 'center' }}
        >
          <span className="divider-teal" style={{ display: 'block', marginBottom: '52px' }} />

          {/* Eyebrow */}
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '3.5px',
            textTransform: 'uppercase',
            color: 'rgba(0,212,192,0.80)',
            marginBottom: '20px',
          }}>
            Early Bird · Tại Sao Giá Này Chỉ Tồn Tại Một Lần
          </p>

          {/* Headline */}
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(18px, 1.9vw, 26px)',
            fontWeight: 500,
            lineHeight: 1.45,
            color: '#D8DCE6',
            marginBottom: '28px',
            letterSpacing: '-0.01em',
          }}>
            Đây là lần đầu tiên Quantum Rebirth OS 2.0
            <br />ra mắt công khai.
          </p>

          {/* Body intro */}
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(15px, 1.4vw, 17px)',
            lineHeight: 2.0,
            color: 'rgba(203,213,225,0.78)',
            fontWeight: 300,
            marginBottom: '16px',
          }}>
            Và tôi đang mời một nhóm nhỏ những người đầu tiên bước vào — không phải như "khách hàng", mà như <em style={{ color: '#D8DCE6', fontStyle: 'italic' }}>Cohort Sáng Lập</em>.
          </p>

          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            fontStyle: 'italic',
            lineHeight: 1.75,
            color: 'rgba(0,212,192,0.68)',
            marginBottom: 0,
          }}>
            Tại sao giá Early Bird thấp hơn 65% so với giá chính thức?
          </p>
        </motion.div>

        {[
          {
            title: 'Lý do thứ nhất — Bạn đang giúp tôi hoàn thiện hệ thống.',
            body: 'Cohort đầu tiên sẽ đi qua lộ trình này khi nó còn "tươi nhất" — và phản hồi của các bạn sẽ trực tiếp định hình những phiên bản tiếp theo. Tôi trân trọng điều đó. Và tôi muốn phản ánh sự trân trọng đó bằng con số cụ thể.',
          },
          {
            title: 'Lý do thứ hai — Kết quả của bạn là bằng chứng của tôi.',
            body: 'Khi Cohort Sáng lập hoàn thành 21 ngày và có những chuyển hóa thật sự — đó là điều tôi sẽ mang đến cho những người đến sau.',
          },
          {
            title: 'Lý do thứ ba — Vì hành động từ trạng thái đủ đầy, không phải từ sự sợ hãi.',
            body: 'Tôi không cần tạo ra sự khan hiếm giả tạo. Khi đủ số lượng người đã trải qua và có kết quả, giá sẽ được điều chỉnh lên mức phản ánh đúng giá trị thị trường. Không có deadline giả. Không có đồng hồ đếm ngược.',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp} custom={0.1 + i * 0.1}
            initial="hidden" animate={earlyInView ? 'visible' : 'hidden'}
            style={{ marginBottom: i < 2 ? '32px' : 0 }}
          >
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: '#E2E8F0',
              marginBottom: '10px',
              lineHeight: 1.6,
            }}>
              {item.title}
            </p>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '16px',
              lineHeight: 2.1,
              color: 'rgba(226,232,240,0.85)',
              fontWeight: 300,
              margin: 0,
            }}>
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
