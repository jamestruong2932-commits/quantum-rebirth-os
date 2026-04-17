import { useRef, useState } from 'react'

/**
 * CardSpotlight — wraps any card with a mouse-tracking teal radial spotlight.
 * Teal accent: #2DD4BF (Quantum Teal per manifesto).
 *
 * Usage:
 *   <CardSpotlight style={{ ...glassStyles, padding: '32px' }}>
 *     {children}
 *   </CardSpotlight>
 */
export default function CardSpotlight({ children, style = {} }) {
  const ref    = useRef(null)
  const [pos,     setPos]     = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* ── Radial spotlight follow-cursor ── */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          inset:        0,
          borderRadius: 'inherit',
          pointerEvents:'none',
          zIndex:       1,
          opacity:      hovered ? 1 : 0,
          transition:   'opacity 0.35s ease',
          background:   `radial-gradient(280px circle at ${pos.x}px ${pos.y}px,
                          rgba(45,212,191,0.14) 0%,
                          rgba(45,212,191,0.04) 45%,
                          transparent 68%)`,
        }}
      />

      {/* ── Secondary micro-glow closer to cursor ── */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          inset:        0,
          borderRadius: 'inherit',
          pointerEvents:'none',
          zIndex:       1,
          opacity:      hovered ? 1 : 0,
          transition:   'opacity 0.25s ease',
          background:   `radial-gradient(100px circle at ${pos.x}px ${pos.y}px,
                          rgba(45,212,191,0.10) 0%,
                          transparent 60%)`,
        }}
      />

      {/* ── Teal border glow on hover ── */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          inset:        0,
          borderRadius: 'inherit',
          border:       `1px solid rgba(45,212,191,${hovered ? 0.32 : 0.10})`,
          pointerEvents:'none',
          zIndex:       3,
          transition:   'border-color 0.35s ease',
        }}
      />

      {/* ── Content above all layers ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  )
}
