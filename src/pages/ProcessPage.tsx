import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';
const stages=[
 ['01','Discover','Explore the problem through research, stakeholder conversations, and a clear understanding of the people involved.','Research · Context · Goals'],
 ['02','Define','Translate observations into focused problem statements, user journeys, and practical design priorities.','Insights · Information architecture'],
 ['03','Design','Shape ideas into sketches, wireframes, high-fidelity interfaces, and interaction prototypes.','Wireframes · UI · Prototypes'],
 ['04','Build','Work between visual intent and implementation, paying attention to responsive behavior and technical feasibility.','Handoff · Development · QA'],
 ['05','Refine','Review the experience, test assumptions, and improve details as feedback becomes available.','Feedback · Iteration · Polish'],
];
export default function ProcessPage(){const ref=useReveal();return <PageLayout label="My approach" title="A process with purpose." subtitle="From the first question to the final interaction, I believe in thoughtful, iterative work.">
 <div ref={ref} className="border-t border-border">
 {stages.map(([num,title,desc,tags],i)=><article key={num} className={`reveal reveal-delay-${Math.min(i+1,5)} group grid md:grid-cols-12 gap-4 md:gap-10 py-10 md:py-16 border-b border-border`}>
  <div className="md:col-span-2 font-display text-5xl md:text-7xl text-accent font-bold">{num}</div>
  <h2 className="md:col-span-4 font-display font-bold text-4xl md:text-6xl tracking-tight text-primary group-hover:text-accent transition-colors">{title}</h2>
  <div className="md:col-span-6"><p className="text-secondary text-body-lg mb-6">{desc}</p><span className="inline-flex border border-border rounded-full px-4 py-2 text-xs uppercase tracking-widest text-secondary">{tags}</span></div>
 </article>)}
 </div>
 </PageLayout>}
