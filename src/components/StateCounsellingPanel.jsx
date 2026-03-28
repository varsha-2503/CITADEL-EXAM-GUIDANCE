import { useState } from 'react';
import { stateData } from '../data';
import { scrollToSection } from '../hooks/useToast';

function StateCard({ state, onAskAI }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`state-card${open ? ' open' : ''}`}
      data-state={state.id} data-exam={state.exam}
      onClick={() => setOpen(o => !o)}>
      <div className="state-card-header">
        <div className="state-card-flag">{state.flag}</div>
        <div className="state-card-info">
          <div className="state-name">{state.name}</div>
          <div className="state-portal-name">{state.portal}</div>
        </div>
        <div className="state-card-arrow">›</div>
      </div>
      <div className="state-card-body">
        <div className="state-exam-tag">📝 Based on: {state.examLabel}</div>
        <div className="state-courses">
          {state.courses.map(c => <span key={c} className="state-course-pill">{c}</span>)}
        </div>
        <div className="state-note">{state.note}</div>
        <button className="btn-main btn-ghost"
          style={{fontSize:'0.8rem',padding:'0.6rem 1.1rem',marginTop:'0.3rem'}}
          onClick={e => { e.stopPropagation(); onAskAI(state.aiQ); }}>
          Ask AI →
        </button>
      </div>
    </div>
  );
}

export default function StateCounsellingPanel({ onAskAI }) {
  const [query, setQuery]   = useState('');
  const [filter, setFilter] = useState('all');

  const visible = stateData.filter(s => {
    const matchExam   = filter === 'all' || s.exam.includes(filter);
    const matchSearch = !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.portal.toLowerCase().includes(query.toLowerCase());
    return matchExam && matchSearch;
  });

  return (
    <div>
      {/* Stats */}
      <div className="portal-stats-row reveal">
        {[['19','States Covered'],['25+','State Portals'],['500K+','Seats Available'],['85%','Domicile Quota']].map(([n,l]) => (
          <div key={l} className="portal-stat-card">
            <div className="portal-stat-n">{n}</div>
            <div className="portal-stat-l">{l}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="state-filter-bar">
        <div className="state-search-wrap">
          <span className="state-search-icon">🔍</span>
          <input className="state-search" placeholder="Search state or portal name…"
            value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        {[['all','All'],['jee','JEE Based'],['state','State Exam'],['cuet','CUET']].map(([val,label]) => (
          <button key={val} className={`state-filter-btn${filter === val ? ' active' : ''}`}
            onClick={() => { setFilter(val); setQuery(''); }}>
            {label}
          </button>
        ))}
        <span className="state-count-badge">{visible.length} state{visible.length !== 1 ? 's' : ''} shown</span>
      </div>

      {/* Grid */}
      <div className="state-grid">
        {visible.map(s => <StateCard key={s.id} state={s} onAskAI={onAskAI} />)}
      </div>
      {visible.length === 0 && (
        <div style={{textAlign:'center',padding:'3rem',color:'var(--text-3)',fontFamily:'var(--ff-mono)',fontSize:'0.85rem'}}>
          No matching states found.
        </div>
      )}

      {/* Golden rule */}
      <div className="strat-box reveal" style={{marginTop:'2rem'}}>
        <div className="strat-label">🏛️ State Counselling Golden Rule</div>
        <div className="strat-text">Always apply to your home state counselling AND any other states where you're eligible. State counselling and JoSAA/MCC run in parallel — never skip one waiting for the other. A seat in hand is worth two in waiting.</div>
      </div>
    </div>
  );
}
