import { useState } from 'react'

/**
 * InfiniteCards — seamless infinite-scroll horizontal ticker.
 * Items duplicate automatically for seamless loop.
 * Pauses on hover. Fades edges via CSS mask.
 *
 * Props:
 *   items      — Array<{ text: string, icon?: string, accent?: string }>
 *   speed      — animation duration in seconds (default 50)
 *   direction  — 'left' | 'right' (default 'left')
 *   gap        — gap between cards in px (default 14)
 */
export default function InfiniteCards({
  items     = [],
  speed     = 50,
  direction = 'left',
  gap       = 14,
}) {
  const [paused, setPaused] = useState(false)

  /* Duplicate for seamless loop — CSS animation moves exactly -50% */
  const doubled = [...items, ...items]

  const animName = direction === 'right'
    ? 'infinite-scroll-right'
    : 'infinite-scroll-left'

  return (
    <div
      style={{
        overflow: 'hidden',
        width:    '100%',
        /* Fade edges */
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        maskImage:        'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          display:             'flex',
          gap:                 `${gap}px`,
          width:               'max-content',
          animation:           `${animName} ${speed}s linear infinite`,
          animationPlayState:  paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display:         'flex',
              alignItems:      'center',
              gap:             '10px',
              padding:         '10px 22px',
              background:      'rgba(17,24,39,0.60)',
              backdropFilter:  'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border:          '1px solid rgba(0,212,192,0.09)',
              borderRadius:    '100px',
              flexShrink:      0,
              whiteSpace:      'nowrap',
              cursor:          'default',
              userSelect:      'none',
            }}
          >
            {item.icon && (
              <span style={{
                fontSize: '12px',
                color:    item.accent || '#00D4C0',
                opacity:  0.75,
                lineHeight: 1,
              }}>
                {item.icon}
              </span>
            )}
            <span style={{
              fontFamily:    '"Inter", sans-serif',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '1.8px',
              textTransform: 'uppercase',
              color:         'rgba(190,196,208,0.65)',
            }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
