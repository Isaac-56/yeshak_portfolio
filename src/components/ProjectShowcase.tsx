import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects,projectImage } from '../data/projects';
export default function ProjectShowcase({limit}:{limit?:number}){
 return <section id="work" className="ds-work section-padding"><div className="max-w-[1400px] mx-auto">
  <div className="ds-section-head"><span>Selected work</span><span>2026 / Portfolio</span></div>
  <div className="ds-project-grid">{projects.slice(0,limit??projects.length).map((p,i)=>
   <Link to={`/projects/${p.slug}`} key={p.slug} className="ds-project-tile group" aria-label={`Explore ${p.name} case study`}>
    <div className="ds-project-image" style={{background:p.palette}}>
     <img loading="lazy" src={projectImage(p.slug,1)} alt={`${p.name} project preview`} />
     <span className="ds-project-view">View <ArrowUpRight size={19}/></span>
    </div>
    <div className="ds-project-meta"><div><h3>{p.name}</h3><p>{p.type}</p></div><span>{String(i+1).padStart(2,'0')}</span></div>
   </Link>
  )}</div>
  {limit&&<div className="ds-more"><Link to="/projects">More work <ArrowUpRight size={18}/></Link></div>}
 </div></section>
}
