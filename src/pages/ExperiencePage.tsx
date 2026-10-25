import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';
import { Briefcase, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function ExperiencePage(){const ref=useReveal();return <PageLayout label="Experience" title="Learning by doing." subtitle="My work combines practical design experience with an ongoing software engineering education.">
 <div ref={ref} className="space-y-6">
  <article className="reveal premium-project rounded-3xl p-8 md:p-12">
   <div className="flex items-center gap-2 text-accent uppercase tracking-[.2em] text-xs font-semibold mb-8"><Briefcase size={17}/> Design experience</div>
   <div className="flex flex-col md:flex-row md:justify-between gap-5"><h2 className="font-display font-bold text-4xl md:text-5xl text-primary">UI/UX Design Intern</h2><div className="text-secondary text-sm flex flex-col gap-2"><span>Approximately 2 years</span><span className="inline-flex items-center gap-2"><MapPin size={15}/> Addis Ababa</span></div></div>
   <p className="text-body-lg text-secondary max-w-3xl mt-8">Experience exploring product concepts, researching user needs, translating problems into interface decisions, and communicating visual designs and prototypes. My software engineering background helps connect the design and build phases.</p>
  </article>
  <article className="reveal reveal-delay-1 premium-project rounded-3xl p-8 md:p-12">
   <span className="text-accent uppercase tracking-[.2em] text-xs font-semibold">Ongoing education</span>
   <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mt-6">Software Engineering</h2>
   <p className="text-secondary text-body-lg mt-5 max-w-3xl">Building technical foundations in programming, product development, and modern software workflows while applying design thinking to real interface challenges.</p>
  </article>
  <div className="reveal py-10 flex justify-between items-center border-b border-border"><p className="text-secondary">Interested in working together?</p><Link to="/contact" className="flex items-center gap-2 text-primary font-semibold">Get in touch <ArrowUpRight size={17}/></Link></div>
 </div>
 </PageLayout>}
