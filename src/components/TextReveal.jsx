import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * TextReveal — word-by-word blur-to-focus reveal on scroll.
 * Each word fades in from opacity 0.08 + blur(5px) → crisp, staggered.
 *
 * Props:
 *   children  — plain string (required)
 *   style     — container style (rendered as flex-wrap div)
 *   delay     — initial delay before first word (default 0)
 *   stagger   — per-word delay increment (default 0.045s)
 *   duration  — each word's transition duration (default 0.55s)
 *   threshold — InView root margin (default '-40px')
 */
export default function TextReveal({
  children,
  style      = {},
  delay      = 0,
  stagger    = 0.045,
  duration   = 0.55,
  threshold  = '-40px',
}) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: threshold })

  const words = typeof children === 'string'
    ? children.split(' ')
    : []

  return (
    <div
      ref={ref}
      style={{
        display:    'flex',
        flexWrap:   'wrap',
        columnGap:  '0.3em',
        rowGap:     '0.1em',
        ...style,
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.08, filter: 'blur(5px)', y: 4 }}
          animate={inView
            ? { opacity: 1, filter: 'blur(0px)', y: 0 }
            : { opacity: 0.08, filter: 'blur(5px)', y: 4 }
          }
          transition={{
            duration,
            delay:  delay + i * stagger,
            ease:   EASE,
          }}
          style={{ display: 'inline-block', lineHeight: 'inherit' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
