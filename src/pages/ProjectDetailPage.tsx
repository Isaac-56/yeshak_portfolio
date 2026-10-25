import { Link, useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { ArrowLeft,ArrowRight, X, ArrowUpRight } from 'lucide-react';
import { projects,projectImage } from '../data/projects';
export default function ProjectDetailPage(){
 const {slug}=useParams();const project=projects.find(p=>p.slug===slug);
 const [active,setActive]=useState<number|null>(null);
 useEffect(()=>{window.scrollTo(0,0);setActive(null)},[slug]);
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setActive(null);};window.addEventListener('keydown',onKey);return ()=>window.removeEventListener('keydown',onKey)},[]);
 if(!project)return <main className="section-padding pt-40 min-h-[70vh]"><h1>Project not found</h1><Link to="/projects">Back to work</Link></main>;
 const next=projects[(projects.indexOf(project)+1)%projects.length];
 return <main className="ds-case">
 <section className="ds-case-top section-padding"><div className="max-w-[1400px] mx-auto">
 <Link className="ds-back" to="/projects"><ArrowLeft size={18}/> Back to all projects</Link>
 <div className="ds-case-title"><span>{project.type} / {project.year}</span><h1>{project.name}<span className="ds-dot">.</span></h1><p>{project.intro}</p></div>
 <div className="ds-case-cover" style={{background:project.palette}}><img src={projectImage(project.slug,1)} alt={`Cover preview for ${project.name}`} /></div>
 </div></section>
 <section className="ds-case-content section-padding"><div className="max-w-[1400px] mx-auto">
 <div className="ds-case-intro"><div><span className="ds-eyebrow">01 / Overview</span></div><p>{project.description}</p></div>
 <div className="ds-case-gallery-head"><span>02 / Design snapshots</span><span>Tap a screen to enlarge</span></div>
 <div className="ds-case-gallery">{Array.from({length:project.count},(_,i)=>i+1).map((n)=>
  <button type="button" className="ds-screen" key={n} style={{background:project.palette}} onClick={()=>setActive(n)} aria-label={`Enlarge ${project.name} screen ${n}`}>
   <img loading="lazy" src={projectImage(project.slug,n)} alt={`${project.name}: screenshot ${n}`}/><span>Screen {String(n).padStart(2,'0')} <ArrowUpRight size={17}/></span>
  </button>
 )}</div>
 <div className="ds-next"><span>Next project</span><Link to={`/projects/${next.slug}`}>{next.name}<ArrowRight/></Link></div>
 </div></section>
 {active!==null&&<div className="ds-lightbox" role="dialog" aria-modal="true" aria-label={`${project.name} screen preview`} onClick={()=>setActive(null)}>
  <button type="button" className="ds-close" aria-label="Close image preview" onClick={()=>setActive(null)}><X size={24}/></button>
  <img src={projectImage(project.slug,active)} alt={`${project.name} enlarged screen ${active}`} onClick={e=>e.stopPropagation()} />
 </div>}
 </main>
}
