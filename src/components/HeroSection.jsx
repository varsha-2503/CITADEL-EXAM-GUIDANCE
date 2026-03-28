import { useRef } from 'react';
import { scrollToSection } from '../hooks/useToast';
import { useCounterAnimation } from '../hooks/useScrollEffects';

export default function HeroSection() {
  const heroRef = useRef(null);
  useCounterAnimation(heroRef);

  return (
    <section id="hero" ref={heroRef}>
      <div className="gspot" style={{width:'700px',height:'700px',background:'radial-gradient(circle,rgba(255,77,141,0.09),transparent 70%)',top:'-250px',left:'-150px'}} />
      <div className="gspot" style={{width:'600px',height:'600px',background:'radial-gradient(circle,rgba(139,110,245,0.08),transparent 70%)',bottom:'-150px',right:'-150px'}} />
      <div className="gspot" style={{width:'400px',height:'400px',background:'radial-gradient(circle,rgba(247,201,72,0.05),transparent 70%)',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}} />

      <div className="float-badge">⚡ JEE Main → IITs / NITs</div>
      <div className="float-badge">🩺 NEET → AIIMS / MBBS</div>
      <div className="float-badge">⚖️ CLAT → Top NLUs</div>
      <div className="float-badge">📊 IPMAT → IIM Indore</div>

      <div className="section-content" style={{textAlign:'center'}}>
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-dot" />
          India's Sharpest Class 12 Counsellor
        </div>
        <h1 className="hero-h1">
          Your Stream.<br />
          <em>Your Future.</em><br />
          <span className="hl-v">Your Plan.</span>
        </h1>
        <p className="hero-sub">
          Navigate India's education maze with zero confusion. Every exam, every counselling portal,
          every decision — crystal clear with AI guidance.
        </p>
        <div className="hero-btns">
          <button className="btn-main btn-filled" onClick={() => scrollToSection('streams')}>🚀 Explore Streams</button>
          <button className="btn-main btn-gold"   onClick={() => scrollToSection('counselling')}>🗺️ Counselling Guide</button>
          <button className="btn-main btn-ghost"  onClick={() => scrollToSection('ai-section')}>Chat with AI →</button>
        </div>
        <div className="hero-stats">
          <div className="hstat"><div className="hstat-n" data-target="50">0<span>K+</span></div><div className="hstat-l">Students Guided</div></div>
          <div className="hstat-div" />
          <div className="hstat"><div className="hstat-n" data-target="200">0<span>+</span></div><div className="hstat-l">Exams Covered</div></div>
          <div className="hstat-div" />
          <div className="hstat"><div className="hstat-n">19<span>+</span></div><div className="hstat-l">States Mapped</div></div>
          <div className="hstat-div" />
          <div className="hstat"><div className="hstat-n">24<span>/7</span></div><div className="hstat-l">AI Available</div></div>
        </div>
        <div className="scroll-cue">
          Scroll to explore
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
