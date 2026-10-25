import { Link } from 'react-router-dom';
import { ArrowDownRight,ArrowUpRight } from 'lucide-react';
export default function Hero(){return <main>
 <section className="ds-hero">
  <div className="ds-hero-top section-padding"><div className="max-w-[1400px] mx-auto ds-hero-top-inner"><span>Independent designer & developer</span><span>Based in Addis Ababa, Ethiopia</span></div></div>
  <div className="ds-hero-image"><img className="ds-hero-photo ds-hero-photo-light" src="/images/hero-light.webp" alt="A cinematic solitary walk by the coast at sunset" /><img className="ds-hero-photo ds-hero-photo-dark" src="/images/hero-dark.webp" alt="" aria-hidden="true" /><div className="ds-hero-vignette"/>
   <h1>Yeshak Tsegaye<span>®</span></h1>
   <div className="ds-hero-location"><span>Located in<br/>Addis Ababa, ET</span><span className="ds-hero-globe">✺</span></div>
   <div className="ds-hero-job">UI/UX Designer<br/>& Developer <ArrowDownRight size={29}/></div>
  </div>
 </section>
 <section className="ds-intro section-padding"><div className="max-w-[1400px] mx-auto ds-intro-inner">
  <p>Helping people and brands stand out in the digital world through <em>design, development & interaction.</em></p>
  <div><p>The combination of my passion for design and code positions me to build expressive, human-centered digital experiences.</p><Link to="/about" className="ds-circle-link">About me <ArrowUpRight size={20}/></Link></div>
 </div></section>
 </main>}
