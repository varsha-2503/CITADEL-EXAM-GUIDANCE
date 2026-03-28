import { DetailCard, StratBox, DSection } from './DetailCard';
import { scrollToSection } from '../hooks/useToast';

export default function PCBSection({ onAskAI, onShowModal }) {
  return (
    <section id="pcb" style={{background:'var(--bg3)'}}>
      <div className="section-content">
        <div className="s-label">Stream 02 · Science Medical</div>
        <h2 className="s-h2 reveal">PCB 🧬</h2>
        <p className="s-desc reveal reveal-d1">Focused path. NEET is primary — but smart students always keep backups ready.</p>

        <DSection title="Key Exams">
          <div className="cards-grid">
            <DetailCard emoji="🩺" title="NEET UG"    desc="MBBS, BDS, BAMS. 720 marks. One attempt per year. Extremely competitive." onClick={() => onAskAI('PCB','NEET UG strategy')} />
            <DetailCard emoji="🔬" title="IISER IAT"  desc="Research alternative. Excellent stipend. BS-MS in life sciences."          onClick={() => onAskAI('PCB','IISER IAT for biology')} />
            <DetailCard emoji="📋" title="CUET UG"    desc="DU, BHU, JNU — Psychology, Bio, Biotech. Essential backup."                onClick={() => onAskAI('PCB','CUET UG backup for PCB')} />
            <DetailCard emoji="🌾" title="ICAR AIEEA" desc="Agriculture, Forestry, Food Tech. High-value career path."                 onClick={() => onAskAI('PCB','ICAR AIEEA agriculture exam')} />
          </div>
          <StratBox label="⚡ Smart Strategy" text="Primary: NEET. Backup: CUET UG + IISER IAT. Register CUET before NEET results. AIQ (MCC) + State counselling run separately — apply to both!" />
        </DSection>

        <DSection title="Counselling Systems">
          <div className="cards-grid">
            <DetailCard emoji="🏛️" title="MCC (AIQ)"         desc="15% all-India quota + AIIMS + Deemed. Rounds: R1, R2, Mop-up." onClick={() => scrollToSection('counselling')} />
            <DetailCard emoji="🗺️" title="State Counselling" desc="85% state quota. Run separately. Apply to each eligible state." onClick={() => scrollToSection('counselling')} />
            <DetailCard emoji="🎓" title="CUET Portals"       desc="No central system — DU, BHU, JNU each have own portals."       onClick={() => onAskAI('PCB','DU BHU JNU CUET portal process')} />
            <DetailCard emoji="🔬" title="IISER / NISER"      desc="Separate merit-based admission for research institutes."        onClick={() => onAskAI('PCB','IISER NISER research admission')} />
          </div>
        </DSection>

        <button className="btn-main btn-filled" style={{marginTop:'2rem'}} onClick={() => onShowModal('PCB')}>📚 Full PCB Guide →</button>
      </div>
    </section>
  );
}
