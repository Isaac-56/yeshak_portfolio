import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';
const skills=[
 {num:'01',name:'Design & research',items:['Figma','UI design','UX design','Wireframing','Prototyping','Design systems','User research']},
 {num:'02',name:'Frontend & mobile',items:['HTML','CSS','JavaScript','React','TypeScript','Flutter','Dart']},
 {num:'03',name:'Programming & workflow',items:['Python','C++','Git','GitHub','VS Code','Collaborative design']},
];
export default function SkillsPage(){const ref=useReveal();return <PageLayout label="Toolkit" title="Tools serve ideas." subtitle="A multidisciplinary skill set that lets me explore, design, prototype, and develop product experiences.">
 <div ref={ref} className="space-y-6">{skills.map((cat,i)=><section key={cat.num} className={`reveal reveal-delay-${i+1} premium-project rounded-3xl p-8 md:p-12`}>
  <div className="flex flex-col md:flex-row md:items-center gap-5 mb-9"><span className="font-display text-5xl text-accent font-bold">{cat.num}</span><h2 className="font-display text-3xl md:text-4xl font-bold text-primary">{cat.name}</h2></div>
  <div className="flex flex-wrap gap-3">{cat.items.map(skill=><span key={skill} className="text-primary border border-border rounded-full px-5 py-3 font-medium text-sm hover:border-accent transition-colors">{skill}</span>)}</div>
 </section>)}</div>
 </PageLayout>}
