import { useEffect } from 'react';
import { streamData } from '../data';
import { useTilt } from '../hooks/useScrollEffects';

const accentMap = { PCM:'sc-pcm', PCB:'sc-pcb', Commerce:'sc-comm', Humanities:'sc-hum' };
const streams = [
  { key:'PCM',        emoji:'⚙️', name:'PCM',        sub:'Science Non-Medical', tags:['JEE','BITSAT','IISER','NDA'] },
  { key:'PCB',        emoji:'🧬', name:'PCB',        sub:'Science Medical',      tags:['NEET','IISER IAT','CUET','ICAR'] },
  { key:'Commerce',   emoji:'📊', name:'Commerce',   sub:'Business & Finance',   tags:['IPMAT','CA Foundation','CUET','CLAT'] },
  { key:'Humanities', emoji:'📚', name:'Humanities', sub:'Arts & Social Sciences',tags:['CLAT','CUET','IIMC','NID DAT'] },
];

export default function StreamsSection({ onShowModal }) {
  useTilt('.stream-card', 600);

  return (
    <section id="streams">
      <div className="section-content">
        <div className="s-label">Your Path Starts Here</div>
        <h2 className="s-h2 reveal">Choose Your Stream</h2>
        <p className="s-desc reveal reveal-d1">Each stream opens different doors. Explore all exams, careers, and counselling portals for your path.</p>
        <div className="stream-grid" id="streams-grid">
          {streams.map((s, i) => (
            <div key={s.key} className="stream-card" onClick={() => onShowModal(s.key)}>
              <div className={`sc-accent ${accentMap[s.key]}`} />
              <span className="sc-emoji">{s.emoji}</span>
              <div className="sc-title">{s.name}</div>
              <div className="sc-sub">{s.sub}</div>
              <div className="sc-tagline">{streamData[s.key].tagline}</div>
              <div className="sc-tags">{s.tags.map(t => <span key={t} className="sc-tag">{t}</span>)}</div>
              <button className="sc-btn" onClick={e => { e.stopPropagation(); onShowModal(s.key); }}>
                Explore Details <span className="sc-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
