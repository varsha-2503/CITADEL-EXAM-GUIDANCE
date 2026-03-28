import { useState } from 'react';
import StateCounsellingPanel from './StateCounsellingPanel';
import { scrollToSection } from '../hooks/useToast';

function CCard({ id, icon, iconStyle, name, subtitle, badges, examTag, body, onAskAI }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`c-card${open ? ' open' : ''}`} id={id || undefined} onClick={() => setOpen(o => !o)}>
      <div className="c-card-header">
        <div className="c-card-icon" style={iconStyle}>{icon}</div>
        <div className="c-card-meta">
          <div className="c-card-name">{name}</div>
          <div className="c-card-subtitle">{subtitle}</div>
          <div className="c-card-badges">{badges.map((b,i) => <span key={i} className={`c-badge ${b.cls}`}>{b.label}</span>)}</div>
        </div>
        <div className="c-card-arrow">›</div>
      </div>
      <div className="c-card-body">{body}</div>
    </div>
  );
}

function EngineeringPanel({ onAskAI }) {
  return (
    <>
      <CCard
        id="card-josaa"
        icon="🌍" iconStyle={{background:'linear-gradient(135deg,rgba(139,110,245,0.2),rgba(26,191,168,0.2))'}}
        name="JoSAA — Joint Seat Allocation Authority"
        subtitle="IITs · NITs · IIITs · GFTIs — All in one portal"
        badges={[{cls:'badge-national',label:'NATIONAL'},{cls:'badge-national',label:'ENGINEERING'}]}
        body={
          <>
            <div className="c-exam-tag">Qualifying Exams: JEE Main + JEE Advanced</div>
            <p style={{fontSize:'0.88rem',color:'var(--text-2)',marginBottom:'1.2rem',lineHeight:1.8}}>
              The most important counselling portal for engineering. JEE Main qualifies you for NITs/IIITs/GFTIs while JEE Advanced qualifies for IITs. Both handled under one roof.
            </p>
            <div className="c-exam-tag">Colleges Covered (570+ institutions)</div>
            <div className="c-colleges-grid">
              {['🏆 IIT Bombay','🏆 IIT Delhi','🏆 IIT Madras','🏆 IIT Kanpur','NIT Trichy','NIT Warangal','IIIT Hyderabad','All 23 IITs','All 31 NITs','73+ GFTIs'].map(c => (
                <div key={c} className="c-college-pill">{c}</div>
              ))}
            </div>
            <hr className="c-divider" />
            <div className="c-exam-tag">Timeline & Stages — 2025 Estimated</div>
            <div className="c-timeline">
              {[
                {cls:'tl-pink', mon:'JAN', month:'January 2025',  stage:'JEE Main Session 1',          desc:'First attempt. Jan 22–31 (approx). Results within 2 weeks.'},
                {cls:'tl-vio',  mon:'APR', month:'April 2025',    stage:'JEE Main Session 2',          desc:'April 1–15 (approx). Final chance to improve rank.'},
                {cls:'tl-gold', mon:'MAY', month:'May 2025',      stage:'JEE Advanced Registration',   desc:'Top 2.5L ranks qualify. Register immediately — window is only 3–4 days!'},
                {cls:'tl-orange',mon:'JUN',month:'June 2025',     stage:'JEE Advanced + Results',      desc:'Exam June 1st week. Results June 3rd week.'},
                {cls:'tl-sky',  mon:'JUL', month:'July 2025',     stage:'JoSAA Round 1–5',             desc:'Registration → Choice filling → Allotment. Fill 50+ choices minimum.'},
                {cls:'tl-green',mon:'AUG', month:'August 2025',   stage:'JoSAA Rounds 6–7 + CSAB',    desc:'CSAB Special rounds fill remaining NIT/IIIT seats.'},
              ].map((item, i) => (
                <div key={i} className="c-tl-item">
                  <div className={`c-tl-dot ${item.cls}`}>{item.mon}</div>
                  <div className="c-tl-content">
                    <div className="c-tl-month">{item.month}</div>
                    <div className="c-tl-stage">{item.stage}</div>
                    <div className="c-tl-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-main btn-filled" style={{marginTop:'1rem'}}
              onClick={e => { e.stopPropagation(); onAskAI('PCM','JoSAA choice filling strategy and rounds'); }}>
              Ask AI about JoSAA →
            </button>
          </>
        }
      />
      <CCard
        id="card-jac"
        icon="🏙️" iconStyle={{background:'linear-gradient(135deg,rgba(255,77,141,0.2),rgba(247,201,72,0.15))'}}
        name="JAC Delhi — Joint Admission Counselling"
        subtitle="DTU · NSUT · IIIT Delhi · IGDTUW"
        badges={[{cls:'badge-state',label:'DELHI STATE'},{cls:'badge-national',label:'ENGINEERING'}]}
        body={
          <>
            <div className="c-exam-tag">Qualifying Exam: JEE Main</div>
            <p style={{fontSize:'0.88rem',color:'var(--text-2)',marginBottom:'1.2rem',lineHeight:1.8}}>
              ~85% seats reserved for Delhi domicile. Runs parallel to JoSAA — apply to both simultaneously.
            </p>
            <div className="c-colleges-grid">
              {['🎓 DTU','🎓 NSUT','🎓 IIIT Delhi','🎓 IGDTUW'].map(c => <div key={c} className="c-college-pill">{c}</div>)}
            </div>
            <button className="btn-main btn-ghost" style={{marginTop:'1rem'}}
              onClick={e => { e.stopPropagation(); onAskAI('PCM','JAC Delhi vs JoSAA strategy'); }}>
              Ask AI: JAC vs JoSAA →
            </button>
          </>
        }
      />
      <CCard
        id="card-ipu"
        icon="🏢" iconStyle={{background:'linear-gradient(135deg,rgba(46,204,113,0.2),rgba(26,191,168,0.15))'}}
        name="IPU CET — Guru Gobind Singh Indraprastha University"
        subtitle="USICT · MAIT · MSIT · VIPS · 100+ colleges"
        badges={[{cls:'badge-state',label:'DELHI STATE'},{cls:'badge-national',label:'ENGINEERING + OTHERS'}]}
        body={
          <>
            <div className="c-exam-tag">Qualifying Exam: JEE Main OR IPU CET</div>
            <p style={{fontSize:'0.88rem',color:'var(--text-2)',marginBottom:'1.2rem',lineHeight:1.8}}>
              More total seats than JAC. Accepts both JEE Main rank and IPU CET score. Excellent CS/IT backup for Delhi + UP students.
            </p>
            <div className="c-colleges-grid">
              {['USICT','MAIT','MSIT','VIPS','BPIT'].map(c => <div key={c} className="c-college-pill">{c}</div>)}
            </div>
            <button className="btn-main btn-ghost" style={{marginTop:'1rem'}}
              onClick={e => { e.stopPropagation(); onAskAI('PCM','IPU counselling vs JAC Delhi comparison'); }}>
              Compare IPU vs JAC →
            </button>
          </>
        }
      />
    </>
  );
}

function MedicalPanel({ onAskAI }) {
  return (
    <CCard
      id="card-mcc"
      icon="🏛️" iconStyle={{background:'linear-gradient(135deg,rgba(46,204,113,0.2),rgba(26,191,168,0.2))'}}
      name="MCC — Medical Counselling Committee (AIQ)"
      subtitle="AIIMS · JIPMER · All-India Quota · Deemed Universities"
      badges={[{cls:'badge-national',label:'NATIONAL'},{cls:'badge-national',label:'MEDICAL'}]}
      body={
        <>
          <div className="c-exam-tag">Qualifying Exam: NEET UG</div>
          <div className="c-colleges-grid">
            {['🏥 AIIMS Delhi','🏥 JIPMER','All Govt Medical (15%)','All Deemed Universities'].map(c => <div key={c} className="c-college-pill">{c}</div>)}
          </div>
          <button className="btn-main btn-filled" style={{marginTop:'1rem'}}
            onClick={e => { e.stopPropagation(); onAskAI('PCB','MCC AIQ counselling strategy AIIMS NEET'); }}>
            Ask AI about MCC →
          </button>
        </>
      }
    />
  );
}

function LawPanel({ onAskAI }) {
  return (
    <CCard
      icon="⚖️" iconStyle={{background:'linear-gradient(135deg,rgba(247,201,72,0.2),rgba(255,120,73,0.15))'}}
      name="CLAT Counselling — Consortium of NLUs"
      subtitle="All 24 National Law Universities — Centralized"
      badges={[{cls:'badge-national',label:'NATIONAL'},{cls:'badge-national',label:'LAW'}]}
      body={
        <>
          <div className="c-exam-tag">Qualifying Exam: CLAT</div>
          <div className="c-colleges-grid">
            {['🏆 NLSIU Bangalore','🏆 NALSAR Hyderabad','🏆 NLU Delhi (AILET)','All 24 NLUs'].map(c => <div key={c} className="c-college-pill">{c}</div>)}
          </div>
          <button className="btn-main btn-filled" style={{marginTop:'1rem'}}
            onClick={e => { e.stopPropagation(); onAskAI('Humanities','CLAT NLU counselling strategy'); }}>
            Ask AI about CLAT →
          </button>
        </>
      }
    />
  );
}

function DesignPanel({ onAskAI }) {
  return (
    <CCard
      icon="🎨" iconStyle={{background:'linear-gradient(135deg,rgba(255,77,141,0.2),rgba(247,201,72,0.15))'}}
      name="NID DAT — National Institute of Design"
      subtitle="NID Ahmedabad · Bangalore · Jorhat + 8 others"
      badges={[{cls:'badge-national',label:'NATIONAL'},{cls:'badge-national',label:'DESIGN'}]}
      body={
        <>
          <div className="c-exam-tag">Qualifying Exam: NID DAT — 2 stages</div>
          <div className="c-colleges-grid">
            {['🎨 NID Ahmedabad','NID Bangalore','NID Jorhat','8 more campuses'].map(c => <div key={c} className="c-college-pill">{c}</div>)}
          </div>
          <button className="btn-main btn-filled" style={{marginTop:'1rem'}}
            onClick={e => { e.stopPropagation(); onAskAI('Humanities','NID DAT preparation strategy design portfolio'); }}>
            Ask AI about NID →
          </button>
        </>
      }
    />
  );
}

function CommercePanel({ onAskAI }) {
  return (
    <CCard
      icon="📊" iconStyle={{background:'linear-gradient(135deg,rgba(247,201,72,0.2),rgba(255,120,73,0.15))'}}
      name="CUET UG — Central Universities Admission"
      subtitle="DU · BHU · JNU · Jamia · 250+ universities"
      badges={[{cls:'badge-national',label:'NATIONAL'},{cls:'badge-national',label:'MULTI-STREAM'}]}
      body={
        <>
          <div className="c-exam-tag">Qualifying Exam: CUET UG (NTA)</div>
          <p style={{fontSize:'0.88rem',color:'var(--text-2)',marginBottom:'1.2rem',lineHeight:1.8}}>
            ⚠️ No single counselling portal! After CUET score, each university has its OWN admission portal. Register on all university portals separately.
          </p>
          <div className="c-colleges-grid">
            {['DU → csas.du.ac.in','BHU → bhuonline.in','SRCC (DU)','250+ universities'].map(c => <div key={c} className="c-college-pill">{c}</div>)}
          </div>
          <button className="btn-main btn-filled" style={{marginTop:'1rem'}}
            onClick={e => { e.stopPropagation(); onAskAI('Commerce','CUET DU CSAS BHU admission strategy'); }}>
            Ask AI about CUET →
          </button>
        </>
      }
    />
  );
}

const TABS = [
  { key:'engineering', label:'⚙️ Engineering' },
  { key:'medical',     label:'🧬 Medical' },
  { key:'law',         label:'⚖️ Law' },
  { key:'design',      label:'🎨 Design' },
  { key:'commerce',    label:'📊 Commerce/Liberal Arts' },
  { key:'state',       label:'🗺️ State Counselling', badge:'19' },
];

export default function CounsellingSection({ onAskAI }) {
  const [activeTab, setActiveTab] = useState('engineering');

  return (
    <section id="counselling">
      <div className="section-content">
        <div className="s-label">Complete Counselling Guide</div>
        <h2 className="s-h2 reveal">State & National Counselling</h2>
        <p className="s-desc reveal reveal-d1">
          19 state counselling systems + all national portals — exams required, colleges covered, timelines, and strategies. Click any card for full details.
        </p>

        <div className="counselling-intro reveal">
          <div className="strat-label">🔑 The Golden Rule of Counselling</div>
          <div className="strat-text">Same rank, different outcome. The student who masters counselling beats the student with 10 more marks. Apply to ALL eligible portals simultaneously. Never wait for one result to apply to the next. A seat held at a lower-preference college can always be upgraded.</div>
        </div>

        <div className="counselling-tabs">
          {TABS.map(t => (
            <button key={t.key}
              className={`c-tab${activeTab === t.key ? ' active' : ''}`}
              onClick={() => setActiveTab(t.key)}>
              {t.label}
              {t.badge && <span style={{fontSize:'0.62rem',background:'rgba(77,184,255,0.15)',color:'var(--sky)',padding:'0.1rem 0.4rem',borderRadius:'4px',marginLeft:'0.2rem'}}>{t.badge}</span>}
            </button>
          ))}
        </div>

        {activeTab === 'engineering' && <div className="counselling-panel active"><EngineeringPanel onAskAI={onAskAI} /></div>}
        {activeTab === 'medical'     && <div className="counselling-panel active"><MedicalPanel     onAskAI={onAskAI} /></div>}
        {activeTab === 'law'         && <div className="counselling-panel active"><LawPanel         onAskAI={onAskAI} /></div>}
        {activeTab === 'design'      && <div className="counselling-panel active"><DesignPanel      onAskAI={onAskAI} /></div>}
        {activeTab === 'commerce'    && <div className="counselling-panel active"><CommercePanel    onAskAI={onAskAI} /></div>}
        {activeTab === 'state'       && <div className="counselling-panel active"><StateCounsellingPanel onAskAI={onAskAI} /></div>}
      </div>
    </section>
  );
}
