import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import type { Installation } from '../data/installations'
import { useLanguage } from '../state/useLanguage'
import { ObjViewer } from './ObjViewer'
import '../App.css'

type ViewerOverlayProps = {
  open: boolean
  installation: Installation | null
  onClose: () => void
}

export function ViewerOverlay({ open, installation, onClose }: ViewerOverlayProps) {
  const { locale } = useLanguage()
  const { t } = useTranslation()
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [errorKey, setErrorKey] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isNotesOpen, setIsNotesOpen] = useState(true)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!open || !installation) return undefined
    setIsLoading(true)
    setProgress(0)
    setErrorKey(null)
    setIsExpanded(false)
    setIsInfoOpen(false)
    setIsNotesOpen(true)
    const timer = window.setTimeout(() => setIsLoading(false), 400)
    window.setTimeout(() => closeRef.current?.focus(), 50)
    return () => window.clearTimeout(timer)
  }, [open, installation])

  useEffect(() => {
    if (!open) return undefined
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const title = installation?.title[locale]
  const getCopy = (field?: { [k: string]: string }) =>
    field?.[locale as string] || field?.en || ''

  const badges = useMemo(
    () =>
      installation?.badges.map((badge) => (
        <span key={badge} className="pill">
          {badge}
        </span>
      )),
    [installation],
  )

  const renderViewerContent = () => {
    if (errorKey) {
      const message =
        errorKey === 'webgl-unavailable'
          ? t('viewer.noWebGL')
          : t('viewer.loadError')
      return (
        <div className="viewer-placeholder">
          <p className="panel-sub">{message}</p>
          <div className="placeholder-box">{t('viewer.placeholder')}</div>
        </div>
      )
    }

    return (
      <>
        {isLoading && (
          <div className="viewer-loading">
            <div
              className="loading-bar"
              role="progressbar"
              aria-busy="true"
              aria-live="polite"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <span className="loading-bar-fill" style={{ width: `${Math.max(18, progress)}%` }} />
            </div>
            <p className="panel-sub">
              {t('viewer.loading')} {progress ? `${Math.round(progress)}%` : ''}
            </p>
          </div>
        )}
        <ObjViewer
          installation={installation}
          cameraHint={installation?.cameraHint}
          isMobile={isMobile}
          onLoading={() => {
            setIsLoading(true)
            setErrorKey(null)
            setProgress(0)
          }}
          onProgress={(val) => setProgress(val)}
          onReady={() => {
            setIsLoading(false)
            setProgress(100)
          }}
          onError={(key) => {
            setErrorKey(key)
            setIsLoading(false)
          }}
        />
      </>
    )
  }

  if (!isMounted || !open || !installation) return null

  return createPortal(
    <div
      className={`overlay-backdrop ${isExpanded ? 'is-expanded' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? t('hero.eyebrow')}
    >
      <div className={`overlay-card ${isExpanded ? 'is-expanded' : ''}`} tabIndex={-1}>
        <div className="overlay-header">
          <div className="overlay-headline">
            <span className="legend-pin overlay-pin">{installation.label}</span>
            <div className="overlay-meta">
              <p className="eyebrow overlay-eyebrow">{t('hero.eyebrow')}</p>
              <h3 className="overlay-title">{title}</h3>
              <p className="overlay-location">{installation.location}</p>
              <div className="legend-badges">{badges}</div>
            </div>
          </div>
          <div className="overlay-actions">
            <button
              className="btn ghost close-btn"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-label={isExpanded ? t('viewer.collapseOverlay') : t('viewer.expandOverlay')}
            >
              {isExpanded ? t('viewer.collapseOverlay') : t('viewer.expandOverlay')}
            </button>
            <button
              ref={closeRef}
              className="btn ghost close-btn"
              onClick={onClose}
              aria-label={t('viewer.close')}
            >
              {t('viewer.close')}
            </button>
          </div>
        </div>

        <div className="overlay-body">
          <div className={`viewer-shell ${isLoading ? 'is-loading' : 'is-ready'}`}>
            {renderViewerContent()}
          </div>

          <div className="side-column">
            <div className={`accordion ${isInfoOpen ? 'is-open' : ''}`}>
              <button
                className="accordion-header"
                onClick={() => setIsInfoOpen((prev) => !prev)}
                aria-expanded={isInfoOpen}
                aria-controls="info-panel"
              >
                <span>{t('viewer.infoTitle')}</span>
                <span className="accordion-toggle">{isInfoOpen ? '−' : '+'}</span>
              </button>
              {isInfoOpen && (
                <div className="accordion-body" id="info-panel">
                  <div className="artist-block">
                    {installation.artistImage && (
                      <img
                        className="artist-photo"
                        src={installation.artistImage}
                        alt={`${title || t('viewer.artistsLabel')}`}
                        loading="lazy"
                      />
                    )}
                    <div className="artist-copy">
                      {installation.artists && (
                        <p className="annotation-copy">
                          <strong>{t('viewer.artistsLabel')}</strong>
                          <br />
                          {getCopy(installation.artists)}
                        </p>
                      )}
                      <p className="annotation-copy">
                        <strong>{t('viewer.teamInfoLabel')}</strong>
                        <br />
                        {installation.teamInfo ? getCopy(installation.teamInfo) : t('viewer.infoCopy')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={`accordion ${isNotesOpen ? 'is-open' : ''}`}>
              <button
                className="accordion-header"
                onClick={() => setIsNotesOpen((prev) => !prev)}
                aria-expanded={isNotesOpen}
                aria-controls="notes-panel"
              >
                <span>{t('viewer.annotationTitle')}</span>
                <span className="accordion-toggle">{isNotesOpen ? '−' : '+'}</span>
              </button>
              {isNotesOpen && (
                <div className="accordion-body" id="notes-panel">
                  {installation.annotationImage && (
                    <div className="annotation-media">
                      <img
                        src={installation.annotationImage}
                        alt={`${title || t('viewer.annotationTitle')}`}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <p className="annotation-copy">
                    {installation.installationInfo
                      ? getCopy(installation.installationInfo)
                      : t('viewer.annotationCopy')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

