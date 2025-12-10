import { useTranslation } from 'react-i18next'
import { installations } from '../data/installations'
import { useLanguage } from '../state/useLanguage'
import '../App.css'

type LegendPanelProps = {
  activeId: string | null
  onSelect: (id: string) => void
}

export function LegendPanel({ activeId, onSelect }: LegendPanelProps) {
  const { t } = useTranslation()
  const { locale } = useLanguage()
  return (
    <div className="panel">
      <p className="eyebrow">Legend</p>
      <h3 className="panel-title">{t('legend.title')}</h3>
      <p className="panel-sub">{t('legend.subtitle')}</p>
      <div className="legend-list">
        {installations.map((inst) => (
          <button
            key={inst.id}
            className={`legend-row ${activeId === inst.id ? 'is-active' : ''}`}
            onClick={() => onSelect(inst.id)}
            aria-label={`Select ${inst.title[locale]}`}
          >
            <span className="legend-pin">{inst.label}</span>
            <span className="legend-meta">
              <strong className="legend-title">{inst.title[locale]}</strong>
              <span className="legend-location">{inst.location}</span>
            </span>
            <span className="legend-badges">
              {inst.badges.map((badge) => (
                <span key={badge} className="pill">
                  {badge}
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

