import { useEffect } from 'react';
import { streamData } from '../data/index.js';

export default function Modal({ streamKey, onClose, onAskAI }) {
  const isOpen = !!streamKey;
  const d = streamKey ? streamData[streamKey] : null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Scroll modal to top
      setTimeout(() => {
        document.getElementById('modal-box')?.scrollTo(0, 0);
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleAsk(stream, topic) { onAskAI(stream, topic); onClose(); }

  return (
    <div
      className={`modal-wrap${isOpen ? ' open' : ''}`}
      onClick={e => { if (e.target.classList.contains('modal-wrap')) onClose(); }}
      onTouchEnd={e => { if (e.target.classList.contains('modal-wrap')) onClose(); }}
    >
      <div className="modal-box" id="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        {d && (
          <>
            <span className="modal-tag">{d.emoji} {d.label}</span>
            <h2 className="modal-h">{d.emoji} {streamKey}</h2>
            <p className="modal-sub">{d.tagline}</p>

            <div className="d-section">
              <div className="d-title">
                📝 Key Exams
                <small style={{fontWeight:400,fontFamily:'var(--ff-body)',fontSize:'0.75rem',opacity:0.6,marginLeft:'0.5rem'}}>— click any to ask AI</small>
              </div>
              <div className="cards-grid">
                {d.exams.map(e => (
                  <div key={e.n} className="detail-card" onClick={() => handleAsk(streamKey, e.n)}>
                    <span className="card-emoji">{e.e}</span>
                    <div className="card-title">{e.n}</div>
                    <div className="card-desc">{e.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-section">
              <div className="d-title">🎯 Career Domains</div>
              <div className="cards-grid">
                {d.domains.map(dm => (
                  <div key={dm.n} className="detail-card" onClick={() => handleAsk(streamKey, `${dm.n} career path`)}>
                    <span className="card-emoji">{dm.e}</span>
                    <div className="card-title">{dm.n}</div>
                    <div className="card-desc">{dm.x}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-section">
              <div className="d-title">🏛️ Counselling Systems</div>
              <div className="cards-grid">
                {d.counselling.map(c => (
                  <div key={c.n} className="detail-card" onClick={() => handleAsk(streamKey, `${c.n} counselling`)}>
                    <span className="card-emoji">{c.e}</span>
                    <div className="card-title">{c.n}</div>
                    <div className="card-desc">{c.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="strat-box">
              <div className="strat-label">⚡ Gold Strategy</div>
              <div className="strat-text">{d.strategy}</div>
            </div>

            <div style={{marginTop:'1.8rem',display:'flex',gap:'0.8rem',flexWrap:'wrap'}}>
              <button className="btn-main btn-filled" onClick={() => handleAsk(streamKey, 'complete strategy and career roadmap')}>
                Ask AI about {streamKey} →
              </button>
              <button className="btn-main btn-ghost" onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
