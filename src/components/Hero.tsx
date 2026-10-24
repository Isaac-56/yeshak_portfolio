import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import portrait from '../assets/1.png';

export default function Hero() {
  const [side, setSide] = useState<'design'|'code'|'both'>('both');
  const [pointer, setPointer] = useState({x:50,y:50});
  const [ready,setReady] = useState(false);
  useEffect(()=>{ const t = window.setTimeout(()=>setReady(true),70); return ()=>window.clearTimeout(t); },[]);
  return <main>
    <section className="premium-hero relative min-h-[min(900px,100svh)] flex items-center overflow-hidden pt-24 pb-24 section-padding">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none premium-glow" />
      <div className={`relative z-10 max-w-[1400px] mx-auto w-full transition-all duration-1000 ${ready?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="w-full lg:w-[52%]">
            <div className="flex items-center gap-3 mb-8"><span className="w-2 h-2 rounded-full bg-accent animate-pulse" /><span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">Independent designer & developer · Addis Ababa</span></div>
            <p className="font-display uppercase tracking-[0.18em] text-xs text-accent mb-4">Portfolio / 2026</p>
            <h1 className="font-display font-bold text-primary leading-[0.97] tracking-[-0.065em] text-[clamp(3.5rem,8.4vw,8.5rem)]">
              Digital<br/><span className="premium-outline">by design.</span><br/>Human by<br/>nature.
            </h1>
            <p className="mt-8 text-body-lg max-w-xl text-secondary">I'm Yeshak — a UI/UX designer who codes, and a developer who thinks in experiences. I turn complex ideas into digital products people want to use.</p>
            <div className="flex items-center flex-wrap gap-4 mt-9">
              <Link to="/projects" className="premium-pill bg-primary text-bg inline-flex items-center gap-4 px-6 py-4 font-semibold text-sm">Explore my work <ArrowUpRight size={18}/></Link>
              <Link to="/about" className="premium-pill inline-flex items-center gap-4 px-6 py-4 border border-border text-primary font-semibold text-sm">More about me <ArrowDownRight size={18}/></Link>
            </div>
          </div>
          <div className="w-full max-w-[520px] lg:w-[45%]">
            <div className="premium-portrait group relative rounded-[2rem] overflow-hidden border border-border bg-bg-alt" onPointerMove={e=>{
              if(e.pointerType==='touch') return;
              const r=e.currentTarget.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width*100;const y=(e.clientY-r.top)/r.height*100;
              setPointer({x,y}); setSide(x<42?'design':x>58?'code':'both');
            }} onPointerLeave={()=>setSide('both')} style={{'--pointer-x':pointer.x+'%','--pointer-y':pointer.y+'%'} as React.CSSProperties}>
              <div className="relative aspect-[4/4.8] overflow-hidden">
                <img src={portrait} alt="Portrait of Yeshak Tsegaye" className="absolute inset-0 w-full h-full object-cover" />
                <div className="premium-code-layer absolute inset-0" aria-hidden="true">
                  <div className="premium-code-lines font-mono text-xs sm:text-sm">
                    <p><span>const</span> experience = {'{'}</p><p>&nbsp; empathy: true,</p><p>&nbsp; craft: 'pixel-perfect',</p><p>&nbsp; build: 'with-purpose'</p><p>{'}'};</p>
                  </div>
                </div>
                <div className="premium-design-layer absolute inset-0" aria-hidden="true"><span className="premium-design-ring"/><span className="premium-design-asterisk">✳</span><span className="premium-design-note">FORM / FUNCTION</span></div>
                <div className="absolute top-0 bottom-0 w-px bg-white/50 pointer-events-none transition-[left,opacity] duration-300" style={{left:`${pointer.x}%`,opacity:side==='both'?.6:.15}}/>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/75 to-transparent text-white flex justify-between items-end pointer-events-none">
                  <span className={`font-display font-semibold text-2xl sm:text-3xl transition-transform ${side==='design'?'translate-y-[-6px]':''}`}>Designer<span className="block text-xs tracking-widest font-normal opacity-80 mt-1">CREATIVE THINKING</span></span>
                  <span className={`font-display font-semibold text-2xl sm:text-3xl text-right transition-transform ${side==='code'?'translate-y-[-6px]':''}`}>Coder<span className="block text-xs tracking-widest font-normal opacity-80 mt-1">TECHNICAL CRAFT</span></span>
                </div>
              </div>
            </div>
            <p className="text-secondary text-xs uppercase tracking-[0.18em] text-center mt-4">Move across the portrait · Explore both sides</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-secondary text-xs tracking-[0.2em] uppercase hidden sm:flex gap-3 items-center">Scroll to explore <ArrowDownRight size={16}/></div>
    </section>
    <section className="py-6 border-y border-border overflow-hidden" aria-label="Specialties">
      <div className="premium-marquee text-primary font-display font-semibold uppercase text-xl md:text-2xl whitespace-nowrap" aria-hidden="true">{Array(4).fill(' UI/UX DESIGN ✳ CREATIVE DEVELOPMENT ✳ DIGITAL PRODUCTS ✳ USER RESEARCH ✳ ').join('')}</div>
    </section>
  </main>;
}
