import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1.0, ease: EASE, delay: d },
  }),
}

const BANK = {
  bin:    'TCB',
  name:   'Techcombank',
  number: '2903888888',
  owner:  'TRUONG CHIEN PHUOC',
  amount: 1790000,
}

/* ── Đăng ký tại formspree.io rồi thay YOUR_FORM_ID ── */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

/* ── Validators ── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
const isValidPhone = (v) => /^(0|\+84)[0-9]{8,9}$/.test(v.trim().replace(/\s/g, ''))

/* ══════════════════════════════════════════════════════════════
   PRODUCT MOCKUP (left column)
══════════════════════════════════════════════════════════════ */

function ProductMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      <div style={{
        position: 'absolute', inset: '-40px',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,192,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'relative',
        borderRadius: '16px',
        background: 'linear-gradient(145deg, rgba(23,33,58,0.95) 0%, rgba(8,13,26,0.98) 100%)',
        border: '1px solid rgba(0,212,192,0.18)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.60), 0 0 60px rgba(0,212,192,0.08), inset 0 1px 0 rgba(0,212,192,0.08)',
        padding: '48px 40px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,192,0.60), transparent)',
        }} />

        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, rgba(0,212,192,0.20) 0%, rgba(0,212,192,0.06) 100%)',
          border: '1px solid rgba(0,212,192,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 32px', fontSize: '28px',
          boxShadow: '0 0 30px rgba(0,212,192,0.15)',
        }}>◈</div>

        <span style={{
          display: 'inline-block', padding: '5px 14px', borderRadius: '9999px',
          background: 'rgba(45,212,191,0.10)', border: '1px solid rgba(45,212,191,0.28)',
          color: '#2DD4BF', fontFamily: '"Inter", sans-serif', fontSize: '10px',
          fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px',
        }}>
          Cohort Sáng Lập
        </span>

        <p style={{
          fontFamily: '"Playfair Display", serif', fontSize: 'clamp(22px, 2.4vw, 30px)',
          fontWeight: 500, color: '#D8DCE6', lineHeight: 1.25, marginBottom: '12px', letterSpacing: '-0.01em',
        }}>
          Quantum Rebirth OS 2.0
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif', fontSize: '13px', color: 'rgba(0,212,192,0.70)',
          letterSpacing: '1.5px', marginBottom: '32px', fontWeight: 500,
        }}>
          GÓI SÁNG LẬP · TRUY CẬP TRỌN ĐỜI
        </p>

        <div style={{
          width: '40px', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,192,0.40), transparent)',
          margin: '0 auto 28px',
        }} />

        {['7 Module · 21 Ngày Thực Chiến', 'Sổ tay Kiểm toán Lịch sử',
          'Audio Zero-Point Meditator', 'The Reality Architect Protocol',
          'Bảo hành 21 ngày hoàn tiền 100%'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 4 ? '12px' : 0, textAlign: 'left' }}>
            <span style={{ color: '#00D4C0', fontSize: '8px', flexShrink: 0 }}>◆</span>
            <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(203,213,225,0.78)', lineHeight: 1.5 }}>
              {item}
            </span>
          </div>
        ))}

        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(0,212,192,0.08)' }}>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '11px', color: 'rgba(203,213,225,0.38)', textDecoration: 'line-through', marginBottom: '4px' }}>
            5.176.000đ
          </p>
          <p style={{
            fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 3vw, 38px)',
            fontWeight: 500, color: '#D8DCE6', letterSpacing: '-0.02em', marginBottom: '4px',
            lineHeight: 1, textShadow: '0 0 40px rgba(0,212,192,0.15)',
          }}>
            1.790.000đ
          </p>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '11px', color: 'rgba(217,119,6,0.70)', letterSpacing: '1px', marginTop: '20px' }}>
            Tiết kiệm 65% · Early Bird
          </p>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAYMENT MODAL
══════════════════════════════════════════════════════════════ */

function PaymentModal({ phone, onClose, onConfirmPaid }) {
  const transferContent = `QUANTUM ${phone}`
  const qrUrl = `https://img.vietqr.io/image/${BANK.bin}-${BANK.number}-compact2.png?amount=${BANK.amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK.owner)}`

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(4,8,18,0.88)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        zIndex: 9999, padding: '16px', overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: 'rgba(12,20,38,0.98)',
          backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(0,212,192,0.20)',
          borderRadius: '20px',
          boxShadow: '0 0 80px rgba(0,212,192,0.10), 0 40px 100px rgba(0,0,0,0.70)',
          padding: 'clamp(24px, 5vw, 48px)',
          maxWidth: '440px', width: '100%', textAlign: 'center',
          margin: 'auto',
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: '25%', right: '25%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,192,0.55), transparent)',
          borderRadius: '9999px',
        }} />

        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(0,212,192,0.06)', border: '1px solid rgba(0,212,192,0.15)',
          borderRadius: '50%', width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'rgba(190,196,208,0.60)', fontSize: '14px', lineHeight: 1,
        }}>✕</button>

        {/* Header */}
        <p style={{
          fontFamily: '"Inter", sans-serif', fontSize: '10px', fontWeight: 700,
          letterSpacing: '3.5px', color: 'rgba(0,212,192,0.75)', marginBottom: '12px', textTransform: 'uppercase',
        }}>
          BƯỚC 2 · THANH TOÁN
        </p>
        <p style={{
          fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px, 2vw, 22px)',
          fontWeight: 500, color: '#D8DCE6', lineHeight: 1.3, marginBottom: '6px',
        }}>
          Quét mã QR để chuyển khoản
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif', fontSize: '13px',
          color: 'rgba(190,196,208,0.50)', marginBottom: '24px', fontWeight: 300,
        }}>
          Xác nhận trong 5–15 phút sau khi thanh toán
        </p>

        {/* QR Code — mobile-first: full width, centered */}
        <div style={{
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,212,192,0.18)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '20px',
          boxShadow: '0 0 40px rgba(0,212,192,0.06)',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <img
            src={qrUrl}
            alt="QR Code VietQR chuyển khoản"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '280px',
              height: 'auto',
              borderRadius: '10px',
            }}
          />
        </div>

        {/* Bank info rows */}
        {[
          { label: 'Ngân hàng',    value: BANK.name },
          { label: 'Số tài khoản', value: BANK.number },
          { label: 'Chủ tài khoản', value: BANK.owner },
          { label: 'Số tiền',      value: '1.790.000 đ', highlight: true },
          { label: 'Nội dung CK',  value: transferContent, highlight: true, mono: true },
        ].map(({ label, value, highlight, mono }) => (
          <div key={label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '9px 0', borderBottom: '1px solid rgba(0,212,192,0.06)', gap: '12px',
          }}>
            <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', color: 'rgba(148,163,184,0.60)', flexShrink: 0 }}>
              {label}
            </span>
            <span style={{
              fontFamily: mono ? '"Courier New", monospace' : '"Inter", sans-serif',
              fontSize: '13px', fontWeight: highlight ? 600 : 400,
              color: highlight ? '#2DD4BF' : 'rgba(203,213,225,0.85)',
              textAlign: 'right', wordBreak: 'break-all',
            }}>
              {value}
            </span>
          </div>
        ))}

        {/* CTA — Tôi đã chuyển khoản */}
        <motion.button
          onClick={onConfirmPaid}
          whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0,212,192,0.25)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: '24px', width: '100%',
            padding: '17px 24px',
            background: 'linear-gradient(135deg, rgba(0,212,192,0.22) 0%, rgba(0,212,192,0.12) 100%)',
            border: '1px solid rgba(0,212,192,0.50)',
            borderRadius: '10px', cursor: 'pointer',
            fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: 700,
            letterSpacing: '2.5px', color: '#2DD4BF', textTransform: 'uppercase',
            boxShadow: '0 0 24px rgba(0,212,192,0.12)',
          }}
        >
          ✓ &nbsp; Tôi Đã Chuyển Khoản
        </motion.button>

        <button onClick={onClose} style={{
          marginTop: '14px', fontFamily: '"Inter", sans-serif', fontSize: '11px',
          fontWeight: 500, letterSpacing: '1.5px', color: 'rgba(190,196,208,0.32)',
          background: 'none', border: 'none', cursor: 'pointer',
          textTransform: 'uppercase', display: 'block', width: '100%',
        }}>
          Quay lại chỉnh sửa
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   CHECKOUT FORM (right column)
══════════════════════════════════════════════════════════════ */

const inputBase = {
  width: '100%',
  background: 'rgba(15,23,42,0.60)',
  borderRadius: '8px',
  padding: '14px 18px',
  fontFamily: '"Inter", sans-serif',
  fontSize: '15px',
  fontWeight: 300,
  color: '#D8DCE6',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
}

function CheckoutForm({ onSuccess }) {
  const [form, setForm]     = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [focused, setFocused] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitErr, setSubmitErr] = useState('')

  const isReady = useMemo(
    () => form.name.trim().length > 0 && isValidEmail(form.email) && isValidPhone(form.phone),
    [form]
  )

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors(er => ({ ...er, [k]: '' }))
    if (submitErr) setSubmitErr('')
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim())       errs.name  = 'Vui lòng nhập họ và tên'
    if (!isValidEmail(form.email)) errs.email = 'Email không đúng định dạng'
    if (!isValidPhone(form.phone)) errs.phone = 'SĐT không hợp lệ (VD: 0901234567)'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Đơn hàng mới — Quantum Rebirth OS — ${form.name}`,
          name:  form.name,
          email: form.email,
          phone: form.phone,
        }),
      })
      if (!res.ok) throw new Error('Formspree error')
    } catch {
      /* Không chặn luồng — vẫn hiện QR nếu Formspree chưa được cấu hình */
    } finally {
      setLoading(false)
    }

    onSuccess({ name: form.name, email: form.email, phone: form.phone.trim() })
  }

  const fields = [
    { key: 'name',  label: 'Họ và tên',     type: 'text',  placeholder: 'Nguyễn Văn A' },
    { key: 'email', label: 'Địa chỉ Email',  type: 'email', placeholder: 'email@example.com' },
    { key: 'phone', label: 'Số điện thoại',  type: 'tel',   placeholder: '0901 234 567' },
  ]

  const getBorderColor = (key) => {
    if (errors[key]) return 'rgba(239,68,68,0.55)'
    if (focused === key) return 'rgba(0,212,192,0.50)'
    if (form[key] && (key === 'email' ? isValidEmail(form[key]) : key === 'phone' ? isValidPhone(form[key]) : form[key].trim()))
      return 'rgba(0,212,192,0.30)'
    return 'rgba(0,212,192,0.14)'
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <span style={{
          display: 'inline-block', fontFamily: '"Inter", sans-serif', fontSize: '10px',
          fontWeight: 700, letterSpacing: '3.5px', color: 'rgba(0,212,192,0.75)',
          marginBottom: '14px', textTransform: 'uppercase',
        }}>
          BƯỚC 1 · THÔNG TIN ĐẶT HÀNG
        </span>
        <h1 style={{
          fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 2.8vw, 36px)',
          fontWeight: 500, color: '#D8DCE6', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0,
        }}>
          Hoàn tất đăng ký
        </h1>
        <p style={{
          fontFamily: '"Inter", sans-serif', fontSize: '15px',
          color: 'rgba(190,196,208,0.55)', fontWeight: 300, marginTop: '10px', lineHeight: 1.7,
        }}>
          Điền thông tin để nhận hướng dẫn thanh toán và link truy cập.
        </p>
      </div>

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
        {fields.map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label style={{
              display: 'block', fontFamily: '"Inter", sans-serif', fontSize: '11px',
              fontWeight: 600, letterSpacing: '2px', marginBottom: '8px', textTransform: 'uppercase',
              color: errors[key] ? 'rgba(239,68,68,0.80)' : 'rgba(190,196,208,0.65)',
            }}>
              {errors[key] || label}
            </label>
            <input
              type={type}
              value={form[key]}
              onChange={set(key)}
              onFocus={() => setFocused(key)}
              onBlur={() => setFocused(null)}
              placeholder={placeholder}
              style={{
                ...inputBase,
                border: `1px solid ${getBorderColor(key)}`,
                boxShadow: focused === key && !errors[key] ? '0 0 0 3px rgba(0,212,192,0.07)' : 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Trust signals */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
        {['🔒 Bảo mật SSL', '↩ Hoàn tiền 21 ngày', '∞ Truy cập trọn đời'].map(t => (
          <span key={t} style={{
            fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: 400,
            color: 'rgba(148,163,184,0.65)', background: 'rgba(0,212,192,0.04)',
            border: '1px solid rgba(0,212,192,0.10)', borderRadius: '9999px', padding: '5px 12px',
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Submit */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <MagneticButton
          variant="primary"
          className="cta-btn-mobile"
          disabled={!isReady || loading}
        >
          {loading ? 'Đang xử lý...' : 'Xác Nhận Đơn Hàng'}
        </MagneticButton>
      </div>

      <p style={{
        fontFamily: '"Inter", sans-serif', fontSize: '12px',
        color: isReady ? 'rgba(0,212,192,0.55)' : 'rgba(148,163,184,0.38)',
        marginTop: '14px', lineHeight: 1.7,
        transition: 'color 0.3s ease',
      }}>
        {isReady
          ? '✓ Thông tin hợp lệ — Nhấn xác nhận để tiếp tục'
          : 'Điền đủ Họ tên · Email · SĐT đúng định dạng để tiếp tục'}
      </p>
    </form>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */

export default function Checkout({ onBack, onThankYou }) {
  const [orderInfo, setOrderInfo] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleSuccess = (info) => {
    setOrderInfo(info)
    setShowModal(true)
  }

  const handleConfirmPaid = () => {
    setShowModal(false)
    onThankYou(orderInfo)
  }

  return (
    <main style={{ background: '#080D1A', minHeight: '100svh', overflowX: 'hidden' }}>

      <div style={{
        position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(0,212,192,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Top nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 32px',
        background: 'rgba(8,13,26,0.80)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,212,192,0.07)',
      }}>
        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(190,196,208,0.55)', fontFamily: '"Inter", sans-serif',
          fontSize: '12px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', padding: 0,
        }}>
          ← Quay lại
        </button>
        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontStyle: 'italic', color: 'rgba(0,212,192,0.70)', margin: 0 }}>
          Quantum Rebirth OS
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Inter", sans-serif', fontSize: '11px', color: 'rgba(148,163,184,0.50)' }}>
          <span>🔒</span> Thanh toán bảo mật
        </div>
      </nav>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: 'clamp(100px, 12vw, 140px) 24px 80px' }}>

        {/* Progress steps */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '56px', justifyContent: 'center' }}
        >
          {[{ n: '1', label: 'Thông tin' }, { n: '2', label: 'Thanh toán' }, { n: '3', label: 'Truy cập' }].map(({ n, label }, i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: i === 0 ? 1 : 0.38 }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: i === 0 ? 'rgba(0,212,192,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i === 0 ? 'rgba(0,212,192,0.50)' : 'rgba(255,255,255,0.10)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: 700,
                  color: i === 0 ? '#2DD4BF' : 'rgba(190,196,208,0.40)',
                }}>
                  {n}
                </div>
                <span style={{
                  fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: 500,
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  color: i === 0 ? 'rgba(190,196,208,0.80)' : 'rgba(190,196,208,0.38)',
                }}>
                  {label}
                </span>
              </div>
              {i < 2 && <div style={{ width: '32px', height: '1px', background: 'rgba(190,196,208,0.12)' }} />}
            </div>
          ))}
        </motion.div>

        {/* Two-column layout */}
        <div className="checkout-grid">
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ProductMockup />
          </motion.div>

          <motion.div variants={fadeUp} custom={0.15} initial="hidden" animate="visible"
            style={{
              background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,212,192,0.10)', borderRadius: '16px',
              padding: 'clamp(28px, 4vw, 48px)', boxShadow: '0 16px 60px rgba(0,0,0,0.40)',
            }}>
            <CheckoutForm onSuccess={handleSuccess} />
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showModal && orderInfo && (
          <PaymentModal
            phone={orderInfo.phone}
            onClose={() => setShowModal(false)}
            onConfirmPaid={handleConfirmPaid}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
