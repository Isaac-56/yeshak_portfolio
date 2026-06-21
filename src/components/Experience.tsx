import { useReveal } from '../hooks/useReveal';
import { Palette, Search, Layers, Users, Zap } from 'lucide-react';

const skills = [
  { icon: Palette, label: 'UI/UX Design' },
  { icon: Search, label: 'Research' },
  { icon: Layers, label: 'Prototyping' },
  { icon: Users, label: 'Collaboration' },
  { icon: Zap, label: 'Problem Solving' },
];

export default function Experience() {
  const ref = useReveal();

  return (
    <section id="experience" ref={ref} className="py-30 section-padding relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="reveal mb-4">
          <span className="text-label font-display font-600 text-accent uppercase tracking-wider">
            Experience
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="reveal reveal-delay-1 font-display font-700 text-display-md text-primary mb-4">
              2 Years Internship Experience
            </h2>
            <p className="reveal reveal-delay-2 text-body-lg text-secondary">
              Hands-on experience applying design thinking and user research to real-world products, collaborating with cross-functional teams.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="reveal reveal-delay-2 bg-white border border-border rounded-2xl p-8 md:p-10">
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-label font-display font-600 text-secondary uppercase tracking-wider">
                    Core Competencies
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map(({ icon: Icon, label }, i) => (
                  <div
                    key={label}
                    className={`reveal reveal-delay-${Math.min(i + 1, 5)} flex items-center gap-4 p-4 bg-bg rounded-xl border border-border/50 card-hover`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <span className="font-display font-600 text-body-md text-primary">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
