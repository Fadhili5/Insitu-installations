import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LegendPanel } from './components/LegendPanel'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { MapPanel } from './components/MapPanel'
import { ViewerOverlay } from './components/ViewerOverlay'
import { installations } from './data/installations'
import './App.css'

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'YouTube', href: 'https://www.youtube.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
]

function App() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [viewerId, setViewerId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLegendOpen, setIsLegendOpen] = useState(true)
  const [showScroll, setShowScroll] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (!activeId && installations.length) {
      setActiveId(installations[0].id)
      setViewerId(installations[0].id)
    }
  }, [activeId])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    const update = () => {
      setIsMobile(mq.matches)
      if (!mq.matches) setIsLegendOpen(true)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeInstallation = useMemo(
    () => installations.find((inst) => inst.id === viewerId) ?? null,
    [viewerId],
  )

  const handleSelect = (id: string) => {
    setActiveId(id)
    setViewerId(id)
  }

  const handleCloseOverlay = () => {
    setViewerId(null)
  }

  return (
    <div className="page">
      <div className="shell">
        <header className="hero">
          <div className="hero-top">
            <span className="eyebrow">{t('hero.eyebrow')}</span>
            <LanguageSwitcher />
          </div>
          <h1>{t('hero.title')}</h1>
          <p className="lede">{t('hero.body')}</p>
        </header>

        <section className="hero-banner">
          <img src="/insituheader.png" alt="IN SITU placemaking biennale banner" />
        </section>

        <section className="layout">
          <div className="legend-wrapper">
            {isMobile && (
              <button
                className="btn ghost legend-toggle"
                onClick={() => setIsLegendOpen((prev) => !prev)}
                aria-expanded={isLegendOpen}
              >
                {isLegendOpen ? 'Hide list' : 'Show list'}
              </button>
            )}
            {(!isMobile || isLegendOpen) && <LegendPanel activeId={activeId} onSelect={handleSelect} />}
          </div>
          <MapPanel activeId={activeId} onSelect={handleSelect} mapSrc="/map.png" />
        </section>

        <section className="panel">
          <h3>{t('placemaking.title')}</h3>
          <p>{t('placemaking.body1')}</p>
          <p>{t('placemaking.body2')}</p>
        </section>

        <ViewerOverlay
          open={viewerId !== null}
          installation={activeInstallation}
          onClose={handleCloseOverlay}
        />

        <footer className="footer">
          <div className="footer-top">
            <div className="footer-block">
              <h4>Contact us | 聯絡我們</h4>
              <div className="footer-lines">
                <a href="mailto:insitu@curb-center.com">insitu@curb-center.com</a>
                <a href="tel:+85328715770">+853 2871 5770</a>
              </div>
            </div>
            <div className="footer-block">
              <h4>Follow us | 追蹤</h4>
              <div className="footer-socials">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-block">
              <h4>Subscribe | 訂閱</h4>
              <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email | 電郵" aria-label="Email" required />
                <button type="submit" className="btn small">Subscribe | 訂閱</button>
              </form>
            </div>
          </div>

          <div className="footer-logos">
            {[
              { label: 'Organized by | 主辦單位', logos: ['/curb.png'] },
              { label: 'Funded by | 資助單位', logos: ['/gov.png'] },
              { label: 'Supported by | 支持單位', logos: ['/ponte9.png', '/why.png', '/urbanp.png'] },
              { label: 'Partner | 合作夥伴', logos: ['/usj.png'] },
            ].map((group) => (
              <div className="footer-logo-group" key={group.label}>
                <span className="footer-label">{group.label}</span>
                <div className="footer-logo-row footer-logo-row--main">
                  {group.logos.map((src) => (
                    <img key={src} src={src} alt={src} className="footer-logo" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <div className="footer-meta">
              CURB-Center for Architecture and Urbanism © 2025 All rights Reserved.
            </div>
          </div>
        </footer>
        {showScroll && (
          <button
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  )
}

export default App
