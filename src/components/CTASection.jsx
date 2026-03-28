import { scrollToSection, showToast } from '../hooks/useToast';

export function CTASection() {
  return (
    <section id="cta">
      <div className="section-content" style={{textAlign:'center'}}>
        <div className="cta-box reveal">
          <h2 className="cta-h">Ready to Map Your Future? 🚀</h2>
          <p className="cta-p">Stop second-guessing your stream. Stop missing deadlines. Start with a plan built for you — powered by AI that knows India's education system inside out.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn-main btn-filled" onClick={() => scrollToSection('streams')}>🚀 Explore Streams</button>
            <button className="btn-main btn-gold"   onClick={() => scrollToSection('counselling')}>🗺️ Counselling Guide</button>
            <button className="btn-main btn-ghost"  onClick={() => scrollToSection('ai-section')}>Chat with AI →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ onSignOut }) {
  return (
    <footer>
      <div className="footer-links">
        <a onClick={() => scrollToSection('streams')}>Streams</a>
        <a onClick={() => scrollToSection('counselling')}>Counselling Guide</a>
        <a onClick={() => scrollToSection('pcm')}>PCM</a>
        <a onClick={() => scrollToSection('pcb')}>PCB</a>
        <a onClick={() => scrollToSection('ai-section')}>AI Counsellor</a>
        <a onClick={onSignOut} style={{color:'var(--pink)'}}>Sign Out</a>
      </div>
      <p>The Citadel — Your Complete Class 12 to College Navigator</p>
      <p style={{marginTop:'0.5rem',fontSize:'0.78rem',opacity:0.4}}>
        200+ exams · Every counselling portal · Zero fluff · Pure clarity &nbsp;·&nbsp; <strong>AI-powered by Groq</strong>
      </p>
    </footer>
  );
}
