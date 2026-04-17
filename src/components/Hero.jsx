import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import MagneticButton from './MagneticButton'
import TextReveal from './TextReveal'

/* ══════════════════════════════════════════════════════════════════
   CONSTANTS — Zero-Point Field palette
══════════════════════════════════════════════════════════════════ */

const C = {
  navy:         '#080D1A',
  navyMid:      '#0C1222',
  navySurface:  '#111827',
  navyRaised:   '#17213A',
  silver:       '#BEC4D0',
  silverBright: '#D8DCE6',
  silverDim:    'rgba(190,196,208,0.50)',
  silverGhost:  'rgba(190,196,208,0.22)',
  teal:         '#00D4C0',
  tealGlow:     'rgba(0,212,192,0.18)',
  tealGhost:    'rgba(0,212,192,0.07)',
  tealText:     'rgba(0,212,192,0.80)',
  tealBorder:   'rgba(0,212,192,0.12)',
}

const EASE_VOID = [0.22, 1, 0.36, 1]

/* ══════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════════════════════════════ */

const fadeFloatUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: EASE_VOID, delay },
  }),
}

const blurFocus = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 1.3, ease: EASE_VOID, delay },
  }),
}

const videoReveal = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: EASE_VOID, delay: 0.6 },
  },
}


/* ══════════════════════════════════════════════════════════════════
   AMBIENT NEBULA GLOWS — layered radial blobs, ultra-slow motion
══════════════════════════════════════════════════════════════════ */

const GLOWS = [
  { top: '-8%',  left: '-12%', w: '60vw', h: '60vw', opacity: 0.055, dur: 60, delay: 0,  dx: 20, dy: 14 },
  { top: '40%',  left: '55%',  w: '50vw', h: '50vw', opacity: 0.040, dur: 75, delay: 18, dx: -16, dy: 22 },
  { top: '65%',  left: '-8%',  w: '44vw', h: '44vw', opacity: 0.048, dur: 68, delay: 9,  dx: 18, dy: -12 },
  { top: '20%',  left: '30%',  w: '35vw', h: '35vw', opacity: 0.025, dur: 90, delay: 30, dx: -10, dy: 8 },
]

const BEAMS = [
  { angle: 28, top: '8%',  opacity: 0.10, dur: 55, delay: 0,  dx: 14 },
  { angle: 20, top: '28%', opacity: 0.07, dur: 68, delay: 8,  dx: -10 },
  { angle: 35, top: '52%', opacity: 0.09, dur: 50, delay: 3,  dx: 18 },
  { angle: 25, top: '74%', opacity: 0.06, dur: 80, delay: 15, dx: -16 },
  { angle: 40, top: '18%', opacity: 0.05, dur: 72, delay: 22, dx: 12 },
]

/* ── Gold/Amber Depth System ─────────────────────────────────────
   Two layers:
   1. GOLD_BLOBS  — large radial nebulae, ultra-slow orbit, heavy blur
                    → warm ambient depth far behind content
   2. GOLD_BANDS  — diagonal veil bands, drift + breathe slightly
                    → linear gravity pull that guides the eye downward
─────────────────────────────────────────────────────────────── */
const GOLD_BLOBS = [
  { top:  '0%', left: '58%', w: '52vw', h: '40vw', opacity: 0.052, dur: 145, delay:  0, dx: -20, dy: 24, opRange: [0.052, 0.068, 0.044, 0.052] },
  { top: '50%', left: '-8%', w: '44vw', h: '36vw', opacity: 0.038, dur: 175, delay: 60, dx:  26, dy: -18, opRange: [0.038, 0.050, 0.028, 0.038] },
  { top: '28%', left: '32%', w: '36vw', h: '30vw', opacity: 0.026, dur: 210, delay: 90, dx: -14, dy:  20, opRange: [0.026, 0.034, 0.020, 0.026] },
]

const GOLD_BANDS = [
  { top: '14%', angle: -1.8, opacity: 0.040, dur: 132, delay:  0, dx: 30, dy:  9, scaleX: [1, 1.07, 0.96, 1] },
  { top: '48%', angle:  2.2, opacity: 0.027, dur: 168, delay: 48, dx: -24, dy: 13, scaleX: [1, 0.94, 1.05, 1] },
  { top: '76%', angle: -0.9, opacity: 0.033, dur: 118, delay: 24, dx:  20, dy: -9, scaleX: [1, 1.04, 0.97, 1] },
]

function AmbientField() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}
    >
      {/* Nebula blobs */}
      {GLOWS.map((g, i) => (
        <motion.div
          key={`glow-${i}`}
          animate={{
            x: [0, g.dx, 0],
            y: [0, g.dy, 0],
          }}
          transition={{ duration: g.dur, repeat: Infinity, ease: 'easeInOut', delay: g.delay }}
          style={{
            position: 'absolute',
            top: g.top,
            left: g.left,
            width: g.w,
            height: g.h,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,192,1) 0%, transparent 68%)',
            opacity: g.opacity,
            filter: 'blur(72px)',
          }}
        />
      ))}

      {/* Diagonal light beams */}
      {BEAMS.map((b, i) => (
        <motion.div
          key={`beam-${i}`}
          animate={{ x: [`${-b.dx}px`, `${b.dx}px`] }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: b.delay,
          }}
          style={{
            position: 'absolute',
            top: b.top,
            left: '-20%',
            width: '140%',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(0,212,192,0.6) 35%, rgba(0,237,214,0.8) 50%, rgba(0,212,192,0.6) 65%, transparent 100%)',
            transform: `rotate(${b.angle}deg)`,
            transformOrigin: 'center center',
            opacity: b.opacity,
          }}
        />
      ))}

      {/* ── Gold radial nebulae — far-depth warm ambient ── */}
      {GOLD_BLOBS.map((g, i) => (
        <motion.div
          key={`gold-blob-${i}`}
          animate={{
            x:       [0, g.dx, -g.dx * 0.3, 0],
            y:       [0, g.dy, g.dy * 0.4,  0],
            opacity: g.opRange,
          }}
          transition={{
            duration: g.dur,
            repeat:   Infinity,
            ease:     'easeInOut',
            delay:    g.delay,
          }}
          style={{
            position:     'absolute',
            top:          g.top,
            left:         g.left,
            width:        g.w,
            height:       g.h,
            borderRadius: '50%',
            background:   'radial-gradient(ellipse at 45% 45%, rgba(210,165,55,1) 0%, rgba(190,138,40,0.6) 38%, transparent 70%)',
            filter:       'blur(80px)',
            opacity:      g.opacity,
          }}
        />
      ))}

      {/* ── Gold veil bands — diagonal gravity pull ── */}
      {GOLD_BANDS.map((g, i) => (
        <motion.div
          key={`gold-band-${i}`}
          animate={{
            x:      [0, g.dx, -g.dx * 0.35, 0],
            y:      [0, g.dy, 0],
            scaleX: g.scaleX,
          }}
          transition={{
            duration: g.dur,
            repeat:   Infinity,
            ease:     'easeInOut',
            delay:    g.delay,
          }}
          style={{
            position:        'absolute',
            top:             g.top,
            left:            '-22%',
            width:           '144%',
            height:          '200px',
            background:      'linear-gradient(180deg, transparent 0%, rgba(200,155,48,0.72) 44%, rgba(215,172,62,0.88) 50%, rgba(200,155,48,0.72) 56%, transparent 100%)',
            opacity:         g.opacity,
            filter:          'blur(46px)',
            transform:       `rotate(${g.angle}deg)`,
            transformOrigin: 'center center',
          }}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   GLASS CARD — Dark void glassmorphism + teal border
══════════════════════════════════════════════════════════════════ */

function GlassCard({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      variants={fadeFloatUp}
      custom={delay}
      initial="hidden"
      animate="visible"
      style={{
        background: 'rgba(17,24,39,0.55)',
        backdropFilter: 'blur(24px) saturate(140%)',
        WebkitBackdropFilter: 'blur(24px) saturate(140%)',
        border: '1px solid rgba(0,212,192,0.10)',
        borderRadius: '12px',
        boxShadow:
          '0 8px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(0,212,192,0.05)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   VSL EMBED
══════════════════════════════════════════════════════════════════ */

function VSLEmbed() {
  const [playing, setPlaying] = useState(false)

  return (
    <motion.div
      variants={videoReveal}
      initial="hidden"
      animate="visible"
      style={{ position: 'relative', width: '100%', maxWidth: '1024px', margin: '0 auto' }}
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: 'absolute',
          inset: '-10px',
          borderRadius: '10px',
          background: 'radial-gradient(ellipse at center, rgba(0,212,192,0.22) 0%, transparent 70%)',
          filter: 'blur(28px)',
          zIndex: 0,
        }}
      />

      {/* Frame */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          border: '1px solid rgba(0,212,192,0.22)',
          borderRadius: '4px',
          aspectRatio: '16/9',
          overflow: 'hidden',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}
      >
        {!playing ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(160deg, #0C1525 0%, #040810 100%)',
            }}
          >
            {/* Noise texture */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.025,
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
              }}
            />
            {/* Vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
              }}
            />

            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              aria-label="Phát video"
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <motion.span
                whileHover={{ scale: 1.10 }}
                transition={{ duration: 0.35, ease: EASE_VOID }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,212,192,0.45)',
                  background: 'rgba(0,212,192,0.05)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 0 28px rgba(0,212,192,0.18)',
                }}
              >
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none">
                  <path d="M1 1.5L17 10.5L1 19.5V1.5Z" fill="rgba(0,212,192,0.85)" />
                </svg>
              </motion.span>

              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'rgba(0,212,192,0.55)',
                }}
              >
                Xem Video · 16 phút
              </span>
            </button>
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#04070F',
            }}
          >
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '12px',
                letterSpacing: '3px',
                color: 'rgba(0,212,192,0.45)',
              }}
            >
              VIDEO ĐANG TẢI...
            </p>
          </div>
        )}
      </div>

      {/* Caption */}
      <motion.p
        variants={fadeFloatUp}
        custom={0.9}
        initial="hidden"
        animate="visible"
        style={{
          marginTop: '36px',
          textAlign: 'center',
          fontFamily: '"Inter", sans-serif',
          fontSize: '13px',
          lineHeight: 1.7,
          fontStyle: 'italic',
          color: 'rgba(190,196,208,0.38)',
          maxWidth: '540px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Video này dài 16 phút. Hãy xem toàn bộ trước khi đọc tiếp — nội dung
        phía dưới sẽ có ý nghĩa hoàn toàn khác sau khi bạn đã xem.
      </motion.p>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MICRO-HOOK BLOCK
══════════════════════════════════════════════════════════════════ */

function MicroHook() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const lines = [
    { text: 'Tôi muốn hỏi bạn một điều.', weight: 400 },
    { text: 'Không phải câu hỏi lớn lao. Một câu rất nhỏ.', weight: 300 },
    {
      text: 'Lần cuối bạn thức dậy mà không cảm thấy gì nặng nề — là khi nào?',
      weight: 400,
    },
    { text: 'Không phải nhẹ nhàng vì bạn vừa nghỉ ngơi đủ giấc.', weight: 300 },
    {
      text: 'Mà nhẹ nhàng theo cách khác — theo cách mà ngay khi mở mắt ra, bạn biết mình đang đi đúng hướng. Biết mình là đúng người. Không cần chứng minh gì thêm.',
      weight: 300,
    },
  ]

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        maxWidth: '620px',
        margin: '120px auto 0',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.88, ease: EASE_VOID, delay: i * 0.15 }}
          style={{
            textAlign: 'center',
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(17px, 1.7vw, 21px)',
            lineHeight: 1.72,
            color: '#BEC4D0',
            fontWeight: line.weight,
            marginBottom: i === lines.length - 1 ? 0 : '22px',
            maxWidth: '580px',
          }}
        >
          {line.text}
        </motion.p>
      ))}

      {/* Climax — TextReveal word-by-word */}
      <TextReveal
        delay={lines.length * 0.15}
        stagger={0.06}
        duration={0.7}
        style={{
          justifyContent: 'center',
          fontFamily:     '"Playfair Display", serif',
          fontSize:       'clamp(19px, 1.9vw, 24px)',
          lineHeight:     1.65,
          color:          '#D8DCE6',
          fontWeight:     500,
          fontStyle:      'italic',
          marginTop:      '28px',
          textShadow:     '0 0 40px rgba(0,212,192,0.18)',
        }}
      >
        Tôi đoán là đã lâu lắm rồi.
      </TextReveal>
      <TextReveal
        delay={lines.length * 0.15 + 0.35}
        stagger={0.07}
        duration={0.65}
        style={{
          justifyContent: 'center',
          fontFamily:     '"Playfair Display", serif',
          fontSize:       'clamp(15px, 1.5vw, 18px)',
          lineHeight:     1.6,
          color:          'rgba(190,196,208,0.38)',
          fontWeight:     300,
          marginTop:      '6px',
        }}
      >
        Hoặc... chưa bao giờ.
      </TextReveal>

      {/* Positioning statement */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.95, ease: EASE_VOID, delay: (lines.length + 1) * 0.15 }}
        style={{ marginTop: '72px', textAlign: 'center', maxWidth: '540px' }}
      >
        <span className="divider-teal" style={{ display: 'block', marginBottom: '48px' }} />
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '17px',
            lineHeight: 2.0,
            color: 'rgba(203,213,225,0.82)',
            fontWeight: 300,
            marginBottom: '20px',
          }}
        >
          Nếu vậy, thì bạn đang ở đúng nơi cần đến.
        </p>
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '17px',
            lineHeight: 2.0,
            color: 'rgba(203,213,225,0.82)',
            fontWeight: 300,
            marginBottom: '20px',
          }}
        >
          Và nếu bạn ở lại với tôi thêm vài phút nữa, tôi sẽ không hứa với
          bạn một công thức. Tôi sẽ không hứa với bạn một chiến lược.
        </p>
        <TextReveal
          delay={0.1}
          stagger={0.038}
          duration={0.6}
          style={{
            justifyContent: 'center',
            fontFamily:     '"Inter", sans-serif',
            fontSize:       '17px',
            lineHeight:     2.0,
            color:          '#E2E8F0',
            fontWeight:     500,
            textShadow:     '0 0 28px rgba(0,212,192,0.18)',
          }}
        >
          tại sao mọi thứ bạn đã thử đều không thể làm thay đổi gì cả — chừng nào bạn vẫn còn là con người cũ.
        </TextReveal>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   HERO — Main section
══════════════════════════════════════════════════════════════════ */

export default function Hero() {
  return (
    <>
      {/* Aurora beam canvas — fixed, behind everything */}
      <AuroraBackground intensity="subtle" />

      <section
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'transparent',
          paddingTop: '88px',
          paddingBottom: '160px',
          overflow: 'hidden',
        }}
      >
        {/* Ambient nebula field */}
        <AmbientField />

        {/* Content layer */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          {/* ── Pre-header eyebrow ── */}
          <motion.div
            variants={fadeFloatUp}
            custom={0}
            initial="hidden"
            animate="visible"
            style={{ marginBottom: '52px', textAlign: 'center' }}
          >
            <span className="eyebrow">Quantum Rebirth OS — Phiên bản 2.0</span>
          </motion.div>

          {/* ── Main Headline ── */}
          <div
            style={{
              textAlign: 'center',
              padding: '0 24px',
              marginBottom: '44px',
              maxWidth: '960px',
            }}
          >
            <motion.h1
              variants={blurFocus}
              custom={0.12}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(52px, 8vw, 108px)',
                fontWeight: 500,
                lineHeight: 1.07,
                color: '#D8DCE6',
                letterSpacing: '-0.025em',
                margin: 0,
                textShadow: '0 0 80px rgba(0,212,192,0.10), 0 2px 4px rgba(0,0,0,0.40)',
              }}
            >
              Bạn không cần 'cố gắng' thêm nữa.
            </motion.h1>

            <motion.h1
              variants={blurFocus}
              custom={0.32}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(38px, 5.8vw, 78px)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.12,
                color: '#D8DCE6',
                letterSpacing: '-0.025em',
                margin: '22px 0 0 0',
              }}
            >
              Bạn cần{' '}
              <span
                style={{
                  color: '#00D4C0',
                  textShadow: '0 0 60px rgba(0,212,192,0.50), 0 0 24px rgba(0,212,192,0.28)',
                }}
              >
                khai tử
              </span>
              {' '}con người cũ của mình.
            </motion.h1>
          </div>

          {/* ── Quantum divider ── */}
          <motion.span
            variants={fadeFloatUp}
            custom={0.48}
            initial="hidden"
            animate="visible"
            className="divider-teal"
            style={{ display: 'block', marginBottom: '52px' }}
          />

          {/* ── Glassmorphism description card ── */}
          <GlassCard
            delay={0.58}
            style={{
              maxWidth: '640px',
              width: 'calc(100% - 48px)',
              padding: '40px 48px',
              marginBottom: '52px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                lineHeight: 2.0,
                color: '#BEC4D0',
                fontWeight: 300,
                margin: 0,
              }}
            >
              Thịnh vượng không đến từ việc{' '}
              <em style={{ color: '#D8DCE6', fontStyle: 'italic' }}>'gồng mình'</em>.{' '}
              Sự thật tàn nhẫn là bạn càng nỗ lực bằng sự lo âu,{' '}
              <strong
                style={{
                  fontWeight: 600,
                  color: '#D8DCE6',
                  textShadow: '0 0 24px rgba(0,212,192,0.20)',
                }}
              >
                bạn càng đẩy sự đủ đầy ra xa.
              </strong>
            </p>

            {/* Divider inside card */}
            <div
              style={{
                width: '32px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(0,212,192,0.35), transparent)',
                margin: '28px auto',
              }}
            />

            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                lineHeight: 2.0,
                color: 'rgba(190,196,208,0.75)',
                fontWeight: 300,
                margin: 0,
              }}
            >
              Lộ trình 21 ngày tái cấu trúc mạng lưới thần kinh sẽ giúp bạn{' '}
              <strong style={{ fontWeight: 500, color: '#BEC4D0' }}>
                vô hiệu hóa hoàn toàn trọng lực của quá khứ
              </strong>
              , đưa bạn bước vào một nhân dạng mới — nơi vật chất và cơ hội buộc
              phải trồi sinh xung quanh bạn{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: '#00D4C0',
                  textShadow: '0 0 20px rgba(0,212,192,0.30)',
                }}
              >
                ngay khi bạn thôi chiến đấu với chính mình.
              </em>
            </p>
          </GlassCard>

          {/* ── CTA Button ── */}
          <motion.div
            variants={fadeFloatUp}
            custom={0.75}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '88px',
            }}
          >
            <MagneticButton>
              Tôi Chọn Tái Sinh Ngay Bây Giờ
            </MagneticButton>
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '11px',
                color: 'rgba(190,196,208,0.32)',
                letterSpacing: '0.8px',
              }}
            >
              Bảo hành 21 ngày chuyển hóa tế bào · Không rủi ro
            </span>
          </motion.div>

          {/* ── VSL Video ── */}
          <div id="vsl-video" style={{ width: '100%', padding: '0 24px' }}>
            <VSLEmbed />
          </div>

          {/* ── Micro-hook ── */}
          <MicroHook />

        </div>
      </section>
    </>
  )
}
