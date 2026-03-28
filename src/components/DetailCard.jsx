import { useTilt } from '../hooks/useScrollEffects';

export function DetailCard({ emoji, title, desc, onClick }) {
  return (
    <div className="detail-card reveal" onClick={onClick}>
      <span className="card-emoji">{emoji}</span>
      <div className="card-title">{title}</div>
      <div className="card-desc">{desc}</div>
    </div>
  );
}

export function StratBox({ label, text }) {
  return (
    <div className="strat-box reveal">
      <div className="strat-label">{label}</div>
      <div className="strat-text">{text}</div>
    </div>
  );
}

export function DSection({ title, children }) {
  return (
    <div className="d-section">
      <div className="d-title">{title}</div>
      {children}
    </div>
  );
}
