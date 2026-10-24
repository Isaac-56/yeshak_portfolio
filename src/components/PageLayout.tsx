import { useEffect, type ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
type Props={label:string;title:string;subtitle?:string;children:ReactNode};
export default function PageLayout({label,title,subtitle,children}:Props){
 const {pathname}=useLocation();const ref=useReveal();
 useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});},[pathname]);
 return <main className="min-h-screen pt-32 pb-30 relative">
  <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none"/>
  <div className="section-padding relative z-10"><div className="max-w-[1400px] mx-auto" ref={ref}>
   <div className="reveal flex flex-wrap items-center justify-between gap-5 border-b border-border pb-6 mb-12">
    <span className="text-xs uppercase tracking-[0.24em] font-semibold text-accent">/ {label}</span>
    <Link to="/contact" className="inline-flex gap-2 items-center text-secondary hover:text-accent text-sm">Have a project? <ArrowUpRight size={16}/></Link>
   </div>
   <div className="reveal reveal-delay-1 mb-16 md:mb-24">
    <h1 className="font-display font-bold text-primary tracking-[-0.055em] leading-[1.03] text-[clamp(3rem,8vw,7.25rem)] max-w-[1100px]">{title}</h1>
    {subtitle&&<p className="text-body-lg text-secondary max-w-2xl mt-8">{subtitle}</p>}
   </div>
   {children}
  </div></div>
 </main>;
}
