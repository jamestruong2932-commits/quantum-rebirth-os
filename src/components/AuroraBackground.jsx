import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ══════════════════════════════════════════════════════════════════
   AURORA BACKGROUND
   Adapted from 21st.dev BeamsBackground component.
   Changes vs original:
   - TypeScript → plain JavaScript
   - "use client" / Next.js removed
   - motion/react → framer-motion
   - cn/Tailwind → inline styles
   - Hue range tuned to Quantum Teal (170–195)
   - Speed & opacity reduced for "uy tín thấu hiểu" feel
   - Renders as position:fixed backdrop layer (no built-in content)
══════════════════════════════════════════════════════════════════ */

const BEAM_COUNT = 20

const OPACITY_MAP = {
  subtle: 0.55,
  medium: 0.75,
  strong: 1.0,
}

function createBeam(width, height) {
  return {
    x:          Math.random() * width  * 1.5 - width  * 0.25,
    y:          Math.random() * height * 1.5 - height * 0.25,
    width:      28 + Math.random() * 55,
    length:     height * 2.5,
    angle:      -35 + Math.random() * 10,
    speed:      0.30 + Math.random() * 0.55,   // slower than original (0.6–1.8)
    opacity:    0.07 + Math.random() * 0.11,   // dimmer than original (0.12–0.28)
    hue:        170  + Math.random() * 25,     // Quantum Teal: 170–195
    pulse:      Math.random() * Math.PI * 2,
    pulseSpeed: 0.007 + Math.random() * 0.010, // slower pulse
  }
}

function resetBeam(beam, index, logicalW, logicalH) {
  const col     = index % 3
  const spacing = logicalW / 3
  beam.y        = logicalH + 100
  beam.x        = col * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
  beam.width    = 75 + Math.random() * 85
  beam.speed    = 0.25 + Math.random() * 0.40
  beam.hue      = 170 + (index * 25) / BEAM_COUNT
  beam.opacity  = 0.07 + Math.random() * 0.10
  return beam
}

function drawBeam(ctx, beam, opacityMultiplier) {
  ctx.save()
  ctx.translate(beam.x, beam.y)
  ctx.rotate((beam.angle * Math.PI) / 180)

  const alpha = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMultiplier
  const g = ctx.createLinearGradient(0, 0, 0, beam.length)
  g.addColorStop(0,   `hsla(${beam.hue}, 88%, 62%, 0)`)
  g.addColorStop(0.1, `hsla(${beam.hue}, 88%, 62%, ${alpha * 0.5})`)
  g.addColorStop(0.4, `hsla(${beam.hue}, 88%, 62%, ${alpha})`)
  g.addColorStop(0.6, `hsla(${beam.hue}, 88%, 62%, ${alpha})`)
  g.addColorStop(0.9, `hsla(${beam.hue}, 88%, 62%, ${alpha * 0.5})`)
  g.addColorStop(1,   `hsla(${beam.hue}, 88%, 62%, 0)`)

  ctx.fillStyle = g
  ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
  ctx.restore()
}

/**
 * AuroraBackground — pure backdrop layer, no built-in content.
 * @param {object}  props
 * @param {'subtle'|'medium'|'strong'} [props.intensity='subtle']
 */
export default function AuroraBackground({ intensity = 'subtle' }) {
  const canvasRef  = useRef(null)
  const beamsRef   = useRef([])
  const animRef    = useRef(null)
  const sizeRef    = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w   = window.innerWidth
      const h   = window.innerHeight
      sizeRef.current = { w, h }

      canvas.width        = w * dpr
      canvas.height       = h * dpr
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)

      beamsRef.current = Array.from({ length: BEAM_COUNT }, () => createBeam(w, h))
    }

    resize()
    window.addEventListener('resize', resize)

    const opacityMul = OPACITY_MAP[intensity] ?? OPACITY_MAP.subtle

    const animate = () => {
      const { w, h } = sizeRef.current
      ctx.clearRect(0, 0, w, h)
      ctx.filter = 'blur(32px)'

      beamsRef.current.forEach((beam, i) => {
        beam.y     -= beam.speed
        beam.pulse += beam.pulseSpeed
        if (beam.y + beam.length < -100) resetBeam(beam, i, w, h)
        drawBeam(ctx, beam, opacityMul)
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [intensity])

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        background:    '#080D1A',
        overflow:      'hidden',
        zIndex:        0,
        pointerEvents: 'none',
      }}
    >
      {/* Aurora beam canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset:    0,
          filter:   'blur(14px)',
        }}
      />

      {/* Slow pulsing veil — keeps text zone from over-glowing */}
      <motion.div
        animate={{ opacity: [0.03, 0.10, 0.03] }}
        transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
        style={{
          position:       'absolute',
          inset:          0,
          background:     'rgba(8,13,26,0.08)',
          backdropFilter: 'blur(40px)',
        }}
      />
    </div>
  )
}
