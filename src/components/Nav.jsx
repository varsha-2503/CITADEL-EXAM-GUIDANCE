import { useState } from 'react';
import { scrollToSection } from '../hooks/useToast';
import { showToast } from '../hooks/useToast';

export default function Nav({ theme, toggleTheme, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() { setMenuOpen(o => !o); }
  function navTo(id) { scrollToSection(id); setMenuOpen(false); }

  return (
    <>
      <nav id="main-nav">
        <div className="nav-brand" onClick={() => navTo('hero')}>
          <div className="nav-brand-icon">🏰</div>
          <span className="nav-brand-name">The Citadel</span>
        </div>
        <ul className="nav-links">
          <li><a onClick={() => navTo('streams')}      id="nav-streams">Streams</a></li>
          <li><a onClick={() => navTo('steps')}        id="nav-steps">How It Works</a></li>
          <li><a onClick={() => navTo('counselling')}  id="nav-counselling">Counselling</a></li>
          <li><a onClick={() => navTo('exam-search')}  id="nav-exam-search">Exam Search</a></li>  {/* ← NEW */}
          <li><a onClick={() => navTo('pcm')}          id="nav-pcm">PCM</a></li>
          <li><a onClick={() => navTo('pcb')}          id="nav-pcb">PCB</a></li>
          <li><a onClick={() => navTo('ai-section')}   id="nav-ai">AI Guide</a></li>
        </ul>
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle dark/light mode">
            <span className="sun">☀️</span>
            <span className="moon">🌙</span>
          </button>
          <button className="nav-counselling-btn" onClick={() => navTo('counselling')}>🗺️ Counselling Guide</button>
          <button className="nav-cta" onClick={() => navTo('ai-section')}>Chat with AI →</button>
          <div className={`hamburger${menuOpen ? ' open' : ''}`} id="hamburger" onClick={toggleMenu}>
            <span /><span /><span />
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobile-menu">
        <a onClick={() => navTo('streams')}>📚 Streams</a>
        <a onClick={() => navTo('steps')}>⚙️ How It Works</a>
        <a onClick={() => navTo('counselling')}>🗺️ Counselling Guide</a>
        <a onClick={() => navTo('exam-search')}>🔍 Exam Search</a>  {/* ← NEW */}
        <a onClick={() => navTo('pcm')}>⚡ PCM</a>
        <a onClick={() => navTo('pcb')}>🧬 PCB</a>
        <a onClick={() => navTo('ai-section')}>🤖 AI Counsellor</a>
      </div>
    </>
  );
}
