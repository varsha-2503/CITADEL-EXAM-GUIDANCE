import { useState, useMemo, useRef, useEffect } from 'react';
import { ALL_EXAMS, EXAM_STREAMS, EXAM_CATEGORIES, EXAM_LEVELS } from '../data/examSearchData';
import { scrollToSection } from '../hooks/useToast';

// ─── Result Card ────────────────────────────────────────────────────────────
function ExamCard({ exam, onAskAI }) {
  const [expanded, setExpanded] = useState(false);

  const levelColor = {
    National: 'badge-national',
    State: 'badge-state',
    Institute: 'badge-private',
    University: 'badge-private',
    Private: 'badge-private',
  }[exam.level] || 'badge-national';

  return (
    <div
      className={`exam-card${expanded ? ' open' : ''}`}
      onClick={() => setExpanded(o => !o)}
    >
      <div className="exam-card-header">
        <div className="exam-card-emoji">{exam.emoji}</div>
        <div className="exam-card-meta">
          <div className="exam-card-name">{exam.name}</div>
          <div className="exam-card-sub">{exam.category} · {exam.body}</div>
          <div className="exam-card-badges">
            <span className={`c-badge ${levelColor}`}>{exam.level}</span>
            <span className="c-badge" style={{
              color: 'var(--pink)',
              borderColor: 'rgba(255,77,141,0.3)',
              background: 'rgba(255,77,141,0.08)'
            }}>{exam.stream}</span>
          </div>
        </div>
        <div className="exam-card-arrow" style={{
          color: 'var(--text-2)',
          fontSize: '1.1rem',
          transition: 'transform 0.3s var(--ease-spring), color 0.2s',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
          flexShrink: 0
        }}>›</div>
      </div>

      <div className="exam-card-body">
        <p className="exam-card-desc">{exam.desc}</p>

        <div className="exam-card-section">
          <div className="exam-card-label">🏛️ Colleges / Institutes</div>
          <div className="exam-colleges-wrap">
            {exam.colleges.map(c => (
              <span key={c} className="c-college-pill">{c}</span>
            ))}
          </div>
        </div>

        <div className="exam-card-section">
          <div className="exam-card-label">🗺️ Counselling</div>
          <div className="exam-counselling-note">{exam.counselling}</div>
        </div>

        <div className="exam-card-actions">
          <button
            className="btn-main btn-filled"
            style={{ fontSize: '0.82rem', padding: '0.6rem 1.2rem' }}
            onClick={e => {
              e.stopPropagation();
              onAskAI(exam.stream, `${exam.name} — strategy, eligibility, and career outcomes`);
              scrollToSection('ai-section');
            }}
          >
            Ask AI about {exam.name} →
          </button>
          <button
            className="btn-main btn-ghost"
            style={{ fontSize: '0.82rem', padding: '0.6rem 1.2rem' }}
            onClick={e => { e.stopPropagation(); setExpanded(false); }}
          >
            Collapse
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export default function ExamSearch({ onAskAI }) {
  const [query, setQuery]           = useState('');
  const [stream, setStream]         = useState('All Streams');
  const [category, setCategory]     = useState('All');
  const [level, setLevel]           = useState('All');
  const inputRef                    = useRef(null);

  // Keyboard shortcut: / to focus search
  useEffect(() => {
    const handler = e => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        const section = document.getElementById('exam-search');
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ALL_EXAMS.filter(exam => {
      const matchStream   = stream === 'All Streams' || exam.stream === stream || exam.stream === 'All Streams';
      const matchCategory = category === 'All' || exam.category === category;
      const matchLevel    = level === 'All' || exam.level === level;
      const matchQuery    = !q
        || exam.name.toLowerCase().includes(q)
        || exam.desc.toLowerCase().includes(q)
        || exam.category.toLowerCase().includes(q)
        || exam.body.toLowerCase().includes(q)
        || exam.colleges.some(c => c.toLowerCase().includes(q))
        || exam.tags.some(t => t.includes(q));
      return matchStream && matchCategory && matchLevel && matchQuery;
    });
  }, [query, stream, category, level]);

  function clearAll() {
    setQuery('');
    setStream('All Streams');
    setCategory('All');
    setLevel('All');
    inputRef.current?.focus();
  }

  const hasFilters = query || stream !== 'All Streams' || category !== 'All' || level !== 'All';

  return (
    <section id="exam-search" style={{ background: 'var(--bg3)' }}>
      <div className="section-content">

        {/* Header */}
        <div className="s-label">Exam Explorer</div>
        <h2 className="s-h2 reveal">Search Every Exam 🔍</h2>
        <p className="s-desc reveal reveal-d1">
          All competitive exams in one place — search by name, stream, category, or college.
          Press <kbd className="es-kbd">/</kbd> to jump here anytime.
        </p>

        {/* Search bar */}
        <div className="es-searchbar reveal reveal-d2">
          <span className="es-search-icon">🔍</span>
          <input
            ref={inputRef}
            className="es-search-input"
            placeholder="Search exams, colleges, bodies… e.g. &quot;JEE&quot;, &quot;AIIMS&quot;, &quot;law&quot;"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="es-clear-btn" onClick={() => setQuery('')} title="Clear search">✕</button>
          )}
        </div>

        {/* Filter row */}
        <div className="es-filters reveal reveal-d3">

          {/* Stream filter */}
          <div className="es-filter-group">
            <span className="es-filter-label">Stream</span>
            <div className="es-pill-row">
              {EXAM_STREAMS.map(s => (
                <button
                  key={s}
                  className={`es-pill${stream === s ? ' active' : ''}`}
                  onClick={() => setStream(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="es-filter-group">
            <span className="es-filter-label">Category</span>
            <div className="es-pill-row" style={{ flexWrap: 'wrap' }}>
              {EXAM_CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`es-pill${category === c ? ' active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Level filter */}
          <div className="es-filter-group">
            <span className="es-filter-label">Level</span>
            <div className="es-pill-row">
              {EXAM_LEVELS.map(l => (
                <button
                  key={l}
                  className={`es-pill${level === l ? ' active' : ''}`}
                  onClick={() => setLevel(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results meta */}
        <div className="es-results-meta">
          <span className="es-count">
            {results.length} exam{results.length !== 1 ? 's' : ''} found
          </span>
          {hasFilters && (
            <button className="es-clear-all" onClick={clearAll}>
              Clear all filters ✕
            </button>
          )}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="es-results-grid">
            {results.map(exam => (
              <ExamCard key={exam.id} exam={exam} onAskAI={onAskAI} />
            ))}
          </div>
        ) : (
          <div className="es-empty">
            <div className="es-empty-icon">🔭</div>
            <div className="es-empty-title">No exams found</div>
            <div className="es-empty-sub">Try a different search term or clear your filters.</div>
            <button className="btn-main btn-ghost" style={{ marginTop: '1rem' }} onClick={clearAll}>
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
