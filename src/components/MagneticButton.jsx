import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, onClick, variant = 'default', className = '', style: styleProp = {}, disabled = false }) {
  const ref = useRef(null)
  const [pos, setPos]       = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const isPrimary = variant === 'primary'

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({
      x: (e.clientX - (rect.left + rect.width  / 2)) * 0.22,
      y: (e.clientY - (rect.top  + rect.height / 2)) * 0.22,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 })
    setHovered(false)
  }, [])

  return (
    <motion.button
      ref={ref}
      onClick={disabled ? undefined : onClick}
      onMouseMove={disabled ? undefined : handleMouseMove}
      onMouseEnter={disabled ? undefined : () => setHovered(true)}
      onMouseLeave={disabled ? undefined : handleMouseLeave}
      disabled={disabled}
      animate={{
        x: pos.x,
        y: pos.y,
        boxShadow: isPrimary
          ? hovered
            ? '0 0 48px rgba(45,212,191,0.55), 0 0 20px rgba(45,212,191,0.30), 0 8px 28px rgba(0,0,0,0.40)'
            : '0 0 28px rgba(45,212,191,0.30), 0 4px 16px rgba(0,0,0,0.30)'
          : hovered
            ? '0 0 40px rgba(0,212,192,0.28), 0 0 16px rgba(0,212,192,0.16), 0 8px 28px rgba(0,0,0,0.60)'
            : '0 4px 20px rgba(0,0,0,0.50), inset 0 1px 0 rgba(0,212,192,0.06)',
      }}
      transition={{
        x: { type: 'spring', stiffness: 180, damping: 18, mass: 0.8 },
        y: { type: 'spring', stiffness: 180, damping: 18, mass: 0.8 },
        boxShadow: { duration: 0.45, ease: 'easeOut' },
      }}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '17px 48px',
        background: isPrimary
          ? hovered ? '#00EDD6' : '#2DD4BF'
          : hovered
            ? 'linear-gradient(180deg, #0E1E30 0%, #060D16 100%)'
            : 'linear-gradient(180deg, #0A1520 0%, #050A10 100%)',
        border: isPrimary
          ? '1px solid transparent'
          : `1px solid ${hovered ? 'rgba(0,212,192,0.55)' : 'rgba(0,212,192,0.28)'}`,
        borderRadius: '3px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        outline: 'none',
        color: isPrimary ? '#050A10' : '#BEC4D0',
        fontFamily: '"Inter", sans-serif',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '2.6px',
        textTransform: 'uppercase',
        position: 'relative',
        overflow: 'hidden',
        whiteSpace: 'normal',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        ...styleProp,
      }}
    >
      {/* Inner gloss */}
      <span style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,212,192,0.04) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom teal glow beam */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.5, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute', bottom: '-4px', left: '50%',
          transform: 'translateX(-50%)', width: '88%', height: '56px',
          background: isPrimary
            ? 'radial-gradient(ellipse at 50% 100%, rgba(45,212,191,0.80) 0%, rgba(45,212,191,0.30) 45%, transparent 72%)'
            : 'radial-gradient(ellipse at 50% 100%, rgba(0,212,192,0.62) 0%, rgba(0,212,192,0.24) 45%, transparent 72%)',
          pointerEvents: 'none', filter: 'blur(10px)', zIndex: 0,
          transformOrigin: 'bottom center',
        }}
      />

      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.button>
  )
}
