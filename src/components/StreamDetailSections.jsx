import { DetailCard, StratBox, DSection } from './DetailCard';

export function CommerceSection({ onAskAI, onShowModal }) {
  return (
    <section id="commerce" style={{background:'var(--bg2)'}}>
      <div className="section-content">
        <div className="s-label">Stream 03 · Business & Finance</div>
        <h2 className="s-h2 reveal">Commerce 📊</h2>
        <p className="s-desc reveal reveal-d1">Most underrated stream. Highest ROI. Multi-application is the entire strategy.</p>

        <DSection title="Key Exams">
          <div className="cards-grid">
            <DetailCard emoji="🏛️" title="IPMAT"        desc="IIM Indore/Rohtak. 5-year integrated MBA. Very competitive, limited seats." onClick={() => onAskAI('Commerce','IPMAT for IIM Indore Rohtak')} />
            <DetailCard emoji="💰" title="CA Foundation" desc="Chartered Accountancy. Start anytime after 12th. No entrance needed."        onClick={() => onAskAI('Commerce','CA Foundation path')} />
            <DetailCard emoji="📋" title="CUET UG"       desc="DU (SRCC, Hindu), BHU, JNU. BCom Hons, Economics, BBA."                     onClick={() => onAskAI('Commerce','CUET UG for Commerce')} />
            <DetailCard emoji="⚖️" title="CLAT"          desc="24 NLUs. 5-year integrated law. Corporate law = very high ROI."              onClick={() => onAskAI('Commerce','CLAT law career commerce')} />
          </div>
          <StratBox label="⚡ Smart Strategy" text="Apply: CUET + IPMAT + CA Foundation + 2-3 private colleges — simultaneously. Unlike PCM there's no single portal. Track all separately and never miss a deadline." />
        </DSection>

        <button className="btn-main btn-filled" style={{marginTop:'2rem'}} onClick={() => onShowModal('Commerce')}>📚 Full Commerce Guide →</button>
      </div>
    </section>
  );
}

export function HumanitiesSection({ onAskAI, onShowModal }) {
  return (
    <section id="humanities" style={{background:'var(--bg3)'}}>
      <div className="section-content">
        <div className="s-label">Stream 04 · Arts & Social Sciences</div>
        <h2 className="s-h2 reveal">Humanities 📚</h2>
        <p className="s-desc reveal reveal-d1">Most flexible, most misunderstood. Strategy-driven, not exam-driven. Profile matters here.</p>

        <DSection title="Key Exams">
          <div className="cards-grid">
            <DetailCard emoji="⚖️" title="CLAT"    desc="24 NLUs. ₹20L+ packages at top firms. Centralized counselling."             onClick={() => onAskAI('Humanities','CLAT for NLUs strategy')} />
            <DetailCard emoji="🎓" title="CUET UG" desc="200+ universities. Psychology, History, Political Science, Sociology."       onClick={() => onAskAI('Humanities','CUET UG for Humanities')} />
            <DetailCard emoji="📡" title="IIMC"    desc="Premier journalism institute. Very competitive, high industry value."        onClick={() => onAskAI('Humanities','IIMC journalism admission')} />
            <DetailCard emoji="🎨" title="NID DAT / NIFT" desc="Design. Portfolio + test. Centralized counselling."                  onClick={() => onAskAI('Humanities','NID DAT NIFT design admission')} />
          </div>
          <StratBox label="⚡ Smart Strategy" text="Apply: CUET (DU + BHU + others) + CLAT + IPU + 2-3 private universities. For Ashoka/FLAME/Krea: extracurriculars + writing + interviews matter more than marks. Build your profile now." />
        </DSection>

        <button className="btn-main btn-filled" style={{marginTop:'2rem'}} onClick={() => onShowModal('Humanities')}>📚 Full Humanities Guide →</button>
      </div>
    </section>
  );
}
