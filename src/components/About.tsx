import { useReveal } from '../hooks/useReveal';
import { User, Palette, Code2, Lightbulb } from 'lucide-react';

const highlights = [
  { icon: Palette, label: 'Design Thinking' },
  { icon: Code2, label: 'Technical Knowledge' },
  { icon: Lightbulb, label: 'Problem Solving' },
  { icon: User, label: 'User Advocacy' },
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" ref={ref} className="py-30 section-padding relative">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="reveal mb-12">
          <span className="text-label font-display font-600 text-accent uppercase tracking-wider">
            About Me
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="reveal reveal-delay-1 font-display font-700 text-display-md text-primary text-balance">
              I'm a UI/UX Designer and Software Engineering Student passionate about creating meaningful digital experiences.
            </h2>
            <p className="reveal reveal-delay-2 text-body-lg text-secondary leading-relaxed">
              My background combines design thinking with technical knowledge, allowing me to bridge the gap between user needs and product development.
            </p>
            <p className="reveal reveal-delay-3 text-body-md text-secondary leading-relaxed">
              I enjoy solving complex problems, improving user experiences, and transforming ideas into products people genuinely enjoy using.
            </p>

            <div className="reveal reveal-delay-4 flex flex-wrap gap-4 pt-4">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white border border-border rounded-lg"
                >
                  <Icon size={16} className="text-accent" />
                  <span className="text-body-sm font-medium text-primary">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="reveal reveal-delay-2 relative">
              {/* Design philosophy card */}
              <div className="bg-white border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-label font-display font-600 text-secondary uppercase tracking-wider">
                    Design Philosophy
                  </span>
                </div>
                <blockquote className="font-display font-600 text-display-sm text-primary leading-snug">
                  "Good design is invisible. Great design is unforgettable."
                </blockquote>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 rounded border border-accent/30 bg-accent/5 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <span className="text-body-sm text-secondary">User needs always come first</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 rounded border border-accent/30 bg-accent/5 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <span className="text-body-sm text-secondary">Aesthetics serve functionality</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 rounded border border-accent/30 bg-accent/5 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <span className="text-body-sm text-secondary">Every pixel has a purpose</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 rounded border border-accent/30 bg-accent/5 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <span className="text-body-sm text-secondary">Design and code are inseparable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
