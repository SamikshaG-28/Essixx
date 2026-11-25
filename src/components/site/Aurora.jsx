import './Site.css'

/** Slow-moving coloured light behind a section, for glass to refract. */
export default function Aurora({ className = '' }) {
  return (
    <div className={`aurora ${className}`} aria-hidden="true">
      <span className="aurora-orb" />
      <span className="aurora-orb" />
      <span className="aurora-orb" />
      <span className="aurora-orb" />
    </div>
  )
}
