import { useState, useEffect, useRef } from 'react'

/* ─────────────────────── scroll-reveal hook ─────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* Reveal wraps any block and fades + slides it in when scrolled into view */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

/* ─────────────────────── tiny inline SVG icons ──────────────────────── */
const Icon = {
  clock: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
  ),
  photo: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
    </svg>
  ),
  device: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M8 16.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z" />
      <path fillRule="evenodd" d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Zm1 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6Z" clipRule="evenodd" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 0 0 1.28.53l3.58-3.579A15.834 15.834 0 0 0 10 14c2.236 0 4.43-.18 6.57-.524 1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.102 41.102 0 0 0 10 2Z" clipRule="evenodd" />
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
      <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.503.204A6.5 6.5 0 1 1 5.95 4.83L7.197 6.8a1.5 1.5 0 0 1-.041 1.701l-.457.602A1.5 1.5 0 0 0 7.5 11.5h.5a1.5 1.5 0 0 1 1.5 1.5v.5a1.5 1.5 0 0 1-1.5 1.5H7.4a1.5 1.5 0 0 0-1.462 1.154 6.492 6.492 0 0 0 2.39 1.107l.13-.138a1.5 1.5 0 0 1 .548-.37l1.145-.457a1.5 1.5 0 0 0 .878-1.872l-.363-1.088a1.5 1.5 0 0 1 .806-1.888l1.344-.538a1.5 1.5 0 0 0 .964-1.406V8.5a1.5 1.5 0 0 0-.747-1.299l-.473-.265Z" clipRule="evenodd" />
    </svg>
  ),
  utensils: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M6.672 1.911a1 1 0 1 0-1.932.518l.259.966a1 1 0 0 0 .518.62l.198.099A5.98 5.98 0 0 0 6 7a5.98 5.98 0 0 0 .284 1.845l-1.43 4.289A1 1 0 0 0 5.8 14.5H6a1 1 0 0 0 .95-.684l.1-.3.1.3a1 1 0 0 0 .95.684h.2a1 1 0 0 0 .946-1.366L7.858 8.846A5.98 5.98 0 0 0 8 7a5.98 5.98 0 0 0-.284-1.845l.198-.099a1 1 0 0 0 .518-.62l.259-.966a1 1 0 1 0-1.932-.518L6.5 4h-1l-.259-.966a1 1 0 0 0-.518-.62l-.051-.026ZM14 1a1 1 0 0 1 1 1v6.5a2.5 2.5 0 0 1-2 2.45V18a1 1 0 1 1-2 0v-7.05A2.5 2.5 0 0 1 9 8.5V2a1 1 0 0 1 2 0v5h2V2a1 1 0 0 1 1-1Z" clipRule="evenodd" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
  ),
}

/* ─────────────────── industry typewriter component ─────────────────── */

const INDUSTRIES = [
  'Plumbing',
  'HVAC',
  'Dental',
  'Restaurant',
  'Hair Salon',
  'Auto Shop',
  'Contracting',
  'Landscaping',
  'Law Firm',
  'Chiropractic',
  'Bakery',
  'Veterinary',
  'Photography',
  'Yoga Studio',
  'Boutique',
]

function IndustryTypewriter() {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' | 'hold' | 'erasing'

  useEffect(() => {
    const word = INDUSTRIES[idx]

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 72)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('hold'), 1200)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'hold') {
      const t = setTimeout(() => setPhase('erasing'), 200)
      return () => clearTimeout(t)
    }

    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 38)
        return () => clearTimeout(t)
      } else {
        setIdx(i => (i + 1) % INDUSTRIES.length)
        setPhase('typing')
      }
    }
  }, [phase, displayed, idx])

  return (
    <span className="inline-block text-teal-300 min-w-[2ch]">
      {displayed}
      <span
        className="inline-block w-[3px] h-[0.85em] bg-teal-300 align-middle ml-1 rounded-sm"
        style={{ animation: 'blink 0.85s step-end infinite' }}
      />
    </span>
  )
}

/* ─────────────────────── data ───────────────────────────────────────── */

/* ─────────────────────── main app ───────────────────────────────────── */
export default function App() {
  const [formData, setFormData] = useState({
    business_name: '',
    website_url: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'

  const handleFormChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formStatus === 'loading') return
    setFormStatus('loading')
    try {
      const payload = {
        access_key: 'fc05109e-be57-4471-ac9c-77b28ac9952f',
        subject: 'New SiteUpscale Lead',
        botcheck: '',
        ...formData,
      }
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setFormStatus('success')
        setFormData({ business_name: '', website_url: '', name: '', email: '', phone: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen font-sans text-gray-900 antialiased" style={{ background: '#ffffff' }}>

      <div className="overflow-hidden">

      {/* ── Hero (nav integrated) ─────────────────────────────────── */}
      <header
        className="relative overflow-hidden hero-animated"
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 30%, #0f766e 62%, #0f172a 84%, #020617 100%)',
          backgroundSize: '300% 300%',
          animation: 'heroGradientShift 18s ease infinite',
        }}
      >
        {/* ambient glow orbs — hidden on mobile for performance */}
        <div className="hero-glow absolute -top-40 -right-24 w-[600px] h-[600px] rounded-full bg-teal-400/12 blur-[130px] pointer-events-none" />
        <div className="hero-glow absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full bg-teal-600/18 blur-[110px] pointer-events-none" />
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-teal-500/6 blur-[100px] pointer-events-none" />

        {/* dot-grid texture — hidden on mobile for performance */}
        <div
          className="hero-dot-grid absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />


        {/* ── integrated nav ── */}
        <nav className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="font-bold text-white text-lg tracking-tight">SiteUpscale</span>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors duration-150">How it works</button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors duration-150">Pricing</button>
          </div>
          <button
            onClick={() => scrollTo('free-offer')}
            className="text-sm font-semibold border border-white/25 hover:border-white/50 hover:bg-white/10 text-white rounded-lg px-4 py-2 transition-all duration-200 backdrop-blur-sm"
          >
            Get My Free Website
          </button>
        </nav>

        {/* ── hero content ── */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 md:pt-20 md:pb-36 text-center animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur-sm text-center max-w-lg">
              <span className="hero-badge-dot w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse flex-shrink-0" />
              <span>For plumbers, contractors, restaurants, dentists &amp; local service businesses</span>
            </div>
          </div>

          <h1 className="text-[clamp(2.6rem,6vw,4.75rem)] font-extrabold text-white tracking-[-0.025em] leading-[1.05]">
            Outdated website?<br />
            <span className="text-teal-300">You may be losing customers.</span>
          </h1>

          <p className="mt-8 text-base sm:text-xl md:text-[1.35rem] max-w-xl sm:max-w-2xl mx-auto leading-[1.7] sm:leading-[1.75]" style={{ color: 'rgba(255,255,255,0.82)' }}>
            We rebuild it for free and keep it updated so you never have to worry about it again. One less thing on your mind.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollTo('free-offer')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-gray-50 text-gray-900 font-bold px-8 py-4 text-base transition-all duration-200 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.55)] hover:-translate-y-1.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Get My Free Website
              <span>{Icon.arrow}</span>
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/25 hover:border-white/50 hover:bg-white/10 text-white font-semibold px-8 py-4 text-base transition-all duration-200 hover:-translate-y-1 backdrop-blur-sm"
            >
              See How It Works
            </button>
          </div>
          <p className="mt-8 text-xs font-medium text-white/50">
            No credit card required · No obligation
          </p>
        </div>

      </header>


      {/* ── Card 1 — white, floats up over hero ── */}
      <div className="-mt-14 relative z-10 rounded-t-[4rem] overflow-hidden bg-white" style={{ boxShadow: '0 -8px 60px rgba(0,0,0,0.35)', paddingBottom: '6rem' }}>

      {/* ── Process Storyrail ────────────────────────────────────── */}
      <section id="how-it-works" className="pt-16 pb-20 md:pt-20 md:pb-28 scroll-mt-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <ProcessStory />

          {/* ── DELETED dark container kept for reference — replaced by ProcessStory ── */}
          {false && <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #07101f 0%, #0f172a 52%, #091c1a 100%)',
                boxShadow: '0 32px 80px -16px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              {/* Layered radial light overlay — replaces dot grid */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: [
                    'radial-gradient(ellipse 70% 55% at 72% -5%, rgba(15,118,110,0.28) 0%, transparent 65%)',
                    'radial-gradient(ellipse 55% 45% at 8% 105%, rgba(20,184,166,0.13) 0%, transparent 60%)',
                    'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(15,118,110,0.06) 0%, transparent 70%)',
                  ].join(', '),
                }}
              />
              {/* Hard edge teal rim light at top-right corner */}
              <div className="absolute -top-px right-[10%] w-[45%] h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent pointer-events-none" />

              {/* ── 3-step rail ── */}
              <div className="relative px-8 md:px-14 pt-12 md:pt-14 pb-10">

                {/* Desktop: 3 cards with floating circles + animated connector */}
                <div className="hidden md:block">
                  <div className="relative grid grid-cols-3 gap-5">
                    <StepConnector />
                    {[
                      {
                        n: '01',
                        icon: Icon.globe,
                        title: 'We build your website for free',
                        body: 'Brand new or a complete rebuild. We design and code a real, professional website built for your business at zero upfront cost. No templates, no page builders, no DIY.',
                        tag: '$0 upfront. Always.',
                        lit: false,
                      },
                      {
                        n: '02',
                        icon: Icon.check,
                        title: 'Only pay if you love it',
                        body: "We send you a preview link. Browse it on your phone. Happy? Your monthly plan begins. Not right? Walk away with no charge and no contract. You only pay when you approve.",
                        tag: 'Zero risk to you.',
                        lit: false,
                      },
                      {
                        n: '03',
                        icon: Icon.chat,
                        title: 'Never think about your website again.',
                        body: 'No logins, no dashboards, no waiting on agencies. Send us a message and we handle it, usually within the hour. Your site stays current. You stay focused.',
                        tag: 'Usually within 1 hour.',
                        lit: true,
                      },
                    ].map(({ n, icon, title, body, tag, lit }) => (
                      <div key={n} className="relative mt-8 flex flex-col group">
                        {/* Floating step circle — sits above the card */}
                        <div
                          className={`absolute -top-7 left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full border-2 flex items-center justify-center text-base font-extrabold tracking-tight transition-all duration-300 group-hover:scale-110 ${
                            lit
                              ? 'border-teal-400/70 bg-teal-500/22 text-teal-300'
                              : 'border-white/25 bg-[#0f172a] text-white/75 group-hover:border-white/45 group-hover:text-white'
                          }`}
                          style={lit ? { boxShadow: '0 0 32px -4px rgba(20,184,166,0.65)' } : {}}
                        >
                          {n}
                        </div>

                        {/* Card body */}
                        <div
                          className={`flex-1 rounded-2xl border p-6 pt-10 flex flex-col transition-all duration-300 ${
                            lit
                              ? 'border-teal-500/25 bg-teal-950/30 group-hover:border-teal-400/40 group-hover:bg-teal-950/40'
                              : 'border-white/10 bg-white/[0.04] group-hover:border-white/18 group-hover:bg-white/[0.07]'
                          }`}
                        >
                          {/* Icon */}
                          <span className={`mb-4 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${lit ? 'bg-teal-500/20 text-teal-300' : 'bg-white/8 text-white/50'}`}>
                            {icon}
                          </span>

                          <h3 className="text-sm font-bold text-white mb-3 leading-snug">{title}</h3>
                          <p className="text-sm text-white/55 leading-relaxed flex-1">{body}</p>

                          {/* Bottom tag */}
                          <div className="mt-5 pt-4 border-t border-white/8">
                            <span className={`text-xs font-bold uppercase tracking-wider ${lit ? 'text-teal-400' : 'text-white/35'}`}>
                              {tag}
                            </span>
                          </div>
                        </div>

                        {/* Drip connector — step 03 only, leads to demo below */}
                        {lit && (
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-5 flex flex-col items-center pointer-events-none z-10">
                            <div className="w-px h-8 bg-gradient-to-b from-teal-400/55 to-teal-400/5" />
                            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" className="mt-0.5 opacity-55">
                              <path d="M1 1L4.5 5L8 1" stroke="rgba(20,184,166,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile: vertical stack with connector thread + expanded cards */}
                <div className="md:hidden space-y-0">
                  {[
                    {
                      n: '01', icon: Icon.globe, lit: false,
                      title: 'We build your website for free',
                      body: 'Brand new or a full rebuild. We design and code a real, professional site at zero upfront cost. No templates, no DIY.',
                      tag: '$0 upfront. Always.',
                    },
                    {
                      n: '02', icon: Icon.check, lit: false,
                      title: 'Only pay if you love it',
                      body: "We send you a preview link. Love it? Your monthly plan starts. Not right for you? Walk away, no charge, no contract.",
                      tag: 'Zero risk to you.',
                    },
                    {
                      n: '03', icon: Icon.chat, lit: true,
                      title: 'Never think about your website again.',
                      body: 'No logins, no dashboards, no waiting. Send a message and we handle it. You never have to touch your site.',
                      tag: 'Usually within 1 hour.',
                    },
                  ].map(({ n, icon, title, body, tag, lit }, i) => (
                    <div key={n} className="relative flex gap-4 pb-6 last:pb-0">
                      {/* Vertical connector thread */}
                      {i < 2 && (
                        <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-teal-500/35 via-teal-500/20 to-teal-500/8" />
                      )}
                      {/* Circle */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-extrabold z-10 tracking-tight ${
                          lit
                            ? 'border-teal-400/70 bg-teal-500/22 text-teal-300'
                            : 'border-white/25 bg-[#0f172a] text-white/75'
                        }`}
                        style={lit ? { boxShadow: '0 0 22px -4px rgba(20,184,166,0.6)' } : {}}
                      >
                        {n}
                      </div>
                      {/* Card */}
                      <div className={`flex-1 rounded-2xl border p-5 mb-2 ${lit ? 'border-teal-500/25 bg-teal-950/30' : 'border-white/10 bg-white/[0.04]'}`}>
                        <span className={`inline-flex mb-3 w-8 h-8 rounded-lg items-center justify-center ${lit ? 'bg-teal-500/20 text-teal-300' : 'bg-white/8 text-white/50'}`}>
                          {icon}
                        </span>
                        <h3 className="text-sm font-bold text-white mb-2 leading-snug">{title}</h3>
                        <p className="text-xs text-white/55 leading-relaxed mb-4">{body}</p>
                        <div className="pt-3 border-t border-white/8">
                          <span className={`text-xs font-bold uppercase tracking-wider ${lit ? 'text-teal-400' : 'text-white/35'}`}>{tag}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Divider — pill anchored to Step 03 column center on desktop ── */}
              <div className="relative mx-8 md:mx-14 h-px bg-white/8">
                {/* Desktop: pill sits at 83.33% = center of col 3, visually bridging step 03 → demo */}
                <div
                  className="hidden md:block absolute top-1/2"
                  style={{ left: '83.33%', transform: 'translate(-50%, -50%)' }}
                >
                  <span className="bg-teal-500/15 border border-teal-500/22 rounded-full px-4 py-1.5 text-[10px] font-bold text-teal-400 uppercase tracking-widest whitespace-nowrap">
                    Live example
                  </span>
                </div>
                {/* Mobile: centered */}
                <div className="md:hidden absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
                  <span className="bg-teal-500/15 border border-teal-500/22 rounded-full px-4 py-1.5 text-[10px] font-bold text-teal-400 uppercase tracking-widest whitespace-nowrap">
                    Live example
                  </span>
                </div>
              </div>

              {/* ── Demo panel ── */}
              <div className="px-8 md:px-14 pt-10 pb-10 md:pb-14 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-14">
                {/* Left: micro-narrative */}
                <div className="lg:flex-1">
                  <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-[-0.015em] mb-3 leading-snug">
                    No logins. No dashboards.<br />No waiting on agencies.
                  </h3>
                  <p className="text-white/50 text-sm mb-5 leading-relaxed">
                    Send a message and we handle it, usually within the hour. You never have to touch your site or chase anyone for changes.
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'Update pricing or services', example: '"New haircut price is $45"' },
                      { label: 'Change business hours', example: '"Closed Mondays now"' },
                      { label: 'Add holiday closures', example: '"Closed Christmas Day"' },
                      { label: 'Post a new promotion', example: '"20% off this weekend only"' },
                      { label: 'Swap out photos', example: '"New storefront photo attached"' },
                    ].map(({ label, example }) => (
                      <div key={label} className="flex items-start gap-3">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
                          {Icon.check}
                        </span>
                        <div>
                          <span className="text-sm text-white/80 font-medium">{label}</span>
                          <span className="hidden sm:inline text-xs text-white/35 ml-2">{example}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: chat demo — ~17% wider than before */}
                <div className="w-full lg:w-[500px] flex-shrink-0 relative">
                  {/* Outer bloom — wide, soft */}
                  <div
                    className="absolute -inset-14 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 55%, rgba(20,184,166,0.32) 0%, rgba(15,118,110,0.12) 45%, transparent 68%)',
                    }}
                  />
                  {/* Inner highlight — tight, brighter center */}
                  <div
                    className="absolute -inset-4 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 40%, rgba(94,234,212,0.14) 0%, transparent 62%)',
                    }}
                  />
                  <div style={{ animation: 'floatDemo 5.5s ease-in-out infinite', willChange: 'transform', position: 'relative' }}>
                    <HeroChatSim />
                  </div>
                </div>
              </div>

            </div>
          }

        </div>
      </section>

      </div>{/* end Card 1 */}

      {/* ── Card 1b — pure white, stacks over Card 1 ── */}
      <div className="relative z-[15] -mt-16 rounded-t-[4rem] overflow-hidden bg-white" style={{ boxShadow: '0 -20px 60px rgba(0,0,0,0.18)', paddingBottom: '6rem' }}>

      {/* ── Before / After Visual Mockup ──────────────────────────── */}
      <WebsiteTransformation />

      </div>{/* end Card 1b */}

      {/* ── Card 1c — white, stacks over Card 1b ── */}
      <div className="relative z-[18] -mt-16 rounded-t-[4rem] overflow-hidden bg-white" style={{ boxShadow: '0 -20px 60px rgba(0,0,0,0.18)', paddingBottom: '6rem' }}>

      {/* ── What We Handle ───────────────────────────────────────── */}
      <section className="pt-16 pb-20 md:pt-20 md:pb-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="What's included" />
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 tracking-[-0.015em] text-center">
              We handle it. You don't.
            </h2>
            <p className="mt-4 text-center text-gray-500 max-w-md mx-auto leading-relaxed">
              Hosting, maintenance, and care. Your site stays current and reliable so you never have to think about it.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Icon.clock,  label: 'Business hours' },
                { icon: Icon.tag,    label: 'Pricing updates' },
                { icon: Icon.chat,   label: 'Promotions' },
                { icon: Icon.photo,  label: 'Photo swaps' },
                { icon: Icon.check,  label: 'Service changes' },
                { icon: Icon.user,   label: 'Seasonal content' },
                { icon: Icon.arrow,  label: 'New sections' },
                { icon: Icon.pencil, label: 'Menu updates' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
                  <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                    {icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Industries strip ─────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by local service businesses including…</p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {['Plumbers','HVAC Companies','General Contractors','Auto Shops','Dental Offices','Hair Salons','Restaurants','Chiropractors','Landscapers','Law Firms','Bakeries','Yoga Studios','Photographers','Boutiques','Veterinarians'].map(cat => (
                <span key={cat} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:border-teal-300 hover:text-teal-700 transition-colors duration-150">
                  {cat}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      </div>{/* end Card 1c */}

      {/* ── Card 2 — cool slate, stacks on top of Card 1c ── */}
      <div className="relative z-20 -mt-16 rounded-t-[4rem] overflow-hidden" style={{ background: '#f1f5f9', boxShadow: '0 -20px 60px rgba(0,0,0,0.2)', paddingBottom: '6rem' }}>

      {/* ── Pricing ──────────────────────────────────────────────── */}
      <section id="pricing" className="pt-16 pb-20 md:pt-20 md:pb-28 scroll-mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-2">
              <span className="inline-block rounded-full border border-teal-200/60 bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-700">
                Web agencies charge $1,500 to $5,000 per month. SiteUpscale doesn&apos;t.
              </span>
            </div>
            <SectionLabel text="Pricing" className="mt-5" />
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 tracking-[-0.015em] text-center">
              Pay monthly. Never think about your website again.
            </h2>
            <p className="mt-4 text-center text-gray-500 max-w-xl mx-auto leading-relaxed">
              Your plan includes hosting, maintenance, and updates when you need them. We keep your site modern and reliable so you can focus on your business.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {[
              { name: 'Essentials', price: '$99', note: 'For lean local businesses', highlighted: false,
                features: ['Hosting and security', 'Ongoing care when you need it', 'Hours, pricing, services', 'Email support'] },
              { name: 'Standard', price: '$199', note: 'Most popular', highlighted: true,
                features: ['Hosting and security', 'Ongoing care and maintenance', 'Promos, events, new content', 'Photo and copy refreshes', 'Monthly check-in and suggestions'] },
              { name: 'Unlimited', price: '$399', note: 'For high-volume businesses', highlighted: false,
                features: ['Hosting and security', 'Unlimited care requests', 'Priority turnaround', 'Seasonal sections and improvements'] },
            ].map(({ name, price, note, highlighted, features }, i) => (
              <Reveal key={name} delay={80 + i * 100}>
                <PricingCard name={name} price={price} note={note} highlighted={highlighted} features={features} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-400 text-center">
              <span>No contracts</span>
              <span className="text-gray-200">·</span>
              <span>Cancel anytime</span>
              <span className="text-gray-200">·</span>
              <span>Keep your domain</span>
              <span className="text-gray-200">·</span>
              <span>Review before you pay</span>
              <span className="text-gray-200">·</span>
              <span>No upfront payment required</span>
            </div>
          </Reveal>
        </div>
      </section>

      </div>{/* end Card 2 */}

      {/* ── Card 3 — warm cream, stacks on top of Card 2 ── */}
      <div className="relative z-30 -mt-16 rounded-t-[4rem] overflow-hidden" style={{ background: '#faf8f5', boxShadow: '0 -20px 60px rgba(0,0,0,0.17)', paddingBottom: '6rem' }}>

      {/* ── Lead Capture Form ─────────────────────────────────────── */}
      <section id="free-offer" className="pt-16 pb-20 md:pt-20 md:pb-28 scroll-mt-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="Free offer" />
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 tracking-[-0.015em] text-center">
              Get My Free Website
            </h2>
            <p className="mt-5 text-center text-gray-600 text-lg leading-relaxed">
              We build your new site for free. Review it. Love it? It goes live and we keep it updated so you never have to worry about it again. No obligation.
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
              {['No upfront payment', 'Review before you pay', 'No contracts', 'Cancel anytime', 'Keep your domain'].map((item) => (
                <li key={item} className="flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold text-accent">
                  <span className="text-accent">{Icon.check}</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-[0_8px_40px_-8px_rgb(0,0,0,0.1)]">
              {formStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center mx-auto mb-4">
                    {Icon.check}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">You're all set!</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    We received your request and will be in touch shortly to get started on your free website.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-sm text-accent font-semibold hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Web3Forms hidden fields */}
                  <input type="hidden" name="access_key" value="fc05109e-be57-4471-ac9c-77b28ac9952f" />
                  <input type="hidden" name="subject" value="New SiteUpscale Lead" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Business name" name="business_name" type="text" placeholder="e.g. Apex Plumbing Co." value={formData.business_name} onChange={handleFormChange} required />
                    <FormField label="Website URL" name="website_url" type="url" placeholder="https://yourbusiness.com" value={formData.website_url} onChange={handleFormChange} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Your name" name="name" type="text" placeholder="Your name" value={formData.name} onChange={handleFormChange} required />
                    <FormField label="Email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleFormChange} required />
                  </div>
                  <FormField label="Phone (optional)" name="phone" type="tel" placeholder="(555) 123-4567" value={formData.phone} onChange={handleFormChange} />
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700">Message (optional)</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={3}
                      className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all resize-none"
                      placeholder="Anything specific you'd like us to look at?"
                    />
                  </label>

                  {formStatus === 'error' && (
                    <p className="text-sm text-red-500 text-center">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="mt-2 w-full rounded-xl bg-accent hover:bg-accent-hover text-white font-bold py-4 text-base transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    {formStatus === 'loading' ? 'Sending…' : 'Request My Free Website'}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">No credit card. No contract. No upfront payment. We build it, you decide.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      </div>{/* end Card 3 */}

      {/* ── Card 3b — white, stacks over Card 3 ── */}
      <div className="relative -mt-16 rounded-t-[4rem] overflow-hidden bg-white" style={{ zIndex: 35, boxShadow: '0 -20px 60px rgba(0,0,0,0.17)', paddingBottom: '6rem' }}>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <FaqSection />

      </div>{/* end Card 3b */}

      {/* ── Card 4 — dark, stacks on top of Card 3 ── */}
      <div className="relative z-40 -mt-16 rounded-t-[4rem] overflow-hidden" style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 30%, #0f766e 62%, #0f172a 84%, #020617 100%)', boxShadow: '0 -20px 60px rgba(0,0,0,0.18)' }}>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 md:py-[7.5rem]"
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 30%, #0f766e 62%, #0f172a 84%, #020617 100%)',
          backgroundSize: '300% 300%',
          animation: 'heroGradientShift 18s ease infinite',
        }}
      >
        {/* dot-grid texture (matches hero) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* ambient glow orbs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-accent/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400/80 mb-5">One less thing to worry about</p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-white tracking-[-0.02em] leading-tight">
              Never think about your<br />website again.
            </h2>
            <p className="mt-6 text-lg text-gray-300/85 leading-relaxed">
              We build it for free. We keep it updated. You run your business. No logins, no dashboards, no hassle.
            </p>
            {/* button with subtle teal glow behind it */}
            <div className="relative mt-10 inline-flex justify-center">
              <div className="absolute -inset-3 rounded-2xl bg-teal-400/20 blur-xl pointer-events-none" />
              <button
                onClick={() => scrollTo('free-offer')}
                className="relative inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 font-bold px-8 py-4 text-base transition-all duration-200 shadow-[0_8px_32px_-4px_rgb(0,0,0,0.4)] hover:bg-gray-50 hover:-translate-y-1 hover:shadow-[0_16px_48px_-4px_rgb(0,0,0,0.5)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Get My Free Website
                <span>{Icon.arrow}</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-gray-950 border-t border-white/5 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-white text-base">SiteUpscale</p>
            <p className="text-sm text-gray-500 mt-0.5">Website care for local businesses. You never have to think about it.</p>
          </div>
          <a href="mailto:hello@siteupscale.com" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
            hello@siteupscale.com
          </a>
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} SiteUpscale. All rights reserved.</p>
        </div>
      </footer>
      </div>{/* end Card 4 */}
      </div>{/* end inset column */}
    </div>
  )
}

/* ─────────────────────── reusable components ────────────────────────── */

function SectionLabel({ text, className = '' }) {
  return (
    <p className={`text-center text-xs font-bold uppercase tracking-widest text-accent ${className}`}>
      {text}
    </p>
  )
}

/**
 * FloatingBadge — infinite looping float-up animation.
 * Each badge has a different duration and delay so they feel organic.
 * During the initial delay, animationFillMode "both" holds opacity:0
 * from the 0% keyframe so the badge stays invisible until its cycle begins.
 */
function FloatingBadge({ label, duration = '4s', delay = '0s', className }) {
  return (
    <div
      className={`${className} items-center gap-2 rounded-xl border border-gray-200 bg-white/95 backdrop-blur-sm px-3.5 py-2.5 shadow-[0_4px_16px_-2px_rgb(0,0,0,0.12)] text-xs font-semibold text-gray-700 whitespace-nowrap z-20`}
      style={{ animation: `floatBadge ${duration} ease-in-out ${delay} infinite both` }}
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
      {label}
    </div>
  )
}

function FormField({ label, name, type, placeholder, value, onChange, required }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
      />
    </label>
  )
}

function PricingCard({ name, price, features, note, highlighted }) {
  return (
    <div
      className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-200 ${
        highlighted
          ? 'border-accent bg-white shadow-[0_16px_60px_-12px_rgb(13_148_136/0.35)] ring-2 ring-accent/20 md:-translate-y-2 hover:md:-translate-y-3 z-10'
          : 'border-gray-200 bg-white shadow-[0_4px_20px_-4px_rgb(0,0,0,0.1)] hover:shadow-[0_12px_40px_-8px_rgb(0,0,0,0.14)] hover:border-gray-300 hover:-translate-y-1'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-block rounded-full bg-accent px-4 py-1 text-[11px] font-bold text-white uppercase tracking-wider shadow-lg shadow-accent/30">
            Most Popular
          </span>
        </div>
      )}
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{note}</p>
      <h3 className="mt-2 text-xl font-bold text-gray-900">{name}</h3>
      <p className="mt-4">
        <span className="text-4xl font-extrabold text-gray-900">{price}</span>
        <span className="text-gray-400 text-base font-medium">/mo</span>
      </p>
      <div className="my-6 border-t border-gray-100" />
      <ul className="space-y-3 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed">
            <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${highlighted ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
              {Icon.check}
            </span>
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={() => document.getElementById('free-offer')?.scrollIntoView({ behavior: 'smooth' })}
        className={`mt-8 w-full rounded-xl py-3.5 text-sm font-bold transition-all duration-200 ${
          highlighted
            ? 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-0.5'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:-translate-y-0.5'
        }`}
      >
        Get My Free Website
      </button>
    </div>
  )
}

/* ─────────────────────── hero chat simulation ───────────────────────── */

const CHAT_CONVOS = [
  {
    owner: 'Add our new service: Interior Painting - starting at $299',
    urgent: false,
    agentDelay: 950,
    reply: "Got it! We'll reach back out in less than 1 hr to make the change.",
  },
  {
    owner: 'We are closed due to a private party. We will be back open tomorrow at 10am.',
    urgent: true,
    agentDelay: 300,
    reply: "On it! ⚡ Flagged as urgent. Your site will be updated within 15 min.",
  },
]

/* ─────────────────── step connector (animated line on scroll) ──────── */
function StepConnector() {
  const [ref, visible] = useInView(0.25)
  return (
    <div
      ref={ref}
      className="absolute hidden md:block pointer-events-none"
      style={{
        height: '2px',
        top: '2rem',
        left: 'calc(16.67% + 1.5rem)',
        right: 'calc(16.67% + 1.5rem)',
        /* Base gradient — bright spot flows left to right after reveal */
        background: 'linear-gradient(90deg, rgba(20,184,166,0.22) 0%, rgba(20,184,166,0.55) 20%, rgba(94,234,212,0.95) 50%, rgba(20,184,166,0.55) 80%, rgba(20,184,166,0.22) 100%)',
        backgroundSize: '300% 100%',
        backgroundPosition: '100% 0',
        /* Reveal: scaleX driven by scroll entry */
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left center',
        transition: 'transform 1.3s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
        /* Sweep starts after reveal completes (~1.6s total) */
        animation: visible ? 'pipelineFlow 2.8s linear infinite 1.6s' : 'none',
        /* Teal glow */
        boxShadow: '0 0 10px 2px rgba(20,184,166,0.35)',
        borderRadius: '1px',
      }}
    />
  )
}

/* ─────────────────────── hero chat simulation ───────────────────────── */
function HeroChatSim() {
  const [stage, setStage] = useState('pre')
  const [convoIdx, setConvoIdx] = useState(0)
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState([])
  const [fading, setFading] = useState(false)
  // Tracks whether the "⚡ Mark Urgent" button has been visually "clicked"
  const [urgentPressed, setUrgentPressed] = useState(false)

  useEffect(() => {
    const convo = CHAT_CONVOS[convoIdx]

    if (stage === 'pre') {
      const t = setTimeout(() => setStage('typing'), convoIdx === 0 ? 900 : 1100)
      return () => clearTimeout(t)
    }

    if (stage === 'typing') {
      if (inputText.length < convo.owner.length) {
        const t = setTimeout(
          () => setInputText(convo.owner.slice(0, inputText.length + 1)),
          46,
        )
        return () => clearTimeout(t)
      } else {
        if (convo.urgent) {
          // Pause after typing finishes, then reveal the urgency selector
          const t = setTimeout(() => setStage('urgent_select'), 420)
          return () => clearTimeout(t)
        } else {
          const t = setTimeout(() => {
            setMessages((prev) => [...prev, { from: 'owner', text: inputText, urgent: false }])
            setInputText('')
            setStage('agent_typing')
          }, 400)
          return () => clearTimeout(t)
        }
      }
    }

    // User "sees" the Send / ⚡ Mark Urgent options — after a beat, auto-click urgent
    if (stage === 'urgent_select') {
      const t = setTimeout(() => {
        setUrgentPressed(true)
        setStage('urgent_clicked')
      }, 980)
      return () => clearTimeout(t)
    }

    // Button press animation plays, then message sends as urgent
    if (stage === 'urgent_clicked') {
      const t = setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'owner', text: inputText, urgent: true }])
        setInputText('')
        setUrgentPressed(false)
        setStage('agent_typing')
      }, 480)
      return () => clearTimeout(t)
    }

    if (stage === 'agent_typing') {
      const t = setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'agent', text: convo.reply, urgent: convo.urgent }])
        setStage('replied')
      }, convo.agentDelay + 850)
      return () => clearTimeout(t)
    }

    if (stage === 'replied') {
      if (convoIdx < CHAT_CONVOS.length - 1) {
        const t = setTimeout(() => { setConvoIdx((i) => i + 1); setStage('pre') }, 1900)
        return () => clearTimeout(t)
      } else {
        const t1 = setTimeout(() => setFading(true), 3200)
        const t2 = setTimeout(() => {
          setMessages([]); setConvoIdx(0); setInputText('')
          setFading(false); setUrgentPressed(false); setStage('pre')
        }, 3800)
        return () => { clearTimeout(t1); clearTimeout(t2) }
      }
    }
  }, [stage, inputText, convoIdx])

  const convo = CHAT_CONVOS[convoIdx]
  const isTyping = stage === 'typing'
  const isAgentTyping = stage === 'agent_typing'
  const sendReady = isTyping && inputText.length === convo.owner.length
  const inUrgentUI = stage === 'urgent_select' || stage === 'urgent_clicked'

  // Input border state
  const inputBorderCls = inUrgentUI && urgentPressed
    ? 'border-amber-300 bg-amber-50/30 shadow-sm'
    : isTyping || inUrgentUI
      ? 'border-accent/30 bg-white shadow-sm'
      : 'border-gray-200 bg-gray-50'

  return (
    <div
      className="h-full flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white shadow-[0_32px_100px_-16px_rgba(0,0,0,0.65)]"
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.55s ease-out' }}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 px-5 py-3.5 bg-gray-50 border-b border-gray-100">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-3 rounded-md bg-white border border-gray-200 h-6 flex items-center justify-center text-xs text-gray-400 font-medium">
          siteupscale.com/messages
        </div>
      </div>

      {/* chat header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">SR</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-800">SiteUpscale</div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="text-xs text-gray-400">Online · updates within 1 hr</span>
          </div>
        </div>
      </div>

      {/* messages — min-h-0 so this shrinks when input box grows (wraps) */}
      <div className="px-5 pt-4 pb-3 space-y-3 flex-1 min-h-0 flex flex-col justify-end overflow-auto">
        {messages.map((msg, i) => {
          const isPast = convoIdx > 0 && i < 2
          if (msg.from === 'owner') {
            return (
              <div
                key={i}
                className="flex justify-end"
                style={{
                  opacity: isPast ? 0.4 : 1,
                  transition: 'opacity 0.5s',
                  animation: !isPast ? 'slideUp 0.26s ease-out both' : undefined,
                }}
              >
                <div className="flex flex-col items-end gap-1 max-w-[82%]">
                  {msg.urgent && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-0.5">
                      ⚡ URGENT
                    </span>
                  )}
                  <div className={`rounded-2xl rounded-br-sm px-4 py-2.5 ${msg.urgent ? 'bg-[#0f172a]' : 'bg-accent'}`}>
                    <p className="text-[13px] text-white leading-snug">{msg.text}</p>
                  </div>
                </div>
              </div>
            )
          }
          return (
            <div
              key={i}
              className="flex items-end gap-2"
              style={{
                opacity: isPast ? 0.4 : 1,
                transition: 'opacity 0.5s',
                animation: !isPast ? 'slideUp 0.26s ease-out both' : undefined,
              }}
            >
              <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center text-[10px] font-bold text-accent flex-shrink-0">SR</div>
              <div className={`rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[84%] ${msg.urgent ? 'bg-slate-100 border border-slate-200' : 'bg-gray-100'}`}>
                <p className={`text-[13px] leading-snug ${msg.urgent ? 'text-slate-700' : 'text-gray-700'}`}>{msg.text}</p>
              </div>
            </div>
          )
        })}

        {/* agent typing dots */}
        {isAgentTyping && (
          <div className="flex items-end gap-2" style={{ animation: 'slideUp 0.22s ease-out both' }}>
            <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center text-[10px] font-bold text-accent flex-shrink-0">SR</div>
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1.5 items-center h-3.5">
                {[0, 140, 280].map((d) => (
                  <span key={d} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* input field — wraps to multiple lines; only this area grows, messages area shrinks */}
      <div className="px-4 pb-4 flex-shrink-0">
        <div
          className={`flex items-end gap-2.5 rounded-xl border px-4 py-3 transition-all duration-300 min-h-[52px] ${inputBorderCls}`}
        >
          <span className="flex-1 text-sm text-gray-700 min-w-0 text-left py-0.5 whitespace-pre-wrap break-words">
            {isTyping || inUrgentUI ? (
              <>
                {inputText}
                {isTyping && (
                  <span
                    className="inline-block w-[2px] h-3.5 bg-gray-600 ml-px align-middle rounded-full"
                    style={{ animation: 'blink 0.9s step-end infinite' }}
                  />
                )}
              </>
            ) : (
              <span className="text-gray-400">Message SiteUpscale...</span>
            )}
          </span>
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              sendReady ? 'bg-accent shadow-sm shadow-accent/30 scale-110' : 'bg-gray-200'
            }`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-white">
              <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.925A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.896 28.896 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.289Z" />
            </svg>
          </button>
        </div>

        {/* Urgency selector — appears after typing finishes on urgent convos */}
        {inUrgentUI && (
          <div
            className="flex items-center justify-end gap-2 mt-2"
            style={{ animation: 'fadeIn 0.25s ease both' }}
          >
            <span className="text-[11px] text-gray-400 mr-1">Mark as:</span>
            <button className="text-[11px] px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 bg-white">
              Normal
            </button>
            <button
              className="text-[11px] px-3 py-1.5 rounded-lg border font-semibold transition-all duration-200 flex items-center gap-1"
              style={{
                borderColor: urgentPressed ? '#f59e0b' : '#fcd34d',
                background: urgentPressed ? '#f59e0b' : '#fffbeb',
                color: urgentPressed ? '#fff' : '#92400e',
                transform: urgentPressed ? 'scale(0.93)' : 'scale(1)',
                boxShadow: urgentPressed ? '0 0 0 3px rgba(245,158,11,0.25)' : 'none',
              }}
            >
              ⚡ Mark Urgent
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ──────────────── scrollytelling story section ─────────────────────── */

  const TERMINAL_LINES = [
    { c: 'text-slate-500',    t: "# Building: Apex Plumbing Co." },
    { c: '',                  t: '' },
    { c: 'text-teal-300/90', t: '<!DOCTYPE html>' },
    { c: 'text-teal-300/90', t: '<html lang="en">' },
    { c: 'text-white/45',    t: '  <head>' },
    { c: 'text-sky-300/75',  t: "    <title>Apex Plumbing Co. — Local Plumbing Services</title>" },
    { c: 'text-sky-300/55',  t: '    <link rel="stylesheet" href="styles.css">' },
    { c: 'text-white/45',    t: '  </head>' },
    { c: 'text-white/45',    t: '  <body>' },
    { c: '',                  t: '' },
    { c: 'text-teal-300/65', t: '    <nav class="site-nav">' },
    { c: 'text-white/65',    t: '      Home · Services · About · Contact' },
    { c: 'text-teal-300/65', t: '    </nav>' },
    { c: '',                  t: '' },
    { c: 'text-teal-300/65', t: '    <section class="hero">' },
    { c: 'text-amber-200/90',t: "      <h1>Fast, Reliable Plumbing</h1>" },
    { c: 'text-white/60',    t: "      <p>Serving the area since 2004. Available 24/7.</p>" },
    { c: 'text-teal-400',    t: '      <a class="btn-cta" href="/contact">Get a Free Quote →</a>' },
    { c: 'text-teal-300/65', t: '    </section>' },
    { c: '',                  t: '' },
    { c: 'text-white/45',    t: '  </body>' },
    { c: 'text-teal-300/90', t: '</html>' },
    { c: '',                  t: '' },
    { c: 'text-emerald-400', t: '✓  Build complete  (2.1s)' },
    { c: 'text-white/35',    t: '   Deploying to siteupscale.com...' },
    { c: 'text-emerald-300', t: '✓  Live: apex-plumbing.siteupscale.com' },
  ]

  function TerminalDemo({ active }) {
    const [visible, setVisible] = useState(0)
    const scrollRef = useRef(null)

    useEffect(() => {
      if (!active) { setVisible(0); return }
      let timer
      let idx = 0
      function tick() {
        if (idx < TERMINAL_LINES.length) {
          setVisible(++idx)
          timer = setTimeout(tick, TERMINAL_LINES[idx - 1].t === '' ? 55 : 130)
        } else {
          timer = setTimeout(() => { idx = 0; setVisible(0); timer = setTimeout(tick, 180) }, 2800)
        }
      }
      timer = setTimeout(tick, 420)
      return () => clearTimeout(timer)
    }, [active])

    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [visible])

    return (
      <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-[#080d18] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1525] border-b border-white/8 flex-shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-white/35 truncate">~/siteupscale/apex-plumbing  —  index.html</span>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 font-mono text-[11px] leading-[1.8]" style={{ scrollbarWidth: 'none' }}>
          {TERMINAL_LINES.slice(0, visible).map((line, i) => (
            <div key={i} className="flex gap-3 min-h-[1.8em]">
              <span className="text-slate-700 select-none w-4 text-right flex-shrink-0 tabular-nums">{line.t !== '' ? i + 1 : ''}</span>
              <span className={line.c || 'select-none'}>{line.t || '\u00a0'}</span>
            </div>
          ))}
          {visible < TERMINAL_LINES.length && visible > 0 && (
            <div className="flex gap-3">
              <span className="text-slate-700 select-none w-4 text-right">{visible + 1}</span>
              <span className="w-[7px] h-[13px] bg-teal-400/80 rounded-sm inline-block" style={{ animation: 'blink 0.9s step-end infinite' }} />
            </div>
          )}
        </div>
      </div>
    )
  }

  const APPROVAL_MSGS = [
    { from: 'sr',      text: "Your website is ready for review! Take a look \uD83D\uDC40",                 delay: 700  },
    { from: 'preview', url:  'apex-plumbing.siteupscale.com',                                            delay: 1500 },
    { from: 'owner',   text: "Just checked it on my phone — this looks incredible. Love it!",            delay: 3400 },
    { from: 'sr',      text: "So glad you love it! Your site is now live. Welcome to SiteUpscale \uD83C\uDF89", delay: 5000 },
    { from: 'badge',                                                                                    delay: 6000 },
  ]

  function ApprovalChatSim({ active }) {
    const [shown, setShown] = useState(0)
    const [loopKey, setLoopKey] = useState(0)
    const scrollRef = useRef(null)

    useEffect(() => {
      if (!active) { setShown(0); return }
      setShown(0)
      const timers = APPROVAL_MSGS.map((msg, i) => setTimeout(() => setShown(i + 1), msg.delay))
      const restart = setTimeout(
        () => setLoopKey(k => k + 1),
        APPROVAL_MSGS[APPROVAL_MSGS.length - 1].delay + 3500
      )
      return () => { timers.forEach(clearTimeout); clearTimeout(restart) }
    }, [active, loopKey])

    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [shown])

    return (
      <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white shadow-[0_24px_80px_-12px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-2 px-5 py-3.5 bg-gray-50 border-b border-gray-100 flex-shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div className="flex-1 mx-3 rounded-md bg-white border border-gray-200 h-6 flex items-center justify-center text-xs text-gray-400 font-medium">
            siteupscale.com/preview
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">SR</div>
          <div>
            <div className="text-sm font-semibold text-gray-800">SiteUpscale</div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-xs text-gray-400">Online - preview ready</span>
            </div>
          </div>
        </div>
        <div ref={scrollRef} className="flex-1 px-5 py-4 space-y-3 overflow-y-auto">
          {APPROVAL_MSGS.slice(0, shown).map((msg, i) => {
            if (msg.from === 'badge') return (
              <div key={i} className="flex justify-center py-1" style={{ animation: 'fadeIn 0.4s ease both' }}>
                <div className="flex items-center gap-2.5 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5">
                  <span className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-white flex-shrink-0">{Icon.check}</span>
                  <div>
                    <p className="text-xs font-bold text-teal-900 leading-none">Site is live</p>
                    <p className="text-[11px] text-teal-600 mt-0.5">Growth plan - $199/mo</p>
                  </div>
                </div>
              </div>
            )
            if (msg.from === 'preview') return (
              <div key={i} className="flex items-end gap-2" style={{ animation: 'slideUp 0.26s ease-out both' }}>
                <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">SR</div>
                <div className="rounded-2xl rounded-bl-sm bg-gray-100 p-2.5 max-w-[82%]">
                  <div className="rounded-lg border border-gray-200 bg-white p-2.5 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white flex-shrink-0">{Icon.globe}</div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-gray-800 leading-none">Preview ready</p>
                      <p className="text-[10px] text-teal-600 mt-0.5 truncate">{msg.url}</p>
                    </div>
                    <span className="ml-auto flex-shrink-0 text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2 py-0.5">Open</span>
                  </div>
                </div>
              </div>
            )
            if (msg.from === 'owner') return (
              <div key={i} className="flex justify-end" style={{ animation: 'slideUp 0.26s ease-out both' }}>
                <div className="rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 max-w-[82%]">
                  <p className="text-[13px] text-white leading-snug">{msg.text}</p>
                </div>
              </div>
            )
            return (
              <div key={i} className="flex items-end gap-2" style={{ animation: 'slideUp 0.26s ease-out both' }}>
                <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">SR</div>
                <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-2.5 max-w-[80%]">
                  <p className="text-[13px] text-gray-800 leading-snug">{msg.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  function MobileStepItem({ step, stepIndex }) {
    const [ref, visible] = useInView(0.2)
    return (
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-extrabold tracking-tight flex-shrink-0 ${
              stepIndex === 2 ? 'border-teal-500 bg-teal-50 text-teal-600' : 'border-gray-900 bg-gray-900 text-white'
            }`}>{step.n}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Step {stepIndex + 1} of 3</span>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-[-0.02em] mb-3">{step.title}</h3>
          <p className="text-gray-500 leading-relaxed text-sm mb-5">{step.body}</p>
          <ul className="space-y-2">
            {step.bullets.map(b => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-gray-600">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${stepIndex === 2 ? 'bg-teal-500' : 'bg-gray-400'}`} />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div
          ref={ref}
          className="rounded-2xl overflow-hidden"
          style={{
            height: '420px',
            background: 'linear-gradient(145deg, #07101f 0%, #0f172a 52%, #091c1a 100%)',
            boxShadow: '0 16px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          <div className="p-5 h-full">
            {stepIndex === 0 && <TerminalDemo active={visible} />}
            {stepIndex === 1 && <ApprovalChatSim active={visible} />}
            {stepIndex === 2 && <HeroChatSim />}
          </div>
        </div>
      </div>
    )
  }

  function ProcessStory() {
    const [activeStep, setActiveStep] = useState(0)
    // Trails activeStep by 460 ms so demo animations only fire after the
    // panel fade-in transition has completed.
    const [activeStepDelayed, setActiveStepDelayed] = useState(0)
    const driverRef = useRef(null)

    // Scroll-driver progress: the driver div is 400 vh tall.
    // Scrollable distance = 300 vh (400 - 100 viewport).
    // Each of the 3 steps occupies exactly 100 vh of that range.
    // The viewport is pinned — no content physically scrolls.
    useEffect(() => {
      const update = () => {
        const driver = driverRef.current
        if (!driver) return
        const { top, height } = driver.getBoundingClientRect()
        const scrollable = height - window.innerHeight
        if (scrollable <= 0) return
        const progress = Math.max(0, Math.min(1, -top / scrollable))
        setActiveStep(Math.min(2, Math.floor(progress * 3)))
      }
      window.addEventListener('scroll', update, { passive: true })
      update()
      return () => window.removeEventListener('scroll', update)
    }, [])

    useEffect(() => {
      const t = setTimeout(() => setActiveStepDelayed(activeStep), 460)
      return () => clearTimeout(t)
    }, [activeStep])

    const goToStep = (i) => {
      const driver = driverRef.current
      if (!driver) return
      const scrollable = driver.offsetHeight - window.innerHeight
      window.scrollTo({ top: driver.offsetTop + (i / 3) * scrollable, behavior: 'smooth' })
    }

    const STEPS = [
      {
        n: '01', title: 'We build your website for free',
        body: 'Fresh start or full rebuild. We design and code a real, professional site for your business at zero upfront cost. No templates, no DIY.',
        bullets: ['Custom design for your business', 'Mobile-friendly from day one', 'Live in days, not months', 'No payment until you approve it'],
      },
      {
        n: '02', title: 'Only pay if you love it',
        body: "We send you a preview link. Browse it on your phone. Love it? Your monthly plan begins and we handle everything from there. Not right for you? Walk away. No charge.",
        bullets: ['Review before you pay', 'No contracts, month to month', 'Cancel anytime', 'Your domain stays yours'],
      },
      {
        n: '03', title: 'Never think about your website again.',
        body: "No logins. No dashboards. No waiting days for an agency. Send us a message and we handle it, usually within the hour. Your site stays current and you stay focused on your business. That's the whole point.",
        bullets: ['No logins or admin panels ever', 'No chasing agencies or waiting on quotes', 'Just send a message and it gets done', 'Hosting, maintenance, and peace of mind included'],
      },
    ]

    const demoBg = {
      background: 'linear-gradient(145deg, #07101f 0%, #0f172a 52%, #091c1a 100%)',
      boxShadow: '0 8px 32px -8px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06)',
    }

    const scenes = [
      <TerminalDemo key="term" active={activeStepDelayed === 0} />,
      <ApprovalChatSim key="appr" active={activeStepDelayed === 1} />,
      <div key="chat" style={{ height: '100%', animation: activeStepDelayed === 2 ? 'floatDemo 5.5s ease-in-out infinite' : 'none' }}>
        <HeroChatSim />
      </div>,
    ]

    return (
      <>
        {/* ── Desktop: sticky scroll-driver pattern ─────────────────────────
            The 400 vh driver div provides 300 vh of scrollable range.
            The viewport is physically pinned the entire time — the user
            scrolls through the driver while the content cross-fades.
            Each step occupies exactly 100 vh of scroll distance. ────────── */}
        <div
          ref={driverRef}
          className="hidden lg:block relative"
          style={{ height: '1188px', marginTop: '0.5rem' }}
        >
          <div
            className="sticky top-0 flex flex-col bg-white overflow-hidden"
            style={{ height: 'auto', minHeight: 0 }}
          >
            {/* Heading — locked at top of sticky panel, zero gap to content */}
            <div className="flex-shrink-0 pt-10 pb-2 text-center">
              <SectionLabel text="How it works" />
              <h2 className="mt-3 text-[clamp(2rem,3.5vw,3.25rem)] font-extrabold text-gray-900 tracking-[-0.025em] leading-[1.08]">
                Free to build. Then we take it from here.
              </h2>
              <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg text-center">
                You only pay if you love it. After that, your website runs in the background. You never have to think about it.
              </p>
            </div>

            {/* Content row — natural height, does NOT flex-grow so the strip follows immediately below */}
            <div className="flex items-start gap-14 xl:gap-20 pt-6 pb-0">
            {/* Left: step descriptions — absolutely stacked, cross-fade between steps */}
            <div className="w-[360px] xl:w-[400px] flex-shrink-0 relative flex flex-col text-left" style={{ marginTop: '2rem' }}>
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col justify-start pr-2"
                  style={{
                    opacity: activeStep === i ? 1 : 0,
                    transform: `translateY(${activeStep === i ? 0 : activeStep > i ? -18 : 14}px)`,
                    transition: 'opacity 0.55s ease, transform 0.55s ease',
                    pointerEvents: activeStep === i ? 'auto' : 'none',
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-extrabold tracking-tight flex-shrink-0 ${
                      i === 2
                        ? 'border-teal-500 bg-teal-50 text-teal-600'
                        : 'border-gray-900 bg-gray-900 text-white'
                    }`}>{step.n}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Step {i + 1} of 3</span>
                  </div>
                  <h3 className="text-3xl xl:text-[2.1rem] font-extrabold text-gray-900 tracking-[-0.025em] mb-5 leading-[1.1]">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-[0.96rem] mb-7">{step.body}</p>
                  <ul className="space-y-3">
                    {step.bullets.map(b => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 2 ? 'bg-teal-500' : 'bg-gray-400'}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right: demo panel + progress dots */}
            <div className="flex-1 min-w-0 flex flex-col justify-start gap-4" style={{ marginTop: '1rem' }}>
              <div className="rounded-3xl overflow-hidden relative" style={{ height: '620px', ...demoBg }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 55% at 72% -5%, rgba(15,118,110,0.28) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 8% 105%, rgba(20,184,166,0.13) 0%, transparent 60%)' }} />
                <div className="absolute -top-px right-[10%] w-[45%] h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent pointer-events-none" />
                {scenes.map((scene, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 p-7"
                    style={{
                      opacity: activeStep === i ? 1 : 0,
                      transform: `translateY(${activeStep === i ? 0 : activeStep > i ? -14 : 14}px)`,
                      transition: 'opacity 0.45s ease, transform 0.45s ease',
                      pointerEvents: activeStep === i ? 'auto' : 'none',
                    }}
                  >
                    {scene}
                  </div>
                ))}
              </div>
              {/* Progress dots — clicking jumps to that step's scroll position */}
              <div className="flex justify-center items-center gap-2.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToStep(i)}
                    className={`rounded-full transition-all duration-300 ${activeStep === i ? 'w-5 h-1.5 bg-teal-500' : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
            </div>
            </div> {/* end content-row */}

            {/* Who it's for — locked in the sticky panel, always visible while scrolling steps */}
            <div className="flex-shrink-0 border-t border-gray-100 mt-5 pt-5 pb-6 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-4">Built for local business owners who…</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Don't want to manage a website",
                    "Are tired of outdated sites losing trust",
                    "Can't afford agency retainers",
                    "Want it handled so they can run their business",
                    "Never want to log in or chase someone for changes",
                    "Want peace of mind, not another task",
                  ].map((item) => (
                    <div key={item} className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-100 bg-gray-50/70 px-3 py-7 text-center min-h-[100px]">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                        {Icon.check}
                      </span>
                      <span className="text-xs font-medium text-gray-600 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile: stacked steps with demos */}
        <div className="lg:hidden">
          <div className="text-center pt-10 pb-2">
            <SectionLabel text="How it works" />
            <h2 className="mt-3 text-[clamp(1.75rem,6vw,2.5rem)] font-extrabold text-gray-900 tracking-[-0.025em] leading-[1.1]">
              Free to build. Then we take it from here.
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed text-base text-center px-2">
              You only pay if you love it. After that, your website runs in the background. You never have to think about it.
            </p>
          </div>
        </div>
        <div className="lg:hidden mt-10 space-y-14">
          {STEPS.map((step, i) => (
            <MobileStepItem key={i} step={step} stepIndex={i} />
          ))}
        </div>
      </>
    )
  }

/* ─────────────────────── example website fix section ───────────────── */

const FIX_CALLOUTS = [
  {
    id: 0,
    title: 'Better call button placement',
    desc: 'A tappable "Call Now" button in the nav so visitors can reach you without searching.',
  },
  {
    id: 1,
    title: 'Cleaner menu layout',
    desc: 'Spaced, readable menu items with clear names and prices — no more wall of text.',
  },
  {
    id: 2,
    title: 'Improved mobile spacing',
    desc: 'Consistent padding and clean info sections so every visitor has a smooth experience.',
  },
]

/* ─────────────────────────── FAQ section ───────────────────────────── */

const FAQS = [
  { q: 'Do I keep my domain?',            a: 'Yes. Your domain is always yours. We never hold it hostage.' },
  { q: 'What if I cancel?',               a: 'Your site stays live until the end of your billing cycle. No sudden takedowns.' },
  { q: 'How fast are updates?',           a: 'Usually within an hour during business hours. Urgent requests are flagged and handled first.' },
  { q: 'Do you redesign websites too?',   a: 'Yes. We can refresh an existing site or build a brand new one from scratch — both at zero upfront cost.' },
  { q: 'What if I already have a site?',  a: 'Great. We can work with what you have, refresh the design, or rebuild it cleanly. Your call.' },
  { q: 'Is there a contract?',            a: 'No contracts. Month-to-month only. Cancel anytime with no penalties.' },
]

/* ───────────────── website transformation showcase ─────────────────── */
function WebsiteTransformation() {
  return (
    <section className="pt-16 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel text="Before and after" />
          <h2 className="mt-5 text-[clamp(1.75rem,3vw,2.4rem)] font-extrabold text-gray-900 tracking-[-0.02em] text-center leading-tight">
            The difference between being overlooked<br className="hidden sm:block" /> and getting calls.
          </h2>
          <p className="mt-5 text-center text-gray-500 max-w-lg mx-auto leading-relaxed text-[0.975rem]">
            Same business. Same services. The only thing that changed was the{' '}
            <span className="text-accent font-semibold">website</span>.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_44px_1fr] gap-y-12 lg:gap-y-0 items-start">

            {/* ── BEFORE browser ─────────────────────────────────── */}
            <div className="flex flex-col gap-4 min-w-0">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Before</p>
                  <p className="text-[12px] font-medium text-gray-400 leading-snug">Outdated, hard to trust</p>
                </div>
              </div>
              {/* Faded, lower-shadow treatment to visually de-emphasize */}
              <div className="rounded-2xl overflow-hidden border border-gray-200/70 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] w-full" style={{ height: 580, filter: 'saturate(0.5) brightness(0.85) contrast(0.88) blur(0.5px)' }}>
                {/* browser chrome — greyed out, IE-era */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#e0e0e0] border-b border-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d0d0d0]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d0d0d0]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d0d0d0]" />
                  <div className="flex-1 mx-3 rounded bg-white border border-gray-300 h-6 flex items-center px-2.5 text-[11px] text-gray-500">
                    www.mikesplumbing.net
                  </div>
                </div>
                {/* page content — authentic 2004 local biz site */}
                <div className="overflow-hidden" style={{ height: 'calc(100% - 44px)', fontFamily: 'Arial, Helvetica, sans-serif', background: '#c8daf0', backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,0.25) 19px,rgba(255,255,255,0.25) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,0.25) 19px,rgba(255,255,255,0.25) 20px)' }}>

                  {/* ── HEADER: logo left, cluttered right ── */}
                  <div className="flex items-stretch bg-white border-b-4 border-[#cc0000]">
                    <div className="flex items-center px-2 py-2 gap-2 border-r-2 border-gray-300 flex-1">
                      {/* WordArt-style logo */}
                      <div className="border-2 border-[#cc0000] px-2 py-1 text-center flex-shrink-0" style={{ background: 'linear-gradient(180deg,#fff 0%,#ffe0e0 100%)', boxShadow: '2px 2px 0 #cc000044' }}>
                        <div style={{ fontSize: 11, fontWeight: 900, color: '#cc0000', fontFamily: 'Arial Black, Arial, sans-serif', textShadow: '1px 1px 0 #88000066', letterSpacing: '0.05em' }}>MIKE&apos;S</div>
                        <div style={{ fontSize: 7, fontWeight: 900, color: '#cc0000', fontFamily: 'Arial Black, Arial, sans-serif', borderTop: '1px solid #cc0000', marginTop: 1, paddingTop: 1, letterSpacing: '0.03em' }}>SEWER &amp; PLUMBING</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 7, fontStyle: 'italic', color: '#336699', fontFamily: 'Comic Sans MS, cursive' }}>Satisfied Customers Since 1991!</div>
                        <div style={{ fontSize: 6, color: '#999', fontFamily: 'Comic Sans MS, cursive' }}>Chicago&apos;s Most Trusted Plumber</div>
                      </div>
                    </div>
                    {/* Right: badges only — phone deliberately hidden */}
                    <div className="flex flex-col justify-center items-end px-2 py-1.5 gap-1 flex-shrink-0 bg-[#f0f0f0]">
                      <div className="flex gap-1">
                        <div className="border border-[#336699] px-1 py-0.5 text-center" style={{ background: '#e8f0ff', fontSize: 5, color: '#336699', fontWeight: 700, lineHeight: 1.2 }}>BBB<br/>A+</div>
                        <div className="border border-[#cc8800] px-1 py-0.5 text-center" style={{ background: '#fff8e0', fontSize: 5, color: '#cc8800', fontWeight: 700, lineHeight: 1.2 }}>BEST<br/>2003</div>
                        <div className="border border-[#558800] px-1 py-0.5 text-center" style={{ background: '#f0ffe0', fontSize: 5, color: '#558800', fontWeight: 700, lineHeight: 1.2 }}>TOP<br/>PICK</div>
                      </div>
                      <div style={{ fontSize: 5, color: '#bbb', fontStyle: 'italic' }}>webmaster@mikesplumbing.net</div>
                    </div>
                  </div>

                  {/* ── NAV: 20 items, overcrowded, inconsistent sizes ── */}
                  <div className="flex flex-wrap bg-[#1a3a6a] border-b-2 border-[#336699]">
                    {[
                      {n:'Home',            s:9,   bold:true,  active:true},
                      {n:'Plumbing',        s:7,   bold:false, active:false},
                      {n:'Drain Cleaning',  s:6,   bold:false, active:false},
                      {n:'Flood Control',   s:6.5, bold:false, active:false},
                      {n:'Sewer Repair',    s:7,   bold:false, active:false},
                      {n:'Water Heaters',   s:6,   bold:false, active:false},
                      {n:'Gas Lines',       s:6.5, bold:false, active:false},
                      {n:'Remodeling',      s:6,   bold:false, active:false},
                      {n:'Bathroom',        s:6.5, bold:false, active:false},
                      {n:'Kitchen',         s:6,   bold:false, active:false},
                      {n:'Commercial',      s:6,   bold:false, active:false},
                      {n:'Emergency',       s:7,   bold:true,  active:false},
                      {n:'Free Estimates',  s:6,   bold:false, active:false},
                      {n:'Coupons',         s:6.5, bold:false, active:false},
                      {n:'Testimonials',    s:6,   bold:false, active:false},
                      {n:'Gallery',         s:6.5, bold:false, active:false},
                      {n:'FAQ',             s:6,   bold:false, active:false},
                      {n:'Blog',            s:6,   bold:false, active:false},
                      {n:'About Us',        s:6.5, bold:false, active:false},
                      {n:'Contact!!!',      s:8,   bold:true,  active:false},
                    ].map(({n,s,bold,active}) => (
                      <div key={n} style={{ fontSize: s, padding: '4px 4px', borderRight: '1px solid #336699', whiteSpace: 'nowrap', flexShrink: 0, background: active ? '#cc0000' : 'transparent', color: active ? '#fff' : '#aaccff', fontWeight: bold ? 900 : 400, fontFamily: bold ? 'Arial Black, Arial, sans-serif' : 'Arial, sans-serif' }}>{n}</div>
                    ))}
                  </div>

                  {/* ── Static promo strip (no animation) ── */}
                  <div style={{ background: '#ffff99', borderBottom: '2px solid #cccc00', padding: '2px 6px', fontSize: 7, fontWeight: 700, color: '#cc0000', fontFamily: 'Comic Sans MS, cursive', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    *** CALL TODAY FOR A FREE ESTIMATE! *** 30+ YEARS EXPERIENCE *** LICENSED &amp; INSURED ***
                  </div>

                  {/* ── BODY: 2-col, left main + right sidebar ── */}
                  <div className="flex bg-white" style={{ gap: 0 }}>

                    {/* Left main */}
                    <div className="flex-1 p-2" style={{ borderRight: '1px dashed #cccccc' }}>
                      <h1 style={{ fontFamily: 'Times New Roman, Georgia, serif', fontSize: 17, fontWeight: 700, color: '#000080', lineHeight: 1.1, marginBottom: 4, textShadow: '1px 1px 2px #cccccc' }}>
                        Chicago Plumbing,<br/>
                        <span style={{ fontSize: 12, fontWeight: 400, color: '#333' }}>Sewer &amp; Flood</span><br/>
                        <span style={{ fontSize: 14, color: '#cc0000' }}>Control Specialists</span>
                      </h1>
                      <hr style={{ borderStyle: 'dashed', borderColor: '#cc0000', margin: '4px 0' }} />

                      <p style={{ fontSize: 6.5, color: '#444', lineHeight: 1.3, marginBottom: 4, fontFamily: 'Arial, sans-serif' }}>
                        Mike&apos;s Sewer &amp; Plumbing offers <b>professional</b>, experienced, and reliable plumber services for ALL homes, businesses, and industries in Chicago, IL and surrounding suburbs!! We offer <u>complete services</u> for all your plumbing and sewer needs.
                      </p>
                      <p style={{ fontSize: 6.5, color: '#555', lineHeight: 1.3, marginBottom: 4, fontFamily: 'Comic Sans MS, cursive' }}>
                        Started by <b>Leo Mike in 1991</b>, our family-owned business is now <u>2 generations</u> strong!! Mike holds a City of Chicago Contractor license, Journeyman Plumber license, Drainlayers License, State of Illinois Public Health Plumbing license and Cook County licenses.
                      </p>

                      <p style={{ fontSize: 6.5, color: '#444', lineHeight: 1.3, marginBottom: 3, fontFamily: 'Arial, sans-serif' }}>
                        We are a <u>fully licensed</u> and insured plumbing contractor serving the greater Chicagoland area since 1991. Our technicians are trained professionals who take pride in their work. We service all makes and models of plumbing systems and fixtures for both residential and commercial clients throughout Cook County and surrounding areas.
                      </p>
                      <p style={{ fontSize: 6.5, color: '#555', lineHeight: 1.3, marginBottom: 3, fontFamily: 'Comic Sans MS, cursive' }}>
                        To find out more about our services please <u>click here</u> or navigate to the appropriate page using the menu above. For questions about pricing, availability, or scheduling please use our <u>contact form</u> or send an email to webmaster@mikesplumbing.net and someone will get back to you within 3-5 business days.
                      </p>
                      <p style={{ fontSize: 6, color: '#777', lineHeight: 1.3, fontFamily: 'Arial, sans-serif' }}>
                        <i>Note: This site is best viewed in Internet Explorer. Some features may not work correctly in other browsers. If you are having trouble viewing this page please adjust your screen resolution to 800x600.</i>
                      </p>
                    </div>

                    {/* Right sidebar */}
                    <div style={{ width: 80, padding: 4, display: 'flex', flexDirection: 'column', gap: 4, background: '#eef4ff', flexShrink: 0 }}>
                      {/* Blurry clip-art image */}
                      <div style={{ border: '2px solid #aaaaaa', overflow: 'hidden', background: '#ddd' }}>
                        <div style={{ fontSize: 5, color: '#999', textAlign: 'center', padding: '1px 0', background: '#cccccc', borderBottom: '1px solid #aaa', fontFamily: 'Arial, sans-serif' }}>Our Work</div>
                        <div style={{ height: 44, backgroundImage: 'url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=30)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(1.5px) saturate(0.6) contrast(0.8)' }} />
                      </div>
                      {/* Under construction */}
                      <div style={{ border: '2px dashed #ff8800', background: '#fff8e0', padding: '3px', textAlign: 'center' }}>
                        <div style={{ fontSize: 9 }}>🚧</div>
                        <div style={{ fontSize: 5.5, fontWeight: 700, color: '#cc6600', fontFamily: 'Comic Sans MS, cursive', lineHeight: 1.2 }}>Under<br/>Construction!</div>
                        <div style={{ fontSize: 5, color: '#999', marginTop: 1 }}>New pages coming soon</div>
                      </div>
                      {/* Visit counter */}
                      <div style={{ border: '1px solid #999', background: '#ffffff', padding: '3px', textAlign: 'center' }}>
                        <div style={{ fontSize: 5.5, color: '#666', fontFamily: 'Comic Sans MS, cursive', marginBottom: 1 }}>You are visitor:</div>
                        <div style={{ fontSize: 10, fontWeight: 900, color: '#000080', fontFamily: 'Courier New, monospace', letterSpacing: '0.1em' }}>004,872</div>
                      </div>
                      {/* Free estimate box */}
                      <div style={{ border: '2px solid #cc0000', background: '#ffe8e8', padding: '3px', textAlign: 'center' }}>
                        <div style={{ fontSize: 6, fontWeight: 700, color: '#cc0000', fontFamily: 'Comic Sans MS, cursive', lineHeight: 1.3 }}>FREE<br/>Estimates!</div>
                        <div style={{ fontSize: 5.5, color: '#333', marginTop: 1 }}>Call or email us today</div>
                      </div>
                    </div>
                  </div>

                  {/* ── FOOTER ── */}
                  <div style={{ background: '#dddddd', borderTop: '3px double #999999', padding: '4px 8px' }}>
                    <div className="grid grid-cols-3 gap-1 text-center mb-1">
                      {[
                        {t:'CONTACT US', sub:'(555) 482-9921'},
                        {t:'ADDRESS', sub:'3819 W. 40th St.'},
                        {t:'SERVICE AREA', sub:'Cook & DuPage Co.'},
                      ].map(({t,sub}) => (
                        <div key={t}>
                          <div style={{ fontSize: 6, color: '#666', fontWeight: 700, textTransform: 'uppercase' }}>{t}</div>
                          <div style={{ fontSize: 5.5, color: '#888' }}>{sub}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 5, color: '#aaa', borderTop: '1px solid #bbb', paddingTop: 2 }}>
                      <span>Copyright &copy; 2004 Mike&apos;s Plumbing LLC | All Rights Reserved</span>
                      <span>Best viewed in Internet Explorer 6 at 800x600</span>
                    </div>
                  </div>

                </div>
              </div>
              {/* Outcome-focused negative chips */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center">
                {['No phone number','20-item nav bar','No services listed','Wall of text'].map(t => (
                  <span key={t} className="text-[10px] text-gray-400 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 leading-none text-center">{t}</span>
                ))}
              </div>
            </div>

            {/* ── Arrow — larger, centered ── */}
            <div className="hidden lg:flex flex-col items-center justify-center" style={{ paddingTop: 260 }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* ── AFTER browser — more prominent ─────────────────── */}
            <div className="flex flex-col gap-4 min-w-0">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900">After</p>
                  <p className="text-[12px] font-semibold text-gray-900 leading-snug">SiteUpscale rebuild</p>
                </div>
              </div>
              {/* Stronger shadow — visually elevated */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-[0_20px_70px_-8px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.04)] w-full" style={{ height: 580 }}>
                {/* chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f5f5f5] border-b border-gray-200">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <div className="flex-1 mx-3 rounded-md bg-white border border-gray-200 h-6 flex items-center px-2.5 text-[11px] text-gray-400">
                    mikesplumbing.com
                  </div>
                </div>
                <div className="overflow-hidden" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif', background: '#fff', maxHeight: 537 }}>

                  {/* ── Utility bar: thin, centered, warm beige ── */}
                  <div className="flex items-center justify-center gap-3 py-1 border-b border-[#E0DDD7]" style={{ backgroundColor: '#F5F4F0' }}>
                    <span className="text-[6px] font-semibold tracking-widest uppercase" style={{ color: '#A52A2A' }}>Reliable Chicago Plumbing</span>
                    <span className="text-[6px]" style={{ color: '#C2BEB1' }}>·</span>
                    <span className="text-[6px] font-bold" style={{ color: '#A52A2A' }}>(555) 482-9921</span>
                  </div>

                  {/* ── Nav ── */}
                  <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100">
                    <div style={{ fontFamily: 'Georgia, serif', color: '#A52A2A', fontSize: 11, fontWeight: 800, letterSpacing: '-0.02em' }}>
                      Mike&apos;s Plumbing
                    </div>
                    <div className="flex items-center gap-2" style={{ fontSize: 6.5, color: '#4A4A4A' }}>
                      <span>Residential</span><span style={{ color: '#C2BEB1' }}>|</span>
                      <span>Commercial</span><span style={{ color: '#C2BEB1' }}>|</span>
                      <span>Repairs</span><span style={{ color: '#C2BEB1' }}>|</span>
                      <span>Contact</span><span style={{ color: '#C2BEB1' }}>|</span>
                      <span className="flex items-center gap-0.5" style={{ fontWeight: 700, color: '#A52A2A', fontSize: 8 }}>
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 9, height: 9, flexShrink: 0 }}>
                          <path d="M3 1.5A1.5 1.5 0 0 1 4.5 0h1.585a1 1 0 0 1 .97.757l.69 2.758a1 1 0 0 1-.29.98L6.3 5.62a8.034 8.034 0 0 0 4.08 4.08l1.125-1.145a1 1 0 0 1 .98-.29l2.758.69A1 1 0 0 1 16 9.915V11.5A1.5 1.5 0 0 1 14.5 13C6.768 13 0 6.232 0 3.5A1.5 1.5 0 0 1 1.5 2H3V1.5z" fill="#A52A2A"/>
                        </svg>
                        (555) 482-9921
                      </span>
                    </div>
                  </div>

                  {/* ── Hero: split — left beige copy panel, right photo ── */}
                  <div className="flex" style={{ height: 160 }}>
                    {/* Left: warm beige panel with headline + CTA */}
                    <div className="flex flex-col justify-center px-4 gap-2 flex-shrink-0" style={{ width: '52%', backgroundColor: '#F5F4F0' }}>
                      <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A52A2A' }}>
                        Chicago, IL · Est. 1991
                      </div>
                      <div style={{ fontFamily: 'Georgia, serif', fontSize: 13.5, fontWeight: 800, color: '#2A1A1A', lineHeight: 1.2 }}>
                        Quality Plumbing,<br />Done Right.
                      </div>
                      <div style={{ fontSize: 6.5, color: '#4A4A4A', lineHeight: 1.4, maxWidth: 110 }}>
                        Installation, renovation &amp; repair. Family-owned for 30+ years.
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="rounded cursor-pointer flex items-center justify-center" style={{ backgroundColor: '#A52A2A', padding: '6px 10px' }}>
                          <span style={{ fontSize: 7, fontWeight: 800, color: '#fff', letterSpacing: '0.04em', display: 'block', textAlign: 'center' }}>Call Now</span>
                        </div>
                        <div className="rounded cursor-pointer border flex items-center justify-center" style={{ borderColor: '#C2BEB1', backgroundColor: 'transparent', padding: '6px 10px' }}>
                          <span style={{ fontSize: 7, fontWeight: 600, color: '#4A4A4A', display: 'block', textAlign: 'center' }}>Free Estimate</span>
                        </div>
                      </div>
                    </div>
                    {/* Right: lifestyle photo — warm bathroom with natural light */}
                    <div className="flex-1 relative overflow-hidden">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=70)',
                        backgroundSize: 'cover', backgroundPosition: 'center',
                      }} />
                    </div>
                  </div>

                  {/* ── Trust bar: 3 stats with dividers on white ── */}
                  <div className="flex items-center justify-center gap-0 border-b" style={{ backgroundColor: '#fff', borderColor: '#E0DDD7' }}>
                    {[
                      { n: '30+', l: 'Years Experience' },
                      { n: '5,000+', l: 'Jobs Completed' },
                      { n: 'A+ BBB', l: 'Accredited' },
                    ].map(({ n, l }, i) => (
                      <div key={l} className="flex flex-col items-center py-2 flex-1" style={{ borderRight: i < 2 ? '1px solid #E0DDD7' : 'none' }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: '#A52A2A', fontFamily: 'Georgia, serif' }}>{n}</span>
                        <span style={{ fontSize: 5.5, color: '#888', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>{l}</span>
                      </div>
                    ))}
                  </div>

                  {/* ── Services: 4 columns on white, circle icon + title + desc ── */}
                  <div className="px-4 py-3 border-b" style={{ borderColor: '#E0DDD7' }}>
                    <div style={{ fontSize: 6, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', textAlign: 'center', marginBottom: 8 }}>Our Services</div>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        {
                          t: 'Plumbing Repair', d: 'Leaks, clogs & fixtures',
                          svg: <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 13, height: 13 }}>
                            <path d="M14.5 2a3.5 3.5 0 0 0-3.276 4.724L3.293 14.65a1 1 0 0 0 1.414 1.414l7.926-7.93A3.5 3.5 0 1 0 14.5 2zm0 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="white"/>
                            <path d="M5 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="white"/>
                          </svg>
                        },
                        {
                          t: 'Water Heaters', d: 'Install & maintain',
                          svg: <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 13, height: 13 }}>
                            <rect x="5" y="3" width="10" height="12" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
                            <line x1="8" y1="3" x2="8" y2="15" stroke="white" strokeWidth="1" opacity="0.5"/>
                            <line x1="12" y1="3" x2="12" y2="15" stroke="white" strokeWidth="1" opacity="0.5"/>
                            <path d="M10 6.5c0 0-1.5 1.5-1.5 2.5a1.5 1.5 0 0 0 3 0C11.5 8 10 6.5 10 6.5z" fill="white"/>
                            <line x1="7" y1="17" x2="13" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="10" y1="15" x2="10" y2="17" stroke="white" strokeWidth="1.5"/>
                          </svg>
                        },
                        {
                          t: 'Drain & Sewer', d: 'Clearing & inspection',
                          svg: <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 13, height: 13 }}>
                            <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5" fill="none"/>
                            <circle cx="10" cy="10" r="3" stroke="white" strokeWidth="1.5" fill="none"/>
                            <line x1="10" y1="3" x2="10" y2="7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="10" y1="13" x2="10" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="3" y1="10" x2="7" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="13" y1="10" x2="17" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        },
                        {
                          t: 'Renovation', d: 'Kitchen & bath',
                          svg: <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 13, height: 13 }}>
                            <path d="M3 10L10 3l7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5 8.5V16a1 1 0 0 0 1 1h3v-4h2v4h3a1 1 0 0 0 1-1V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        },
                      ].map(({ svg, t, d }) => (
                        <div key={t} className="flex flex-col items-center text-center">
                          <div className="flex items-center justify-center rounded-full mb-1" style={{ width: 26, height: 26, backgroundColor: '#C2BEB1', flexShrink: 0 }}>
                            {svg}
                          </div>
                          <div style={{ fontSize: 5.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#A52A2A', lineHeight: 1.2, marginBottom: 1 }}>{t}</div>
                          <div style={{ fontSize: 5, color: '#888', lineHeight: 1.3 }}>{d}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Pullquote review: left red accent bar, large italic text ── */}
                  <div className="flex gap-2.5 px-4 py-3 border-b" style={{ backgroundColor: '#FDFCFB', borderColor: '#E0DDD7' }}>
                    <div className="flex-shrink-0 rounded-full" style={{ width: 3, backgroundColor: '#A52A2A', alignSelf: 'stretch' }} />
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-px">{[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 8, color: '#A52A2A' }}>★</span>)}</div>
                      <p style={{ fontSize: 7, fontStyle: 'italic', color: '#4A4A4A', lineHeight: 1.5, fontFamily: 'Georgia, serif' }}>
                        &ldquo;Mike&apos;s team arrived within the hour. Fixed fast, fair price. Won&apos;t call anyone else.&rdquo;
                      </p>
                      <span style={{ fontSize: 6, color: '#888', fontWeight: 600 }}>Jennifer T. · 300+ Google Reviews</span>
                    </div>
                  </div>

                  {/* ── Request service form ── */}
                  <div className="px-4 py-3 border-b bg-white" style={{ borderColor: '#E0DDD7' }}>
                    <div style={{ maxWidth: '50%', margin: '0 auto' }}>
                      <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A4A4A', marginBottom: 8 }}>Request Service</div>
                      <div className="flex gap-1.5 mb-1.5">
                        <div className="flex-1 rounded border px-2 py-1.5" style={{ borderColor: '#E0DDD7', fontSize: 7, color: '#aaa', backgroundColor: '#FDFCFB' }}>Name</div>
                        <div className="flex-1 rounded border px-2 py-1.5" style={{ borderColor: '#E0DDD7', fontSize: 7, color: '#aaa', backgroundColor: '#FDFCFB' }}>Phone</div>
                      </div>
                      <div className="rounded border px-2 py-1.5 mb-2" style={{ borderColor: '#E0DDD7', fontSize: 7, color: '#aaa', backgroundColor: '#FDFCFB' }}>What do you need help with?</div>
                      <div className="rounded py-2 text-center cursor-pointer" style={{ backgroundColor: '#A52A2A' }}>
                        <span style={{ fontSize: 8, fontWeight: 800, color: '#fff', letterSpacing: '0.06em' }}>Request Service</span>
                      </div>
                    </div>
                  </div>

                  {/* ── Footer CTA: tan beige strip ── */}
                  <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: '#C2BEB1' }}>
                    <div>
                      <div style={{ fontFamily: 'Georgia, serif', fontSize: 9.5, fontWeight: 800, color: '#2A1A1A', lineHeight: 1.2 }}>Got a Plumbing Emergency?</div>
                      <div style={{ fontSize: 6, color: '#5A4A4A', marginTop: 1 }}>Licensed · Insured · Same-day service</div>
                    </div>
                    <div className="rounded px-3 py-1.5 flex-shrink-0 cursor-pointer" style={{ backgroundColor: '#A52A2A' }}>
                      <span style={{ fontSize: 7.5, fontWeight: 800, color: '#fff' }}>(555) 482-9921</span>
                    </div>
                  </div>

                </div>
              </div>
              {/* Outcome chips */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center">
                {['Phone number in nav','Services at a glance','Reviews build trust','Clear call to action'].map(t => (
                  <span key={t} className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-2.5 py-1.5 leading-none font-medium text-center">{t}</span>
                ))}
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FaqSection() {
  const [open, setOpen] = useState(null)
  return (
    <section className="pt-16 pb-20 md:pt-20 md:pb-28 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel text="FAQ" />
          <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 tracking-[-0.015em] text-center">
            Frequently asked questions
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 divide-y divide-gray-100 rounded-2xl border border-gray-200 overflow-hidden">
            {FAQS.map(({ q, a }, i) => (
              <div key={q}>
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-gray-800">{q}</span>
                  <span className={`flex-shrink-0 w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function WebsiteFixDemo() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive((a) => (a + 1) % 3), 2800)
    return () => clearInterval(t)
  }, [paused])

  return (
    <div>
      {/* side-by-side mockups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-6">
        <Reveal className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5 text-slate-400">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Before</span>
          </div>
          <BeforeMockup />
        </Reveal>

        <Reveal delay={130} className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5 text-emerald-500">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">After</span>
          </div>
          <AfterMockup active={active} />
        </Reveal>
      </div>

      {/* callout cards — click to focus, auto-cycle when idle */}
      <Reveal delay={220}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FIX_CALLOUTS.map((c) => (
            <button
              key={c.id}
              onClick={() => { setActive(c.id); setPaused(true) }}
              className={`relative text-left rounded-xl p-4 border overflow-hidden transition-all duration-250 ${
                active === c.id
                  ? 'border-accent/35 bg-accent/5 shadow-sm'
                  : 'border-gray-100 bg-gray-50/80 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-2.5 mb-1.5">
                <span className={`mt-0.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                  active === c.id ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {c.id + 1}
                </span>
                <span className={`text-xs font-semibold leading-snug transition-colors duration-200 ${
                  active === c.id ? 'text-accent-hover' : 'text-gray-700'
                }`}>
                  {c.title}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-7">{c.desc}</p>

              {/* sweep progress bar — only during auto-cycle */}
              {active === c.id && !paused && (
                <div
                  key={active}
                  className="absolute bottom-0 left-0 h-0.5 bg-accent/60 rounded-full"
                  style={{ animation: 'fillBar 2.8s linear forwards' }}
                />
              )}
            </button>
          ))}
        </div>
        {!paused && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Click any improvement to explore it
          </p>
        )}
      </Reveal>
    </div>
  )
}

function BeforeMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-card bg-white">
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-3 rounded-md bg-white border border-gray-200 h-5 flex items-center justify-center text-[11px] text-gray-400">
          olivetable.com
        </div>
      </div>

      {/* cramped nav — no CTA */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-700 border-b border-gray-600">
        <span className="text-[8px] font-bold text-gray-300 tracking-widest uppercase">THE OLIVE TABLE</span>
        <div className="flex gap-2.5">
          {['MENU', 'HOURS', 'CONTACT', 'RESERVE'].map((l) => (
            <span key={l} className="text-[7.5px] text-gray-500">{l}</span>
          ))}
        </div>
      </div>

      {/* muddy hero — no headline */}
      <div className="relative bg-gradient-to-b from-stone-500 to-stone-700 h-14 flex items-end justify-between px-3 pb-2">
        <span className="text-[8px] text-stone-400 italic opacity-80">Welcome to Our Restaurant</span>
        <span className="text-[7.5px] text-stone-500 border border-stone-600 px-1.5 py-0.5 rounded">LEARN MORE ›</span>
      </div>

      {/* cluttered promo bar */}
      <div className="bg-orange-50 border-y border-orange-100 px-3 py-1">
        <span className="text-[7.5px] text-orange-600 truncate block">★ SPECIALS: Monday Pasta Night | Tues Wine | Fri–Sat Live Music...</span>
      </div>

      {/* dense menu — no spacing */}
      <div className="px-3 py-2">
        <div className="text-[8px] font-bold text-gray-500 uppercase border-b border-gray-200 pb-0.5 mb-1 tracking-widest">MENU</div>
        <div className="space-y-0">
          {[
            ['Spaghetti Bolognese', '$12.00'],
            ['Margherita Pizza', '$10.00'],
            ['Chicken Parmigiana', '$14.00'],
            ['House Salad', '$8.00'],
            ['Tiramisu Dessert', '$6.00'],
          ].map(([name, price]) => (
            <div key={name} className="flex justify-between py-0.5 border-b border-gray-50 last:border-0">
              <span className="text-[8px] text-gray-600">{name}</span>
              <span className="text-[8px] text-gray-400">{price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* buried footer */}
      <div className="bg-gray-100 px-3 py-1.5 text-center">
        <span className="text-[7px] text-gray-400">© 2019 Olive Table | 555-0123 | info@olivetable.com | 42 Main St</span>
      </div>
    </div>
  )
}

function AfterMockup({ active }) {
  const badge = (n) => (
    <span className={`absolute top-2 right-2 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center transition-all duration-250 z-10 ${
      active === n ? 'bg-accent text-white scale-110 shadow-sm shadow-accent/30' : 'bg-gray-100 text-gray-400'
    }`}>
      {n + 1}
    </span>
  )

  return (
    <div className="rounded-2xl overflow-hidden border border-emerald-100 shadow-card-lg bg-white">
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-3 rounded-md bg-white border border-gray-200 h-5 flex items-center justify-center text-[11px] text-gray-400">
          olivetable.com
        </div>
      </div>

      {/* clean nav — ANNOTATION 0 */}
      <div className={`relative flex items-center justify-between px-4 py-3 border-b transition-colors duration-300 ${active === 0 ? 'bg-accent/5 border-accent/15' : 'bg-white border-gray-100'}`}>
        <span className="text-sm font-bold text-gray-900">The Olive Table</span>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-gray-400">Menu</span>
          <span className="text-[9px] text-gray-400">Hours</span>
          <div className="bg-accent rounded-lg px-2.5 py-1.5 flex items-center gap-1">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5 text-white flex-shrink-0">
              <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3Z" />
            </svg>
            <span className="text-[10px] font-bold text-white">Call Now</span>
          </div>
        </div>
        {badge(0)}
      </div>

      {/* clean hero */}
      <div className="bg-gradient-to-br from-gray-700 to-gray-900 px-4 py-5">
        <div className="text-[14px] font-bold text-white mb-1 leading-tight">Fresh Italian Cuisine</div>
        <div className="text-[9px] text-gray-400 mb-3">Made with love since 1987 · Downtown</div>
        <div className="inline-flex bg-accent rounded-lg px-3 py-1.5">
          <span className="text-[10px] font-bold text-white">Reserve a Table →</span>
        </div>
      </div>

      {/* clean menu — ANNOTATION 1 */}
      <div className={`relative p-4 border-b transition-colors duration-300 ${active === 1 ? 'bg-accent/5 border-accent/15' : 'bg-white border-gray-100'}`}>
        <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">Our Menu</div>
        <div className="space-y-1.5">
          {[
            ['Spaghetti Bolognese', 'Slow-cooked ragù', '$16'],
            ['Margherita Pizza', 'Wood-fired, fresh basil', '$14'],
            ['Tiramisu', 'House-made daily', '$9'],
          ].map(([name, sub, price]) => (
            <div key={name} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 gap-2">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-gray-800 truncate">{name}</div>
                <div className="text-[9px] text-gray-400">{sub}</div>
              </div>
              <span className="text-[10px] font-bold text-accent flex-shrink-0">{price}</span>
            </div>
          ))}
        </div>
        {badge(1)}
      </div>

      {/* clean info/hours — ANNOTATION 2 */}
      <div className={`relative p-4 transition-colors duration-300 ${active === 2 ? 'bg-accent/5' : 'bg-white'}`}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Hours</div>
            <div className="text-[10px] font-semibold text-gray-800">Mon – Sun</div>
            <div className="text-[10px] text-gray-500">12 pm – 10 pm</div>
          </div>
          <div>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Find Us</div>
            <div className="text-[10px] font-semibold text-gray-800">42 Main Street</div>
            <div className="text-[10px] font-semibold text-accent">(555) 012-3456</div>
          </div>
        </div>
        {badge(2)}
      </div>
    </div>
  )
}

/* ─────────────────────── bad restaurant mockup (problem section) ───── */
function BadRestaurantMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-300 shadow-[0_8px_48px_-8px_rgba(0,0,0,0.18)] max-w-5xl mx-auto select-none">

      {/* Old IE-style browser chrome */}
      <div className="bg-gradient-to-b from-[#1a3c72] to-[#0f2a5a] px-3 py-1 flex items-center gap-3">
        <div className="flex gap-1.5">
          {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map((m) => (
            <span key={m} className="text-[9px] text-blue-200">{m}</span>
          ))}
        </div>
      </div>
      <div className="bg-[#ece9d8] border-b border-[#b0a898] px-2 py-1 flex items-center gap-1.5">
        <div className="flex gap-0.5">
          {['◀', '▶', '✕', '↺', '⌂'].map((c) => (
            <button
              key={c}
              className="w-6 h-5 text-[9px] border border-[#9a9080] flex items-center justify-center bg-gradient-to-b from-white to-[#d4d0c8]"
              style={{ boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.2)' }}
            >{c}</button>
          ))}
        </div>
        <span className="text-[9px] text-gray-600 ml-1">Address</span>
        <div
          className="flex-1 bg-white border border-[#8a8278] h-5 px-2 flex items-center"
          style={{ boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.2)' }}
        >
          <span className="text-[9px] text-[#1a3a6b]">http://www.luigispizzapalace.net/index.html</span>
        </div>
      </div>

      {/* ── Site content ─────────────────────────────── */}
      <div className="bg-gray-200 overflow-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>

        {/* Burgundy header with gold text */}
        <div
          className="text-center py-3 px-4"
          style={{ background: 'linear-gradient(180deg, #1e0000 0%, #6b0000 35%, #8b1010 65%, #1e0000 100%)', borderBottom: '3px double #cc8800' }}
        >
          <div className="text-yellow-500 text-[9px] tracking-[0.4em]">★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★</div>
          <div
            className="mt-0.5"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: '#ffd700', fontSize: '24px', fontWeight: '900', textShadow: '2px 2px 0 #000000, 0 0 18px rgba(255,140,0,0.7)', letterSpacing: '0.05em' }}
          >
            🍕 Luigi&apos;s Pizza Palace 🍕
          </div>
          <div
            className="mt-0.5"
            style={{ fontFamily: 'Georgia, serif', color: '#90ee90', fontSize: '11px', fontStyle: 'italic', textShadow: '1px 1px 0 #000' }}
          >
            &ldquo;The Best Pizza In Town Since 1987!&rdquo; &mdash; Family Owned &amp; Operated
          </div>
          <div className="text-yellow-500 text-[9px] tracking-[0.4em] mt-0.5">★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★</div>
        </div>

        {/* Navigation with bevel buttons */}
        <div
          className="flex flex-wrap items-center gap-px px-1 py-1"
          style={{ background: 'linear-gradient(180deg, #666 0%, #444 100%)', borderBottom: '2px solid #222' }}
        >
          {['HOME', 'OUR MENU', 'DAILY SPECIALS!!', 'ABOUT US', 'CATERING', 'CONTACT US', 'PHOTO GALLERY', 'FIND US'].map((item, i) => (
            <button
              key={item}
              className="text-white text-[9px] font-bold px-2.5 py-0.5 border border-gray-500"
              style={{
                background: i === 0
                  ? 'linear-gradient(180deg, #bbb 0%, #888 50%, #666 100%)'
                  : 'linear-gradient(180deg, #888 0%, #555 50%, #333 100%)',
                boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.35), inset -1px -1px 0 rgba(0,0,0,0.5)',
              }}
            >{item}</button>
          ))}
        </div>

        {/* Flashing promo marquee */}
        <div
          className="text-center py-0.5 overflow-hidden"
          style={{ background: 'linear-gradient(90deg, #ffd700 0%, #ff8c00 50%, #ffd700 100%)', borderBottom: '2px solid #b86000' }}
        >
          <p className="text-[9px] font-black text-red-900 whitespace-nowrap animate-pulse">
            🔥 TUESDAY: BUY 1 LARGE GET 1 FREE!!! &nbsp;★&nbsp; KIDS EAT FREE EVERY TUESDAY!!! &nbsp;★&nbsp; FREE DELIVERY OVER $20!!! &nbsp;★&nbsp; CALL NOW: (555) 019-2847 &nbsp;★&nbsp; 🔥 GRAND RE-OPENING SALE ON NOW!!!
          </p>
        </div>

        {/* Main 3-column table layout */}
        <div className="flex bg-white border border-gray-300 mx-1 my-1" style={{ fontSize: '10px' }}>

          {/* Left sidebar */}
          <div className="flex-shrink-0 border-r-2 border-gray-400 bg-[#f0f0e8]" style={{ width: '110px', minWidth: '110px' }}>
            <div
              className="text-[9px] font-black text-center text-yellow-400 py-0.5 uppercase tracking-wider"
              style={{ background: '#6b0000', borderBottom: '1px solid #440000' }}
            >QUICK LINKS</div>
            <div className="px-1 py-0.5">
              {['› Home', '› Our Menu', '› Daily Specials', '› Catering Menu', '› About Luigi', '› Contact Us', '› Directions', '› Photo Gallery', "› Kid's Menu", '› Desserts', '› Gift Cards'].map((l) => (
                <div key={l} className="text-[8.5px] text-blue-700 underline py-px border-b border-dotted border-gray-300 leading-tight cursor-pointer">{l}</div>
              ))}
            </div>
            <div className="mx-1 mt-1.5 border-2 border-[#6b0000] bg-yellow-50 p-1">
              <div className="text-[9px] font-black text-center text-[#6b0000] mb-0.5 uppercase">Our Hours</div>
              <div className="text-[8px] leading-tight text-gray-700 space-y-px">
                <div><span className="font-bold">Mon–Thu:</span> 11am–10pm</div>
                <div><span className="font-bold">Fri–Sat:</span> 11am–11pm</div>
                <div><span className="font-bold">Sunday:</span> 12pm–9pm</div>
                <div className="text-red-800 font-bold text-[7.5px] mt-0.5">CLOSED All Major Holidays</div>
              </div>
            </div>
            <div
              className="mx-1 mt-1 bg-[#003380] text-yellow-300 text-[8px] font-black text-center py-1 cursor-pointer border border-blue-900"
              style={{ boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.2)' }}
            >★ CLICK TO CALL ★<br />(555) 019-2847</div>
          </div>

          {/* Main content */}
          <div className="flex-1 px-2 py-1.5" style={{ minWidth: 0 }}>
            <div
              className="text-[11px] font-black text-center text-yellow-300 py-0.5 mb-1.5 tracking-wider"
              style={{ background: 'linear-gradient(180deg, #6b0000, #440000)', border: '1px solid #330000' }}
            >⭐ WELCOME TO LUIGI&apos;S PIZZA PALACE ⭐</div>

            {/* Muddy hero image placeholder */}
            <div
              className="mb-1.5 flex items-center justify-center"
              style={{ height: '64px', background: 'linear-gradient(135deg, #3a2010 0%, #5a3a1a 35%, #2e1a08 70%, #6b4a25 100%)', border: '3px inset #8b6040' }}
            >
              <div className="text-center">
                <div className="text-[9px] text-yellow-400/60 italic">[Restaurant Interior Photo]</div>
                <div className="text-[8px] text-orange-300/40 mt-0.5">Loading image... please wait</div>
              </div>
            </div>

            {/* Welcome copy — cluttered */}
            <div className="text-[9px] text-gray-700 leading-relaxed mb-1.5 p-1.5 border border-gray-300 bg-[#fffef0]">
              <p>Welcome to <strong className="text-[#6b0000]">Luigi&apos;s Pizza Palace</strong>, your <u>BEST</u> choice for authentic Italian pizza right here in our town! We have been proudly serving the community with <em>love and dedication</em> since 1987. Our secret family recipes have been passed down through <strong>3 GENERATIONS</strong>!!</p>
              <p className="mt-1">Visit us at <strong>147 Main Street</strong> — <span className="text-green-700 font-bold">FREE PARKING AVAILABLE!!</span> We are conveniently located next to the post office. <span className="text-blue-600 underline cursor-pointer text-[8.5px]">Click here for directions &gt;&gt;</span></p>
            </div>

            {/* Menu table — tiny, cramped */}
            <div className="border-2 border-gray-500">
              <div
                className="text-[10px] font-black text-center text-yellow-300 py-0.5 uppercase tracking-wider"
                style={{ background: 'linear-gradient(180deg, #6b0000, #440000)', borderBottom: '1px solid #333' }}
              >🍕 OUR MENU 🍕</div>
              <div className="flex text-[8.5px] divide-x divide-gray-300">
                {[
                  { title: 'Pizza', items: [['Personal 6"', '$5.99'], ['Small 8"', '$8.99'], ['Medium 12"', '$12.99'], ['Large 16"', '$15.99'], ['X-Large 18"', '$18.99']] },
                  { title: 'Pasta', items: [['Spaghetti', '$9.99'], ['Lasagna', '$11.99'], ['Penne Vodka', '$10.99'], ['Ziti Baked', '$10.99'], ['Fettuccine', '$10.99']] },
                  { title: 'Appetizers', items: [['Garlic Bread', '$3.99'], ['Mozzarella', '$6.99'], ['Calamari', '$8.99'], ['Bruschetta', '$5.99'], ['Soup (bowl)', '$4.99']] },
                ].map(({ title, items }) => (
                  <div key={title} className="flex-1 p-1">
                    <div className="text-[9px] font-black text-[#6b0000] border-b border-[#6b0000] pb-0.5 mb-0.5 text-center uppercase">{title}</div>
                    {items.map(([n, p]) => (
                      <div key={n} className="flex justify-between py-px border-b border-dotted border-gray-200">
                        <span>{n}</span><span className="font-bold">{p}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="text-center py-0.5 bg-gray-100 border-t border-gray-300">
                <span className="text-[8.5px] text-blue-700 underline cursor-pointer">Click here to see our FULL menu &gt;&gt;</span>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex-shrink-0 border-l-2 border-gray-400 bg-[#f0f0e8]" style={{ width: '100px', minWidth: '100px' }}>
            <div
              className="text-[9px] font-black text-center text-yellow-400 py-0.5 uppercase"
              style={{ background: '#004400', borderBottom: '1px solid #002200' }}
            >THIS WEEK&apos;S SPECIALS</div>
            <div className="px-1 py-0.5 space-y-1 text-[8px]">
              <div className="border-2 border-red-600 bg-red-50 p-0.5">
                <div className="font-black text-red-700 text-center text-[8.5px]">TUESDAY</div>
                <div className="leading-tight text-gray-700">Buy 1 Large Pizza Get 1 <strong>FREE!!</strong></div>
              </div>
              <div className="border-2 border-orange-500 bg-orange-50 p-0.5">
                <div className="font-black text-orange-700 text-center text-[8.5px]">KIDS EAT FREE</div>
                <div className="leading-tight text-gray-700">Every Tues w/ adult entree!</div>
              </div>
              <div className="border-2 border-blue-600 bg-blue-50 p-0.5">
                <div className="font-black text-blue-700 text-center text-[8.5px]">LUNCH SPECIAL</div>
                <div className="leading-tight text-gray-700">Daily 11–3pm. Slice+soda $5.99!</div>
              </div>
              <div className="border-2 border-green-600 bg-green-50 p-0.5">
                <div className="font-black text-green-700 text-center text-[8.5px]">CATERING</div>
                <div className="leading-tight text-gray-700">Ask about our party packages!!</div>
              </div>
            </div>
            <div className="mx-1 mt-1 bg-yellow-400 border-2 border-yellow-600 text-red-900 text-[8px] font-black text-center py-1">
              🌟 RATE US ON<br />YELP.COM!! 🌟<br /><span className="text-[7px]">5 Stars!!!</span>
            </div>
            <div className="text-[7px] text-gray-500 italic text-center mt-1 px-1">Member of: Local Business Assoc.</div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="text-gray-400 text-[8px] text-center py-1.5 px-2 border-t-2 border-gray-600"
          style={{ background: 'linear-gradient(180deg, #555 0%, #333 100%)' }}
        >
          <div>Copyright &copy; 2009 Luigi&apos;s Pizza Palace | All Rights Reserved | <span className="text-blue-400 underline cursor-pointer">Privacy Policy</span> | <span className="text-blue-400 underline cursor-pointer">Site Map</span></div>
          <div className="text-gray-500 text-[7px] mt-0.5">Designed by MyWebDesigns.biz &mdash; Best Viewed in Internet Explorer 6.0 at 1024&times;768 resolution</div>
        </div>

      </div>
    </div>
  )
}
