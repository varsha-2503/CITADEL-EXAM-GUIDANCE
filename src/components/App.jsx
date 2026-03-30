import { useState, useCallback } from 'react';

import '../styles/globals.css';

import PortalBar         from './PortalBar';
import PageTransition    from './PageTransition';
import DoodleCanvas      from './DoodleCanvas';
import AuthScreen        from './AuthScreen';
import Nav               from './Nav';
import HeroSection       from './HeroSection';
import MarqueeBand       from './MarqueeBand';
import StreamsSection    from './StreamsSection';
import StepsSection      from './StepsSection';
import CounsellingSection from './CounsellingSection';
import PCMSection        from './PCMSection';
import PCBSection        from './PCBSection';
import { CommerceSection, HumanitiesSection } from './StreamDetailSections';
import ExamSearch        from './ExamSearch';        // ← NEW
import AISection         from './AISection';
import { CTASection, Footer } from './CTASection';
import Modal             from './Modal';

import { useTheme }      from '../hooks/useTheme';
import { useRevealOnScroll, useScrollNav, useParallax, useNavHighlight } from '../hooks/useScrollEffects';
import { showToast }     from '../hooks/useToast';

const MARQUEE_1 = ['JEE Main','NEET UG','CLAT','BITSAT','CUET UG','JAC Delhi','MHT CET','KCET','TS EAMCET','WBJEE'];
const MARQUEE_2 = ['IIT Delhi','NIT Trichy','IIIT Hyderabad','DTU','NSUT','AIIMS','Maulana Azad','SRCC','NLU Bangalore','IIM Indore'];

export default function App() {
  const { theme, toggleTheme }        = useTheme();
  const [authed, setAuthed]           = useState(false);
  const [modalKey, setModalKey]       = useState(null);
  const [pendingAIQuery, setPending]  = useState(null);

  useRevealOnScroll();
  useScrollNav();
  useParallax();
  useNavHighlight();

  const handleAskAI = useCallback((stream, topic) => {
    const q = `I'm in ${stream} stream. Tell me about ${topic} — what should I know, strategy, and career outcomes?`;
    setPending(q);
    document.getElementById('ai-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  function handleSignOut() {
    showToast('Signed out successfully', '👋');
    setTimeout(() => window.location.reload(), 1000);
  }

  return (
    <>
      <PageTransition />
      <DoodleCanvas />
      <div className="scroll-bar" id="scroll-bar" />

      {!authed && (
        <AuthScreen onAuthenticated={() => setAuthed(true)} />
      )}

      <PortalBar />
      <Nav theme={theme} toggleTheme={toggleTheme} onSignOut={handleSignOut} />

      <main>
        <HeroSection />
        <MarqueeBand items={MARQUEE_1} />
        <StreamsSection onShowModal={setModalKey} />
        <StepsSection />
        <MarqueeBand items={MARQUEE_2} reverse />
        <PCMSection     onAskAI={handleAskAI} onShowModal={setModalKey} />
        <PCBSection     onAskAI={handleAskAI} onShowModal={setModalKey} />
        <CommerceSection  onAskAI={handleAskAI} onShowModal={setModalKey} />
        <HumanitiesSection onAskAI={handleAskAI} onShowModal={setModalKey} />
        <CounsellingSection onAskAI={handleAskAI} />
        <ExamSearch onAskAI={handleAskAI} />  {/* ← NEW — sits between Counselling and AI */}
        <AISection
          pendingQuery={pendingAIQuery}
          onPendingQueryConsumed={() => setPending(null)}
        />
        <CTASection />
        <Footer onSignOut={handleSignOut} />
      </main>

      <Modal
        streamKey={modalKey}
        onClose={() => setModalKey(null)}
        onAskAI={handleAskAI}
      />
    </>
  );
}
