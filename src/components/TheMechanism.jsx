import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CardSpotlight from './CardSpotlight'

/* ══════════════════════════════════════════════════════════════
   PALETTE & TOKENS
══════════════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden:  { opacity: 0, filter: 'blur(8px)', y: 20 },
  visible: (d = 0) => ({
    opacity: 1, filter: 'blur(0px)', y: 0,
    transition: { duration: 1.2, ease: EASE, delay: d },
  }),
}

const glass = {
  background:           'rgba(15,23,42,0.35)',
  backdropFilter:       'blur(24px) saturate(140%)',
  WebkitBackdropFilter: 'blur(24px) saturate(140%)',
  border:               '1px solid rgba(255,255,255,0.08)',
  borderRadius:         '12px',
  boxShadow:            '0 8px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.04)',
}

/* ══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════════ */

function Eyebrow({ children, inView, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{ marginBottom: '28px', textAlign: 'center' }}
    >
      <span className="eyebrow">{children}</span>
    </motion.div>
  )
}

function SectionHeadline({ children, inView, delay = 0.1, style = {} }) {
  return (
    <motion.h2
      variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(32px, 4vw, 54px)',
        fontWeight: 500,
        lineHeight: 1.18,
        color: '#D8DCE6',
        letterSpacing: '-0.02em',
        textAlign: 'center',
        margin: '0 0 20px',
        maxWidth: '760px',
        ...style,
      }}
    >
      {children}
    </motion.h2>
  )
}

function TealDivider({ inView, delay = 0 }) {
  return (
    <motion.span
      variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      className="divider-teal"
      style={{ display: 'block', margin: '0 auto 52px' }}
    />
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION 3 — THE AGITATION
══════════════════════════════════════════════════════════════ */

const PAIN_POINTS = [
  {
    num: '01',
    title: 'Cái nặng buổi sáng',
    body: 'Mỗi sáng thức dậy, cơ thể bạn biết ngay mình phải "vào trận" trước khi còn kịp uống ngụm nước đầu tiên. Không phải vì công việc nhiều — mà vì sự gồng mình đã trở thành mặc định.',
    accent: '#D97706',
  },
  {
    num: '02',
    title: 'Vòng lặp không có lối thoát',
    body: 'Bạn lao vào công việc 10–14 tiếng mỗi ngày, học mọi khóa học, lập mọi to-do list. Nhưng một cảm giác nặng như đá tảng vẫn luôn ngồi trên ngực bạn. Bạn gọi đó là "nỗ lực". Khoa học gọi đó là Cortisol.',
    accent: '#D97706',
  },
  {
    num: '03',
    title: 'Ma sát vô hình',
    body: 'Mỗi khi định bứt phá — một nỗi lo mơ hồ xuất hiện. Một sự trì hoãn kỳ lạ. Một lý do "hợp lý" để chờ thêm một tuần nữa. Bạn không hiểu tại sao. Vòng lặp tiếp tục.',
    accent: '#00D4C0',
  },
  {
    num: '04',
    title: 'Huy chương bận rộn',
    body: 'Bạn lấy sự bận rộn làm bằng chứng cho giá trị của mình. Nghỉ ngơi khiến bạn thấy tội lỗi. Bình yên khiến bạn lo lắng — vì cơ thể đã quen với sự căng thẳng đến mức sự tĩnh lặng lại cảm giác như nguy hiểm.',
    accent: '#00D4C0',
  },
  {
    num: '05',
    title: 'Dị ứng với thành công',
    body: 'Bạn có kỹ năng, có ước mơ lớn — nhưng cơ thể bạn dường như phản ứng dị ứng với thành công thực sự. Những cơ hội tốt xuất hiện rồi biến mất. Những mối quan hệ đẹp bị phá vỡ — bởi chính bạn, theo những cách bạn không thể giải thích.',
    accent: '#D97706',
    fullWidth: true,
  },
]

function Agitation({ inView }) {
  return (
    <div style={{ width: '100%', maxWidth: '960px', padding: '0 4px' }}>
      {/* Pain points bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginBottom: '32px' }}>
        {PAIN_POINTS.map((p, i) => (
          <motion.div
            key={i}
            variants={fadeUp} custom={0.3 + i * 0.08}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className={`w-full md:max-w-none max-w-md mx-auto${p.fullWidth ? ' md:col-span-2' : ''}`}
          >
            <CardSpotlight
              style={{
                ...glass,
                padding: '32px',
                height: '100%',
                borderRadius: '12px',
              }}
              className="p-8"
            >
              <span style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '3px',
                color: '#D97706',
                display: 'block',
                marginBottom: '14px',
              }}>
                {p.num}
              </span>
              <p style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(20px, 1.8vw, 22px)',
                fontWeight: 700,
                color: '#D8DCE6',
                margin: '0 0 12px',
                lineHeight: 1.3,
              }}>
                {p.title}
              </p>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '15px',
                lineHeight: 1.85,
                color: 'rgba(203,213,225,0.80)',
                fontWeight: 300,
                margin: 0,
              }}>
                {p.body}
              </p>
            </CardSpotlight>
          </motion.div>
        ))}
      </div>

      {/* Truth bomb */}
      <motion.div
        variants={fadeUp} custom={0.75}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          ...glass,
          padding: '44px 52px',
          borderLeft: '2px solid rgba(0,212,192,0.38)',
          textAlign: 'center',
        }}
      >
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(20px, 2.2vw, 28px)',
          fontWeight: 500,
          lineHeight: 1.55,
          color: '#D8DCE6',
          margin: '0 0 20px',
        }}>
          Bạn không lười. Bạn không yếu đuối.
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(15px, 1.4vw, 18px)',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.80)',
          fontWeight: 300,
          margin: 0,
          maxWidth: '620px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Bạn chỉ đang chạy một{' '}
          <strong style={{ fontWeight: 600, color: '#D8DCE6' }}>
            phần mềm tương lai trên một phần cứng đã nhiễm mã độc của quá khứ.
          </strong>{' '}
          Chừng nào hệ điều hành này chưa được thay thế, mọi nỗ lực của bạn cũng chỉ giống như đạp ga thật mạnh khi xe vẫn đang cài số lùi.
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION 4 — THE DISRUPTION
══════════════════════════════════════════════════════════════ */

const BRULES_1 = [
  '"Không đau khổ, không thành quả."',
  '"Tiền không mọc trên cây."',
  '"Khiêm tốn là đức tính. Tham vọng là tội lỗi."',
]

const BRULES_2 = [
  '"Tiền bạc là thứ gây chia rẽ."',
  '"Tôi không đủ tốt để giữ ai ở lại."',
  '"Tiền chỉ thực sự bền vững khi được tạo ra từ sự hy sinh đến kiệt cùng."',
]

function BruleList({ items, accentColor }) {
  return (
    <ul style={{ margin: '20px 0 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((q, i) => (
        <li key={i} style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '15px',
          fontStyle: 'italic',
          lineHeight: 1.7,
          color: 'rgba(203,213,225,0.70)',
          paddingLeft: '18px',
          borderLeft: `2px solid ${accentColor}`,
        }}>
          {q}
        </li>
      ))}
    </ul>
  )
}

function Disruption({ inView }) {
  return (
    <div style={{ width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '72px' }}>

      {/* ── Block 1 — Sóng Theta (text tự do, không khung) ── */}
      <motion.div variants={fadeUp} custom={0.20} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
        <p style={{ ...blockLabel, fontSize: '20px', fontWeight: 700, color: '#2DD4BF', letterSpacing: '4px', marginBottom: '24px' }}>Sóng Theta & Lập trình Tiềm thức</p>
        <p style={bodyText}>
          Có một điều khoa học thần kinh đã chứng minh mà hầu hết chúng ta chưa bao giờ được nghe:
        </p>
        <p style={{ ...bodyText, marginTop: '16px' }}>
          Từ khi bạn chào đời đến năm <strong style={highlight}>7 tuổi</strong>, não bộ vận hành chủ yếu ở{' '}
          <strong style={highlight}>sóng Theta</strong> — trạng thái thôi miên sâu. Không có lá chắn nào. Không có bộ lọc nào.
        </p>
        <p style={{ ...bodyText, marginTop: '16px' }}>
          Mọi thứ bạn thấy, nghe, cảm nhận được hấp thụ trực tiếp vào tiềm thức như đang{' '}
          <strong style={highlight}>cài đặt hệ điều hành</strong> cho một chiếc máy tính mới. Hệ điều hành đó chứa những{' '}
          <strong style={{ ...highlight, color: '#00D4C0' }}>Brules</strong> — Bullshit Rules:
        </p>
        <BruleList items={BRULES_1} accentColor="rgba(0,212,192,0.30)" />
      </motion.div>

      {/* ── Block 2 — Brule Tự Phát (text tự do, không khung) ── */}
      <motion.div variants={fadeUp} custom={0.20} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
        <p style={{ ...blockLabel, fontSize: '20px', fontWeight: 700, color: '#2DD4BF', letterSpacing: '4px', marginBottom: '24px' }}>Brule Tự Phát — Loại Nguy Hiểm Hơn</p>
        <p style={bodyText}>
          Nhưng có một loại Brule nguy hiểm hơn tất cả — loại mà không ai dạy bạn bằng lời. Loại mà bạn{' '}
          <strong style={highlight}>tự tạo ra trong im lặng</strong>, khi còn là một đứa trẻ đang cố gắng tìm ý nghĩa cho một thế giới không an toàn.
        </p>
        <p style={{ ...bodyText, marginTop: '16px' }}>
          Nếu bạn lớn lên chứng kiến sự bất ổn tài chính hay sự vắng mặt cảm xúc của người thân — não bộ 7 tuổi của bạn, đang ở sóng Theta, không thể hiểu được sự phức tạp của người lớn. Nó chỉ tự viết ra một kết luận sống còn:
        </p>
        <BruleList items={BRULES_2} accentColor="rgba(217,119,6,0.35)" />
        <p style={{ ...bodyText, marginTop: '16px' }}>
          Bây giờ bạn đã lớn — bạn tưởng mình đã quên. Nhưng những kết luận đó vẫn đang chạy ngầm như{' '}
          <strong style={highlight}>vết sẹo hóa học</strong> — liên tục phát đi một tần số vô hình đẩy lùi mọi cơ hội tốt đẹp muốn đến gần bạn.
        </p>
      </motion.div>

      {/* ── Block 3 — Cortisol (text tự do + CHỈ quote được đóng khung) ── */}
      <motion.div variants={fadeUp} custom={0.20} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
        <p style={{ ...blockLabel, fontSize: '20px', fontWeight: 700, color: '#2DD4BF', letterSpacing: '4px', marginBottom: '24px' }}>Cơn Nghiện Cortisol</p>
        <p style={bodyText}>
          Để đối phó với nỗi sợ thầm kín đó, bạn bắt đầu làm đúng theo những gì hệ điều hành cũ bảo:{' '}
          <strong style={highlight}>Làm nhiều hơn. Cố gắng hơn. Gồng mình hơn.</strong>{' '}
          Khi bạn sống trong sự gồng mình liên tục, cơ thể sản xuất hormone căng thẳng Cortisol như một cỗ máy không biết dừng.
        </p>

        {/* Dispenza quote — ĐÓNG KHUNG amber */}
        <div style={{
          margin: '28px 0',
          padding: '32px',
          background: 'rgba(217,119,6,0.05)',
          border: '1px solid rgba(217,119,6,0.20)',
          borderRadius: '16px',
        }}>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            fontStyle: 'italic',
            lineHeight: 1.95,
            color: 'rgba(226,232,240,0.90)',
            margin: '0 0 16px',
          }}>
            "Cơ thể bạn đã nghiện Cortisol. Khi bạn thực sự nghỉ ngơi, nó lại hoảng loạn — gào thét{' '}
            <em style={{ color: '#FCD34D' }}>'Nguy hiểm! Bạn đang tụt hậu rồi!'</em>{' '}
            Bạn tưởng đó là ý chí sắt đá. Nhưng thực chất, đó là một{' '}
            <strong style={{ fontWeight: 700, color: '#E2E8F0', fontStyle: 'normal' }}>cơn nghiện hóa học</strong>{' '}
            đang bí mật điều khiển cuộc đời bạn."
          </p>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '11px',
            letterSpacing: '2.5px',
            color: 'rgba(217,119,6,0.70)',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            — Dr. Joe Dispenza · Emotional Addiction Theory
          </p>
        </div>

        <p style={bodyText}>
          Nó tự tạo ra hỗn loạn mỗi khi cuộc đời bình yên — chỉ để cơ thể được nhấm nháp lại vị đắng của sự lo âu quen thuộc.
        </p>
      </motion.div>

      {/* ── Block 4 — Bridge (ĐÓNG KHUNG, centered) ── */}
      <motion.div
        variants={fadeUp} custom={0.20}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          padding: '40px 48px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '16px',
          textAlign: 'center',
        }}
      >
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(16px, 1.6vw, 18px)',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.82)',
          fontWeight: 300,
          marginBottom: '16px',
        }}>
          Con người mà bạn đang khao khát trở thành — con người có thịnh vượng, tự do và bình an — không thể tồn tại trong một cơ thể đang vận hành bằng Cortisol.
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(16px, 1.6vw, 18px)',
          lineHeight: 2.0,
          color: 'rgba(203,213,225,0.82)',
          fontWeight: 300,
          marginBottom: '24px',
        }}>
          Vấn đề của bạn chưa bao giờ là thiếu kỷ luật hay thiếu chiến lược.
        </p>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(18px, 1.9vw, 22px)',
          lineHeight: 1.8,
          color: '#E2E8F0',
          fontWeight: 500,
          marginBottom: '24px',
          textShadow: '0 0 40px rgba(0,212,192,0.12)',
        }}>
          Vấn đề là bạn đang chạy phần mềm tương lai trên phần cứng đã nhiễm mã độc của quá khứ.
        </p>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(15px, 1.5vw, 17px)',
          lineHeight: 2.0,
          color: 'rgba(0,212,192,0.80)',
          fontWeight: 400,
          margin: 0,
          letterSpacing: '0.2px',
        }}>
          Đã đến lúc chúng ta ngừng sửa chữa các triệu chứng.{' '}
          <strong style={{ fontWeight: 600, color: '#2DD4BF' }}>Và bắt đầu phẫu thuật lại mã nguồn.</strong>
        </p>
      </motion.div>

    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION 5 — THE PROTOTYPE (Story)
══════════════════════════════════════════════════════════════ */

const ACTS = [
  {
    label: 'ACT 1 · Xuất Phát Điểm',
    color: '#D97706',
    paras: [
      'Tôi lớn lên trong một gia đình không có hình ảnh về sự đủ đầy. Bố tôi không có mặt theo cách thực sự. Mẹ tôi vật lộn một mình. Từ rất nhỏ, tôi đã học cách sống trong trạng thái thiếu thốn như thể đó là điều bình thường.',
      'Và trong sự im lặng của căn phòng mình, đứa trẻ là tôi đã tự viết ra những kết luận: "Tiền rất khó kiếm." "Tiền khiến người ta tổn thương nhau." "Tốt hơn là đừng cần ai quá nhiều."',
      'Tôi không biết mình đã mang những niềm tin đó bao lâu. Nhưng tôi biết chính xác lúc chúng phát nổ.',
    ],
  },
  {
    label: 'ACT 2 · Vụ Sụp Đổ Kép',
    color: '#00D4C0',
    paras: [
      'Có một người — người mà tôi nghĩ là tất cả của mình. Tôi yêu cô ấy bằng tất cả những gì tôi có. Nhưng tình yêu đó đến từ sự thiếu thốn — không phải của một người đang thực sự trao đi.',
      'Và rồi cô ấy rời đi. Không phải vì tôi không đủ tốt. Mà vì phiên bản tôi lúc đó — người đang mang trong mình niềm tin "tôi không đủ để ai ở lại" — đã vô thức làm mọi thứ để niềm tin đó trở thành sự thật.',
    ],
    climax: {
      setup:      'Trong đêm hôm đó, khi tôi ngồi một mình, tôi nhìn vào gương và nhận ra một điều.',
      core:       'Tôi đã xây toàn bộ cuộc đời mình trên nền móng của một nhân dạng mà thực ra không phải là tôi.',
      reflection: 'Không phải từ sự đủ đầy. Từ nỗi sợ hãi. Từ sự chứng minh. Từ cái khao khát được công nhận — bởi những người mà sâu thẳm tôi không chắc mình có giá trị trước mặt họ.',
    },
  },
  {
    label: 'ACT 3 · Điểm Kỳ Dị',
    color: '#D97706',
    paras: [
      'Khoảnh khắc đó không phải là sự sụp đổ. Nhìn lại, tôi hiểu đó là điều vĩ đại nhất từng xảy ra với tôi.',
      'Vũ trụ đã giật sập toàn bộ cấu trúc đó — vì nó được xây trên tần số sai lệch. Để dọn sạch bàn cờ. Để tôi được phép chọn lại.',
    ],
  },
  {
    label: 'ACT 4 · Cuộc Nghiên Cứu',
    color: '#00D4C0',
    paras: [
      'Tôi bắt đầu nghiên cứu. Không phải về chiến lược kinh doanh. Tôi nghiên cứu về não bộ — về Neuroplasticity, về Epigenetics, về những nghiên cứu của Dr. Joe Dispenza, Dr. Bruce Lipton.',
      'Không phải tâm linh sáo rỗng. Đây là sinh học. Đây là vật lý. Và tôi bắt đầu làm một thí nghiệm — không phải trên người khác. Trên chính mình.',
    ],
  },
]

function Prototype({ inView }) {
  return (
    <div style={{ width: '100%', maxWidth: '680px' }}>
      {ACTS.map((act, i) => (
        <motion.div
          key={i}
          variants={fadeUp} custom={0.15 + i * 0.12}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ marginBottom: '52px' }}
        >
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '3.5px',
            color: act.color,
            opacity: 0.8,
            marginBottom: '20px',
          }}>
            {act.label}
          </p>
          {act.paras.map((p, j) => (
            <p key={j} style={{ ...bodyText, marginBottom: j < act.paras.length - 1 ? '16px' : (act.climax ? '32px' : 0) }}>
              {p}
            </p>
          ))}

          {act.climax && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Đoạn 1 — setup: slate-300, bình thường */}
              <p style={{ ...bodyText, color: 'rgba(203,213,225,0.82)' }}>
                {act.climax.setup}
              </p>

              {/* Đoạn 2 — core: trích dẫn nhấn mạnh */}
              <p style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(16px, 1.6vw, 19px)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.85,
                color: 'rgba(226,232,240,0.90)',
                paddingLeft: '20px',
                borderLeft: '2px solid rgba(0,212,192,0.40)',
                margin: 0,
              }}>
                "{act.climax.core}"
              </p>

              {/* Đoạn 3 — reflection: slate-400, tĩnh lặng sau cú sốc */}
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(15px, 1.4vw, 17px)',
                lineHeight: 2.0,
                color: 'rgba(148,163,184,0.85)',
                fontWeight: 300,
              }}>
                {act.climax.reflection}
              </p>
            </div>
          )}
        </motion.div>
      ))}

      {/* 17M proof */}
      <motion.div
        variants={fadeUp} custom={0.65}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{
          ...glass,
          padding: '44px 48px',
          borderLeft: '2px solid rgba(0,212,192,0.40)',
          marginBottom: '52px',
        }}
      >
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '11px',
          letterSpacing: '3px',
          color: 'rgba(0,212,192,0.65)',
          marginBottom: '20px',
        }}>
          ACT 5 · BẰNG CHỨNG VẬT LÝ
        </p>
        <p style={{ ...bodyText, marginBottom: '16px' }}>
          Tôi đang ở trạng thái gồng mình, cố gắng chốt một đơn hàng. Tay run rẩy. Tin nhắn gửi đi đầy sự "đói khát". Kết quả: khách hàng cảm nhận được và rời đi.
        </p>
        <p style={{ ...bodyText, marginBottom: '20px' }}>
          Sau đó tôi dừng lại. Thực hiện kỹ thuật Đồng bộ Tim-Não. Rút hệ thần kinh ra khỏi chế độ Sinh tồn. Và chỉ hiện diện.
        </p>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(20px, 2vw, 26px)',
          fontWeight: 500,
          color: '#D8DCE6',
          lineHeight: 1.4,
          margin: 0,
        }}>
          Đơn hàng 17 triệu xuất hiện. Không phải vì tôi làm thêm gì —{' '}
          <em style={{ color: '#00D4C0' }}>
            mà vì tôi đã là người khác khi gửi đi tin nhắn đó.
          </em>
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp} custom={0.75}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
      >
        <p style={{ ...bodyText, textAlign: 'center' }}>
          Nếu tôi — một người xuất phát từ nền tảng đó — có thể làm được điều này, thì bạn cũng có thể.
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION 6 — THE NEW MECHANISM
══════════════════════════════════════════════════════════════ */

function NewMechanism({ inView }) {
  return (
    <div style={{ width: '100%', maxWidth: '860px' }}>

      {/* Formula comparison */}
      <motion.div
        variants={fadeUp} custom={0.15}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-y-6"
        style={{ marginBottom: '64px' }}
      >
        {/* Old formula */}
        <div className="p-8" style={{
          ...glass,
          border: '1px solid rgba(217,119,6,0.18)',
          boxShadow: '0 0 32px rgba(217,119,6,0.04), 0 8px 48px rgba(0,0,0,0.40)',
        }}>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '3px',
            color: 'rgba(217,119,6,0.70)',
            marginBottom: '20px',
          }}>CÔNG THỨC CŨ</p>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(26px, 3vw, 36px)',
            fontWeight: 600,
            color: '#D97706',
            letterSpacing: '0.04em',
            marginBottom: '16px',
            lineHeight: 1.25,
          }}>
            LÀM → CÓ → LÀ
          </p>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(13px, 1.2vw, 15px)',
            lineHeight: 1.9,
            color: 'rgba(148,163,184,0.85)',
            fontStyle: 'italic',
            margin: 0,
          }}>
            "Cố gắng đủ nhiều → Rồi bạn sẽ có kết quả → Và lúc đó bạn mới được quyền tin vào bản thân."
          </p>
        </div>

        {/* Quantum formula */}
        <div className="p-8" style={{
          ...glass,
          border: '1px solid rgba(0,212,192,0.25)',
          boxShadow: '0 0 40px rgba(0,212,192,0.06), 0 8px 48px rgba(0,0,0,0.40)',
        }}>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '3px',
            color: 'rgba(0,212,192,0.65)',
            marginBottom: '20px',
          }}>CÔNG THỨC QUANTUM</p>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(26px, 3vw, 36px)',
            fontWeight: 600,
            color: '#00D4C0',
            textShadow: '0 0 40px rgba(0,212,192,0.35)',
            letterSpacing: '0.04em',
            marginBottom: '16px',
            lineHeight: 1.25,
          }}>
            LÀ → LÀM → CÓ
          </p>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(13px, 1.2vw, 15px)',
            lineHeight: 1.9,
            color: 'rgba(203,213,225,0.82)',
            margin: 0,
          }}>
            Trước tiên, <em>là</em> nhân dạng của người đã có kết quả đó — ở tầng sóng não, ở tầng tế bào — rồi mọi hành động sẽ phát xuất từ một tần số hoàn toàn khác.
          </p>
        </div>
      </motion.div>

      {/* Observer Effect science */}
      <motion.div
        variants={fadeUp} custom={0.25}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{ marginBottom: '64px' }}
      >
        <p style={blockLabel}>Hiệu Ứng Người Quan Sát — Observer Effect</p>
        <p style={bodyText}>
          Trong vật lý lượng tử, thí nghiệm Double-Slit của{' '}
          <strong style={highlight}>Thomas Young</strong> đã chứng minh một điều không thể tin nổi:
          các hạt vật chất hành xử khác nhau tùy thuộc vào việc chúng có <em>đang được quan sát</em> hay không.
          Khi không bị quan sát, hạt tồn tại như một <strong style={highlight}>sóng xác suất</strong> — đồng thời ở khắp nơi.
          Khi bị quan sát, nó <strong style={highlight}>sụp đổ thành một vị trí cụ thể</strong>.
        </p>
        <p style={{ ...bodyText, marginTop: '16px' }}>
          Điều này có nghĩa là gì với bạn? <strong style={highlight}>Ý thức của người quan sát tác động trực tiếp lên thực tại vật chất.</strong>{' '}
          Đây không phải ẩn dụ. Đây là vật lý học được đo đạc trong phòng thí nghiệm.
        </p>
        <p style={{ ...bodyText, marginTop: '16px' }}>
          Dr. Joe Dispenza — người đã nghiên cứu ứng dụng của cơ học lượng tử vào thần kinh học — gọi đây là{' '}
          <strong style={highlight}>nguyên lý nền tảng</strong> của việc thay đổi nhân dạng:{' '}
          khi bạn thực sự <em>quan sát</em> bản thân như người đã có kết quả đó — ở tầng sóng não, ở tầng cảm xúc, ở tầng tế bào —
          thực tại vật lý bắt đầu sụp đổ vào hướng đó.
        </p>

        {/* Callout */}
        <div style={{
          margin: '28px 0 0',
          padding: '28px 36px',
          background: 'rgba(45,212,191,0.05)',
          border: '1px solid rgba(45,212,191,0.18)',
          borderRadius: '12px',
        }}>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            fontStyle: 'italic',
            lineHeight: 1.9,
            color: 'rgba(226,232,240,0.88)',
            margin: '0 0 14px',
          }}>
            "Bạn không kéo thực tại lại gần bạn. Bạn <strong style={{ fontStyle: 'normal', fontWeight: 600, color: '#E2E8F0' }}>trở thành</strong> người mà thực tại đó buộc phải hội tụ xung quanh."
          </p>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '11px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'rgba(45,212,191,0.60)',
            margin: 0,
          }}>
            — Observer Effect · Applied Quantum Neuroscience
          </p>
        </div>
      </motion.div>

      {/* HeartMath science */}
      <motion.div
        variants={fadeUp} custom={0.3}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{ marginBottom: '64px' }}
      >
        <p style={blockLabel}>Heart-Brain Coherence — Tại sao "suy nghĩ tích cực" một mình không đủ</p>
        <p style={bodyText}>
          Tuy nhiên, bạn không thể thay đổi nhân dạng chỉ bằng suy nghĩ. Vì suy nghĩ phát xuất từ não bộ. Nhưng não bộ không phải là nơi duy nhất lưu trữ nhân dạng của bạn.{' '}
          <strong style={highlight}>Cơ thể bạn mới là nơi lưu trữ nó.</strong>
        </p>
        <p style={{ ...bodyText, marginTop: '16px' }}>
          Theo nghiên cứu của{' '}
          <strong style={highlight}>HeartMath Institute</strong>: trái tim của bạn phát ra một từ trường điện từ mạnh gấp{' '}
          <strong style={highlight}>60 lần não bộ</strong>.
        </p>
        <p style={{ ...bodyText, marginTop: '16px' }}>
          Khi tim và não không đồng bộ — khi bạn <em>nghĩ</em> rằng bạn muốn thịnh vượng nhưng <em>cảm thấy</em> sự thiếu thốn và lo âu — cơ thể bạn đang vừa đạp ga vừa đạp phanh. Vũ trụ không nghe lệnh của bộ não. Nó phản hồi theo tần số cảm xúc mà{' '}
          <strong style={highlight}>trái tim đang phát đi</strong>.
        </p>
      </motion.div>

      {/* Future pacing */}
      <motion.div
        variants={fadeUp} custom={0.45}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}
      >
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#2DD4BF',
          marginBottom: '48px',
          display: 'inline-block',
          padding: '8px 20px',
          borderRadius: '9999px',
          background: 'rgba(45,212,191,0.08)',
          border: '1px solid rgba(45,212,191,0.25)',
          boxShadow: '0 0 18px rgba(45,212,191,0.15)',
        }}>
          MỘT NGÀY BÌNH THƯỜNG SAU 21 NGÀY
        </p>
        {[
          'Bạn thức dậy. Không phải với danh sách lo âu. Không phải với cảm giác nặng quen thuộc. Với sự tĩnh lặng.',
          'Không phải vì cuộc đời trở nên dễ dàng hơn — mà vì bạn không còn đồng nhất bản thân với những vết sẹo trong hệ thần kinh nữa.',
          'Bạn làm ít hơn. Đòn bẩy lớn hơn gấp 10 lần. Và những cơ hội — dòng tiền, những con người tốt, những mối quan hệ thịnh vượng — không còn là thứ bạn đuổi theo. Chúng cảm nhận từ trường của bạn. Và chúng tìm đến.',
        ].map((p, i) => (
          <p key={i} style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(16px, 1.6vw, 20px)',
            lineHeight: 1.85,
            color: i === 2 ? '#D8DCE6' : 'rgba(190,196,208,0.68)',
            fontWeight: i === 2 ? 500 : 400,
            marginBottom: i < 2 ? '24px' : 0,
          }}>
            {p}
          </p>
        ))}
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(17px, 1.7vw, 21px)',
          fontStyle: 'italic',
          lineHeight: 1.7,
          color: 'rgba(190,196,208,0.45)',
          marginTop: '36px',
          marginBottom: 0,
        }}>
          Đây là cuộc sống của người đã chịu làm một việc mà hầu hết mọi người không dám làm:{' '}
          <strong style={{ fontWeight: 600, color: '#2DD4BF', fontStyle: 'normal', textShadow: '0 0 24px rgba(45,212,191,0.35)' }}>
            Để con người cũ được chết đi.
          </strong>
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SHARED STYLE TOKENS
══════════════════════════════════════════════════════════════ */
const bodyText = {
  fontFamily: '"Inter", sans-serif',
  fontSize: 'clamp(15px, 1.4vw, 18px)',
  lineHeight: 2.0,
  color: 'rgba(203,213,225,0.80)',
  fontWeight: 300,
  margin: 0,
}

const blockLabel = {
  fontFamily: '"Inter", sans-serif',
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '3.5px',
  textTransform: 'uppercase',
  color: 'rgba(0,212,192,0.60)',
  marginBottom: '16px',
}

const highlight = {
  fontWeight: 600,
  color: '#D8DCE6',
}

/* ══════════════════════════════════════════════════════════════
   SECTION WRAPPER
══════════════════════════════════════════════════════════════ */

function SectionWrap({ children, refProp, style = {} }) {
  return (
    <section
      ref={refProp}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '160px 24px',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */

export default function TheMechanism() {
  const agitRef    = useRef(null)
  const agitInView = useInView(agitRef,    { once: true, margin: '-80px' })

  const disruptRef    = useRef(null)
  const disruptInView = useInView(disruptRef,    { once: true, margin: '-80px' })

  const protoRef    = useRef(null)
  const protoInView = useInView(protoRef,    { once: true, margin: '-80px' })

  const mechRef    = useRef(null)
  const mechInView = useInView(mechRef,    { once: true, margin: '-80px' })

  return (
    <>
      {/* ── SECTION 3: THE AGITATION ── */}
      <SectionWrap refProp={agitRef}>
        <Eyebrow inView={agitInView}>NHẬN DIỆN</Eyebrow>
        <SectionHeadline inView={agitInView}>
          Bạn có đang là một{' '}
          <em style={{ color: '#00D4C0' }}>"Kiến trúc sư bị mắc kẹt"</em>?
        </SectionHeadline>
        <motion.p
          variants={fadeUp} custom={0.2}
          initial="hidden" animate={agitInView ? 'visible' : 'hidden'}
          style={{
            ...bodyText,
            textAlign: 'center',
            maxWidth: '560px',
            marginBottom: '64px',
          }}
        >
          Bạn không thiếu ý chí. Không thiếu kiến thức. Không thiếu nỗ lực.
          <br /><br />
          Và vẫn — có gì đó không ổn.
        </motion.p>
        <Agitation inView={agitInView} />
      </SectionWrap>

      {/* ── SECTION 4: THE DISRUPTION ── */}
      <SectionWrap refProp={disruptRef}>
        <Eyebrow inView={disruptInView}>KHOA HỌC THẦN KINH</Eyebrow>
        <SectionHeadline inView={disruptInView}>
          Sự thật mà không ai từng nói với bạn
        </SectionHeadline>
        <motion.p
          variants={fadeUp} custom={0.15}
          initial="hidden" animate={disruptInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            fontStyle: 'italic',
            color: 'rgba(190,196,208,0.55)',
            textAlign: 'center',
            marginBottom: '72px',
            maxWidth: '560px',
          }}
        >
          Hệ điều hành của bạn được viết khi bạn chưa đủ khả năng đặt câu hỏi về nó.
        </motion.p>
        <Disruption inView={disruptInView} />
      </SectionWrap>

      {/* ── SECTION 5: THE PROTOTYPE ── */}
      <SectionWrap refProp={protoRef}>
        <Eyebrow inView={protoInView}>BÁO CÁO THÍ NGHIỆM</Eyebrow>
        <SectionHeadline inView={protoInView} style={{ marginBottom: '8px' }}>
          Tôi hiểu điều này không phải từ sách.
        </SectionHeadline>
        <motion.h2
          variants={fadeUp} custom={0.15}
          initial="hidden" animate={protoInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(24px, 3vw, 42px)',
            fontWeight: 500,
            fontStyle: 'italic',
            lineHeight: 1.22,
            color: 'rgba(190,196,208,0.55)',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            margin: '0 0 72px',
            maxWidth: '700px',
          }}
        >
          Tôi hiểu nó vì tôi đã sống nó — ở tận cùng của nó.
        </motion.h2>
        <Prototype inView={protoInView} />
      </SectionWrap>

      {/* ── SECTION 6: THE NEW MECHANISM ── */}
      <SectionWrap refProp={mechRef}>
        <Eyebrow inView={mechInView}>CƠ CHẾ LƯỢNG TỬ</Eyebrow>
        <SectionHeadline inView={mechInView}>
          Mã nguồn sai lệch đã chạy trong bạn suốt nhiều năm
        </SectionHeadline>
        <motion.div
          variants={fadeUp} custom={0.12}
          initial="hidden" animate={mechInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '72px' }}
        >
          <span className="divider-teal" style={{ display: 'block', margin: '0 auto' }} />
        </motion.div>
        <NewMechanism inView={mechInView} />
      </SectionWrap>
    </>
  )
}
