import Hero            from './components/Hero'
import TheMechanism    from './components/TheMechanism'
import TheCurriculum   from './components/TheCurriculum'
import PricingAndOffer from './components/PricingAndOffer'
import TheGuarantee    from './components/TheGuarantee'
import InfiniteCards   from './components/InfiniteCards'
import PhantomNavbar   from './components/PhantomNavbar'

/* ── Value strip items ───────────────────────────────────────── */
const VALUE_STRIP_TOP = [
  { icon: '◈', text: 'Neuroplasticity Ứng Dụng',     accent: '#00D4C0' },
  { icon: '★', text: 'LÀ → LÀM → CÓ',               accent: '#D97706' },
  { icon: '◈', text: 'Đồng Bộ Tim-Não',              accent: '#00D4C0' },
  { icon: '◈', text: 'Epigenetics Thực Chiến',        accent: '#D97706' },
  { icon: '◈', text: '21 Ngày · 7 Module',            accent: '#00D4C0' },
  { icon: '◈', text: 'Neural Pruning & Sprouting',    accent: '#D97706' },
  { icon: '★', text: 'Extinction Burst Protocol',     accent: '#00D4C0' },
  { icon: '◈', text: 'Zero-Point Field State',        accent: '#D97706' },
  { icon: '◈', text: 'Vô Vi Thực Sự',                accent: '#00D4C0' },
  { icon: '◈', text: 'CBT · Epigenetics · Quantum',   accent: '#D97706' },
]

const VALUE_STRIP_BOT = [
  { icon: '◈', text: 'Bảo Hành 21 Ngày',             accent: '#00D4C0' },
  { icon: '◈', text: 'Cohort Sáng Lập',               accent: '#D97706' },
  { icon: '★', text: 'Truy Cập Trọn Đời',             accent: '#00D4C0' },
  { icon: '◈', text: 'Cơn Nghiện Cortisol → Thanh Lý',accent: '#D97706' },
  { icon: '◈', text: 'Heart-Brain Coherence',         accent: '#00D4C0' },
  { icon: '◈', text: 'Brule Audit System',            accent: '#D97706' },
  { icon: '★', text: 'Reality Architect Protocol',    accent: '#00D4C0' },
  { icon: '◈', text: 'Theta Wave Programming',        accent: '#D97706' },
  { icon: '◈', text: 'Observer Effect Applied',       accent: '#00D4C0' },
  { icon: '◈', text: 'Nhân Dạng Mới · 21 Ngày',       accent: '#D97706' },
]

export default function App() {
  return (
    <main style={{ background: '#080D1A', minHeight: '100svh', overflowX: 'hidden' }}>

      <PhantomNavbar />

      {/* Section 1+2: Hero + VSL + Micro-hook */}
      <Hero />

      {/* Sections 3–6: Agitation → Disruption → Prototype → New Mechanism */}
      <div id="mechanism"><TheMechanism /></div>

      {/* ── Value Strip — infinite scroll between Mechanism and Curriculum ── */}
      <div style={{
        padding: '0 0 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        borderTop: '1px solid rgba(0,212,192,0.05)',
        borderBottom: '1px solid rgba(0,212,192,0.05)',
        paddingTop: '48px',
        paddingBottom: '48px',
      }}>
        <InfiniteCards items={VALUE_STRIP_TOP} speed={55} direction="left"  />
        <InfiniteCards items={VALUE_STRIP_BOT} speed={70} direction="right" />
      </div>

      {/* Section 7: 21-day Curriculum Accordion */}
      <div id="curriculum"><TheCurriculum /></div>

      {/* Section 8: Value Stack + Pricing */}
      <div id="pricing"><PricingAndOffer /></div>

      {/* Sections 9+10: FAQ · Anti-Guarantee · Final CTA · Footer */}
      <TheGuarantee />

    </main>
  )
}
