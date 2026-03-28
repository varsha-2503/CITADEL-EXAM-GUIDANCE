export default function MarqueeBand({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-band" aria-hidden="true" style={reverse ? {animationDirection:'reverse'} : {}}>
      <div className="marquee-track" style={reverse ? {animationDirection:'reverse'} : {}}>
        {doubled.map((item, i) => <span key={i}>{item}</span>)}
      </div>
    </div>
  );
}
