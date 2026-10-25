import { useEffect,useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Moon,Sun,Menu,X } from 'lucide-react';
import type { PortfolioTheme } from '../App';
export default function Navigation({theme,toggleTheme}:{theme:PortfolioTheme;toggleTheme:()=>void}){
 const [open,setOpen]=useState(false);const {pathname}=useLocation();useEffect(()=>setOpen(false),[pathname]);
 return <header className="ds-nav section-padding"><div className="max-w-[1400px] mx-auto ds-nav-inner">
 <Link to="/" className="ds-logo">© Code by Yeshak</Link>
 <div className="ds-nav-links"><Link to="/projects">Work</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></div>
 <div className="ds-nav-actions"><button type="button" aria-label={theme==='dark'?'Light theme':'Dark theme'} onClick={toggleTheme} className="ds-theme">{theme==='dark'?<Sun size={19}/>:<Moon size={19}/>}</button><button type="button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)} className="ds-menu"><span>{open?'Close':'Menu'}</span>{open?<X size={18}/>:<Menu size={18}/>}</button></div>
 </div>{open&&<nav className="ds-dropdown max-w-[1400px] mx-auto" aria-label="Site navigation">{[['Home','/'],['Work','/projects'],['About','/about'],['Process','/process'],['Skills','/skills'],['Experience','/experience'],['Contact','/contact']].map(([label,path])=><Link to={path} key={path}>{label}</Link>)}</nav>}</header>
}
