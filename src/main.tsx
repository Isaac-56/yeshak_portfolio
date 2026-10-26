import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Link, useLocation, useNavigate} from 'react-router-dom';
import {ArrowDownRight, ArrowRight, ArrowUpRight, ArrowLeft, Sun, Moon, Menu, X, ChevronLeft, ChevronRight, Play, Plus, Minus} from 'lucide-react';
import {projects, imageFor, type Project} from './projects';
import manifest from './screen-manifest.json';
import ContactPage from './components/ContactPage';
import HeroBirds from './components/HeroBirds';
import LivingHero from './components/LivingHero';
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
  const navigate=useNavigate();
  const [pageTransition,setPageTransition]=useState<{phase:'cover'|'hold'|'uncover';label:string}|null>(null);
  const navigationTimers=useRef<number[]>([]);
  const transitionBusy=useRef(false);
  useEffect(()=>()=>navigationTimers.current.forEach(clearTimeout),[]);
  function handleLinkNavigation(event:React.MouseEvent<HTMLDivElement>){
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey||transitionBusy.current)return;
    const anchor=(event.target as Element).closest?.('a[href]') as HTMLAnchorElement|null;
    if(!anchor||anchor.hasAttribute('download')||anchor.target==='_blank')return;
    const href=anchor.getAttribute('href')||'';
    if(!href.startsWith('/')||href.startsWith('//')||href===path)return;
    const nextPath=href.split(/[?#]/)[0];
    if(nextPath===path&&href.indexOf('#')!==-1)return;
    event.preventDefault();
    if(reduceMotion()){navigate(href);return;}
    transitionBusy.current=true;
    const label=nextPath==='/about'?'About':nextPath==='/contact'?'Contact':nextPath==='/work'?'Work':nextPath==='/'?'Home':projects.find(p=>nextPath===`/work/${p.slug}`)?.name||'Explore';
    setMenu(false);
    setPageTransition({phase:'cover',label});
    navigationTimers.current=[
      window.setTimeout(()=>{navigate(href);setPageTransition({phase:'hold',label});},620),
      window.setTimeout(()=>setPageTransition({phase:'uncover',label}),860),
      window.setTimeout(()=>{setPageTransition(null);transitionBusy.current=false;document.getElementById('site-content')?.focus({preventScroll:true});},1580)
    ];
  }
  const location=useLocation();const path=location.pathname;
  useScrollReveal(path);useMagnetic(path);
  useLayoutEffect(()=>{window.scrollTo(0,0);setMenu(false);},[path]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;try{localStorage.setItem('yt-theme-final',theme)}catch{}},[theme]);
  useEffect(()=>{const timer=window.setTimeout(()=>setLoader(false),1150);return()=>clearTimeout(timer)},[]);
  useEffect(()=>{document.body.style.overflow=menu?'hidden':'';return()=>{document.body.style.overflow=''}},[menu]);
  useEffect(()=>{
    if(!menu)return;
    const previouslyFocused=document.activeElement as HTMLElement|null;
    document.querySelector<HTMLAnchorElement>('.fullscreen-menu nav a')?.focus({preventScroll:true});
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();setMenu(false);return;}
      if(event.key!=='Tab')return;
      const links=[...document.querySelectorAll<HTMLAnchorElement>('.fullscreen-menu-open nav a')];
      if(!links.length)return;
      const current=links.indexOf(document.activeElement as HTMLAnchorElement);
      if(event.shiftKey && current===0){event.preventDefault();links[links.length-1].focus();}
      else if(!event.shiftKey && current===links.length-1){event.preventDefault();links[0].focus();}
    };
    window.addEventListener('keydown',onKey);
    return()=>{window.removeEventListener('keydown',onKey);previouslyFocused?.focus({preventScroll:true});};
  },[menu]);
  useEffect(()=>{
    document.title=path==='/contact'?'Contact | Yeshak Tsegaye':path==='/about'?'About | Yeshak Tsegaye':path==='/work'?'Selected Work | Yeshak Tsegaye':path.startsWith('/work/')?`${projects.find(p=>p.slug===path.split('/')[2])?.name||'Project'} | Yeshak Tsegaye`:'Yeshak Tsegaye — Designer & Developer';
  },[path]);
  const project=path.startsWith('/work/')?projects.find(p=>p.slug===path.split('/')[2]):undefined;
  const isHome=path==='/' || (!!project&&false);
  let page:React.ReactNode;
  if(project) page=<CaseStudy key={project.slug} project={project}/>;
  else if(path==='/work')page=<AllWork/>;
  else if(path==='/about')page=<About/>;
  else if(path==='/contact')page=<Contact/>;
  else if(path==='/')page=<Home/>;
  else page=<NotFound/>;
  return <div className="app-root" onClickCapture={handleLinkNavigation}>
    {pageTransition&&<div className={`page-transition-overlay page-transition-${pageTransition.phase}`} role="status" aria-live="polite" aria-label={`Opening ${pageTransition.label}`}>
      <div className="page-transition-center"><span className="page-transition-dot">●</span><span key={pageTransition.label}>{pageTransition.label}</span></div>
      <span className="page-transition-signature">© Code by Yeshak</span>
    </div>}
    <div className={`preloader ${loader?'preloader-active':'preloader-finished'}`} aria-hidden="true"><span>Yeshak<span className="period">.</span></span><div className="preloader-bar"/></div>
    <Cursor/>
    <header className={`site-nav ${isHome?'site-nav-hero':'site-nav-page'} ${menu?'site-nav-open':''}`}>
      <div className="nav-wrap"><Link className="brand" to="/">© Code by Yeshak</Link>
      <nav className="desktop-links" aria-label="Main navigation"><Link to="/work">Work</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></nav>
      <div className="nav-actions"><button data-magnetic className="mode-toggle" type="button" onClick={()=>setTheme(t=>t==='light'?'dark':'light')} aria-label={theme==='light'?'Activate illustrated night mode':'Activate photographic light mode'} title={theme==='light'?'Dark illustrated world':'Light photographic world'}>{theme==='light'?<Moon size={19}/>:<Sun size={19}/>}</button>
      <button data-magnetic type="button" className="menu-toggle" onClick={()=>setMenu(v=>!v)} aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu}>{menu?<X size={21}/>:<Menu size={21}/>}<span>{menu?'Close':'Menu'}</span></button></div>
      </div>
    </header>
    <div className={`fullscreen-menu ${menu?'fullscreen-menu-open':''}`} role="dialog" aria-label="Site navigation" aria-modal={menu} aria-hidden={!menu}>
      <div className="fullscreen-inner"><span className="eyebrow">Navigation</span>
      <nav aria-label="Expanded navigation">{[['Home','/'],['Work','/work'],['About','/about'],['Contact','/contact']].map(([label,to],i)=><Link key={to} tabIndex={menu?0:-1} to={to} onClick={()=>setMenu(false)}><span>0{i+1}</span>{label}<ArrowUpRight size={30}/></Link>)}</nav>
      <div className="menu-bottom"><span>Design · Development · Interaction</span><span>Addis Ababa, Ethiopia</span></div></div>
    </div>
    <div id="site-content" tabIndex={-1} key={path} className="route-stage"><div className="route-curtain" aria-hidden="true"/>{page}<Footer/></div>
  </div>;
}

function Home(){
  const heroRef=useRef<HTMLElement>(null);
  useEffect(()=>{if(reduceMotion())return;let raf=0;const onScroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{const distance=Math.min(window.scrollY,window.innerHeight*1.2);heroRef.current?.style.setProperty('--hero-drift',`${Math.round(distance*.13)}px`);heroRef.current?.style.setProperty('--title-drift',`${Math.round(distance*.16)}px`);raf=0;});};window.addEventListener('scroll',onScroll,{passive:true});return()=>{window.removeEventListener('scroll',onScroll);cancelAnimationFrame(raf)}},[]);
  return <main>
  <section ref={heroRef} className="hero" aria-label="Introduction">
    <div className="hero-photo light-scene" role="img" aria-label="Walking on a misty beach at sunset"/>
    <div className="hero-photo dark-scene" aria-hidden="true"/>
    <LivingHero/>
    <div className="hero-shade"/>
    <HeroBirds/>
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
 const covers:Record<string,[number,number]>={'medical-app':[1,2],'directed':[3,2],'blog-app':[10,2],'sarabi':[1,13]};
 const [main,second]=covers[p.slug]??[2,1];
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
function AllWork(){
 const [active,setActive]=useState(0);
 const panels=useRef<Array<HTMLElement|null>>([]);
 useEffect(()=>{
   const io=new IntersectionObserver(entries=>{
     const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
     if(visible[0]){
       const index=Number((visible[0].target as HTMLElement).dataset.projectIndex);
       if(Number.isInteger(index))setActive(index);
     }
   },{rootMargin:'-20% 0px -25% 0px',threshold:[.1,.25,.5,.75]});
   panels.current.forEach(el=>{if(el)io.observe(el)});
   return()=>io.disconnect();
 },[]);
 return <main className="work-archive inner-page">
   <section className="archive-intro wrap">
     <div className="archive-kicker" data-reveal><span>Independent designer & developer</span><span>Portfolio / 2026</span></div>
     <h1 data-reveal>All <em>the work.</em><span className="archive-title-count">{String(projects.length).padStart(2,'0')}</span></h1>
     <div className="archive-intro-bottom" data-reveal><p>Seven ideas, seven different worlds. Explore the work through a living gallery—and enter each case study for the complete story.</p><a href="#archive-project-1">Scroll to discover <ArrowDownRight size={20}/></a></div>
   </section>
   <nav className="archive-rail" aria-label="Jump to a portfolio project">
     <span className="archive-rail-caption">INDEX</span>
     {projects.map((p,i)=><a key={p.slug} href={`#archive-project-${i+1}`} className={active===i?'active':''} aria-label={`Jump to ${p.name}`} aria-current={active===i?'location':undefined}><span>{String(i+1).padStart(2,'0')}</span><span className="archive-rail-label">{p.name}</span></a>)}
   </nav>
   <div className="archive-projects">
     {projects.map((p,i)=><section id={`archive-project-${i+1}`} className={`archive-panel archive-panel-${i%2?'reverse':'normal'} ${p.video?'archive-panel-film':'archive-panel-static'}`} data-project-index={i} key={p.slug} ref={el=>{panels.current[i]=el;}} style={{'--archive-accent':p.accent} as React.CSSProperties}>
       <div className="archive-panel-backdrop" aria-hidden="true"><span>{String(i+1).padStart(2,'0')}</span></div>
       <div className="archive-panel-layout wrap">
         <div className="archive-panel-copy">
           <span className="archive-panel-counter"><span>{String(i+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span><span>{p.featured?'Selected favorites / Motion':'Design exploration / Interface'}</span></span>
           <h2>{p.name}<span className="archive-name-dot">.</span></h2>
           <p className="archive-panel-subtitle">{p.label}</p>
           <p className="archive-panel-summary">{p.overview}</p>
           <div className="archive-panel-meta"><span>{p.kind}</span><span>{p.year}</span><span>{frames[p.slug]?.length||0} original screens</span></div>
           <Link className="archive-open-project" to={`/work/${p.slug}`} aria-label={`Explore ${p.name} case study`}>Explore case study <ArrowUpRight size={25}/></Link>
         </div>
         <div className="archive-panel-visual" style={{background:p.accent}}>
           {p.video?<PreviewVideo p={p}/>:<CoverDevices p={p}/>}
           <span className="archive-panel-visual-label">{p.featured?'Motion preview':'Interface preview'} <span>↗</span></span>
         </div>
       </div>
       <span className="archive-panel-bottom-index">{String(i+1).padStart(2,'0')} — {String(projects.length).padStart(2,'0')}</span>
     </section>)}
   </div>
   <div className="archive-end wrap"><span>You've seen the work.</span><Link to="/contact">Let's make something next. <ArrowUpRight/></Link></div>
 </main>;
}
function Phone({src,label,width,height,variant='phone'}:{src:string;label:string;width:number;height:number;variant?:'phone'|'tablet'}){
 const pane=useRef<HTMLDivElement>(null);
 const pause=useRef(false);
 const isLong=height/width>2.72;
 const [view,setView]=useState<'full'|'scroll'>('scroll');
 useEffect(()=>{
   const el=pane.current;
   if(!el||view==='full'||reduceMotion())return;
   let visible=false,frame=0,last=0,position=el.scrollTop;
   const io=new IntersectionObserver(entries=>{visible=!!entries[0]?.isIntersecting;},{threshold:.16});
   io.observe(el);
   function animate(time:number){
     if(!el)return;
     const delta=last?Math.min(70,time-last):0;
     last=time;
     const max=el.scrollHeight-el.clientHeight;
     // Keep subpixel progress in a floating-point accumulator.
     // Browsers round el.scrollTop; adding <1px per frame otherwise stalls.
     if(pause.current||!visible||Math.abs(el.scrollTop-position)>2)position=el.scrollTop;
     if(visible&&!pause.current&&max>18){
       position=position>=max-2?0:Math.min(max,position+(24+Math.min(max/140,25))*delta/1000);
       el.scrollTop=position;
     }
     frame=requestAnimationFrame(animate);
   }
   frame=requestAnimationFrame(animate);
   return()=>{io.disconnect();cancelAnimationFrame(frame);};
 },[src,view]);
 const reset=()=>{if(pane.current)pane.current.scrollTop=0};
 const changeView=(next:'full'|'scroll')=>{pause.current=false;setView(next);reset();};
 return <div className={`screen-preview ${isLong?'screen-preview-tall':'screen-preview-regular'} screen-preview-${variant}`}>
  {isLong&&<div className="screen-view-toggle" role="group" aria-label={`${label} preview mode`}>
   <button type="button" className={view==='scroll'?'active':''} aria-pressed={view==='scroll'} onClick={()=>changeView('scroll')}>Scroll inside</button>
   <button type="button" className={view==='full'?'active':''} aria-pressed={view==='full'} onClick={()=>changeView('full')}>Full design</button>
  </div>}
  <div className={`device-frame device-frame-${variant} ${isLong?'device-frame-tall':''} ${view==='full'?'device-frame-full':''}`}
   onMouseEnter={()=>{pause.current=true}}
   onMouseLeave={()=>{reset();pause.current=false}}>
   <span className="device-camera" aria-hidden="true"/>
   <div className="device-scroller" ref={pane} tabIndex={0}
    onWheel={()=>{pause.current=true}} onTouchStart={()=>{pause.current=true}}
    onFocus={()=>{pause.current=true}} onBlur={()=>{pause.current=false;reset()}}
    aria-label={view==='scroll'?`Scroll to explore ${label}`:`Full uncropped design of ${label}`}>
    <img src={src} loading="lazy" alt={label} width={width} height={height}/>
   </div>
   <span className="device-homebar" aria-hidden="true"/>
  </div>
  <div className="screen-preview-hint">{view==='full'?'Entire source image · No crop':variant==='tablet'?'Tablet view · Auto-scrolls · Hover to explore':'Auto-scrolls · Hover to pause · Scroll manually'}</div>
 </div>;
}

function CaseVideo({p}:{p:Project}){
 const [quality,setQuality]=useState<'1080'|'4k'>('1080');
 const [available,setAvailable]=useState(false);
 useEffect(()=>{
   let cancelled=false;
   fetch(`/projects/${p.slug}/preview-4k.mp4`,{method:'HEAD'}).then(r=>{
     const mime=r.headers.get('content-type')||'';
     if(!cancelled)setAvailable(r.ok&&/^(video\/|application\/octet-stream)/i.test(mime));
   }).catch(()=>{if(!cancelled)setAvailable(false)});
   return()=>{cancelled=true};
 },[p.slug]);
 return <div className="case-player">
   <video key={quality} src={`/projects/${p.slug}/${quality==='4k'?'preview-4k.mp4':'preview.mp4'}`}
    controls playsInline preload="metadata" poster={`/projects/${p.slug}/poster.jpg`}
    aria-label={`${p.name} video walkthrough`}
    onError={()=>{if(quality==='4k'){setAvailable(false);setQuality('1080');}}}/>
   <div className="video-quality"><span>Design walkthrough</span><div>
     <button type="button" className={quality==='1080'?'active':''} onClick={()=>setQuality('1080')}>Original 1080p</button>
     {available&&<button type="button" className={quality==='4k'?'active':''} onClick={()=>setQuality('4k')}>Upscaled 4K</button>}
   </div></div>
 </div>;
}

function CaseStudy({project:p}:{project:Project}){
 const screenshots=frames[p.slug]||[];const [visible,setVisible]=useState(12);const [zoom,setZoom]=useState(-1);
 const closeButton=useRef<HTMLButtonElement>(null);
 const zoomOpen=zoom>=0;
 useEffect(()=>{
   if(!zoomOpen)return;
   const lastFocus=document.activeElement as HTMLElement|null;
   const raf=requestAnimationFrame(()=>closeButton.current?.focus({preventScroll:true}));
   return()=>{cancelAnimationFrame(raf);lastFocus?.focus({preventScroll:true});};
 },[zoomOpen]);
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 useEffect(()=>{setVisible(12);setZoom(-1)},[p.slug]);
 useEffect(()=>{if(zoom<0)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setZoom(-1);if(e.key==='ArrowRight'){e.preventDefault();setZoom(v=>(v+1)%screenshots.length);}if(e.key==='ArrowLeft'){e.preventDefault();setZoom(v=>(v-1+screenshots.length)%screenshots.length);}if(e.key==='Tab'){const controls=[...document.querySelectorAll<HTMLButtonElement>('.lightbox button')];const current=controls.indexOf(document.activeElement as HTMLButtonElement);if(!e.shiftKey&&current===controls.length-1){e.preventDefault();controls[0]?.focus();}else if(e.shiftKey&&current===0){e.preventDefault();controls[controls.length-1]?.focus();}}};window.addEventListener('keydown',onKey);document.body.style.overflow='hidden';return()=>{window.removeEventListener('keydown',onKey);document.body.style.overflow=''}},[zoom,screenshots.length]);
 useEffect(()=>{if(!reduceMotion()){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.05});document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(el=>observer.observe(el));return()=>observer.disconnect();}},[visible]);
 return <main className="inner-page case">
  <section className="case-heading wrap"><Link className="back-link" to="/work"><ArrowLeft size={18}/> All projects</Link><div data-reveal><span className="section-kicker">{p.kind} / {p.year}</span><h1>{p.name}<span>.</span></h1><p>{p.label}</p></div></section>
  <div className="case-feature" style={{background:p.accent}}>{p.video?<CaseVideo p={p}/>:p.slug==='sarabi'?<div className="case-feature-tablet"><Phone src={imageFor(p.slug,1)} width={672} height={2048} label="Sarabi restaurant tablet design" variant="tablet"/></div>:<img src={imageFor(p.slug,1)} alt={`${p.name} project preview`}/>}<span className="feature-label">Project showcase · {p.year}</span></div>
  <div className="case-body wrap">
   <section className="case-overview" data-reveal><span className="section-kicker">01 / About the project</span><h2>{p.overview}</h2></section>
   <section className="case-facts" data-reveal><div><span className="section-kicker">The challenge</span><p>{p.challenge}</p></div><div><span className="section-kicker">The approach</span><p>{p.solution}</p></div></section>
   <section className="screen-gallery"><div className="section-head" data-reveal><span className="section-kicker">02 / Design exploration</span><span>{screenshots.length} original frames · Smooth auto-scroll · Hover to pause · Full image available</span></div><div className={`screen-grid ${p.slug==='sarabi'?'screen-grid-tablet':''}`}>{screenshots.slice(0,visible).map((s,i)=><article className="screen-card" data-reveal key={s.image}>
     <div className={`screen-art ${s.height/s.width>2.72?'screen-art-long':''}`}><Phone src={imageFor(p.slug,i+1)} label={`${p.name} screen ${i+1}`} width={s.width} height={s.height} variant={p.slug==='sarabi'?'tablet':'phone'}/></div><div className="screen-details"><span>{String(i+1).padStart(2,'0')} / {String(screenshots.length).padStart(2,'0')}</span><button aria-label={`Expand ${p.name} screen ${i+1}`} onClick={()=>setZoom(i)}>Open full screen <ArrowUpRight size={16}/></button></div>
    </article>)}</div>{visible<screenshots.length&&<button data-magnetic className="load-screens" onClick={()=>setVisible(v=>Math.min(v+12,screenshots.length))}>Load more screens <Plus size={19}/></button>}</section>
   <section className="next-project" data-reveal><span className="section-kicker">Up next</span><Link to={`/work/${next.slug}`}>{next.name}<ArrowUpRight size={50}/></Link></section>
  </div>
  {zoom>=0&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={`${p.name} full screen viewer`} onMouseDown={event=>{if(event.target===event.currentTarget)setZoom(-1);}}>
   <button ref={closeButton} className="lightbox-close" onClick={()=>setZoom(-1)} aria-label="Close screenshot"><X size={24}/></button>
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
function Contact(){return <ContactPage/>;}
function NotFound(){return <main className="inner-page wrap error-page"><span className="section-kicker">404 / Not found</span><h1>Wrong turn.</h1><Link to="/">Back to home <ArrowUpRight size={18}/></Link></main>}
function Footer(){return <footer className="footer"><div className="wrap"><div className="footer-top"><span className="section-kicker">Have a project in mind?</span><Link data-magnetic to="/contact">Let's work together <ArrowUpRight size={55}/></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Yeshak Tsegaye</span><span>Addis Ababa, Ethiopia</span><div><a href="https://github.com/Isaac-56" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/yeshak-tsegaye-899493384/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to top ↑</button></div></div></footer>}
createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);