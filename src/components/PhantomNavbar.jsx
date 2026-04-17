import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function PhantomNavbar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = document.getElementById('vsl-video')
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function scrollToCTA(e) {
    e.preventDefault()
    const el = document.getElementById('cta-main')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <motion.nav
      initial={{ y: '-100%', opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: '-100%', opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-[100]
                 flex justify-between items-center w-full px-6 h-14 md:h-16
                 bg-slate-950/80 backdrop-blur-lg border-b border-white/5"
    >
      {/* Bên trái: Brand */}
      <span style={{
        fontFamily: '"Playfair Display", serif',
        fontSize:   '15px',
        fontStyle:  'italic',
        fontWeight: 400,
        color:      'rgba(203,213,225,0.82)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        Quantum Rebirth OS
      </span>

      {/* Bên phải: Ghost CTA */}
      <a
        href="#cta-main"
        onClick={scrollToCTA}
        className="bg-teal-500/10 border border-teal-500/30 text-teal-400
                   px-5 py-2 rounded-full text-xs font-medium tracking-wide
                   transition-all duration-300
                   hover:bg-teal-500/20 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]
                   whitespace-nowrap no-underline flex-shrink-0"
      >
        Tái Sinh Ngay
      </a>
    </motion.nav>
  )
}
