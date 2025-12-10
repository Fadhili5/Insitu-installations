import { useTranslation } from 'react-i18next'
import { installations, type Installation } from '../data/installations'
import { useLanguage } from '../state/useLanguage'
import '../App.css'

type MapPanelProps = {
  activeId: string | null
  onSelect: (id: string) => void
  mapSrc?: string
}

export function MapPanel({ activeId, onSelect, mapSrc }: MapPanelProps) {
  const { t } = useTranslation()
  return (
    <div className="panel map-card" aria-label="Installation map">
      <div className="map-header">
        <div>
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h3 className="panel-title">{t('map.title')}</h3>
          <p className="panel-sub">{t('map.subtitle')}</p>
        </div>
      </div>
      <div className="map-frame">
        {mapSrc ? (
          <img src={mapSrc} alt="Installation map" className="map-image" role="img" />
        ) : (
          <div className="map-placeholder">{t('map.placeholder')}</div>
        )}
        {installations.map((inst) => (
          <Hotspot
            key={inst.id}
            installation={inst}
            active={inst.id === activeId}
            onClick={() => onSelect(inst.id)}
          />
        ))}
      </div>
    </div>
  )
}

type HotspotProps = {
  installation: Installation
  active: boolean
  onClick: () => void
}

function Hotspot({ installation, active, onClick }: HotspotProps) {
  const { coords, label, title } = installation
  const { locale } = useLanguage()
  return (
    <button
      className={`hotspot ${active ? 'active' : ''}`}
      style={{ left: `${coords.xPct}%`, top: `${coords.yPct}%` }}
      aria-label={`${label.toUpperCase()}: ${title[locale]}`}
      onClick={onClick}
    >
      <span className="hotspot-letter">{label}</span>
    </button>
  )
}

