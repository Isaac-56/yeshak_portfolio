import { ArrowUpRight, Palette, Code2, Heart, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';
const principles=[
 {icon:Heart,title:'Empathy before aesthetics',text:'Great interfaces begin with the people they are made for.'},
 {icon:Palette,title:'Craft every detail',text:'Typography, rhythm, movement, and hierarchy should serve a purpose.'},
 {icon:Code2,title:'Make ideas real',text:'I connect design intent with the practical possibilities of development.'},
 {icon:Lightbulb,title:'Question, test, improve',text:'The strongest work comes from curiosity and continuous iteration.'}
];
export default function AboutPage(){const ref=useReveal();return <PageLayout label="About me" title="Design mind. Builder's hands." subtitle="I'm Yeshak Tsegaye, a UI/UX designer and software engineering student based in Addis Ababa, Ethiopia.">
 <div ref={ref} className="space-y-24">
  <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
   <div className="reveal lg:col-span-5"><p className="text-accent uppercase tracking-[.2em] text-xs mb-5">A little about me</p><h2 className="font-display font-bold text-primary text-4xl md:text-5xl tracking-tight">Between imagination and implementation.</h2></div>
   <div className="reveal reveal-delay-1 lg:col-span-7 space-y-7 text-body-lg text-secondary">
    <p>I work at the intersection of creative thinking and technology. I enjoy turning complicated challenges into clear, useful digital experiences.</p>
    <p>My process spans research, interface design, prototyping, and development. Understanding how software works helps me design with realistic constraints while still exploring ambitious ideas.</p>
    <p>I'm continuously developing my craft through academic projects, product experiments, and practical software work.</p>
    <Link to="/projects" className="inline-flex items-center gap-3 text-primary font-semibold text-sm border-b border-accent pb-2">Explore selected work <ArrowUpRight size={18}/></Link>
   </div>
  </div>
  <div><div className="reveal border-t border-border pt-7 mb-8 text-xs tracking-[.2em] uppercase text-secondary">Principles I work by</div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{principles.map(({icon:Icon,title,text},i)=><article key={title} className={`reveal reveal-delay-${i+1} premium-project rounded-3xl p-9`}><Icon className="text-accent mb-8" size={28}/><h3 className="font-display font-bold text-primary text-2xl mb-3">{title}</h3><p className="text-secondary">{text}</p></article>)}</div>
  </div>
 </div>
 </PageLayout>}
