import PageLayout from '../components/PageLayout';
import { useReveal } from '../hooks/useReveal';
import { Palette, Code2, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Design',
    icon: Palette,
    accent: 'accent',
    description: 'Creating intuitive, visually compelling interfaces grounded in user research and design systems thinking.',
    skills: [
      { name: 'UI Design', level: 95 },
      { name: 'UX Design', level: 90 },
      { name: 'User Research', level: 85 },
      { name: 'Wireframing', level: 92 },
      { name: 'Prototyping', level: 88 },
      { name: 'Design Systems', level: 82 },
    ],
  },
  {
    title: 'Development',
    icon: Code2,
    accent: 'accent-blue',
    description: 'Building functional prototypes and production-ready code with modern frameworks and clean architecture.',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 92 },
      { name: 'JavaScript', level: 85 },
      { name: 'Flutter', level: 78 },
      { name: 'Dart', level: 75 },
      { name: 'Python', level: 70 },
      { name: 'C++', level: 65 },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    accent: 'primary',
    description: 'Leveraging industry-standard tools for efficient design, collaboration, and version control workflows.',
    skills: [
      { name: 'Figma', level: 95 },
      { name: 'Framer', level: 75 },
      { name: 'GitHub', level: 82 },
      { name: 'VS Code', level: 88 },
    ],
  },
];

const accentMap: Record<string, { bg: string; border: string; text: string; bar: string }> = {
  accent: { bg: 'bg-accent-light', border: 'border-accent/20', text: 'text-accent', bar: 'bg-accent' },
  'accent-blue': { bg: 'bg-accent-blue-light', border: 'border-accent-blue/20', text: 'text-accent-blue', bar: 'bg-accent-blue' },
  primary: { bg: 'bg-bg-alt', border: 'border-border', text: 'text-primary', bar: 'bg-primary' },
};

export default function SkillsPage() {
  const ref = useReveal();

  return (
    <PageLayout
      label="Skills"
      title="Tools & technologies I work with"
      subtitle="A blend of design craft and technical capability that lets me move from concept to implementation seamlessly."
    >
      <div ref={ref} className="space-y-8">
        {skillCategories.map((category, i) => {
          const colors = accentMap[category.accent];
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className={`reveal reveal-delay-${i + 1} bg-white border border-border rounded-2xl p-8 md:p-10`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-10 h-10 ${colors.bg} border ${colors.border} rounded-xl flex items-center justify-center`}>
                  <Icon size={20} className={colors.text} />
                </div>
                <h3 className={`font-display font-600 text-display-sm ${colors.text}`}>
                  {category.title}
                </h3>
              </div>
              <p className="text-body-sm text-secondary mb-8 max-w-xl">{category.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm font-medium text-primary">{skill.name}</span>
                      <span className="text-label text-secondary">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors.bar} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
