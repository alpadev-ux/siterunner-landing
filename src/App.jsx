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

/* ─────────────────────── brand cursor mark ──────────────────────────── */
function CursorMark({ size = 16, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="-2 -6 28 32" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2,1 L2,21 L6,17 L9,24 L12,23 L9,16 L15,16 Z" fill={color} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <line x1="17" y1="-1.5" x2="17" y2="3.5" stroke={color} strokeWidth="1.2" />
      <line x1="14.5" y1="1" x2="19.5" y2="1" stroke={color} strokeWidth="1.2" />
      <line x1="21" y1="5" x2="21" y2="9" stroke={color} strokeWidth="0.9" />
      <line x1="19" y1="7" x2="23" y2="7" stroke={color} strokeWidth="0.9" />
    </svg>
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


function ThemeBand({ page, children }) {
  const luxClass =
    page === 'p1'
      ? 'bg-white overflow-visible'
      : page === 'dark'
        ? 'bg-[#ebe6de] overflow-hidden'
        : page === 'slate'
          ? 'bg-[#f5ede2] overflow-hidden'
          : page === 'cream'
            ? 'bg-[#f9f4ee] overflow-hidden'
            : 'bg-white overflow-hidden'
  return <div className={luxClass}>{children}</div>
}


function MainContentShell({ children }) {
  return (
    <div className="relative z-10 bg-[#faf6f0]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 space-y-0">
        {children}
      </div>
    </div>
  )
}


function FinalCtaSection({ scrollTo }) {
  return (
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
      <div className="border border-stone-200/90 rounded-2xl overflow-hidden shadow-[0_20px_50px_-24px_rgba(0,0,0,0.12)]">

        {/* Arch image strip: top of card */}
        <div className="flex gap-1 sm:gap-1.5 items-end bg-[#faf6f0]">
          {[
            { src: '/lux-1.jpg',  pos: 'center center', flex: '16', h: 'clamp(110px,14vw,220px)' },
            { src: '/lux-6.jpg',  pos: 'center 40%',    flex: '22', h: 'clamp(140px,18vw,280px)' },
            { src: '/lux-8.jpg',  pos: 'center 30%',    flex: '18', h: 'clamp(120px,16vw,250px)' },
            { src: '/lux-4.jpg',  pos: 'center 20%',    flex: '26', h: 'clamp(150px,20vw,300px)' },
            { src: '/lux-9.jpg',  pos: 'center center', flex: '18', h: 'clamp(130px,17vw,260px)' },
          ].map(({ src, pos, flex, h }, i) => (
            <div key={i} style={{ flex: `${flex} 0 0`, height: h, borderRadius: '9999px 9999px 0 0', overflow: 'hidden' }}>
              <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: pos }} />
            </div>
          ))}
        </div>

        <section className="relative overflow-hidden py-20 md:py-[7.5rem] bg-[#faf6f0]">

          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 lg:px-8 text-center">
            <Reveal>
              <SectionLabel text="A presence worth having" className="mb-4 text-[#b07a50]/85" />
              <SectionTitle>
                <>Your practice,<br />presented beautifully.</>
              </SectionTitle>
              <p className="mt-6 text-base md:text-lg leading-relaxed max-w-lg mx-auto text-stone-600 font-light">
                We handle the design, the updates, and all the upkeep. You focus on your clients. No logins, no agencies, no friction.
              </p>
              <div className="relative mt-10 flex justify-center px-4 sm:px-0">
                <div className="relative w-full max-w-xs sm:w-auto flex flex-col items-center">
                  <div className="absolute -inset-3 rounded-2xl blur-xl pointer-events-none bg-[#c9a87c]/12" />
                  <button
                    type="button"
                    onClick={() => scrollTo('free-offer')}
                    className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 font-medium px-6 sm:px-8 py-4 text-sm sm:text-base whitespace-nowrap transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-offset-2 bg-stone-900 text-[#faf7f4] hover:bg-stone-800 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.2)] focus:ring-stone-900 focus:ring-offset-[#faf7f4]"
                  >
                    Request My Complimentary Site
                    <span>{Icon.arrow}</span>
                  </button>
                </div>
              </div>

              <div className="mt-16 pt-8 flex flex-col items-center gap-4 text-center border-t border-stone-200">
                <div className="flex items-center gap-2.5 select-none">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <polygon points="5,0.6 9.4,5 5,9.4 0.6,5" stroke="#b07a50" strokeWidth="1.15" strokeLinejoin="round" />
                  </svg>
                  <span className="font-display font-medium leading-none" style={{ fontSize: '15px', letterSpacing: '0.1em' }}>
                    <span className="text-stone-500 uppercase">Site</span>
                    <span className="text-stone-800 uppercase">Upscale</span>
                  </span>
                </div>
                <a href="mailto:hello@siteupscale.com" className="text-sm transition-colors duration-200 text-stone-500 hover:text-stone-800">
                  hello@siteupscale.com
                </a>
                <p className="text-sm text-stone-400">© {new Date().getFullYear()} SiteUpscale. All rights reserved.</p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
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
    <div className="min-h-screen font-sans text-zinc-900 antialiased bg-[#faf6f0]">

      <div className="overflow-x-clip">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="bg-[#faf7f4] overflow-hidden">

        {/* ── integrated nav ── */}
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* ── Logo ── */}
          <div className="flex items-center gap-1.5 select-none">
            {/* Diamond mark */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <polygon points="5,0.6 9.4,5 5,9.4 0.6,5" stroke="#b07a50" strokeWidth="1.15" strokeLinejoin="round" />
            </svg>
            {/* Wordmark */}
            <span className="font-display font-medium leading-none" style={{ fontSize: '15px', letterSpacing: '0.1em' }}>
              <span className="text-stone-500 uppercase">Site</span>
              <span className="text-stone-800 uppercase">Upscale</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-stone-900 transition-colors duration-150">How it works</button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-stone-900 transition-colors duration-150">Pricing</button>
          </div>
          <button
            onClick={() => scrollTo('free-offer')}
            className="text-sm font-medium border border-stone-300/90 text-stone-800 px-5 py-2.5 transition-all duration-200 hover:border-stone-900 hover:bg-stone-900 hover:text-[#faf7f4]"
          >
            Get Started
          </button>
        </nav>

        {/* ── headline + tagline ── */}
        <div className="pt-6 pb-7 sm:pt-8 sm:pb-9 text-center px-4 sm:px-6 animate-fade-in">
          <h1
            className="font-display font-semibold leading-[1.1] tracking-[-0.02em] text-stone-800/70"
            style={{ fontSize: 'clamp(1.9rem,3.8vw,3rem)' }}
          >
            Your website is a{' '}
            <span className="text-[#b07a50]/90 italic">first impression.</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-stone-500/75 font-light max-w-md mx-auto leading-relaxed">
            We design a custom website for your practice at no cost, then keep it current and polished, month after month.
          </p>
        </div>

        {/* ── arch image strip ── */}
        {/* Staggered heights + items-end creates the irregular Bungee-style rhythm */}

        {/* Desktop (md+): flex row, proportional widths, staggered heights bottom-aligned */}
        <div className="hidden md:flex gap-2 lg:gap-3 items-end">
          {[
            { src: '/lux-1.jpg', pos: 'center center', flex: '16', h: '380px',  radius: '9999px 9999px 0 0' },
            { src: '/lux-3.jpg', pos: 'center 30%',    flex: '22', h: '500px',  radius: '9999px 9999px 0 0' },
            { src: '/lux-5.jpg', pos: 'center 40%',    flex: '18', h: '430px',  radius: '9999px 9999px 0 0' },
            { src: '/lux-4.jpg', pos: 'center 20%',    flex: '26', h: '520px',  radius: '9999px 9999px 0 0' },
            { src: '/lux-2.jpg', pos: 'center 30%',    flex: '18', h: '460px',  radius: '9999px 9999px 0 0' },
          ].map(({ src, pos, flex, h, radius }, i) => (
            <div
              key={i}
              className="overflow-hidden flex-shrink-0"
              style={{ flex: `${flex} 0 0`, height: h, borderRadius: radius }}
            >
              <img
                src={src}
                alt=""
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover"
                style={{ objectPosition: pos }}
              />
            </div>
          ))}
        </div>

        {/* Mobile: all 5 fit on screen, same proportional flex + staggered heights */}
        <div className="md:hidden flex gap-1 items-end">
          {[
            { src: '/lux-1.jpg', pos: 'center center', flex: '16', h: '200px' },
            { src: '/lux-3.jpg', pos: 'center 30%',    flex: '22', h: '265px' },
            { src: '/lux-5.jpg', pos: 'center 40%',    flex: '18', h: '230px' },
            { src: '/lux-4.jpg', pos: 'center 20%',    flex: '26', h: '280px' },
            { src: '/lux-2.jpg', pos: 'center 30%',    flex: '18', h: '245px' },
          ].map(({ src, pos, flex, h }, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{ flex: `${flex} 0 0`, height: h, borderRadius: '9999px 9999px 0 0', minWidth: 0 }}
            >
              <img
                src={src}
                alt=""
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover"
                style={{ objectPosition: pos }}
              />
            </div>
          ))}
        </div>

        {/* ── CTAs ── */}
        <div className="py-8 sm:py-10 px-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => scrollTo('free-offer')}
            className="w-full max-w-xs sm:w-auto inline-flex items-center justify-center gap-2 font-medium px-7 py-4 text-sm whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 bg-stone-900 text-[#faf7f4] hover:bg-stone-800 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.22)]"
          >
            Request My Complimentary Site
            <span>{Icon.arrow}</span>
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="w-full max-w-xs sm:w-auto inline-flex items-center justify-center font-medium px-7 py-3.5 text-sm transition-all duration-200 border border-stone-300 text-stone-700 hover:border-stone-700 hover:text-stone-900"
          >
            See the approach
          </button>
        </div>
        <p className="pb-6 text-center text-xs font-medium text-stone-400">
          No credit card required · No obligation
        </p>

      </header>


      <MainContentShell>
          <ThemeBand page="p1">
            <section id="how-it-works" className="pt-14 pb-16 md:pt-20 md:pb-24 scroll-mt-8">
              <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
                <MedSpaEditorialProcess />
              </div>
            </section>
          </ThemeBand>

          {/* ── Arch image break 1 ── */}
          <div className="-mx-4 sm:-mx-6 lg:-mx-8 flex gap-1.5 items-end overflow-hidden">
            {[
              { src: '/lux-9.jpg',  pos: 'center center', flex: '22', h: 'clamp(130px,18vw,300px)' },
              { src: '/lux-8.jpg',  pos: 'center 40%',    flex: '30', h: 'clamp(170px,24vw,390px)' },
              { src: '/lux-10.jpg', pos: 'center 20%',    flex: '22', h: 'clamp(145px,20vw,330px)' },
              { src: '/lux-6.jpg',  pos: 'center 30%',    flex: '26', h: 'clamp(155px,22vw,360px)' },
            ].map(({ src, pos, flex, h }, i) => (
              <div key={i} style={{ flex: `${flex} 0 0`, height: h, borderRadius: '9999px 9999px 0 0', overflow: 'hidden' }}>
                <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: pos }} />
              </div>
            ))}
          </div>

          <ThemeBand page="dark">
            <section className="pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <>
                <Reveal>
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#b07a50]/80 mb-4">The evidence</p>
                      <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold text-stone-900 tracking-[-0.035em] leading-[1.06]">
                        Three facts<br />every practice owner<br />should sit with.
                      </h2>
                    </div>
                    <p className="text-stone-500 font-light text-base leading-relaxed max-w-xs text-right hidden md:block">
                      The research confirms what potential clients already feel the moment they land on your site.
                    </p>
                  </div>
                  <p className="mt-5 text-stone-500 font-light text-base leading-relaxed md:hidden">
                    The research confirms what potential clients already feel the moment they land on your site.
                  </p>
                </Reveal>

                <div className="mt-14 border-t border-stone-300/60">
                  {[
                    { stat: '75%', label: 'Credibility from design', body: 'of visitors judge a practice\'s credibility based on design alone, before reading a single word or seeing a single service.', source: 'Stanford Web Credibility Research' },
                    { stat: '53%', label: 'Mobile visitors lost', body: 'of mobile visits are abandoned if a page takes longer than 3 seconds to load. Slow is indistinguishable from unprofessional.', source: 'Google / SOASTA Research' },
                    { stat: '76%', label: 'Local searches convert', body: 'of people who search for a nearby practice visit within 24 hours. Your site is often the deciding factor.', source: 'Google Consumer Insights' },
                  ].map((item, i) => (
                    <Reveal key={item.label} delay={i * 80}>
                      <div className="grid grid-cols-[5rem_1fr] md:grid-cols-[9rem_1fr_auto] items-start md:items-center border-b border-stone-300/60 py-8 md:py-10 gap-6 md:gap-10">
                        <p className="font-display text-[3rem] md:text-[4.5rem] font-semibold leading-none tracking-tight text-stone-900 tabular-nums">{item.stat}</p>
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#b07a50]/80 mb-2">{item.label}</p>
                          <p className="text-stone-600 font-light leading-relaxed text-sm md:text-[0.95rem] max-w-xl">{item.body}</p>
                        </div>
                        <p className="hidden md:block text-[9px] text-stone-400 uppercase tracking-[0.18em] text-right max-w-[150px] leading-relaxed">{item.source}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                {/* Pull-quote */}
                <Reveal>
                  <div className="mt-20 pt-16 border-t border-stone-300/50 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-10 md:gap-16 items-end">
                    <div>
                      <p className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-light text-stone-700 leading-[1.3] tracking-[-0.02em]">
                        &ldquo;Your patients look you up before they call. What they find either earns the appointment, or loses it to the practice down the street.&rdquo;
                      </p>
                      <div className="mt-8 flex items-center gap-4">
                        <span className="w-8 h-px bg-[#c9a87c]" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400">SiteUpscale</span>
                      </div>
                    </div>
                    <div className="hidden md:block overflow-hidden" style={{ borderRadius: '9999px 9999px 0 0', height: 'clamp(200px,18vw,300px)' }}>
                      <img src="/lux-10.jpg" alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                    </div>
                  </div>
                </Reveal>
              </>
          </div>
        </section>
          </ThemeBand>

          <ThemeBand page="p3">

      {/* ── What We Handle ───────────────────────────────────────── */}
      <section className="pt-14 pb-12 md:pt-28 md:pb-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-20 items-start">
              {/* Left: sticky editorial heading */}
              <Reveal>
                <div className="md:sticky md:top-24">
                  <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#b07a50]/80 mb-6">What is covered</p>
                  <h2 className="font-display text-[clamp(2rem,3.8vw,3.2rem)] font-semibold text-stone-900 tracking-[-0.035em] leading-[1.1]">
                    Continuous care,<br />nothing<br />left to you.
                  </h2>
                  <p className="mt-6 text-stone-500 font-light text-base leading-relaxed">
                    Hosting, updates, and ongoing refinement. Your digital presence stays as considered as the practice behind it.
                  </p>
                  <button
                    onClick={() => document.getElementById('free-offer')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-10 inline-flex items-center gap-3 text-sm font-medium text-stone-800 border-b border-stone-300 pb-1 hover:border-stone-800 transition-colors duration-200 group"
                  >
                    Begin with a free site
                    <span className="text-[#b07a50] group-hover:translate-x-1 transition-transform duration-200">{Icon.arrow}</span>
                  </button>
                  {/* arch image panel: desktop only */}
                  <div className="hidden md:block mt-10 w-full overflow-hidden" style={{ borderRadius: '9999px 9999px 0 0', height: 'clamp(260px,28vw,420px)' }}>
                    <img
                      src="/lux-7.jpg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 30%' }}
                    />
                  </div>
                </div>
              </Reveal>
              {/* Right: items as horizontal divider rows */}
              <Reveal delay={100}>
                <div className="border-t border-stone-200">
                  {[
                    { label: 'Business hours',   desc: 'Always current across every page and platform.' },
                    { label: 'Pricing & services', desc: 'New rates and service changes go live fast, without back-and-forth.' },
                    { label: 'Promotions',       desc: 'Seasonal offers and special announcements posted when you need them.' },
                    { label: 'Photo refreshes',  desc: 'Fresh imagery when you have it. We handle the placement.' },
                    { label: 'New sections',     desc: 'Adding a treatment, a team member, or a new page? Just ask.' },
                    { label: 'Hosting & security', desc: 'SSL, uptime, and performance handled silently in the background.' },
                    { label: 'Mobile experience', desc: 'Your site stays fast and precise on every device, always.' },
                    { label: 'Same-day turnaround', desc: 'Most requests are handled within the hour during business hours.' },
                  ].map(({ label, desc }, i) => (
                    <div key={label} className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr] items-start gap-4 py-5 border-b border-stone-200">
                      <p className="text-sm font-medium text-stone-800">{label}</p>
                      <p className="text-sm text-stone-500 font-light leading-snug md:text-right">{desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
        </div>
      </section>

      {/* ── Industries strip ─────────────────────────────────────── */}
      <section className="pt-2 pb-16 md:pb-20 overflow-hidden bg-white border-t border-[#ede5d8]">
        <Reveal>
          <p className="text-center mb-7 text-[9px] font-medium uppercase tracking-[0.3em] text-[#b07a50]/70">
            Serving practices across every specialty
          </p>
        </Reveal>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex gap-3 animate-[marqueeScroll_32s_linear_infinite]" style={{ width: 'max-content' }}>
            {['Med Spas','Plastic Surgeons','Dermatology','Aesthetics Studios','Wellness Clinics','Boutique Gyms','Yoga Studios','Pilates','Hair Salons','Skin Care','IV Therapy','Chiropractic','Dental Offices','Naturopathic','Physical Therapy','Med Spas','Plastic Surgeons','Dermatology','Aesthetics Studios','Wellness Clinics','Boutique Gyms','Yoga Studios','Pilates','Hair Salons','Skin Care','IV Therapy','Chiropractic','Dental Offices','Naturopathic','Physical Therapy'].map((cat, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap flex-shrink-0">
                <span className="text-xs font-light tracking-widest text-zinc-500 uppercase">{cat}</span>
                <span className="w-1 h-1 rounded-full bg-[#c9a87c]/40 flex-shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </section>

          </ThemeBand>

          {/* ── Arch image break 2 ── */}
          <div className="-mx-4 sm:-mx-6 lg:-mx-8 flex gap-1.5 items-end overflow-hidden">
            {[
              { src: '/lux-7.jpg', pos: 'center 30%',    flex: '24', h: 'clamp(130px,18vw,300px)' },
              { src: '/lux-3.jpg', pos: 'center 40%',    flex: '28', h: 'clamp(170px,24vw,390px)' },
              { src: '/lux-2.jpg', pos: 'center center',  flex: '22', h: 'clamp(145px,20vw,330px)' },
              { src: '/lux-5.jpg', pos: 'center 30%',    flex: '26', h: 'clamp(155px,22vw,360px)' },
            ].map(({ src, pos, flex, h }, i) => (
              <div key={i} style={{ flex: `${flex} 0 0`, height: h, borderRadius: '9999px 9999px 0 0', overflow: 'hidden' }}>
                <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: pos }} />
              </div>
            ))}
          </div>

          <ThemeBand page="slate">

      {/* ── Pricing ──────────────────────────────────────────────── */}
      <section id="pricing" className="pt-14 pb-16 md:pt-28 md:pb-32 scroll-mt-8">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-20 items-start">
              {/* Left: editorial heading */}
              <Reveal>
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#b07a50]/80 mb-6">Rates</p>
                  <h2 className="font-display text-[clamp(2rem,3.8vw,3.2rem)] font-semibold text-stone-900 tracking-[-0.035em] leading-[1.1]">
                    Transparent.<br />Flat-rate.<br />No surprises.
                  </h2>
                  <p className="mt-6 text-stone-500 font-light text-base leading-relaxed">
                    Design, hosting, and ongoing care, handled quietly in the background. One clear monthly rate, everything included.
                  </p>
                  <div className="mt-8 pt-6 border-t border-stone-200">
                    <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-3">Starting from</p>
                    <p className="font-display text-[3.5rem] font-semibold text-stone-900 leading-none tracking-tight">$99<span className="text-lg font-light text-stone-400 ml-1">/mo</span></p>
                    <p className="mt-3 text-xs text-stone-500 font-light">Month-to-month. Cancel anytime.</p>
                  </div>
                  <div className="hidden md:block mt-10 overflow-hidden" style={{ borderRadius: '9999px 9999px 0 0', height: 'clamp(220px,24vw,380px)' }}>
                    <img src="/lux-6.jpg" alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
                  </div>
                </div>
              </Reveal>

              {/* Right: horizontal pricing rows */}
              <Reveal delay={100}>
                <div className="border-t border-stone-200">
                  {[
                    { name: 'Essentials', price: '$99', note: 'Light care',
                      features: ['Hosting & security', 'Hours, services & pricing', 'Email support', 'Care as needed'] },
                    { name: 'Standard', price: '$199', note: 'Most requested', star: true,
                      features: ['Everything in Essentials', 'Ongoing care & maintenance', 'Promotions & new content', 'Photo & copy refreshes', 'Monthly review & suggestions'] },
                    { name: 'Complete', price: '$399', note: 'High-volume practices',
                      features: ['Everything in Standard', 'Unlimited care requests', 'Priority same-day turnaround', 'Seasonal sections & improvements'] },
                  ].map(({ name, price, note, features, star }, i) => (
                    <Reveal key={name} delay={i * 70}>
                      <div className={`py-8 border-b border-stone-200 ${star ? 'relative' : ''}`}>
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <p className="font-display text-xl font-semibold text-stone-900">{name}</p>
                              {star && <span className="text-[9px] font-medium uppercase tracking-[0.22em] bg-stone-900 text-[#faf7f4] px-2 py-0.5">Most requested</span>}
                            </div>
                            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400">{note}</p>
                          </div>
                          <p className="font-display text-3xl font-semibold text-stone-900 leading-none tracking-tight">{price}<span className="text-sm font-light text-stone-400 ml-1">/mo</span></p>
                        </div>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                          {features.map((f) => (
                            <div key={f} className="flex items-center gap-2.5">
                              <span className="w-1 h-1 rounded-full bg-[#c9a87c] flex-shrink-0" />
                              <span className="text-xs text-stone-600 font-light">{f}</span>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => document.getElementById('free-offer')?.scrollIntoView({ behavior: 'smooth' })}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-stone-800 border-b border-stone-300 pb-0.5 hover:border-stone-800 transition-colors duration-200 group"
                        >
                          Begin here
                          <span className="text-[#b07a50] group-hover:translate-x-1 transition-transform duration-200">{Icon.arrow}</span>
                        </button>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>
        </div>
      </section>

          </ThemeBand>

          <ThemeBand page="cream">

      {/* ── Lead Capture Form ─────────────────────────────────────── */}
      <section id="free-offer" className="pt-14 pb-16 md:pt-20 md:pb-24 scroll-mt-8">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-10">
          <Reveal>
            <SectionLabel text="Begin here" />
            <SectionTitle className="mt-5">Your complimentary website</SectionTitle>
            <p className="mt-5 text-center text-base md:text-lg leading-relaxed text-stone-500 font-light max-w-lg mx-auto">
              We design and build your site at no cost. Review every detail privately. If it feels right, your plan begins. If not, you owe us nothing.
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
              {['No upfront cost', 'Private preview', 'Month-to-month', 'Cancel anytime', 'Your domain stays yours'].map((item) => (
                <li key={item} className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium border border-stone-200 text-stone-600">
                  <span className="w-1 h-1 rounded-full bg-[#c9a87c] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 border border-stone-200 bg-white/50 p-8 sm:p-10">
              {formStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 flex items-center justify-center mx-auto mb-5 bg-[#f5ebe0] text-[#b07a50]">
                    {Icon.check}
                  </div>
                  <h3 className="text-xl mb-2 font-display font-semibold text-stone-900">We'll be in touch.</h3>
                  <p className="text-sm leading-relaxed max-w-xs mx-auto text-stone-500 font-light">Thank you for reaching out. We'll review your details and prepare a preview for you shortly.</p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-sm font-medium text-stone-500 underline underline-offset-4 hover:text-stone-900"
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
                    <span className="text-sm font-light text-stone-600">Message (optional)</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={3}
                      className="mt-1.5 block w-full border border-stone-200 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-accent focus:bg-white transition-all resize-none"
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
                    className="mt-2 w-full block py-4 px-6 text-sm sm:text-base whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-1 focus:ring-offset-2 bg-stone-900 hover:bg-stone-800 text-[#faf7f4] font-medium focus:ring-stone-900"
                  >
                    {formStatus === 'loading' ? 'Sending…' : 'Request My Complimentary Site'}
                  </button>
                  <p className="text-center text-xs mt-3 text-stone-400 font-light">No payment required. Your information is kept private.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

          </ThemeBand>

          <ThemeBand page="faq">
            <FaqSection />
          </ThemeBand>
      </MainContentShell>

      <FinalCtaSection scrollTo={scrollTo} />

      </div>{/* overflow-x-clip */}
    </div>
  )
}

/* ─────────────────────── reusable components ────────────────────────── */

function SectionLabel({ text, className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="flex-1 max-w-[48px] h-px bg-current opacity-30" />
      <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-accent">{text}</p>
      <span className="flex-1 max-w-[48px] h-px bg-current opacity-30" />
    </div>
  )
}

function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display font-semibold tracking-[-0.03em] text-[clamp(2rem,4.2vw,3.4rem)] text-center leading-[1.06] text-zinc-900 ${className}`}>
      {children}
    </h2>
  )
}


function FormField({ label, name, type, placeholder, value, onChange, required }) {
  return (
    <label className="block">
      <span className="text-sm font-light text-stone-600">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 block w-full border border-stone-200 bg-white/70 px-4 py-3 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
      />
    </label>
  )
}




  function LuxuryMarqueeMedSpa() {
    const phrase = 'Zero upfront · White-glove updates · Your domain stays yours · Same-day care · '
    return (
      <div className="border-y border-stone-200/70 bg-[#f3efe8]/80 py-3.5 overflow-hidden">
        <div className="flex animate-[marqueeScroll_38s_linear_infinite] whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.38em] text-stone-400" style={{ width: 'max-content' }}>
          {[0, 1].map((dup) =>
            Array.from({ length: 10 }).map((_, i) => (
              <span key={`${dup}-${i}`} className="mr-16">{phrase}</span>
            )),
          )}
        </div>
      </div>
    )
  }

  /** Med spa: editorial layout (no terminal / chat demos) */
  function MedSpaEditorialProcess() {
    const STEPS = [
      {
        n: '01',
        title: 'We build your website for free',
        body: 'A fresh site or a full rebuild, designed and coded for your practice, not from a template. You invest nothing until you’ve seen the work.',
        bullets: ['Custom layout and typography', 'Mobile-first, fast loading', 'Live preview before you commit', '$0 until you approve'],
      },
      {
        n: '02',
        title: 'Only pay if you love it',
        body: 'We send a private preview. Walk through it on your phone. If it feels right, your simple monthly plan begins. If not, you walk away with no invoice, no contract.',
        bullets: ['Review on your own time', 'Month-to-month, cancel anytime', 'Your domain always stays with you'],
      },
      {
        n: '03',
        title: 'We keep everything current',
        body: 'No dashboards, no tickets, no chasing an agency. Message us when something needs to change (hours, photos, promotions), and we handle it, usually within the hour.',
        bullets: ['Hosting and security included', 'Updates when you need them', 'Quiet, reliable presence online'],
      },
    ]
    const audience = [
      'Prefer a calm, hands-off partner',
      'Want a site that matches their brand',
      'Are done with DIY and patchwork',
      'Value discretion and consistency',
      'Need one less thing to manage',
      'Expect white-glove communication',
    ]
    return (
      <div className="relative pb-8 md:pb-12">
        <div className="pt-2 pb-12 md:pb-16 border-b border-stone-200 mb-16 md:mb-20">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#b07a50]/80 mb-5">The studio approach</p>
              <h2 className="font-display text-[clamp(2.6rem,5.5vw,4.5rem)] font-semibold text-stone-900 tracking-[-0.04em] leading-[1.04]">
                Your website,<br />considered.
              </h2>
            </div>
            <p className="text-stone-500 font-light text-base md:text-lg leading-relaxed max-w-sm text-right hidden sm:block">
              Thoughtful design, clear process, and ongoing care, the way a luxury brand treats its presence.
            </p>
          </div>
          <p className="mt-6 text-stone-500 font-light text-base leading-relaxed sm:hidden">
            Thoughtful design, clear process, and ongoing care, the way a luxury brand treats its presence.
          </p>
        </div>

        <LuxuryMarqueeMedSpa />

        <div className="mt-12 md:mt-24 space-y-12 sm:space-y-20 md:space-y-32 max-w-6xl mx-auto px-1 sm:px-2">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={60 + i * 90}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
                <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-start gap-5 lg:pt-2">
                  <span className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-[#b07a52] leading-none tabular-nums tracking-tight">
                    {step.n}
                  </span>
                  <div className="hidden lg:block w-px flex-1 min-h-[6rem] max-h-40 bg-stone-200" />
                  <div className="lg:hidden flex-1 h-px bg-stone-200" />
                </div>
                <div className="lg:col-span-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-stone-400 mb-5">0{i + 1} · The process</p>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-[2.1rem] font-semibold text-stone-900 tracking-[-0.025em] mb-6 leading-[1.15]">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 font-light leading-relaxed text-[0.98rem] md:text-base mb-8">{step.body}</p>
                  <div className="border-t border-stone-200 pt-6">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-stone-400 mb-4">Included</p>
                    <ul className="space-y-3.5">
                      {step.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-stone-600 font-light leading-snug">
                          <span className="mt-2 w-1 h-1 rounded-full bg-[#c9a87c] flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  {i === 0 && (
                    <div className="border border-stone-200 p-5 sm:p-7 md:p-9" style={{ background: 'linear-gradient(152deg, #faf7f4 0%, #f2ece3 100%)' }}>
                      {/* Watermark number */}
                      <p className="font-display text-[4.5rem] font-semibold leading-none text-stone-200 tracking-tight select-none mb-6">01</p>
                      {/* Build spec */}
                      <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#b07a50]/80 mb-4">What we build</p>
                      <div className="space-y-0 border-t border-stone-200">
                        {[
                          { label: 'Custom layout', note: 'Designed for your practice, not a template' },
                          { label: 'Mobile-optimized', note: 'Precise on every screen size' },
                          { label: 'Your branding', note: 'Fonts, colors, voice applied throughout' },
                          { label: 'Fast loading', note: 'Sub-2 second load times, standard' },
                          { label: 'SEO foundations', note: 'Local search visibility from day one' },
                          { label: 'Contact & booking', note: 'Forms, calls, and scheduling ready' },
                        ].map(({ label, note }) => (
                          <div key={label} className="flex items-start justify-between gap-4 py-3.5 border-b border-stone-200/70">
                            <p className="text-sm font-medium text-stone-800">{label}</p>
                            <p className="text-xs text-stone-500 font-light text-right max-w-[140px] leading-snug">{note}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-stone-400">Average time to preview</p>
                        <p className="font-display text-2xl font-semibold text-stone-900">3 days</p>
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="border border-stone-200 p-5 sm:p-7 md:p-9" style={{ background: 'linear-gradient(152deg, #faf7f4 0%, #f2ece3 100%)' }}>
                      <p className="font-display text-[4.5rem] font-semibold leading-none text-stone-200 tracking-tight select-none mb-6">02</p>
                      <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#b07a50]/80 mb-5">Your decision, your timeline</p>
                      {/* Decision paths */}
                      <div className="space-y-3 mb-8">
                        <div className="border border-stone-200 p-4 bg-white/60">
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 text-[#b07a50] font-semibold text-sm flex-shrink-0">✓</span>
                            <div>
                              <p className="text-sm font-medium text-stone-800 mb-1">It feels right</p>
                              <p className="text-xs text-stone-500 font-light leading-snug">Your plan begins. Hosting, care, and updates are all handled from here. One simple monthly rate.</p>
                            </div>
                          </div>
                        </div>
                        <div className="border border-stone-200 p-4 bg-white/40">
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 text-stone-400 font-semibold text-sm flex-shrink-0">✕</span>
                            <div>
                              <p className="text-sm font-medium text-stone-600 mb-1">It's not quite right</p>
                              <p className="text-xs text-stone-400 font-light leading-snug">You walk away. No invoice, no explanation required. No awkward conversation.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-stone-200 pt-6">
                        <p className="font-display text-base md:text-lg font-light text-stone-600 leading-[1.5] italic">
                          &ldquo;You should only pay for something that genuinely represents your practice. That's the whole premise.&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="border border-stone-200 p-5 sm:p-7 md:p-9" style={{ background: 'linear-gradient(152deg, #faf7f4 0%, #f2ece3 100%)' }}>
                      <p className="font-display text-[4.5rem] font-semibold leading-none text-stone-200 tracking-tight select-none mb-6">03</p>
                      <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#b07a50]/80 mb-5">Recent activity log</p>
                      {/* Mock update feed */}
                      <div className="space-y-0 border-t border-stone-200 mb-7">
                        {[
                          { action: 'Business hours updated', time: '28 min ago', type: 'routine' },
                          { action: 'New promotion added', time: '2 hrs ago', type: 'content' },
                          { action: 'Services section refreshed', time: 'Yesterday', type: 'content' },
                          { action: 'New team member added', time: '3 days ago', type: 'routine' },
                          { action: 'Seasonal banner replaced', time: '1 week ago', type: 'content' },
                          { action: 'Pricing page updated', time: '2 weeks ago', type: 'routine' },
                        ].map(({ action, time }) => (
                          <div key={action} className="flex items-center justify-between gap-4 py-3 border-b border-stone-200/70">
                            <div className="flex items-center gap-2.5">
                              <span className="w-1 h-1 rounded-full bg-[#c9a87c] flex-shrink-0" />
                              <p className="text-sm text-stone-700 font-light">{action}</p>
                            </div>
                            <p className="text-[10px] text-stone-400 whitespace-nowrap flex-shrink-0">{time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-stone-400">Avg. response time</p>
                        <p className="font-display text-2xl font-semibold text-stone-900">&lt; 1 hr</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 md:mt-32 max-w-5xl mx-auto px-1 sm:px-2">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start border-t border-stone-200 pt-12">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#b07a50]/80 mb-4">This is for you if</p>
              <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold text-stone-900 tracking-[-0.03em] leading-[1.12]">
                A certain kind<br />of owner.
              </h3>
            </div>
            <div className="border-t border-stone-200 md:border-t-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-stone-200">
                {audience.map((item, idx) => (
                  <div key={item} className={`flex items-start gap-3 py-4 ${idx % 2 === 1 ? 'sm:pl-6' : ''} ${idx < audience.length - 2 ? '' : ''}`}>
                    <span className="mt-2 w-1 h-1 rounded-full bg-[#c9a87c] flex-shrink-0" />
                    <p className="text-sm text-stone-600 font-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }




const LUX_FAQS = [
  { q: 'Is my domain always mine?', a: 'Always. Your domain belongs to you, now and long after, regardless of anything else. We never hold ownership over any part of your online presence.' },
  { q: 'What happens if I decide to cancel?', a: 'Your site remains fully live through the end of your current billing period. No abrupt changes, no disruptions to your clients.' },
  { q: 'How quickly are updates made?', a: 'Most requests are handled within the hour. If something is time-sensitive, simply note it and we prioritize accordingly.' },
  { q: 'Can you work with an existing site?', a: 'Yes. Whether you need a thoughtful refresh or a complete redesign, we start from where you are, and bring it to where it should be.' },
  { q: 'Is there any long-term commitment?', a: 'None. Month-to-month only. You stay because the experience earns it, not because a contract requires it.' },
  { q: 'What does the process look like?', a: 'We design and build your site privately, then share a preview for your review. Only once you approve does anything go live, and your plan begins.' },
]


function FaqSection() {
  const [open, setOpen] = useState(null)
  return (
    <section className="pt-20 pb-24 md:pt-28 md:pb-32 bg-transparent">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-10">
        <Reveal>
          <SectionLabel text="Questions" />
          <SectionTitle className="mt-5">
            A few things<br className="hidden sm:block" /> worth knowing.
          </SectionTitle>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 divide-y divide-stone-200 border border-stone-200 bg-white/50 overflow-hidden">
            {LUX_FAQS.map(({ q, a }, i) => (
              <div key={q}>
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left transition-colors duration-150 hover:bg-stone-50/80"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-sm font-light text-stone-800">{q}</span>
                  <span className={`flex-shrink-0 w-5 h-5 border border-stone-300 text-stone-500 flex items-center justify-center transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                {open === i && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6 bg-stone-50/60">
                    <p className="text-sm leading-relaxed text-stone-500 font-light">{a}</p>
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

