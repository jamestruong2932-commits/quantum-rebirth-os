import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1.1, ease: EASE, delay: d },
  }),
}

export default function ThankYou({ name, email, phone, onBack }) {
  const [dots, setDots] = useState('.')

  /* Animated dots for "đang kích hoạt" */
  useEffect(() => {
    const id = setInterval(() => setDots(d => d.length >= 3 ? '.' : d + '.'), 600)
    return () => clearInterval(id)
  }, [])

  const credentials = [
    { label: 'Tài khoản (Email đăng nhập)', value: email, highlight: true },
    { label: 'Mật khẩu (Số điện thoại)',    value: phone, highlight: true, mono: true },
  ]

  return (
    <main style={{ background: '#080D1A', minHeight: '100svh', overflowX: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', top: '0', left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '600px', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,192,0.08) 0%, transparent 65%)',
      }} />
      <div style={{
        position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '400px', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(217,119,6,0.04) 0%, transparent 65%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', width: '100%', textAlign: 'center' }}>

        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 35%, rgba(0,212,192,0.25) 0%, rgba(0,212,192,0.06) 100%)',
            border: '1px solid rgba(0,212,192,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto',
            boxShadow: '0 0 50px rgba(0,212,192,0.20), 0 0 100px rgba(0,212,192,0.08)',
            fontSize: '32px',
          }}>
            ✓
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp} custom={0.1} initial="hidden" animate="visible"
          style={{
            fontFamily: '"Inter", sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3.5px', color: 'rgba(0,212,192,0.75)', marginBottom: '20px', textTransform: 'uppercase',
          }}
        >
          ĐƠN HÀNG ĐÃ ĐƯỢC GHI NHẬN
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp} custom={0.18} initial="hidden" animate="visible"
          style={{
            fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 500, color: '#D8DCE6', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '16px',
          }}
        >
          Chào mừng, {name || 'bạn'}.
        </motion.h1>

        <motion.p
          variants={fadeUp} custom={0.25} initial="hidden" animate="visible"
          style={{
            fontFamily: '"Playfair Display", serif', fontSize: 'clamp(16px, 1.6vw, 20px)',
            fontStyle: 'italic', fontWeight: 400, color: 'rgba(203,213,225,0.65)', lineHeight: 1.7, marginBottom: '52px',
          }}
        >
          Bước đầu tiên của quá trình Tái Sinh đã bắt đầu.
        </motion.p>

        {/* Account info card */}
        <motion.div
          variants={fadeUp} custom={0.32} initial="hidden" animate="visible"
          style={{
            background: 'rgba(15,23,42,0.70)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(0,212,192,0.18)',
            borderRadius: '16px',
            padding: 'clamp(28px, 4vw, 44px)',
            marginBottom: '32px',
            boxShadow: '0 0 60px rgba(0,212,192,0.06), 0 16px 60px rgba(0,0,0,0.50)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top accent */}
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,212,192,0.50), transparent)',
          }} />

          <p style={{
            fontFamily: '"Inter", sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', color: 'rgba(0,212,192,0.65)', marginBottom: '24px', textTransform: 'uppercase',
          }}>
            THÔNG TIN TÀI KHOẢN CỦA BẠN
          </p>

          {credentials.map(({ label, value, highlight, mono }) => (
            <div key={label} style={{
              display: 'flex', flexDirection: 'column', gap: '6px',
              padding: '16px 0', borderBottom: '1px solid rgba(0,212,192,0.07)',
              textAlign: 'left',
            }}>
              <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', color: 'rgba(148,163,184,0.55)', textTransform: 'uppercase' }}>
                {label}
              </span>
              <span style={{
                fontFamily: mono ? '"Courier New", monospace' : '"Inter", sans-serif',
                fontSize: 'clamp(15px, 1.5vw, 18px)', fontWeight: highlight ? 500 : 400,
                color: '#2DD4BF', letterSpacing: mono ? '2px' : '0',
              }}>
                {value}
              </span>
            </div>
          ))}

          {/* Activation status */}
          <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#00D4C0',
              boxShadow: '0 0 12px rgba(0,212,192,0.80)',
              animation: 'pulse-teal 1.5s ease-in-out infinite',
              flexShrink: 0,
            }} />
            <p style={{
              fontFamily: '"Inter", sans-serif', fontSize: '13px',
              color: 'rgba(0,212,192,0.70)', fontWeight: 400, margin: 0,
            }}>
              Đang kích hoạt tài khoản{dots} &nbsp;·&nbsp; Hoàn tất trong ~15 phút
            </p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          variants={fadeUp} custom={0.40} initial="hidden" animate="visible"
          style={{
            background: 'rgba(8,13,26,0.60)',
            border: '1px solid rgba(190,196,208,0.07)',
            borderRadius: '16px',
            padding: 'clamp(24px, 4vw, 36px)',
            marginBottom: '44px',
            textAlign: 'left',
          }}
        >
          <p style={{
            fontFamily: '"Inter", sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', color: 'rgba(217,119,6,0.80)', marginBottom: '24px', textTransform: 'uppercase',
          }}>
            BƯỚC TIẾP THEO
          </p>

          {/* Step 1 */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{
              flexShrink: 0, width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(0,212,192,0.08)', border: '1px solid rgba(0,212,192,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
            }}>📧</div>
            <div>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 600, color: '#CBD5E1', margin: '0 0 4px' }}>
                Kiểm tra email xác nhận
              </p>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(148,163,184,0.70)', lineHeight: 1.6, margin: 0 }}>
                Chúng tôi đã gửi xác nhận đến <span style={{ color: '#2DD4BF', fontWeight: 500 }}>{email}</span>. Kiểm tra cả hộp thư Spam nếu không thấy trong Inbox.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{
              flexShrink: 0, width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(0,212,192,0.08)', border: '1px solid rgba(0,212,192,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
            }}>🔑</div>
            <div>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 600, color: '#CBD5E1', margin: '0 0 4px' }}>
                Đăng nhập vào hệ thống
              </p>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(148,163,184,0.70)', lineHeight: 1.6, margin: '0 0 10px' }}>
                Sau khi tài khoản được kích hoạt (~15 phút), dùng thông tin ở trên để đăng nhập lần đầu.
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(0,212,192,0.06)', border: '1px solid rgba(0,212,192,0.18)',
                borderRadius: '8px', padding: '6px 12px',
              }}>
                <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: 600, color: 'rgba(0,212,192,0.80)', letterSpacing: '0.5px' }}>
                  Login: Email + Số điện thoại (mật khẩu)
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              flexShrink: 0, width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
            }}>💬</div>
            <div>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 600, color: '#CBD5E1', margin: '0 0 4px' }}>
                Cần hỗ trợ?
              </p>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(148,163,184,0.70)', lineHeight: 1.6, margin: '0 0 10px' }}>
                Nếu sau 15 phút vẫn chưa nhận được email hoặc gặp vấn đề đăng nhập, liên hệ ngay:
              </p>
              <a href="mailto:jamestruong2932@gmail.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 500,
                color: 'rgba(217,119,6,0.85)', textDecoration: 'none',
                background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.18)',
                borderRadius: '8px', padding: '6px 12px',
              }}>
                jamestruong2932@gmail.com
              </a>
            </div>
          </div>
        </motion.div>

        {/* Closing quote */}
        <motion.div
          variants={fadeUp} custom={0.50} initial="hidden" animate="visible"
          style={{ marginBottom: '48px' }}
        >
          <div style={{
            width: '40px', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,212,192,0.35), transparent)',
            margin: '0 auto 28px',
          }} />
          <p style={{
            fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px, 2vw, 24px)',
            fontStyle: 'italic', fontWeight: 500, color: '#D8DCE6', lineHeight: 1.6, margin: '0 0 10px',
          }}>
            Hành trình tái sinh bắt đầu từ quyết định này.
          </p>
          <p style={{
            fontFamily: '"Playfair Display", serif', fontSize: 'clamp(14px, 1.4vw, 17px)',
            fontStyle: 'italic', color: 'rgba(0,212,192,0.60)', margin: 0,
          }}>
            — James Trương
          </p>
        </motion.div>

        {/* Back to home */}
        <motion.div variants={fadeUp} custom={0.58} initial="hidden" animate="visible">
          <button
            onClick={onBack}
            style={{
              fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: 600,
              letterSpacing: '2px', color: 'rgba(190,196,208,0.40)',
              background: 'none', border: 'none', cursor: 'pointer',
              textTransform: 'uppercase', textDecoration: 'underline',
              textDecorationColor: 'rgba(190,196,208,0.15)',
            }}
          >
            ← Quay về trang chủ
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse-teal {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </main>
  )
}
