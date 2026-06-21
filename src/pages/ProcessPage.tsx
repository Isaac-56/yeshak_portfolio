import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';
import { Search, Target, PenTool, Hammer, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Understand users, business goals, and challenges.',
    detail: 'I begin every project by deeply understanding the problem space. This involves stakeholder interviews, user research, competitive analysis, and reviewing existing data. The goal is to develop empathy for users and clarity about business objectives before making any design decisions.',
    deliverables: ['User interviews', 'Competitive audit', 'Stakeholder alignment', 'Research synthesis'],
    color: 'accent',
  },
  {
    icon: Target,
    title: 'Define',
    description: 'Identify key problems and opportunities.',
    detail: ' Research findings are synthesized into actionable insights. I define user personas, map journey pain points, and establish clear design requirements. This phase ensures we\'re solving the right problems before investing in solutions.',
    deliverables: ['User personas', 'Journey maps', 'Problem statements', 'Design requirements'],
    color: 'accent-blue',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Create wireframes, flows, and prototypes.',
    detail: 'Moving from low-fidelity to high-fidelity, I create wireframes, interaction flows, and interactive prototypes. Design decisions are validated against research findings and tested with real users early and often.',
    deliverables: ['Wireframes', 'User flows', 'Interactive prototypes', 'Design specs'],
    color: 'accent',
  },
  {
    icon: Hammer,
    title: 'Build',
    description: 'Collaborate with development and implementation.',
    detail: 'Design only creates value when it ships. I work closely with engineers throughout implementation, providing detailed specs, assets, and QA support. My engineering background means I speak the same language and can anticipate technical constraints.',
    deliverables: ['Design handoff', 'Asset delivery', 'Implementation QA', 'Developer collaboration'],
    color: 'accent-blue',
  },
  {
    icon: TrendingUp,
    title: 'Improve',
    description: 'Test, iterate, and optimize experiences.',
    detail: 'Post-launch, I evaluate performance against success metrics, conduct usability testing, and identify opportunities for improvement. Design is never truly done — it evolves based on real user behavior and changing needs.',
    deliverables: ['Usability testing', 'Analytics review', 'Iteration roadmap', 'A/B test plans'],
    color: 'accent',
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; num: string }> = {
  accent: { bg: 'bg-accent-light', border: 'border-accent/20', icon: 'text-accent', num: 'text-accent/20' },
  'accent-blue': { bg: 'bg-accent-blue-light', border: 'border-accent-blue/20', icon: 'text-accent-blue', num: 'text-accent-blue/20' },
};

export default function ProcessPage() {
  const ref = useReveal();

  return (
    <PageLayout
      label="Process"
      title="My design process"
      subtitle="A structured yet flexible framework that puts users at the center of every decision, from discovery through continuous improvement."
    >
      <div ref={ref}>
        {/* Horizontal timeline - desktop */}
        <div className="hidden lg:grid grid-cols-5 gap-6 relative mb-20">
          <div className="absolute top-10 left-[10%] right-[10%] h-px bg-border" />
          {steps.map((step, i) => {
            const colors = colorMap[step.color];
            const Icon = step.icon;
            return (
              <div key={step.title} className={`reveal reveal-delay-${i + 1} relative text-center`}>
                <div className="flex justify-center mb-6 relative z-10">
                  <div className={`w-20 h-20 ${colors.bg} border ${colors.border} rounded-2xl flex items-center justify-center`}>
                    <Icon size={28} className={colors.icon} />
                  </div>
                </div>
                <div className={`font-display font-700 text-6xl ${colors.num} mb-2`}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className={`font-display font-600 text-display-sm ${colors.icon} mb-2`}>
                  {step.title}
                </h3>
                <p className="text-body-sm text-secondary">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Detailed steps */}
        <div className="space-y-8">
          {steps.map((step, i) => {
            const colors = colorMap[step.color];
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} bg-white border border-border rounded-2xl p-8 md:p-10`}
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 ${colors.bg} border ${colors.border} rounded-xl flex items-center justify-center`}>
                        <Icon size={22} className={colors.icon} />
                      </div>
                      <div>
                        <span className={`font-display font-700 text-4xl ${colors.num} block leading-none`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    <h3 className={`font-display font-600 text-display-sm ${colors.icon} mb-2`}>
                      {step.title}
                    </h3>
                    <p className="text-body-sm text-secondary">{step.description}</p>
                  </div>

                  <div className="lg:w-2/3 space-y-6">
                    <p className="text-body-md text-secondary leading-relaxed">
                      {step.detail}
                    </p>
                    <div>
                      <span className="text-label font-display font-600 text-secondary uppercase tracking-wider block mb-3">
                        Deliverables
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((d) => (
                          <span
                            key={d}
                            className={`${colors.bg} ${colors.border} border ${colors.icon} text-body-sm font-medium px-3.5 py-1.5 rounded-lg`}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="flex justify-end mt-6">
                    <ArrowRight size={20} className="text-border" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
