import './HeroBirds.css';

/**
 * Small vector silhouettes are deliberately rendered outside the hero photographs.
 * This gives both themes the very same bird positions and flight paths, even while
 * the two backgrounds are crossfading.
 */
const flocks = [
  { name: 'distant', birds: [0, 1, 2] },
  { name: 'high', birds: [0, 1] },
  { name: 'near', birds: [0] },
] as const;

function Gull({index}:{index:number}) {
  return <svg className={`gull gull-${index+1}`} viewBox="0 0 64 36" role="presentation" focusable="false">
    <path className="gull-left" d="M32 23 C21 15 14 11 3 14 C13 14 22 21 30 26 Z" />
    <path className="gull-right" d="M32 23 C43 15 50 11 61 14 C51 14 42 21 34 26 Z" />
    <path className="gull-body" d="M29 22 Q32 20 35 22 Q34 27 32 28 Q30 27 29 22Z" />
  </svg>;
}

export default function HeroBirds() {
  return <div className="hero-birds" aria-hidden="true">
    <div className="hero-sky-grain" />
    {flocks.map(flock => (
      <div className={`hero-flock hero-flock-${flock.name}`} key={flock.name}>
        {flock.birds.map((index) => <Gull key={index} index={index}/>)}
      </div>
    ))}
  </div>;
}
