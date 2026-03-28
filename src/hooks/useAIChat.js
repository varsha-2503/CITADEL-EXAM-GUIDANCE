import { useState, useRef } from 'react';
import { GROQ_KEY, SYSTEM_PROMPT } from '../data';

export function useAIChat() {
  const [messages, setMessages]     = useState([]);
  const [isStreaming, setStreaming]  = useState(false);
  const historyRef                  = useRef([]);

  function fmt(text) {
    return text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/`(.+?)`/g,'<code style="font-family:var(--ff-mono);background:var(--bg3);padding:0.1em 0.35em;border-radius:4px;font-size:0.85em;">$1</code>')
      .replace(/\n/g,'<br>');
  }

  async function sendMessage(text) {
    if (!text.trim() || isStreaming) return;

    const userMsg = { role: 'user', html: fmt(text), raw: text };
    setMessages(prev => [...prev, userMsg]);
    historyRef.current.push({ role: 'user', content: text });

    setStreaming(true);
    const streamId = Date.now();
    setMessages(prev => [...prev, { role: 'ai', html: '<span class="cursor-blink">▍</span>', id: streamId }]);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...historyRef.current],
          stream: true,
          max_tokens: 900,
          temperature: 0.72,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText  = '';
      let buffer    = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          const t = line.trim();
          if (!t || t === 'data: [DONE]' || !t.startsWith('data: ')) continue;
          try {
            const chunk = JSON.parse(t.slice(6));
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) {
              fullText += delta;
              setMessages(prev =>
                prev.map(m => m.id === streamId
                  ? { ...m, html: fmt(fullText) + '<span class="cursor-blink">▍</span>' }
                  : m
                )
              );
            }
          } catch { /* skip malformed */ }
        }
      }

      setMessages(prev =>
        prev.map(m => m.id === streamId ? { ...m, html: fmt(fullText) } : m)
      );
      historyRef.current.push({ role: 'assistant', content: fullText });

    } catch (err) {
      setMessages(prev =>
        prev.map(m => m.id === streamId
          ? { ...m, html: `<span style="color:var(--pink)">⚠️ ${err.message || 'Connection error'}. Check API key.</span>` }
          : m
        )
      );
    }

    setStreaming(false);
  }

  return { messages, isStreaming, sendMessage };
}
