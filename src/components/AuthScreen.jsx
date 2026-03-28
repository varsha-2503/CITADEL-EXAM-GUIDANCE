import { useState, useRef } from 'react';
import { DEMO_USERS } from '../data';
import { runPageTransition } from './PageTransition';
import { showToast } from '../hooks/useToast';

const demoUsers = [...DEMO_USERS];

function shakeInput(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('error');
  setTimeout(() => el.classList.remove('error'), 800);
}

function PwField({ id, placeholder, toggleId, autoComplete, onKeyDown, onInput }) {
  const [show, setShow] = useState(false);
  return (
    <div className="pw-wrapper">
      <input
        className="login-input" id={id}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onKeyDown={onKeyDown}
        onInput={onInput}
      />
      <span className="pw-toggle" onClick={() => setShow(s => !s)}>
        {show ? '🙈' : '👁'}
      </span>
    </div>
  );
}

function PwStrengthBar({ value }) {
  let score = 0;
  if (value.length >= 8)        score++;
  if (/[A-Z]/.test(value))      score++;
  if (/[0-9]/.test(value))      score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  const pct    = score * 25;
  const colors = ['#ff4d4d','#ff7849','#f7c948','#2ecc71'];
  return (
    <div className="pw-strength">
      <div className="pw-strength-bar" style={{ width: pct + '%', background: colors[score - 1] || 'var(--border)' }} />
    </div>
  );
}

export default function AuthScreen({ onAuthenticated }) {
  const [panel, setPanel]         = useState('signin'); // 'signin' | 'signup'
  const [loginLoading, setLL]     = useState(false);
  const [loginError, setLE]       = useState('');
  const [signupLoading, setSL]    = useState(false);
  const [signupError, setSE]      = useState('');
  const [pwValue, setPwValue]     = useState('');
  const panelsRef                 = useRef(null);

  function doLogin() {
    const email    = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;
    setLE('');
    if (!email)                        { setLE('Please enter your email address.'); shakeInput('login-email'); return; }
    if (!password)                     { setLE('Please enter your password.');       shakeInput('login-password'); return; }
    if (!/\S+@\S+\.\S+/.test(email))  { setLE('Please enter a valid email.');       shakeInput('login-email'); return; }
    setLL(true);
    setTimeout(() => {
      const user = demoUsers.find(u => u.email === email && u.password === password);
      if (user) {
        runPageTransition(() => {
          onAuthenticated();
          setTimeout(() => showToast('Welcome to The Citadel! 🏰', '🚀'), 200);
        });
      } else {
        setLL(false);
        setLE('Invalid credentials. Try: demo@test.com / demo123');
        shakeInput('login-email'); shakeInput('login-password');
      }
    }, 1200);
  }

  function enterAsGuest() {
    runPageTransition(() => {
      onAuthenticated();
      setTimeout(() => showToast('Browsing as guest. Sign in for full access.', '👤'), 200);
    });
  }

  function doSignup() {
    const fname    = document.getElementById('su-fname')?.value.trim();
    const email    = document.getElementById('su-email')?.value.trim();
    const stream   = document.getElementById('su-stream')?.value;
    const password = document.getElementById('su-password')?.value;
    setSE('');
    if (!fname)                              { setSE('Please enter your first name.'); shakeInput('su-fname'); return; }
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setSE('Please enter a valid email.'); shakeInput('su-email'); return; }
    if (!stream)                             { setSE('Please select your stream.'); shakeInput('su-stream'); return; }
    if (!password || password.length < 8)   { setSE('Password must be at least 8 characters.'); shakeInput('su-password'); return; }
    setSL(true);
    setTimeout(() => {
      demoUsers.push({ email: email.toLowerCase(), password });
      runPageTransition(() => {
        onAuthenticated();
        setTimeout(() => showToast(`Welcome to The Citadel, ${fname}! 🏰`, '🚀'), 200);
      });
    }, 1400);
  }

  function showSignup() {
    if (panelsRef.current) panelsRef.current.style.minHeight = document.getElementById('panel-signup')?.scrollHeight + 'px';
    setPanel('signup');
    setTimeout(() => document.getElementById('su-fname')?.focus(), 350);
  }
  function showSignin() {
    if (panelsRef.current) panelsRef.current.style.minHeight = '';
    setPanel('signin');
    setTimeout(() => document.getElementById('login-email')?.focus(), 350);
  }

  return (
    <div id="auth-wrapper">
      <div className="auth-bg-blobs">
        <div className="auth-blob ab1" /><div className="auth-blob ab2" /><div className="auth-blob ab3" />
      </div>
      <div className="auth-panels" ref={panelsRef}>

        {/* SIGN IN */}
        <div className={`auth-panel ${panel === 'signup' ? 'slide-out' : ''}`} id="panel-signin">
          <div className="login-brand">
            <div className="login-brand-icon">🏰</div>
            <span className="login-brand-name">The Citadel</span>
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-sub">Your college roadmap awaits. Sign in to continue your journey.</p>

          <div className="login-field">
            <label className="login-label" htmlFor="login-email">Email Address</label>
            <input className="login-input" id="login-email" type="email" placeholder="you@example.com" autoComplete="email"
              onKeyDown={e => e.key === 'Enter' && doLogin()} />
          </div>
          <div className="login-field">
            <label className="login-label" htmlFor="login-password">Password</label>
            <PwField id="login-password" placeholder="Enter your password" toggleId="pw-toggle" autoComplete="current-password"
              onKeyDown={e => e.key === 'Enter' && doLogin()} />
          </div>
          <span className="login-forgot" onClick={() => showToast('Password reset link sent!','📧')}>Forgot password?</span>

          <button className={`login-btn${loginLoading ? ' loading' : ''}`} onClick={doLogin}>
            {loginLoading ? 'Signing in...' : 'Sign In →'}
          </button>
          <div className="login-divider">or</div>
          <button className="login-guest-btn" onClick={enterAsGuest}>👤 Continue as Guest</button>
          {loginError && <div className="login-error">{loginError}</div>}
          <div className="auth-switch">New here? <a onClick={showSignup}>Create your account →</a></div>
        </div>

        {/* SIGN UP */}
        <div className={`auth-panel ${panel === 'signup' ? 'slide-in' : ''}`} id="panel-signup">
          <div className="login-brand">
            <div className="login-brand-icon">🏰</div>
            <span className="login-brand-name">The Citadel</span>
          </div>
          <h1 className="login-title">Join The Citadel</h1>
          <p className="login-sub">Create your free account and unlock India's sharpest college roadmap.</p>

          <div className="signup-row">
            <div className="login-field">
              <label className="login-label" htmlFor="su-fname">First Name</label>
              <input className="login-input" id="su-fname" type="text" placeholder="Arjun" autoComplete="given-name" />
            </div>
            <div className="login-field">
              <label className="login-label" htmlFor="su-lname">Last Name</label>
              <input className="login-input" id="su-lname" type="text" placeholder="Sharma" autoComplete="family-name" />
            </div>
          </div>
          <div className="login-field">
            <label className="login-label" htmlFor="su-email">Email Address</label>
            <input className="login-input" id="su-email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="login-field">
            <label className="login-label" htmlFor="su-stream">Your Stream</label>
            <select className="login-input" id="su-stream" style={{cursor:'pointer'}}>
              <option value="" disabled defaultValue>— Select your stream —</option>
              <option value="PCM">⚙️ PCM — Science (Non-Medical)</option>
              <option value="PCB">🧬 PCB — Science (Medical)</option>
              <option value="Commerce">📊 Commerce</option>
              <option value="Humanities">📚 Humanities</option>
              <option value="undecided">🤔 Still deciding</option>
            </select>
          </div>
          <div className="login-field">
            <label className="login-label" htmlFor="su-password">Password</label>
            <PwField id="su-password" placeholder="Min. 8 characters" toggleId="su-pw-toggle" autoComplete="new-password"
              onKeyDown={e => e.key === 'Enter' && doSignup()}
              onInput={e => setPwValue(e.target.value)} />
            <PwStrengthBar value={pwValue} />
          </div>

          <button className={`login-btn${signupLoading ? ' loading' : ''}`} onClick={doSignup}>
            {signupLoading ? 'Creating account...' : 'Create Account ✦'}
          </button>
          <div className="login-divider">or</div>
          <button className="login-guest-btn" onClick={enterAsGuest}>👤 Continue as Guest</button>
          {signupError && <div className="login-error">{signupError}</div>}
          <p className="signup-terms">By creating an account you agree to our <a>Terms</a> &amp; <a>Privacy Policy</a>.</p>
          <div className="auth-switch">Already have an account? <a onClick={showSignin}>← Sign in</a></div>
        </div>

      </div>
    </div>
  );
}
