import { useRef } from 'react';

let _runPageTransition = null;

export function runPageTransition(callback) {
  if (_runPageTransition) _runPageTransition(callback);
}

export default function PageTransition() {
  const ref = useRef(null);

  _runPageTransition = (callback) => {
    const pt = ref.current;
    if (!pt) return;
    pt.classList.add('entering');
    setTimeout(() => {
      pt.classList.remove('entering');
      pt.classList.add('exiting');
      if (callback) callback();
      setTimeout(() => pt.classList.remove('exiting'), 700);
    }, 650);
  };

  return (
    <div id="page-transition" ref={ref}>
      <div className="pt-layer" />
      <div className="pt-logo">
        <div className="pt-logo-icon">🏰</div>
        The Citadel
      </div>
    </div>
  );
}
