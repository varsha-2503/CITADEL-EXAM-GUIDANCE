import { DetailCard, StratBox, DSection } from './DetailCard';
import { useTilt } from '../hooks/useScrollEffects';
import { scrollToSection } from '../hooks/useToast';

export default function PCMSection({ onAskAI, onShowModal }) {
  useTilt('.detail-card');
  return (
    <section id="pcm" style={{background:'var(--bg2)'}}>
      <div className="section-content">
        <div className="s-label">Stream 01 · Science Non-Medical</div>
        <h2 className="s-h2 reveal">PCM ⚙️</h2>
        <p className="s-desc reveal reveal-d1">Maximum scope, hardest path. JEE is the gateway — but not the only door.</p>

        <DSection title="Key Exams">
          <div className="cards-grid">
            <DetailCard emoji="⚡" title="JEE Main"     desc="Gateway to NITs, IIITs, GFTIs. 2 attempts/year. Highest competition in India."      onClick={() => onAskAI('PCM','JEE Main')} />
            <DetailCard emoji="🏆" title="JEE Advanced" desc="IITs only. Top 2.5L qualify. Most prestigious engineering exam in India."             onClick={() => onAskAI('PCM','JEE Advanced')} />
            <DetailCard emoji="🎯" title="BITSAT"       desc="BITS Pilani, Goa, Hyderabad. Online. Faster, predictable results."                    onClick={() => onAskAI('PCM','BITSAT')} />
            <DetailCard emoji="🔬" title="IISER IAT"    desc="Research path. BSc-MS dual degree. Monthly stipend available."                        onClick={() => onAskAI('PCM','IISER IAT')} />
          </div>
          <StratBox label="⚡ Smart Strategy" text="Apply JEE → JoSAA, JAC Delhi, IPU all together. Add BITSAT early. Keep IISER as research backup. Never bet on one exam!" />
        </DSection>

        <DSection title="Career Paths">
          <div className="cards-grid">
            <DetailCard emoji="💻" title="Engineering/Tech"     desc="JEE Main · JEE Adv · BITSAT · VITEEE" onClick={() => onAskAI('PCM','Engineering and Tech career path')} />
            <DetailCard emoji="🔬" title="Pure Science"         desc="IISER IAT · NEST · ISI · CMI"          onClick={() => onAskAI('PCM','Pure Science research career')} />
            <DetailCard emoji="📊" title="Data Science/Econ"   desc="CUET UG · IPMAT · ISI"                  onClick={() => onAskAI('PCM','Data Science Economics career')} />
            <DetailCard emoji="🪖" title="Defense/NDA"          desc="NDA · TES (via JEE Main)"              onClick={() => onAskAI('PCM','Defense NDA career')} />
          </div>
        </DSection>

        <DSection title="Counselling Portals">
          <div className="cards-grid">
            <DetailCard emoji="🌍" title="JoSAA"         desc="IITs, NITs, IIITs. 6+ rounds. Choice filling is everything."   onClick={() => { scrollToSection('counselling'); }} />
            <DetailCard emoji="🏙️" title="JAC Delhi"    desc="DTU, NSUT, IIIT Delhi. 85% seats for Delhi students."          onClick={() => { scrollToSection('counselling'); }} />
            <DetailCard emoji="🏢" title="IPU Counselling" desc="USICT, MAIT, MSIT. More seats, easier CS entry."             onClick={() => { scrollToSection('counselling'); }} />
            <DetailCard emoji="⚡" title="BITS Pilani"   desc="BITSAT score. Own portal. Earlier than JEE counselling."       onClick={() => onAskAI('PCM','BITS Pilani BITSAT counselling process')} />
          </div>
        </DSection>

        <button className="btn-main btn-filled" style={{marginTop:'2rem'}} onClick={() => onShowModal('PCM')}>📚 Full PCM Guide →</button>
      </div>
    </section>
  );
}
