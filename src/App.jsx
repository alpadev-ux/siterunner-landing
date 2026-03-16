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
  'Restaurant',
  'Real Estate',
  'Law Firm',
  'Dental Practice',
  'Hair Salon',
  'Auto Shop',
  'Gym',
  'Bakery',
  'Plumbing',
  'Yoga Studio',
  'Photography',
  'Boutique',
  'Veterinary',
  'Landscaping',
  'Chiropractic',
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
        subject: 'New SiteRunner Lead',
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
    <div className="min-h-screen font-sans bg-white text-gray-900 antialiased">

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
          <span className="font-bold text-white text-lg tracking-tight">SiteRunner</span>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors duration-150">How it works</button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors duration-150">Pricing</button>
          </div>
          <button
            onClick={() => scrollTo('free-offer')}
            className="text-sm font-semibold border border-white/25 hover:border-white/50 hover:bg-white/10 text-white rounded-lg px-4 py-2 transition-all duration-200 backdrop-blur-sm"
          >
            Get free website
          </button>
        </nav>

        {/* ── hero content ── */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 md:pt-20 md:pb-36 text-center animate-fade-in">
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-xs font-semibold text-teal-300 mb-8 backdrop-blur-sm">
            <span className="hero-badge-dot w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Free websites for any business
          </div>

          <h1 className="text-[clamp(3rem,6.5vw,5rem)] font-extrabold text-white tracking-[-0.025em] leading-[1.03]">
            We Build Your<br />
            <IndustryTypewriter />
            <br />
            <span className="text-white">Website for Free</span>
          </h1>

          <p className="mt-8 text-base sm:text-xl md:text-2xl max-w-xl sm:max-w-2xl mx-auto leading-[1.7] sm:leading-[1.75]" style={{ color: 'rgba(255,255,255,0.75)' }}>
            We create or refresh your website at no cost.<br />
            Happy with it? Keep it for a small monthly fee.<br />
            Need a change? Just send us a text.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollTo('free-offer')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-gray-50 text-gray-900 font-bold px-8 py-4 text-base transition-all duration-200 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.55)] hover:-translate-y-1.5 active:translate-y-0"
            >
              Get Your Free Website
              <span>{Icon.arrow}</span>
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/25 hover:border-white/50 hover:bg-white/10 text-white font-semibold px-8 py-4 text-base transition-all duration-200 hover:-translate-y-1 backdrop-blur-sm"
            >
              See How It Works
            </button>
          </div>
        </div>
      </header>


      {/* ── Process Storyrail ────────────────────────────────────── */}
      <section id="how-it-works" className="pb-0 scroll-mt-8 bg-white">
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
                        body: 'Need a brand new site or a complete refresh of what you already have? We design and code a real, professional website built specifically for your business - at zero upfront cost. No templates, no page builders, no DIY.',
                        tag: '$0 upfront. Always.',
                        lit: false,
                      },
                      {
                        n: '02',
                        icon: Icon.check,
                        title: 'Only pay if you love it',
                        body: "Once your site is ready, you review it. Happy with the result? Keep it live for a simple monthly fee. Not quite right? Walk away with no charge and no hard feelings. You only pay when you're genuinely satisfied.",
                        tag: 'Zero risk to you.',
                        lit: false,
                      },
                      {
                        n: '03',
                        icon: Icon.chat,
                        title: 'Text us changes anytime',
                        body: 'Hours changed? New service or promotion? Special event coming up? Just send us a text. We handle the update quickly - usually within the hour. No logins, no admin panels, no back-and-forth.',
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
                      body: 'Brand new or a full refresh - we design and code a real, professional site at zero upfront cost. No templates, no DIY.',
                      tag: '$0 upfront. Always.',
                    },
                    {
                      n: '02', icon: Icon.check, lit: false,
                      title: 'Only pay if you love it',
                      body: "Review the finished site. Happy with it? Keep it live for a simple monthly fee. Not right for you? Walk away, no charge.",
                      tag: 'Zero risk to you.',
                    },
                    {
                      n: '03', icon: Icon.chat, lit: true,
                      title: 'Text us changes anytime',
                      body: 'Hours, services, promotions, events - just send a text. We handle the update fast, usually within the hour.',
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
                  <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-[-0.015em] mb-5 leading-snug">
                    Requesting a change takes<br />about 10 seconds
                  </h3>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">
                    Business owners text things like:
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'Update pricing or services', example: '"New haircut price is $45"' },
                      { label: 'Change business hours', example: '"Closed Mondays now"' },
                      { label: 'Add holiday notices', example: '"Closed Christmas Day"' },
                      { label: 'Post a new promotion', example: '"20% off this weekend only"' },
                      { label: 'Swap photos', example: '"New storefront photo attached"' },
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



      {/* ── Before / After Visual Mockup ──────────────────────────── */}
      <WebsiteTransformation />

      {/* ── What We Handle ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="What's included" />
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 tracking-[-0.015em] text-center">
              We handle everything
            </h2>
            <p className="mt-4 text-center text-gray-500 max-w-md mx-auto leading-relaxed">
              You never need to open a website builder or deal with edits yourself.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Icon.clock,  label: 'Hours updates' },
                { icon: Icon.tag,    label: 'Pricing changes' },
                { icon: Icon.chat,   label: 'New promotions' },
                { icon: Icon.globe,  label: 'New photos' },
                { icon: Icon.check,  label: 'Service edits' },
                { icon: Icon.user,   label: 'Seasonal banners' },
                { icon: Icon.arrow,  label: 'Landing pages' },
                { icon: Icon.clock,  label: 'Menu updates' },
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
      <section className="py-14 border-t border-gray-100" style={{ background: 'linear-gradient(180deg,#f8fafc 0%,#ffffff 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Built for local businesses like…</p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {['Restaurants','Hair Salons','Plumbers','HVAC Companies','Dental Offices','General Contractors','Auto Shops','Yoga Studios','Law Firms','Photographers','Boutiques','Chiropractors','Landscapers','Bakeries','Veterinarians'].map(cat => (
                <span key={cat} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:border-teal-300 hover:text-teal-700 transition-colors duration-150">
                  {cat}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 md:py-[7.5rem] scroll-mt-8" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-2">
              <span className="inline-block rounded-full border border-teal-200/60 bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-700">
                Marketing agencies charge $1,500–$5,000/mo. SiteRunner doesn&apos;t.
              </span>
            </div>
            <SectionLabel text="Pricing" className="mt-5" />
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 tracking-[-0.015em] text-center">
              Simple Monthly Pricing
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {[
              { name: 'Starter', price: '$99', note: 'Best for small businesses', highlighted: false,
                features: ['Up to 2 website updates/mo', 'Email support', 'Small text or image edits'] },
              { name: 'Standard', price: '$199', note: 'Most popular', highlighted: true,
                features: ['Up to 6 website updates/mo', 'Content updates', 'Promo & event changes', 'Image swaps', 'Monthly improvement suggestions'] },
              { name: 'Unlimited', price: '$399', note: 'For high-volume businesses', highlighted: false,
                features: ['Unlimited small updates', 'Priority turnaround', 'Promo landing sections', 'Ongoing improvement support'] },
            ].map(({ name, price, note, highlighted, features }, i) => (
              <Reveal key={name} delay={80 + i * 100}>
                <PricingCard name={name} price={price} note={note} highlighted={highlighted} features={features} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <p className="mt-10 text-center text-sm text-gray-400">
              Large redesigns or rebuilds are quoted separately.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── Lead Capture Form ─────────────────────────────────────── */}
      <section id="free-offer" className="py-20 md:py-[7.5rem] scroll-mt-8" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 40%)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="Free offer" />
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 tracking-[-0.015em] text-center">
              Get Your Free Website
            </h2>
            <p className="mt-5 text-center text-gray-600 text-lg leading-relaxed">
              We&apos;ll build or refresh your website at no cost. If you like it, keep it live for a small monthly fee.
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
              {['Homepage cleanup', 'Better mobile layout', 'Stronger CTA', 'Cleaner service presentation'].map((item) => (
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
                  <input type="hidden" name="subject" value="New SiteRunner Lead" />
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
                    className="mt-2 w-full rounded-xl bg-accent hover:bg-accent-hover text-white font-bold py-4 text-base transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {formStatus === 'loading' ? 'Sending…' : 'Request My Free Website'}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">No credit card. No commitment. Just a free look at your site.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

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
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400/80 mb-5">Don&apos;t wait</p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-white tracking-[-0.02em] leading-tight">
              Your Website Should Not<br />Feel Outdated
            </h2>
            <p className="mt-6 text-lg text-gray-300/85 leading-relaxed">
              If your business is great in person, your website should reflect it.
            </p>
            {/* button with subtle teal glow behind it */}
            <div className="relative mt-10 inline-flex justify-center">
              <div className="absolute -inset-3 rounded-2xl bg-teal-400/20 blur-xl pointer-events-none" />
              <button
                onClick={() => scrollTo('free-offer')}
                className="relative inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 font-bold px-8 py-4 text-base transition-all duration-200 shadow-[0_8px_32px_-4px_rgb(0,0,0,0.4)] hover:bg-gray-50 hover:-translate-y-1 hover:shadow-[0_16px_48px_-4px_rgb(0,0,0,0.5)]"
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
            <p className="font-bold text-white text-base">SiteRunner</p>
            <p className="text-sm text-gray-500 mt-0.5">Professional websites for local businesses</p>
          </div>
          <a href="mailto:hello@siterunner.example" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
            hello@siterunner.example
          </a>
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} SiteRunner. All rights reserved.</p>
        </div>
      </footer>
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
        Get started
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
          siterunner.app/messages
        </div>
      </div>

      {/* chat header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">SR</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-800">SiteRunner</div>
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
              <span className="text-gray-400">Message SiteRunner...</span>
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
    { c: 'text-white/35',    t: '   Deploying to siterunner.app...' },
    { c: 'text-emerald-300', t: '✓  Live: apex-plumbing.siterunner.app' },
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
          <span className="ml-3 font-mono text-[11px] text-white/35 truncate">~/siterunner/apex-plumbing  —  index.html</span>
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
    { from: 'sr',      text: "Your website is ready for review! Take a look \uD83D\uDC40",                delay: 700  },
    { from: 'preview', url:  'apex-plumbing.siterunner.app',                                           delay: 1500 },
    { from: 'owner',   text: "Just checked it on my phone — this looks incredible. Love it!",         delay: 3400 },
    { from: 'sr',      text: "So glad you love it! Your site is now live. Welcome to SiteRunner \uD83C\uDF89", delay: 5000 },
    { from: 'badge',                                                                                    delay: 6000 },
  ]

  function ApprovalChatSim({ active }) {
    const [shown, setShown] = useState(0)
    const scrollRef = useRef(null)

    useEffect(() => {
      if (!active) { setShown(0); return }
      const timers = APPROVAL_MSGS.map((msg, i) => setTimeout(() => setShown(i + 1), msg.delay))
      const loop = setTimeout(() => setShown(0), APPROVAL_MSGS[APPROVAL_MSGS.length - 1].delay + 3500)
      return () => { timers.forEach(clearTimeout); clearTimeout(loop) }
    }, [active])

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
            siterunner.app/preview
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">SR</div>
          <div>
            <div className="text-sm font-semibold text-gray-800">SiteRunner</div>
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
        body: 'Need a brand new site or a complete refresh? We design and code a real, professional website built for your business at zero upfront cost. No templates, no page builders, no DIY.',
        bullets: ['Custom design for your business', 'Mobile-friendly from day one', 'Launched in days, not months', 'Zero upfront payment required'],
      },
      {
        n: '02', title: 'Only pay if you love it',
        body: "Once your site is ready, we send you a preview link. Browse it on your phone, share it with your team. Happy? Your monthly plan begins. Not right? Walk away with no charge and no contracts.",
        bullets: ['Review before you pay anything', 'Simple monthly fee, no contracts', 'Cancel anytime, no penalties', 'Keep your domain if you leave'],
      },
      {
        n: '03', title: 'Request changes by text',
        body: "Once live, updating your site is as simple as texting a friend. Send us what you need and we handle it fast - usually within the hour. No logins, no admin panels, no tech headaches.",
        bullets: ['Service and pricing updates', 'Holiday hours and closures', 'New promotions and announcements', 'Photo swaps and content edits'],
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
          style={{ height: '170vh', marginTop: '0.5rem' }}
        >
          <div
            className="sticky top-0 flex flex-col bg-white overflow-hidden"
            style={{ height: 'auto', minHeight: 0 }}
          >
            {/* Heading — locked at top of sticky panel, zero gap to content */}
            <div className="flex-shrink-0 pt-10 pb-2 text-center">
              <SectionLabel text="How it works" />
              <h2 className="mt-3 text-[clamp(2rem,3.5vw,3.25rem)] font-extrabold text-gray-900 tracking-[-0.025em] leading-[1.08]">
                We Build Your Website for Free
              </h2>
              <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg whitespace-nowrap">
                Only pay if you like the result. After that, updates are as easy as sending us a text.
              </p>
            </div>

            {/* Content row — natural height, does NOT flex-grow so the strip follows immediately below */}
            <div className="flex items-start gap-14 xl:gap-20 pt-6 pb-0">
            {/* Left: step descriptions — absolutely stacked, cross-fade between steps */}
            <div className="w-[360px] xl:w-[400px] flex-shrink-0 relative flex flex-col" style={{ marginTop: '2rem' }}>
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
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-4">Perfect for businesses that…</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Have an outdated website",
                    "Don't want a website builder",
                    "Can't afford agency fees",
                    "Want someone to handle it",
                    "Need edits without logging in",
                    "Want a professional presence",
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
    <section className="py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg,#f8fafc 0%,#ffffff 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel text="The transformation" />
          <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 tracking-[-0.015em] text-center">
            See the difference for yourself
          </h2>
          <p className="mt-4 text-center text-gray-500 max-w-xl mx-auto">
            This is a real example of the kind of transformation we deliver — same business, completely different impression.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10 items-start">

            {/* ── BEFORE browser ─────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-red-500">Before — typical outdated site</span>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18)] border border-gray-200" style={{ height: 560 }}>
                {/* browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#e8e8e8] border-b border-gray-300">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <div className="flex-1 mx-3 rounded bg-white border border-gray-300 h-6 flex items-center px-2.5 text-[11px] text-gray-400">
                    www.mikesplumbing.net
                  </div>
                </div>
                {/* Nuzzo-style page — red outer bg, white centered content */}
                <div className="bg-[#cc0000] p-[6px] h-full" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div className="bg-white">
                    {/* header row */}
                    <div className="flex items-stretch border-b-2 border-gray-300">
                      {/* logo box */}
                      <div className="flex-1 flex items-center px-3 py-3 border-r border-gray-200">
                        <div className="border-2 border-[#cc0000] px-3 py-2 text-center flex-shrink-0">
                          <div className="text-[13px] font-extrabold text-[#cc0000] leading-tight tracking-wide">MIKE&apos;S</div>
                          <div className="text-[11px] font-extrabold text-[#cc0000] leading-tight tracking-wide border-t border-[#cc0000] mt-1 pt-1">SEWER &amp; PLUMBING</div>
                        </div>
                        <div className="ml-3 text-[9px] italic text-gray-400" style={{ fontFamily: 'Georgia, serif' }}>Satisfied Customers Since 1991</div>
                      </div>
                      {/* right info — phone buried, low contrast */}
                      <div className="flex flex-col justify-center px-3 py-2 text-right flex-shrink-0">
                        <div className="bg-black text-white text-[9px] font-bold italic px-2 py-1.5 mb-1.5 text-center leading-tight">
                          Experience Ensures<br/>Reliability
                        </div>
                        <div className="text-[9px] text-gray-300">(555) 482-9921</div>
                        <div className="text-[7px] text-gray-300 tracking-wide">free estimates</div>
                      </div>
                    </div>

                    {/* nav bar — inconsistent sizes, some items cramped */}
                    <div className="flex bg-[#1a1a1a] overflow-hidden">
                      {[
                        {n:'Home', s:'text-[9px]', bold: true},
                        {n:'Plumbing Services', s:'text-[7.5px]'},
                        {n:'Flood Control', s:'text-[8px]'},
                        {n:'Sewer Repairs', s:'text-[8.5px]'},
                        {n:'Remodeling', s:'text-[7px]'},
                        {n:'About Us', s:'text-[9px]'},
                        {n:'Reviews', s:'text-[8px]'},
                        {n:'Contact', s:'text-[10px]'},
                      ].map(({n,s,bold},i) => (
                        <div key={n} className={`${s} px-2 py-2 cursor-pointer border-r border-gray-700 whitespace-nowrap flex-shrink-0 ${i===0 ? 'bg-[#cc0000] text-white font-bold' : 'text-[#dddddd]'} ${bold ? 'font-bold':''}`}>{n}</div>
                      ))}
                    </div>

                    {/* body */}
                    <div className="p-3">
                      {/* hero — no photo, full width */}
                      <div className="mb-3">
                        <h1 className="text-[22px] font-bold text-black leading-tight mb-1" style={{ fontFamily: 'Times New Roman, Georgia, serif', letterSpacing: '-0.5px' }}>
                          Chicago Plumbing,<br/>
                          <span className="text-[16px] font-normal">Sewer &amp; Flood</span><br/>
                          <span className="text-[19px]">Control Specialists</span>
                        </h1>
                        <hr className="border-gray-300 my-1.5" style={{ borderStyle: 'dashed' }} />
                        <p className="text-[7.5px] text-[#333] leading-[1.3] mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                          Mike&apos;s Sewer &amp; Plumbing offers professional, experienced, and reliable plumber services for all homes, businesses, and industries in Chicago, IL and surrounding suburbs. We offer complete services for all your plumbing and sewer needs.
                        </p>
                        <p className="text-[8px] text-[#555] leading-[1.35]" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                          Mike&apos;s Plumbing was started by Leo Mike in <u>1991</u>. Our family owned and operated business of <b>2 generations</b> is now operated by his son. Mike holds a City of Chicago Contractor &amp; Journeyman Plumber license, City of Chicago Drainlayers License, State of Illinois Public Health Plumbing Contractor license and Cook County Sewer, Water and Plumbing licenses.
                        </p>
                      </div>

                      {/* random divider */}
                      <div className="text-center text-[8px] text-[#cc0000] font-bold border-t border-b border-[#cc0000] py-1 mb-2 tracking-widest uppercase">
                        * * * Our Services * * *
                      </div>

                      {/* 3-col services — no photos, links buried as plain low-contrast text */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          {
                            t: 'Plumbing Installation and Repair',
                            tSize: 'text-[10px]',
                            links: [
                              { anchor: 'Plumbing Installation and Repair', rest: ' – All fixtures including toilets, sinks, showers, bath tubs, water heaters, and more.' },
                              { anchor: 'Rehab and Remodeling', rest: ' – Specializing in rehab and remodeling for all homes and businesses' },
                            ]
                          },
                          {
                            t: 'Flood Control',
                            tSize: 'text-[8.5px]',
                            links: [
                              { anchor: 'Flood Control', rest: ' – Lifetime guaranteed to prevent backup from city sewer mains.' },
                              { anchor: 'Water Services', rest: ' – Trenchless water line installation is available for new water service without digging into your yard.' },
                            ]
                          },
                          {
                            t: 'Sewer Repair',
                            tSize: 'text-[11px]',
                            links: [
                              { anchor: 'Sewer Repairs', rest: ' – Power rodding, video inspection, sewer pipe location, and cleanout installation.' },
                            ]
                          },
                        ].map(({t,tSize,links}) => (
                          <div key={t} className="border border-gray-300 p-1">
                            <div className={`${tSize} font-bold text-black mb-0.5 leading-tight`}>{t}</div>
                            {links.map(({anchor,rest}) => (
                              <p key={anchor} className="text-[7.5px] leading-snug mb-0.5 text-gray-400">
                                <span>{anchor}</span>
                                <span>{rest}</span>
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* NEW badge — faded */}
                      <div className="mt-2 text-right">
                        <span className="text-[7px] text-gray-300 border border-gray-200 px-2 py-0.5">NEW! Now offering Remodeling services - call for details</span>
                      </div>
                    </div>

                    {/* footer — all contact info faded */}
                    <div className="bg-[#eeeeee] border-t-2 border-gray-300 px-4 py-2.5 grid grid-cols-3 gap-2 text-center">
                      {[
                        {sym:'&#9742;', t:'CONTACT US', sub:'(555) 482-9921'},
                        {sym:'&#8962;', t:'Address', sub:'3819 W. 40th St. Chicago IL'},
                        {sym:'&#10003;', t:'SERVICE AREA', sub:'Cook & DuPage County'},
                      ].map(({sym,t,sub}) => (
                        <div key={t}>
                          <div className="text-[12px] text-gray-300" dangerouslySetInnerHTML={{ __html: sym }} />
                          <div className="text-[8px] text-gray-300 uppercase">{t}</div>
                          <div className="text-[7px] text-gray-300">{sub}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white border-t border-gray-200 px-3 py-1.5 flex items-center justify-between">
                      <div className="text-[7px] text-gray-300">Copyright &copy; 2011 Mike&apos;s Plumbing LLC | All Rights Reserved</div>
                      <div className="text-[7px] text-gray-300 font-mono">Visits: 004,872</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* caption */}
              <div className="flex flex-wrap gap-2">
                {['No mobile support','Impossible to update','Drives customers away','Looks abandoned'].map(t => (
                  <span key={t} className="text-[11px] text-red-500 bg-red-50 border border-red-100 rounded-full px-3 py-1">{t}</span>
                ))}
              </div>
            </div>

            {/* ── AFTER browser ──────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-teal-600">After — SiteRunner rebuild</span>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18)] border border-gray-200" style={{ height: 560 }}>
                {/* chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f5f5f5] border-b border-gray-200">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <div className="flex-1 mx-3 rounded-md bg-white border border-gray-200 h-6 flex items-center px-2.5 text-[11px] text-gray-400">
                    mikesplumbing.com
                  </div>
                </div>
                {/* 10/10 conversion-optimised plumbing homepage */}
                <div className="bg-white" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>

                  {/* ── 1. Emergency alert bar ── */}
                  <div className="bg-[#b91c1c] px-4 py-1.5 flex items-center justify-between">
                    <span className="text-[7.5px] font-semibold text-white/90 tracking-wider uppercase">24/7 Emergency Response Available</span>
                    <span className="text-[8.5px] font-extrabold text-white tracking-wide">(555) 482-9921</span>
                  </div>

                  {/* ── 2. Nav ── */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#111]">
                    <div>
                      <div className="text-[11px] font-bold text-white tracking-tight leading-none">Mike&apos;s Plumbing</div>
                      <div className="text-[7px] text-gray-500 mt-0.5 font-medium">Chicago, IL · Lic. #PLB-48821</div>
                    </div>
                    <div className="flex items-center gap-3 text-[8.5px] text-gray-400">
                      <span>Services</span><span>About</span><span>Reviews</span>
                    </div>
                    <div className="text-[8.5px] font-bold text-white bg-[#b91c1c] rounded-sm px-3 py-1.5 tracking-wide cursor-pointer">Call Now</div>
                  </div>

                  {/* ── 3. Hero ── */}
                  <div className="bg-[#111] px-4 pt-5 pb-5">
                    {/* eyebrow */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c] flex-shrink-0" />
                      <span className="text-[7.5px] font-semibold text-gray-400 uppercase tracking-widest">Same-Day Dispatch · Licensed &amp; Insured</span>
                    </div>
                    {/* headline */}
                    <div className="text-[18px] font-extrabold text-white leading-[1.15] tracking-tight mb-2.5">
                      Chicago&apos;s 24/7<br/>Emergency Plumbers
                    </div>
                    {/* subheadline */}
                    <div className="text-[9px] text-gray-400 leading-relaxed mb-4" style={{maxWidth: 280}}>
                      Burst pipes, sewer backups, clogged drains — we handle it all. Family-owned since 1991, serving Chicago and suburbs.
                    </div>
                    {/* primary CTA */}
                    <div className="bg-[#b91c1c] rounded-md py-3 text-center mb-2 cursor-pointer" style={{boxShadow:'0 2px 16px rgba(185,28,28,0.45)'}}>
                      <span className="text-[11px] font-extrabold text-white tracking-wide">📞 Call Now — (555) 482-9921</span>
                    </div>
                    {/* secondary CTA */}
                    <div className="border border-white/15 rounded-md py-2 text-center cursor-pointer">
                      <span className="text-[9px] font-semibold text-white/70">Get a Free Estimate</span>
                    </div>
                    {/* trust stats */}
                    <div className="flex items-center mt-4 pt-4 border-t border-white/10">
                      {[
                        {n:'30+',   l:'Years\nExperience',   gold:false},
                        {n:'5,000+', l:'Jobs\nCompleted',   gold:false},
                        {n:'4.9★',  l:'Google Rating\n300+ Reviews', gold:true},
                      ].map(({n,l,gold},i) => (
                        <div key={l} className={`flex-1 text-center py-0.5 ${i < 2 ? 'border-r border-white/10' : ''}`}>
                          <div className={`text-[12px] font-extrabold leading-none ${gold ? 'text-[#fbbf24]' : 'text-white'}`}>{n}</div>
                          <div className="text-[7px] text-gray-500 mt-1 leading-snug whitespace-pre-line">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── 4. Fast Response Guarantee ── */}
                  <div className="bg-[#f8f8f8] border-b border-gray-200 px-4 py-3 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#b91c1c] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold leading-none">!</span>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-gray-900 leading-tight">Fast Response Guarantee</div>
                      <div className="text-[7.5px] text-gray-500 mt-0.5 leading-relaxed">Plumbers dispatched immediately. Most calls handled same day.</div>
                    </div>
                  </div>

                  {/* ── 5. Services ── */}
                  <div className="bg-white px-4 pt-4 pb-4">
                    <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-3">What We Fix</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        {dot:'#b91c1c', t:'Sewer & Drain Repair',    d:'Fast clearing & camera inspection'},
                        {dot:'#b91c1c', t:'Flood Control',            d:'City-certified, lifetime guarantee'},
                        {dot:'#b91c1c', t:'Plumbing Installation',    d:'Fixtures, water heaters & more'},
                        {dot:'#b91c1c', t:'Emergency Plumbing',       d:'24/7 · Rapid same-day dispatch'},
                      ].map(({dot,t,d}) => (
                        <div key={t} className="rounded-md border border-gray-100 bg-[#fafafa] p-2.5">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:dot}} />
                            <div className="text-[9px] font-semibold text-gray-900 leading-tight">{t}</div>
                          </div>
                          <div className="text-[7.5px] text-gray-500 leading-snug pl-3">{d}</div>
                        </div>
                      ))}
                    </div>
                    {/* service area */}
                    <div className="mt-3 text-[7.5px] text-gray-400 text-center">
                      Serving Chicago · Naperville · Evanston · Oak Park &amp; all suburbs
                    </div>
                  </div>

                  {/* ── 6. Testimonial ── */}
                  <div className="bg-[#f8f8f8] border-t border-b border-gray-200 px-4 py-3.5">
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map(i=><span key={i} className="text-[10px] leading-none text-[#fbbf24]">★</span>)}
                    </div>
                    <div className="text-[8.5px] text-gray-800 leading-relaxed italic mb-2">
                      &ldquo;Mike&apos;s team was at my house within the hour. Burst pipe in the middle of winter — fixed fast, fair price. I won&apos;t call anyone else.&rdquo;
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-gray-500 font-medium">Jennifer T. · Chicago, IL</span>
                      <span className="inline-flex items-center gap-1 bg-[#f0fdf4] border border-[#bbf7d0] rounded-full px-2 py-0.5">
                        <span className="text-[6.5px] text-[#15803d] font-bold">✓ Verified Google Review</span>
                      </span>
                    </div>
                  </div>

                  {/* ── 7. Final CTA ── */}
                  <div className="bg-[#111] px-4 py-5 text-center">
                    <div className="text-[13px] font-extrabold text-white tracking-tight mb-1">Got a Plumbing Emergency?</div>
                    <div className="text-[8.5px] text-gray-500 mb-3.5">Our licensed Chicago plumbers are ready to help.</div>
                    <div className="bg-[#b91c1c] rounded-md py-2.5 cursor-pointer" style={{boxShadow:'0 2px 16px rgba(185,28,28,0.4)'}}>
                      <span className="text-[10.5px] font-extrabold text-white tracking-wide">📞 Call Now — (555) 482-9921</span>
                    </div>
                  </div>

                  {/* ── 8. Sticky mobile call bar (simulated) ── */}
                  <div className="bg-[#b91c1c] px-4 py-2.5 flex items-center justify-center">
                    <span className="text-[9.5px] font-extrabold text-white tracking-wide">📞 Tap to Call — (555) 482-9921</span>
                  </div>

                </div>
              </div>
              {/* caption */}
              <div className="flex flex-wrap gap-2">
                {['Mobile-friendly','Easy to update','Builds trust instantly','Drives more calls'].map(t => (
                  <span key={t} className="text-[11px] text-green-700 bg-green-50 border border-green-100 rounded-full px-3 py-1">{t}</span>
                ))}
              </div>
            </div>

          </div>
        </Reveal>

        {/* bottom note */}
        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm text-gray-400">
            Both of these are the same plumbing business. One loses customers. One earns them.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function FaqSection() {
  const [open, setOpen] = useState(null)
  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
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
