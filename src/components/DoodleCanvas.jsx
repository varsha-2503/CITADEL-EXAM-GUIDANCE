import { useEffect, useRef } from 'react';
import { DOODLE_SYMBOLS } from '../data';

export default function DoodleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const colors = ['#ff4d8d','#8b6ef5','#f7c948','#2ecc71','#4db8ff'];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const doodles = Array.from({ length: 28 }, () => ({
      x:        Math.random() * window.innerWidth,
      y:        Math.random() * window.innerHeight,
      symbol:   DOODLE_SYMBOLS[Math.floor(Math.random() * DOODLE_SYMBOLS.length)],
      size:     Math.random() * 14 + 8,
      opacity:  Math.random() * 0.06 + 0.02,
      vx:       (Math.random() - 0.5) * 0.18,
      vy:       (Math.random() - 0.5) * 0.18,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.004,
      color:    colors[Math.floor(Math.random() * colors.length)],
    }));

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      doodles.forEach(d => {
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rotation);
        ctx.globalAlpha = d.opacity;
        ctx.fillStyle   = d.color;
        ctx.font        = `${d.size}px 'DM Mono', monospace`;
        ctx.fillText(d.symbol, 0, 0);
        ctx.restore();
        d.x += d.vx; d.y += d.vy; d.rotation += d.rotSpeed;
        if (d.x < -80)               d.x = canvas.width  + 80;
        if (d.x > canvas.width  + 80) d.x = -80;
        if (d.y < -80)               d.y = canvas.height + 80;
        if (d.y > canvas.height + 80) d.y = -80;
      });
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas id="doodle-canvas" ref={canvasRef} />;
}
