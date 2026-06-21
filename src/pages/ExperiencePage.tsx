import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';
import { Palette, Search, Layers, Users, Zap, Briefcase, Calendar, MapPin } from 'lucide-react';

const coreSkills = [
  { icon: Palette, label: 'UI/UX Design', description: 'Creating pixel-perfect interfaces and seamless user experiences from research through delivery.' },
  { icon: Search, label: 'Research', description: 'Conducting user interviews, surveys, and usability tests to drive evidence-based design decisions.' },
  { icon: Layers, label: 'Prototyping', description: 'Building interactive prototypes at varying fidelities to validate concepts before development.' },
  { icon: Users, label: 'Collaboration', description: 'Working effectively across design, engineering, and product teams to ship cohesive experiences.' },
  { icon: Zap, label: 'Problem Solving', description: 'Breaking down complex challenges into structured, solvable design problems with clear outcomes.' },
];

const achievements = [
  { value: '2+', label: 'Years Experience' },
  { value: '5+', label: 'Major Projects Delivered' },
  { value: '30+', label: 'Users Interviewed' },
  { value: '85%+', label: 'Avg Task Completion' },
];

export default function ExperiencePage() {
  const ref = useReveal();

  return (
    <PageLayout
      label="Experience"
      title="2 Years Internship Experience"
      subtitle="Hands-on experience applying design thinking and user research to real-world products, collaborating with cross-functional teams to deliver meaningful outcomes."
    >
      <div ref={ref}>
        {/* Achievement stats */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map(({ value, label }, i) => (
            <div
              key={label}
              className={`reveal reveal-delay-${i + 1} bg-white border border-border rounded-2xl p-6 text-center card-hover`}
            >
              <div className="font-display font-700 text-display-sm text-primary mb-1">{value}</div>
              <div className="text-body-sm text-secondary">{label}</div>
            </div>
          ))}
        </div>

        {/* Experience entry */}
        <div className="reveal reveal-delay-2 bg-white border border-border rounded-2xl p-8 md:p-10 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase size={16} className="text-accent" />
                <span className="text-label font-display font-600 text-accent uppercase tracking-wider">
                  Internship
                </span>
              </div>
              <h3 className="font-display font-600 text-display-sm text-primary">
                UI/UX Design Intern
              </h3>
            </div>
            <div className="flex items-center gap-4 text-body-sm text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                2 Years
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                Addis Ababa
              </span>
            </div>
          </div>

          <p className="text-body-md text-secondary leading-relaxed mb-8">
            During my internship, I contributed to the full design lifecycle — from initial research and concept development through prototyping, handoff, and post-launch iteration. I worked alongside senior designers and engineers, learning to balance user needs, business requirements, and technical constraints.
          </p>

          <div className="space-y-2 mb-4">
            <span className="text-label font-display font-600 text-secondary uppercase tracking-wider block mb-4">
              Key Contributions
            </span>
            <div className="space-y-3">
              {[
                'Led end-to-end design for multiple product features, from research through implementation',
                'Conducted over 30 user interviews and synthesized findings into actionable design requirements',
                'Created and maintained a component-based design system used across the product suite',
                'Collaborated daily with engineering teams, providing specs, assets, and QA support',
                'Improved key usability metrics including task completion rate and onboarding time',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 rounded border border-accent/30 bg-accent/5 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                  <span className="text-body-sm text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core competencies */}
        <div>
          <div className="reveal mb-8">
            <span className="text-label font-display font-600 text-accent-blue uppercase tracking-wider">
              Core Competencies
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreSkills.map(({ icon: Icon, label, description }, i) => (
              <div
                key={label}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} flex items-start gap-4 p-6 bg-white border border-border rounded-xl card-hover`}
              >
                <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-accent" />
                </div>
                <div>
                  <span className="font-display font-600 text-body-md text-primary block mb-1">{label}</span>
                  <p className="text-body-sm text-secondary">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
