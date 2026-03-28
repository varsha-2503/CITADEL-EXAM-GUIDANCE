import { useTilt } from '../hooks/useScrollEffects';

const steps = [
  { icon:'📚', cls:'si-pink', num:'01', h:'Pick Your Stream',      p:'Click your stream card. PCM, PCB, Commerce, or Humanities — instantly see every exam and career path open to you.' },
  { icon:'🔍', cls:'si-vio',  num:'02', h:'Explore Domains',       p:'See all career domains, the exact exams to crack, and which colleges they lead to — laid out clearly without jargon.' },
  { icon:'🗺️', cls:'si-gold', num:'03', h:'Master Counselling',    p:'Detailed state & national counselling timelines. Know exactly when to apply, which rounds matter, and which colleges are unlocked.' },
  { icon:'🤖', cls:'si-green',num:'04', h:'Chat & Decide',         p:'Ask our AI counsellor anything. Get personal, no-fluff advice on which exam to prioritize and which college fits you.' },
];

export default function StepsSection() {
  useTilt('.step-card');
  return (
    <section id="steps">
      <div className="section-content">
        <div className="s-label">Process</div>
        <h2 className="s-h2 reveal">How It Works</h2>
        <p className="s-desc reveal reveal-d1">Four steps from confusion to clarity. No fluff, no generic advice — just your exact roadmap.</p>
        <div className="steps-row">
          {steps.map((s, i) => (
            <div key={i} className={`step-card reveal reveal-d${i+1}`}>
              <div className="step-num">{s.num}</div>
              <div className={`step-icon ${s.cls}`}>{s.icon}</div>
              <div className="step-h">{s.h}</div>
              <p className="step-p">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
