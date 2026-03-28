import { useState, useEffect, useRef } from 'react';
import { useAIChat } from '../hooks/useAIChat';

const QUICK_PROMPTS = [
  'What stream should I pick?',
  'How does JoSAA work?',
  'NEET backup plan?',
  'Commerce colleges in Delhi?',
  'JAC vs IPU vs JoSAA?',
  'PCM but I like Economics?',
];

export default function AISection({ pendingQuery, onPendingQueryConsumed }) {
  const { messages, isStreaming, sendMessage } = useAIChat();
  const [input, setInput]         = useState('');
  const [promptsHidden, hidePrompts] = useState(false);
  const chatBoxRef                = useRef(null);

  // Consume any pending query set by "Ask AI" buttons elsewhere
  useEffect(() => {
    if (pendingQuery) {
      setInput(pendingQuery);
      onPendingQueryConsumed();
      setTimeout(() => {
        sendMessage(pendingQuery);
        setInput('');
        hidePrompts(true);
      }, 100);
    }
  }, [pendingQuery]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  function handleSend() {
    if (!input.trim() || isStreaming) return;
    hidePrompts(true);
    sendMessage(input.trim());
    setInput('');
  }

  function handleQuickSend(text) {
    hidePrompts(true);
    sendMessage(text);
  }

  return (
    <section id="ai-section" style={{background:'var(--bg3)'}}>
      <div className="gspot" style={{width:'500px',height:'500px',background:'radial-gradient(circle,rgba(139,110,245,0.08),transparent 70%)',top:'-100px',right:'-100px',pointerEvents:'none'}} />
      <div className="ai-wrap">
        <div className="ai-header">
          <div className="ai-badge"><div className="ai-badge-pulse" />Groq AI · llama-3.3-70b · Lightning Fast</div>
          <h2 className="ai-title">Chat with Your <em>AI Counsellor</em></h2>
          <p className="ai-sub">Ask anything — exams, colleges, counselling strategy, career paths. No fluff. Just clarity.</p>
        </div>

        <div className="ai-chat-box">
          <div className="ai-chat-topbar">
            <div className="topbar-dots">
              <div className="topbar-dot" /><div className="topbar-dot" /><div className="topbar-dot" />
            </div>
            <div className="topbar-label">Citadel AI · {isStreaming ? 'Thinking…' : 'Ready'}</div>
          </div>

          {!promptsHidden && (
            <div className="quick-prompts">
              {QUICK_PROMPTS.map(p => (
                <button key={p} className="qp-btn" onClick={() => handleQuickSend(p)}>{p}</button>
              ))}
            </div>
          )}

          <div className="chat-window" ref={chatBoxRef}>
            {messages.length === 0 ? (
              <div className="chat-placeholder">
                <div className="chat-ph-icon">🎯</div>
                <div className="chat-ph-text">AI Counsellor is ready</div>
                <div className="chat-ph-sub">Ask me anything about your college journey!</div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`msg${msg.role === 'user' ? ' user' : ''}`}>
                  <div className={`msg-av ${msg.role === 'user' ? 'av-me' : 'av-ai'}`}>
                    {msg.role === 'user' ? 'ME' : 'AI'}
                  </div>
                  <div
                    className={`msg-bubble ${msg.role === 'user' ? 'bubble-me' : 'bubble-ai'}`}
                    dangerouslySetInnerHTML={{ __html: msg.html }}
                  />
                </div>
              ))
            )}
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              id="user-input"
              placeholder="Ask about exams, colleges, counselling, careers…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            />
            <button className="chat-send" id="send-btn" onClick={handleSend} disabled={isStreaming}>
              {isStreaming ? '…' : 'Send ↗'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
