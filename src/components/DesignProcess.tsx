import { useReveal } from '../hooks/useReveal';
import { Search, Target, PenTool, Hammer, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Understand users, business goals, and challenges.',
    color: 'accent',
  },
  {
    icon: Target,
    title: 'Define',
    description: 'Identify key problems and opportunities.',
    color: 'accent-blue',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Create wireframes, flows, and prototypes.',
    color: 'accent',
  },
  {
    icon: Hammer,
    title: 'Build',
    description: 'Collaborate with development and implementation.',
    color: 'accent-blue',
  },
  {
    icon: TrendingUp,
    title: 'Improve',
    description: 'Test, iterate, and optimize experiences.',
    color: 'accent',
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; num: string }> = {
  accent: { bg: 'bg-accent-light', border: 'border-accent/20', icon: 'text-accent', num: 'text-accent/20' },
  'accent-blue': { bg: 'bg-accent-blue-light', border: 'border-accent-blue/20', icon: 'text-accent-blue', num: 'text-accent-blue/20' },
};

export default function DesignProcess() {
  const ref = useReveal();

  return (
    <section id="process" ref={ref} className="py-30 section-padding border-t border-border relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="reveal mb-4">
          <span className="text-label font-display font-600 text-accent uppercase tracking-wider">
            Process
          </span>
        </div>
        <h2 className="reveal reveal-delay-1 font-display font-700 text-display-md text-primary mb-16 text-balance">
          My design process
        </h2>

        {/* Horizontal timeline - desktop */}
        <div className="hidden md:grid grid-cols-5 gap-6 relative">
          {/* Connecting line */}
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
                <p className="text-body-sm text-secondary">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Vertical timeline - mobile */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => {
            const colors = colorMap[step.color];
            const Icon = step.icon;
            return (
              <div key={step.title} className={`reveal reveal-delay-${i + 1} flex gap-6`}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 ${colors.bg} border ${colors.border} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={colors.icon} />
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-8">
                  <h3 className={`font-display font-600 text-lg ${colors.icon} mb-1`}>
                    {step.title}
                  </h3>
                  <p className="text-body-sm text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
