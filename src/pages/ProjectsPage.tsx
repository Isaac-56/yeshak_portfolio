import { ArrowUpRight, ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';

type PortfolioProject = {
  title:string; category:string; year:string; description:string; figma:string;
  from:string; to:string; mark:string; featured?:boolean; slug:string;
};
const projects:PortfolioProject[] = [
  {title:'Module 4',slug:'module-4',category:'Product design · Mobile',year:'2026',description:'A green-led mobile learning interface featuring dashboards, course progress, completion states, and accessible screen patterns.',figma:'https://www.figma.com/design/6RhvTisQ1dGGxMQGZlRC7E/Module-4',from:'#124738',to:'#43b48b',mark:'MODULE / 04',featured:true},
  {title:'Baby Nest',slug:'baby-nest',category:'Health & lifestyle · UI/UX',year:'2026',description:'A warm, approachable interface exploring parent-focused content, community, and wellness journeys.',figma:'https://www.figma.com/design/T7QihPFwyT4iiUOOR0M95H/Baby-Nest',from:'#8b405a',to:'#efa6c2',mark:'baby nest.',featured:true},
  {title:'Upgraded One',slug:'upgraded-one',category:'Web design · Responsive',year:'2026',description:'A restaurant experience across desktop and tablet, covering navigation, menus, reservations, ordering, and assistance.',figma:'https://www.figma.com/design/HbMJhmTjJ4pFlNxCh03q1w/Upgraded-One',from:'#352b24',to:'#aa7952',mark:'UPGRADED'},
  {title:'E-Learning Mobile',slug:'e-learning',category:'Mobile UI · Education',year:'2026',description:'An exploratory mobile learning and community concept. More screens are being prepared for the full case study.',figma:'https://www.figma.com/design/cwPVPotx6PopS0Q9m7DvaC/E-Learning-Mobile--Community-',from:'#1b4a71',to:'#6fb0d6',mark:'LEARN'},
  {title:'Final Project',slug:'final-project',category:'Interface design · Design systems',year:'2026',description:'A collection of interface patterns and product screens, with supporting component design explorations.',figma:'https://www.figma.com/design/RGvOdHFPFY26qIfshKsuIl/Final-Project',from:'#433b6e',to:'#ae8cd0',mark:'FINAL / PROJECT'},
  {title:'HCI Group Project',slug:'hci-group',category:'Human–computer interaction',year:'2026',description:'A collaborative HCI project featuring sign-up, login, verification, and password-recovery flows.',figma:'https://www.figma.com/design/QyEWimm0QDOeTu79orYxAq/HCI-Group-Project',from:'#245c70',to:'#6dabb4',mark:'HCI / GROUP'},
];

export default function ProjectsPage() {
  const ref=useReveal();
  return <PageLayout label="Selected work / 2026" title="Projects with purpose." subtitle="A selection of interface and product design explorations. Explore the original Figma designs while the full visual case studies are being prepared.">
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {projects.map((p,i)=><article key={p.title} className={`reveal reveal-delay-${Math.min(i%5+1,5)} premium-project rounded-3xl overflow-hidden ${p.featured?'md:col-span-1':''}`}>
        <a href={p.figma} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.title} in Figma`} className="block group">
          <div className="premium-project-art aspect-[1.45]" style={{'--project-from':p.from,'--project-to':p.to} as React.CSSProperties}>
            <img loading="lazy" src={`/projects/${p.slug}/01.webp`} alt={`${p.title} design screenshot`} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:scale-[1.04]" onLoad={e=>{e.currentTarget.style.opacity="1";}} onError={e=>{e.currentTarget.style.display="none";}}/><span className="transition-transform duration-500 group-hover:scale-105">{p.mark}</span>
            <span className="absolute right-5 top-5 !text-base w-10 h-10 rounded-full border border-white/60 flex items-center justify-center"><ArrowUpRight size={20}/></span>
          </div>
          <div className="p-7 md:p-8">
            <div className="flex justify-between gap-3 text-xs uppercase tracking-[0.13em] text-secondary mb-3"><span>{p.category}</span><span>{p.year}</span></div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3">{p.title}</h2>
            <p className="text-secondary text-body-sm mb-5">{p.description}</p>
            <span className="text-primary text-sm font-semibold inline-flex items-center gap-2 group-hover:text-accent">View original design <ArrowRight size={16}/></span>
          </div>
        </a>
      </article>)}
    </div>
    <p className="mt-8 text-secondary text-sm">Portfolio covers use the original design previews wherever bundled assets are available. The Untitled exploration is intentionally excluded pending selection.</p>
  </PageLayout>;
}
