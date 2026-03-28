import { useEffect } from 'react';

const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

export function useRevealOnScroll() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1 });
    const observe = () =>
      document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.stream-card').forEach(el => obs.observe(el));
    observe();
    setTimeout(observe, 250);
    return () => obs.disconnect();
  }, []);
}

export function useCounterAnimation(heroRef) {
  useEffect(() => {
    if (!heroRef?.current) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.hstat-n[data-target]').forEach(el => {
          const target = parseInt(el.dataset.target);
          const suffix = el.innerHTML.match(/<span>(.*?)<\/span>/)?.[1] || '';
          let current = 0;
          const step = target / 50;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.innerHTML = Math.floor(current) + `<span>${suffix}</span>`;
            if (current >= target) clearInterval(timer);
          }, 30);
        });
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, [heroRef]);
}

export function useNavHighlight() {
  useEffect(() => {
    const sections = ['streams','steps','counselling','pcm','pcb','ai-section'];
    const navIds   = ['nav-streams','nav-steps','nav-counselling','nav-pcm','nav-pcb','nav-ai'];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const idx = sections.indexOf(e.target.id);
        if (idx !== -1 && e.isIntersecting) {
          navIds.forEach(n => document.getElementById(n)?.classList.remove('active'));
          document.getElementById(navIds[idx])?.classList.add('active');
        }
      });
    }, { threshold: 0.35 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
}

export function useScrollNav() {
  useEffect(() => {
    const handler = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const bar = document.getElementById('scroll-bar');
      if (bar) bar.style.width = pct + '%';
      document.getElementById('main-nav')?.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}

export function useParallax() {
  useEffect(() => {
    const handler = () => {
      if (isTouchDevice()) return;
      const sy = window.scrollY;
      document.querySelectorAll('#hero .gspot').forEach((g, i) => {
        const speed = [0.12, 0.08, 0.05][i] || 0.06;
        const dir   = i % 2 === 0 ? -1 : 1;
        g.style.transform = `translateY(${sy * speed * dir}px)`;
      });
      const cards = document.querySelectorAll('.stream-card');
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const vh   = window.innerHeight;
        if (rect.top < vh && rect.bottom > 0) {
          const progress = 1 - (rect.top / vh);
          const shift    = (progress - 0.5) * 20 * (i % 2 === 0 ? 1 : -1);
          if (!card.matches(':hover')) card.style.transform = `translateY(${shift * 0.3}px)`;
        }
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}

export function useTilt(selector, delay = 0) {
  useEffect(() => {
    if (isTouchDevice()) return;
    const timer = setTimeout(() => {
      document.querySelectorAll(selector).forEach(card => {
        const onMove = e => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width  - 0.5) * 12;
          const y = ((e.clientY - r.top)  / r.height - 0.5) * 12;
          card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-8px) scale(1.01)`;
        };
        const onLeave = () => { card.style.transform = ''; };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [selector, delay]);
}
