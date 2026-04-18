import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden:  { opacity: 0, filter: 'blur(8px)', y: 20 },
  visible: (d = 0) => ({
    opacity: 1, filter: 'blur(0px)', y: 0,
    transition: { duration: 1.0, ease: EASE, delay: d },
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

const SECTIONS = [
  {
    id: 'privacy',
    number: '01',
    eyebrow: 'PRIVACY STATEMENT',
    title: 'Chính Sách Bảo Mật',
    accent: '#00D4C0',
    accentBorder: 'rgba(0,212,192,0.25)',
    body: 'Tại Quantum Rebirth, chúng tôi tin rằng sự riêng tư là nền tảng của sự tự do. Thông tin cá nhân (Email, Số điện thoại) của bạn chỉ được sử dụng cho mục đích duy nhất: Định danh và kích hoạt quyền truy cập vào hệ điều hành của bạn. Cũng như gửi lời mời vào cộng đồng (nếu có). Chúng tôi cam kết bảo mật tuyệt đối và không bao giờ chia sẻ dữ liệu này cho bên thứ ba.',
  },
  {
    id: 'terms',
    number: '02',
    eyebrow: 'TERMS OF TRANSFORMATION',
    title: 'Điều Khoản Sử Dụng',
    accent: '#D97706',
    accentBorder: 'rgba(217,119,6,0.25)',
    body: 'Bằng việc truy cập Quantum Rebirth OS, bạn đồng ý rằng đây là một hành trình cá nhân. Mọi tài liệu, tư duy và cấu trúc trong hệ thống này thuộc bản quyền của Quantum Rebirth. Bạn được cấp quyền truy cập trọn đời nhưng không được phép thương mại hóa hoặc tái phân phối nội dung dưới mọi hình thức.',
  },
  {
    id: 'refund',
    number: '03',
    eyebrow: 'REFUND PACT',
    title: 'Chính Sách Hoàn Tiền',
    accent: '#00D4C0',
    accentBorder: 'rgba(0,212,192,0.25)',
    body: 'Sự cam kết là chìa khóa của sự thay đổi. Vì tính chất đặc thù của sản phẩm kỹ thuật số và quyền truy cập tức thì, chúng tôi không áp dụng chính sách hoàn trả ngay sau khi tài khoản đã được kích hoạt. Chúng tôi tin rằng quyết định của bạn là bước đầu tiên trong quá trình tái sinh nhân dạng.',
  },
]

function SectionCard({ section, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index * 0.12}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        ...glass,
        padding: 'clamp(32px, 5vw, 56px)',
        borderLeft: `2px solid ${section.accentBorder}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '28px' }}>
        <span style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(36px, 4vw, 52px)',
          fontWeight: 500,
          lineHeight: 1,
          color: section.accent,
          flexShrink: 0,
          marginTop: '2px',
          opacity: 0.75,
        }}>
          {section.number}
        </span>
        <div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '3.5px',
            color: section.accent,
            marginBottom: '10px',
          }}>
            {section.eyebrow}
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            fontWeight: 500,
            lineHeight: 1.2,
            color: '#D8DCE6',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            {section.title}
          </h2>
        </div>
      </div>

      <div style={{
        width: '40px',
        height: '1px',
        background: `linear-gradient(90deg, ${section.accent}44, transparent)`,
        marginBottom: '28px',
      }} />

      <p style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(15px, 1.5vw, 18px)',
        fontStyle: 'italic',
        lineHeight: 1.85,
        color: 'rgba(203,213,225,0.80)',
        fontWeight: 400,
        margin: 0,
      }}>
        "{section.body}"
      </p>
    </motion.div>
  )
}

export default function Legal({ onBack }) {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <main style={{ background: '#080D1A', minHeight: '100svh', overflowX: 'hidden' }}>

      {/* Back button */}
      <div style={{ padding: '28px 24px 0', maxWidth: '800px', margin: '0 auto' }}>
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: '1px solid rgba(0,212,192,0.18)',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontFamily: '"Inter", sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '1.5px',
            color: 'rgba(0,212,192,0.70)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(0,212,192,0.40)'
            e.currentTarget.style.color = '#00D4C0'
            e.currentTarget.style.background = 'rgba(0,212,192,0.06)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(0,212,192,0.18)'
            e.currentTarget.style.color = 'rgba(0,212,192,0.70)'
            e.currentTarget.style.background = 'none'
          }}
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          QUAY LẠI
        </motion.button>
      </div>

      {/* Header */}
      <section
        ref={headerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'clamp(60px, 8vw, 100px) 24px 72px',
          textAlign: 'center',
        }}
      >
        <motion.p
          variants={fadeUp} custom={0}
          initial="hidden" animate={headerInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '4px',
            color: 'rgba(0,212,192,0.55)',
            marginBottom: '20px',
          }}
        >
          QUANTUM REBIRTH OS
        </motion.p>

        <motion.h1
          variants={fadeUp} custom={0.1}
          initial="hidden" animate={headerInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            fontWeight: 500,
            lineHeight: 1.1,
            color: '#D8DCE6',
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
          }}
        >
          Điều Khoản & Chính Sách
        </motion.h1>

        <motion.p
          variants={fadeUp} custom={0.18}
          initial="hidden" animate={headerInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            fontStyle: 'italic',
            lineHeight: 1.7,
            color: 'rgba(190,196,208,0.40)',
            maxWidth: '480px',
            margin: 0,
          }}
        >
          Minh bạch là nền tảng của sự tin tưởng.
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          variants={fadeUp} custom={0.24}
          initial="hidden" animate={headerInView ? 'visible' : 'hidden'}
          style={{
            marginTop: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,212,192,0.25))' }} />
          <span style={{ color: 'rgba(0,212,192,0.30)', fontSize: '8px' }}>◆</span>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, rgba(0,212,192,0.25), transparent)' }} />
        </motion.div>
      </section>

      {/* Content sections */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 24px 120px',
      }}>
        {SECTIONS.map((section, i) => (
          <SectionCard key={section.id} section={section} index={i} />
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(0,212,192,0.07)',
        padding: '40px 24px 64px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '14px',
          fontStyle: 'italic',
          color: 'rgba(190,196,208,0.22)',
          marginBottom: '12px',
        }}>
          © 2026 James Trương · Quantum Rebirth OS
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '12px',
          lineHeight: 1.8,
          color: 'rgba(190,196,208,0.13)',
          maxWidth: '520px',
          margin: '0 auto',
          fontWeight: 300,
        }}>
          Trang này chứa thông tin về một chương trình chuyển hóa cá nhân dựa trên các nghiên cứu về Neuroplasticity, Epigenetics và Cognitive Behavioral Therapy. Kết quả cá nhân có thể khác nhau tùy theo mức độ cam kết thực hành của từng người.
        </p>
      </footer>
    </main>
  )
}
