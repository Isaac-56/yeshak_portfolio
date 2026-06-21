import { useReveal } from '../hooks/useReveal';

const skillCategories = [
  {
    title: 'Design',
    accent: 'accent',
    skills: ['UI Design', 'UX Design', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    title: 'Development',
    accent: 'accent-blue',
    skills: ['HTML', 'CSS', 'JavaScript', 'Flutter', 'Dart', 'Python', 'C++'],
  },
  {
    title: 'Tools',
    accent: 'primary',
    skills: ['Figma', 'Framer', 'GitHub', 'VS Code'],
  },
];

const accentMap: Record<string, { bg: string; border: string; text: string }> = {
  accent: { bg: 'bg-accent-light', border: 'border-accent/20', text: 'text-accent' },
  'accent-blue': { bg: 'bg-accent-blue-light', border: 'border-accent-blue/20', text: 'text-accent-blue' },
  primary: { bg: 'bg-bg-alt', border: 'border-border', text: 'text-primary' },
};

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" ref={ref} className="py-30 section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="reveal mb-4">
          <span className="text-label font-display font-600 text-accent uppercase tracking-wider">
            Skills
          </span>
        </div>
        <h2 className="reveal reveal-delay-1 font-display font-700 text-display-md text-primary mb-16 text-balance">
          Tools & technologies I work with
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => {
            const colors = accentMap[category.accent];
            return (
              <div
                key={category.title}
                className={`reveal reveal-delay-${i + 1} bg-white border border-border rounded-2xl p-8 card-hover`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-2 h-2 rounded-full bg-${category.accent}`} />
                  <h3 className={`font-display font-600 text-display-sm ${colors.text}`}>
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`${colors.bg} ${colors.border} border ${colors.text} text-body-sm font-medium px-3.5 py-2 rounded-lg`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
