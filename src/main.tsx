import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Link, useLocation} from 'react-router-dom';
import {ArrowDownRight, ArrowRight, ArrowUpRight, ArrowLeft, Sun, Moon, Menu, X, ChevronLeft, ChevronRight, Play, Plus, Minus} from 'lucide-react';
import {projects, imageFor, type Project} from './projects';
import manifest from '../public/projects/manifest.json';
import './style.css';

type Theme = 'light'|'dark';
type FrameInfo = {image:string;width:number;height:number;long:boolean};
const frames = manifest as Record<string, FrameInfo[]>;
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useScrollReveal(path:string){
  useEffect(()=>{
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (reduceMotion() || !('IntersectionObserver' in window)) { elements.forEach(e=>e.classList.add('is-visible'));return; }
    const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}), {rootMargin:'0px 0px -35px 0px',threshold:.08});
    elements.forEach(el=>io.observe(el));return()=>io.disconnect();
  },[path]);
}
function useMagnetic(path:string){
  useEffect(()=>{
    if(reduceMotion() || !window.matchMedia('(pointer:fine)').matches) return;
    const elements = [...document.querySelectorAll<HTMLElement>('[data-magnetic]')];
    const cleanups = elements.map(el=>{
      const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();const x=(e.clientX-(r.left+r.width/2))*.15;const y=(e.clientY-(r.top+r.height/2))*.15;el.style.transform=`translate3d(${x}px,${y}px,0)`;};
      const leave=()=>{el.style.transform='translate3d(0,0,0)';};
      el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);return()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);el.style.transform='';};
    });return()=>cleanups.forEach(fn=>fn());
  },[path]);
}
function Cursor(){
  const dot=useRef<HTMLDivElement>(null);const pos=useRef({x:-200,y:-200});
  useEffect(()=>{
    if(!window.matchMedia('(pointer:fine)').matches||reduceMotion())return;
    let frame=0;let x=-200,y=-200;
    const move=(e:PointerEvent)=>{
      pos.current={x:e.clientX,y:e.clientY};
      const el=(e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement|null;
      if(dot.current){dot.current.dataset.active=el?'true':'false';dot.current.textContent=el?.dataset.cursor||'View';}
    };
    const tick=()=>{x+=(pos.current.x-x)*.22;y+=(pos.current.y-y)*.22;if(dot.current)dot.current.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;frame=requestAnimationFrame(tick)};
    window.addEventListener('pointermove',move,{passive:true});tick();return()=>{window.removeEventListener('pointermove',move);cancelAnimationFrame(frame)};
  },[]);
  return <div ref={dot} className="cursor-orb" data-active="false" aria-hidden="true">View</div>;
}
function App(){
  const [theme,setTheme]=useState<Theme>(()=>{try {return localStorage.getItem('yt-theme-final')==='dark'?'dark':'light';}catch{return'light'}});
  const [menu,setMenu]=useState(false);
  const [loader,setLoader]=useState(!reduceMotion());
  const location=useLocation();const path=location.pathname;
  useScrollReveal(path);useMagnetic(path);
  useLayoutEffect(()=>{window.scrollTo(0,0);setMenu(false);},[path]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;try{localStorage.setItem('yt-theme-final',theme)}catch{}},[theme]);
  useEffect(()=>{const timer=window.setTimeout(()=>setLoader(false),1150);return()=>clearTimeout(timer)},[]);
  useEffect(()=>{document.body.style.overflow=menu?'hidden':'';return()=>{document.body.style.overflow=''}},[menu]);
  const project=path.startsWith('/work/')?projects.find(p=>p.slug===path.split('/')[2]):undefined;
  const isHome=path==='/' || (!!project&&false);
  let page:React.ReactNode;
  if(project) page=<CaseStudy key={project.slug} project={project}/>;
  else if(path==='/work')page=<AllWork/>;
  else if(path==='/about')page=<About/>;
  else if(path==='/contact')page=<Contact/>;
  else if(path==='/')page=<Home/>;
  else page=<NotFound/>;
  return <>
    <div className={`preloader ${loader?'preloader-active':'preloader-finished'}`} aria-hidden="true"><span>Yeshak<span className="period">.</span></span><div className="preloader-bar"/></div>
    <Cursor/>
    <header className={`site-nav ${isHome?'site-nav-hero':'site-nav-page'} ${menu?'site-nav-open':''}`}>
      <div className="nav-wrap"><Link className="brand" to="/">© Code by Yeshak</Link>
      <nav className="desktop-links" aria-label="Main navigation"><Link to="/work">Work</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></nav>
      <div className="nav-actions"><button data-magnetic className="mode-toggle" type="button" onClick={()=>setTheme(t=>t==='light'?'dark':'light')} aria-label={theme==='light'?'Activate illustrated night mode':'Activate photographic light mode'} title={theme==='light'?'Dark illustrated world':'Light photographic world'}>{theme==='light'?<Moon size={19}/>:<Sun size={19}/>}</button>
      <button data-magnetic className="menu-toggle" onClick={()=>setMenu(v=>!v)} aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu}>{menu?<X size={21}/>:<Menu size={21}/>}<span>{menu?'Close':'Menu'}</span></button></div>
      </div>
    </header>
    <div className={`fullscreen-menu ${menu?'fullscreen-menu-open':''}`} aria-hidden={!menu}>
      <div className="fullscreen-inner"><span className="eyebrow">Navigation</span>
      <nav aria-label="Expanded navigation">{[['Home','/'],['Work','/work'],['About','/about'],['Contact','/contact']].map(([label,to],i)=><Link key={to} tabIndex={menu?0:-1} to={to} onClick={()=>setMenu(false)}><span>0{i+1}</span>{label}<ArrowUpRight size={30}/></Link>)}</nav>
      <div className="menu-bottom"><span>Design · Development · Interaction</span><span>Addis Ababa, Ethiopia</span></div></div>
    </div>
    <div key={path} className="route-stage"><div className="route-curtain" aria-hidden="true"/>{page}<Footer/></div>
  </>;
}

function Home(){
  const heroRef=useRef<HTMLElement>(null);
  useEffect(()=>{if(reduceMotion())return;let raf=0;const onScroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{const distance=Math.min(window.scrollY,window.innerHeight*1.2);heroRef.current?.style.setProperty('--hero-drift',`${Math.round(distance*.13)}px`);heroRef.current?.style.setProperty('--title-drift',`${Math.round(distance*.16)}px`);raf=0;});};window.addEventListener('scroll',onScroll,{passive:true});return()=>{window.removeEventListener('scroll',onScroll);cancelAnimationFrame(raf)}},[]);
  return <main>
  <section ref={heroRef} className="hero" aria-label="Introduction">
    <div className="hero-photo light-scene" role="img" aria-label="Walking on a misty beach at sunset"/>
    <div className="hero-photo dark-scene" aria-hidden="true"/>
    <div className="hero-shade"/>
    <div className="hero-corner hero-corner-top"><span>Independent designer & developer</span><span>Based in Addis Ababa, Ethiopia</span></div>
    <div className="hero-side-label"><span>Interactive design<br/>& software development</span><ArrowDownRight size={27}/></div>
    <div className="hero-title-wrap"><h1 className="hero-title"><span>Yeshak Tsegaye</span><sup>®</sup></h1></div>
    <div className="hero-corner hero-corner-bottom"><span>Available for select projects <span className="availability-dot"/></span><a href="#selected-work">Scroll to explore <ArrowDownRight size={17}/></a></div>
  </section>
  <section className="intro wrap" data-reveal><div className="intro-left"><span className="section-kicker">01 / An introduction</span><h2>Thoughtful design.<br/><em>Purposeful code.</em><br/>Better experiences.</h2></div><div className="intro-right"><p>I'm Yeshak, a designer and developer who cares about how things <em>feel</em>, not only how they look. I build digital experiences with intention, curiosity and craft.</p><Link data-magnetic className="round-cta" to="/about">About me <ArrowUpRight size={20}/></Link></div></section>
  <Works featuredOnly/><Works explorationsOnly/>
  <section className="approach wrap" data-reveal><div><span className="section-kicker">03 / Beyond the interface</span><h2>Making digital<br/>feel <em>human.</em></h2></div><div><p>From early research and interaction systems to the final line of code, every decision should move the experience forward.</p><Link className="underlined-link" to="/about">My approach <ArrowUpRight size={18}/></Link></div></section>
  <Marquee/>
 </main>}
function Marquee(){return <div className="marquee-band" aria-label="Design, development and interaction"><div aria-hidden="true">{Array.from({length:4},(_,i)=><span key={i}>DESIGN <b>✳</b> DEVELOPMENT <b>✳</b> INTERACTION <b>✳</b> </span>)}</div></div>}
function PreviewVideo({p,controls=false}:{p:Project;controls?:boolean}){
  const ref=useRef<HTMLVideoElement>(null);
  useEffect(()=>{
    const v=ref.current;if(!v || reduceMotion())return;
    const io=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){v.play().catch(()=>{});}else v.pause();}),{threshold:.2});io.observe(v);return()=>io.disconnect();
  },[]);
  return <video ref={ref} src={`/projects/${p.slug}/preview.mp4`} muted={!controls} loop={!controls} playsInline preload="metadata" poster={`/projects/${p.slug}/poster.jpg`} controls={controls} aria-label={`${p.name} interface animation`}/>;
}
function CoverDevices({p}:{p:Project}){
 const main=p.slug==='blog-app'?10:p.slug==='directed'?3:p.slug==='medical-app'?3:p.slug==='sarabi'?1:2;
 const second=p.slug==='blog-app'?2:p.slug==='directed'?2:p.slug==='medical-app'?14:p.slug==='sarabi'?2:5;
 return <div className={`cover-devices ${p.slug==='sarabi'?'cover-devices-browser':''}`} aria-hidden="true">
  {p.slug==='sarabi'? <div className="cover-browser"><div className="browser-top"><i/><i/><i/><span>sarabi.restaurant</span></div><div className="browser-viewport"><img src={imageFor(p.slug,main)} loading="lazy" alt=""/></div></div>:null}
  <div className="cover-device cover-device-back"><div className="cover-bezel"><div className="cover-screen"><img src={imageFor(p.slug,second)} loading="lazy" alt=""/></div></div></div>
  <div className="cover-device cover-device-front"><div className="cover-bezel"><div className="cover-screen"><img src={imageFor(p.slug,main)} loading="lazy" alt=""/></div></div></div>
 </div>
}
function WorkCard({p,index}:{p:Project;index:number}){return <Link data-cursor="View" to={`/work/${p.slug}`} className={`work-card ${p.featured?'work-card-featured':''}`} data-reveal aria-label={`View ${p.name} case study`}>
 <div className="work-cover" style={{background:p.accent}}>{p.video?<PreviewVideo p={p}/>:<CoverDevices p={p}/>}<div className="work-cover-shade"/>{p.video&&<span className="favorite-indicator">FEATURED / MOTION</span>}<span className="view-chip">View case <ArrowUpRight size={19}/></span></div>
 <div className="work-info"><div><h3>{p.name}</h3><span>{p.kind}</span></div><div className="project-number">{String(index+1).padStart(2,'0')}</div></div>
 </Link>}
function Works({featuredOnly=false,explorationsOnly=false}:{featuredOnly?:boolean;explorationsOnly?:boolean}){
 const ps=projects.filter(p=>featuredOnly?!!p.featured:explorationsOnly?!p.featured:true);
 const title=featuredOnly?'02 / Featured motion projects':explorationsOnly?'03 / More selected work':'02 / Selected work';
 return <section id={!explorationsOnly?'selected-work':'explorations'} className={`works wrap ${featuredOnly?'works-featured':explorationsOnly?'works-explorations':''}`}>
 <div className="section-head" data-reveal><span className="section-kicker">{title}</span><span>{featuredOnly?'Three favorite projects · Film previews':explorationsOnly?'Interface studies & explorations':'Featured projects first · All case studies'} </span></div>
 <div className={`work-grid ${featuredOnly?'work-grid-featured':''}`}>{ps.map((p,i)=><WorkCard p={p} index={projects.indexOf(p)} key={p.slug}/>)}</div>
 {featuredOnly&&<div className="work-more"><Link data-magnetic to="/work">Explore every project <ArrowUpRight size={20}/></Link></div>}
 </section>}
function AllWork(){return <main className="inner-page"><header className="page-header wrap" data-reveal><span className="section-kicker">Designs, studies & experiments — 2026</span><h1>Selected <em>work.</em></h1><p>Three favorite projects in motion, followed by four detailed interface explorations. Open any project for its complete screen gallery.</p></header><Works featuredOnly/><Works explorationsOnly/></main>}
function Phone({src,label}:{src:string;label:string}){
 const pane=useRef<HTMLDivElement>(null);const animation=useRef<number>(0);
 const stop=()=>{if(animation.current)cancelAnimationFrame(animation.current);animation.current=0};
 const begin=()=>{
   if(reduceMotion()||!window.matchMedia('(hover:hover)').matches||!pane.current)return;
   stop();const el=pane.current;const distance=el.scrollHeight-el.clientHeight;if(distance<30)return;
   const start=el.scrollTop;const to=distance;const duration=Math.min(22000,Math.max(4500,(to-start)*12));let t0=0;
   const tick=(t:number)=>{if(!t0)t0=t;const progress=Math.min((t-t0)/duration,1);const eased=progress<.5?2*progress*progress:1-Math.pow(-2*progress+2,2)/2;el.scrollTop=start+(to-start)*eased;if(progress<1)animation.current=requestAnimationFrame(tick)};animation.current=requestAnimationFrame(tick);
 };
 useEffect(()=>stop,[]);
 return <div className="device-frame" onMouseEnter={begin} onMouseLeave={stop}>
  <span className="device-camera" aria-hidden="true"/><div className="device-scroller" ref={pane} tabIndex={0} onWheel={stop} onTouchStart={stop} aria-label={`Scroll to explore ${label}`}><img src={src} loading="lazy" alt={label}/></div><span className="device-homebar" aria-hidden="true"/>
 </div>;
}
function CaseVideo({p}:{p:Project}){
 const [quality,setQuality]=useState<'1080'|'4k'>('1080');const [available,setAvailable]=useState(false);
 useEffect(()=>{let cancelled=false;fetch(`/projects/${p.slug}/preview-4k.mp4`,{method:'HEAD'}).then(r=>{if(!cancelled)setAvailable(r.ok)}).catch(()=>{});return()=>{cancelled=true}},[p.slug]);
 return <div className="case-player">
  <video key={quality} src={`/projects/${p.slug}/${quality==='4k'?'preview-4k.mp4':'preview.mp4'}`} controls playsInline preload="metadata" poster={`/projects/${p.slug}/poster.jpg`} aria-label={`${p.name} video walkthrough`} onError={()=>setQuality('1080')}/>
  <div className="video-quality"><span>Design walkthrough</span><div><button className={quality==='1080'?'active':''} onClick={()=>setQuality('1080')}>Original 1080p</button>{available&&<button className={quality==='4k'?'active':''} onClick={()=>setQuality('4k')}>Upscaled 4K</button>}</div></div>
 </div>
}
function CaseStudy({project:p}:{project:Project}){
 const screenshots=frames[p.slug]||[];const [visible,setVisible]=useState(12);const [zoom,setZoom]=useState(-1);
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 useEffect(()=>{setVisible(12);setZoom(-1)},[p.slug]);
 useEffect(()=>{if(zoom<0)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setZoom(-1);if(e.key==='ArrowRight')setZoom(v=>(v+1)%screenshots.length);if(e.key==='ArrowLeft')setZoom(v=>(v-1+screenshots.length)%screenshots.length);};window.addEventListener('keydown',onKey);document.body.style.overflow='hidden';return()=>{window.removeEventListener('keydown',onKey);document.body.style.overflow=''}},[zoom,screenshots.length]);
 useEffect(()=>{if(!reduceMotion()){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.05});document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(el=>observer.observe(el));return()=>observer.disconnect();}},[visible]);
 return <main className="inner-page case">
  <section className="case-heading wrap"><Link className="back-link" to="/work"><ArrowLeft size={18}/> All projects</Link><div data-reveal><span className="section-kicker">{p.kind} / {p.year}</span><h1>{p.name}<span>.</span></h1><p>{p.label}</p></div></section>
  <div className="case-feature" style={{background:p.accent}}>{p.video?<CaseVideo p={p}/>:<img src={imageFor(p.slug,1)} alt={`${p.name} project preview`}/>}<span className="feature-label">Project showcase · {p.year}</span></div>
  <div className="case-body wrap">
   <section className="case-overview" data-reveal><span className="section-kicker">01 / About the project</span><h2>{p.overview}</h2></section>
   <section className="case-facts" data-reveal><div><span className="section-kicker">The challenge</span><p>{p.challenge}</p></div><div><span className="section-kicker">The approach</span><p>{p.solution}</p></div></section>
   <section className="screen-gallery"><div className="section-head" data-reveal><span className="section-kicker">02 / Design exploration</span><span>{screenshots.length} individual frames · Scroll within the phone</span></div><div className="screen-grid">{screenshots.slice(0,visible).map((s,i)=><article className="screen-card" data-reveal key={s.image}>
     <div className="screen-art"><Phone src={imageFor(p.slug,i+1)} label={`${p.name} screen ${i+1}`}/></div><div className="screen-details"><span>{String(i+1).padStart(2,'0')} / {String(screenshots.length).padStart(2,'0')}</span><button aria-label={`Expand ${p.name} screen ${i+1}`} onClick={()=>setZoom(i)}>Open full screen <ArrowUpRight size={16}/></button></div>
    </article>)}</div>{visible<screenshots.length&&<button data-magnetic className="load-screens" onClick={()=>setVisible(v=>Math.min(v+12,screenshots.length))}>Load more screens <Plus size={19}/></button>}</section>
   <section className="next-project" data-reveal><span className="section-kicker">Up next</span><Link to={`/work/${next.slug}`}>{next.name}<ArrowUpRight size={50}/></Link></section>
  </div>
  {zoom>=0&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={`${p.name} full screen viewer`}>
   <button className="lightbox-close" onClick={()=>setZoom(-1)} aria-label="Close screenshot"><X size={24}/></button>
   <button className="lightbox-prev" onClick={()=>setZoom(v=>(v-1+screenshots.length)%screenshots.length)} aria-label="Previous"><ChevronLeft/></button>
   <div className="lightbox-scroll"><img src={imageFor(p.slug,zoom+1)} alt={`${p.name} full screen ${zoom+1}`}/></div>
   <button className="lightbox-next" onClick={()=>setZoom(v=>(v+1)%screenshots.length)} aria-label="Next"><ChevronRight/></button>
   <div className="lightbox-count">{zoom+1} / {screenshots.length}</div>
  </div>}
 </main>;
}
function About(){return <main className="inner-page about-page">
  <header className="page-header wrap" data-reveal><span className="section-kicker">A little about me</span><h1>More than<br/><em>pixels.</em></h1><p>A design perspective shaped by curiosity, engineering and a belief that good interfaces feel effortless.</p></header>
  <section className="about-portrait-section wrap" data-reveal><figure className="about-portrait"><img src="/images/about-portrait.webp" alt="Clean illustrated portrait of Yeshak in a cobalt-blue jacket against a cream grid background"/></figure><div className="about-personal"><span className="section-kicker">/ Story</span><h2>Curious by nature.<br/><em>Intentional by design.</em></h2><p>I'm Yeshak, a UI/UX designer and software engineering student based in Addis Ababa, Ethiopia. I care about the small details that make a product intuitive, engaging and useful.</p><p>My work blends visual thinking with a developer's understanding of how digital experiences are built. From research to prototypes to working interfaces, I enjoy making ideas feel real.</p><Link to="/work" className="underlined-link">Explore my projects <ArrowUpRight size={18}/></Link></div></section>
  <section className="about-services wrap"><div className="section-head" data-reveal><span className="section-kicker">What I bring to projects</span><span>01 — 03</span></div>{[['01','Research & thinking','Asking better questions, understanding the user and framing the right problem.'],['02','Visual & interaction design','Composing expressive, usable interfaces with purposeful interactions and a strong eye for detail.'],['03','Creative development','Bringing designs to life with responsive code, refined transitions and thoughtful performance.']].map(([n,t,d])=><div className="service-row" data-reveal key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowUpRight size={25}/></div>)}</section>
  <section className="about-ending wrap" data-reveal><span className="section-kicker">A little of everything</span><h2>Design. Code.<br/><em>Keep exploring.</em></h2></section>
 </main>}
function Contact(){return <main className="inner-page contact-page"><header className="page-header wrap" data-reveal><span className="section-kicker">Available for collaboration</span><h1>Let's make<br/><em>something good.</em></h1><p>Have an idea, project or collaboration in mind? I'd love to hear about it.</p></header><section className="contact-links wrap" data-reveal><a href="mailto:yeshak34@gmail.com"><span>Drop me an email</span><strong>yeshak34@gmail.com</strong><ArrowUpRight/></a><a href="https://github.com/Isaac-56" target="_blank" rel="noreferrer"><span>Find me on</span><strong>GitHub</strong><ArrowUpRight/></a><a href="https://www.linkedin.com/in/yeshak-tsegaye-899493384/" target="_blank" rel="noreferrer"><span>Connect on</span><strong>LinkedIn</strong><ArrowUpRight/></a></section></main>}
function NotFound(){return <main className="inner-page wrap error-page"><span className="section-kicker">404 / Not found</span><h1>Wrong turn.</h1><Link to="/">Back to home <ArrowUpRight size={18}/></Link></main>}
function Footer(){return <footer className="footer"><div className="wrap"><div className="footer-top"><span className="section-kicker">Have a project in mind?</span><Link data-magnetic to="/contact">Let's work together <ArrowUpRight size={55}/></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Yeshak Tsegaye</span><span>Addis Ababa, Ethiopia</span><div><a href="https://github.com/Isaac-56" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/yeshak-tsegaye-899493384/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to top ↑</button></div></div></footer>}
createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);