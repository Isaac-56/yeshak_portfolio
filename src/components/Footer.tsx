import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Footer(){return <footer className="border-t border-border section-padding py-16">
 <div className="max-w-[1400px] mx-auto">
  <div className="flex flex-col lg:flex-row justify-between gap-12 items-start lg:items-end pb-16">
   <div><p className="text-xs uppercase tracking-[.22em] text-accent font-semibold mb-5">Have a good idea?</p><Link to="/contact" className="font-display text-primary text-[clamp(2.5rem,7vw,6.5rem)] tracking-[-.06em] font-bold leading-none hover:text-accent transition-colors">Let's make it real. <ArrowUpRight className="inline w-[.7em] h-[.7em]"/></Link></div>
   <button aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="border border-border rounded-full p-4 text-primary hover:text-accent hover:border-accent transition-colors"><ArrowUp size={22}/></button>
  </div>
  <div className="border-t border-border pt-7 flex flex-wrap justify-between gap-4 items-center text-xs uppercase tracking-[.12em] text-secondary"><span>© {new Date().getFullYear()} Yeshak Tsegaye</span><span>Addis Ababa · Ethiopia</span><div className="flex gap-5"><a href="https://github.com/Isaac-56" target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a><a href="https://www.linkedin.com/in/yeshak-tsegaye-899493384/" target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn</a></div></div>
 </div>
 </footer>}
