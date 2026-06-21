import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';
import { User, Palette, Code2, Lightbulb, Heart, Target, Eye, Layers } from 'lucide-react';

const highlights = [
  { icon: Palette, label: 'Design Thinking' },
  { icon: Code2, label: 'Technical Knowledge' },
  { icon: Lightbulb, label: 'Problem Solving' },
  { icon: User, label: 'User Advocacy' },
];

const values = [
  {
    icon: Heart,
    title: 'Empathy-First Design',
    description: 'Every design decision starts with understanding the people who will use the product. I conduct thorough research to ensure solutions address real needs, not assumptions.',
  },
  {
    icon: Target,
    title: 'Purpose-Driven Aesthetics',
    description: 'Visual design serves functional goals. Every color, typeface, and layout choice is intentional and backed by design reasoning, never decoration for its own sake.',
  },
  {
    icon: Eye,
    title: 'Obsession with Detail',
    description: 'The difference between good and great lives in micro-interactions, spacing consistency, and edge cases. I sweat the details so users don\'t have to.',
  },
  {
    icon: Layers,
    title: 'Bridge Builder',
    description: 'Fluent in both design and engineering languages, I translate between disciplines to ensure what gets designed is what gets built — no compromise.',
  },
];

const timeline = [
  { year: '2022', title: 'Started Software Engineering', description: 'Began formal education in software engineering, discovering the intersection of design and code.' },
  { year: '2023', title: 'First Design Internship', description: 'Joined a design team, learning real-world UX processes, user research methods, and collaborative design workflows.' },
  { year: '2024', title: 'Deepening Design Practice', description: 'Led UI/UX projects independently, developed design systems, and mentored junior designers.' },
  { year: 'Now', title: 'Expanding Impact', description: 'Combining design expertise with full-stack development skills to build end-to-end product experiences.' },
];

export default function AboutPage() {
  const ref = useReveal();

  return (
    <PageLayout
      label="About Me"
      title="Designer who codes. Engineer who designs."
      subtitle="I'm a UI/UX Designer and Software Engineering Student based in Addis Ababa, Ethiopia, passionate about creating meaningful digital experiences that bridge user needs and business goals."
    >
      {/* Story section */}
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
        <div className="lg:col-span-7 space-y-6">
          <p className="reveal text-body-lg text-secondary leading-relaxed">
            My background combines design thinking with technical knowledge, allowing me to bridge the gap between user needs and product development. I believe the best digital products emerge when design and engineering work as one discipline.
          </p>
          <p className="reveal reveal-delay-1 text-body-md text-secondary leading-relaxed">
            I enjoy solving complex problems, improving user experiences, and transforming ideas into products people genuinely enjoy using. Whether it's conducting user research, designing interaction flows, or building prototypes — I focus on delivering outcomes that matter.
          </p>
          <p className="reveal reveal-delay-2 text-body-md text-secondary leading-relaxed">
            Currently pursuing a Software Engineering degree while working on real product design projects, I'm uniquely positioned to understand both sides of the product development process.
          </p>

          <div className="reveal reveal-delay-3 flex flex-wrap gap-3 pt-4">
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
          <div className="reveal bg-white border border-border rounded-2xl p-8 space-y-6 sticky top-28">
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
              {['User needs always come first', 'Aesthetics serve functionality', 'Every pixel has a purpose', 'Design and code are inseparable'].map((item) => (
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
      </div>

      {/* Values section */}
      <div className="mb-24">
        <div className="reveal mb-10">
          <span className="text-label font-display font-600 text-accent-blue uppercase tracking-wider">
            What I Stand For
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className={`reveal reveal-delay-${i + 1} bg-white border border-border rounded-2xl p-8 card-hover`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center mb-5">
                <Icon size={24} className="text-accent" />
              </div>
              <h3 className="font-display font-600 text-display-sm text-primary mb-3">{title}</h3>
              <p className="text-body-sm text-secondary leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Journey timeline */}
      <div>
        <div className="reveal mb-10">
          <span className="text-label font-display font-600 text-accent uppercase tracking-wider">
            My Journey
          </span>
        </div>
        <div className="space-y-0">
          {timeline.map(({ year, title, description }, i) => (
            <div key={year} className={`reveal reveal-delay-${i + 1} flex gap-8`}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-accent-light border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-label font-display font-600 text-accent">{year}</span>
                </div>
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
              </div>
              <div className="pb-10">
                <h3 className="font-display font-600 text-lg text-primary mb-2">{title}</h3>
                <p className="text-body-sm text-secondary leading-relaxed max-w-lg">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
