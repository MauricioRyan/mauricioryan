import { useEffect, useRef, useState } from 'react';
import { Gauge, Code, Server, BookOpen, Users } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: typeof Code;
  color: string;
}

const skills: Skill[] = [
  { name: 'DBA Oracle & PostgreSQL', level: 100, icon: Code, color: 'from-chart-2 to-primary' },
  { name: 'Formación & Divulgación', level: 100, icon: BookOpen, color: 'from-chart-3 to-chart-4' },
  { name: 'Arquitectura Cloud', level: 90, icon: Server, color: 'from-primary to-accent' },
  { name: 'DevOps & SRE', level: 90, icon: Server, color: 'from-accent to-chart-3' },
  { name: 'Inteligencia Artificial', level: 75, icon: Users, color: 'from-chart-4 to-chart-5' },
];

const technologies: { name: string; level: number; logo: string }[] = [
  { name: 'Oracle', level: 95, logo: '🔮' },
  { name: 'PostgreSQL', level: 90, logo: '🐘' },
  { name: 'AWS', level: 85, logo: '☁️' },
  { name: 'Docker', level: 90, logo: '🐳' },
  { name: 'Kubernetes', level: 75, logo: '☸️' },
  { name: 'IA/ML', level: 70, logo: '🤖' },
];

const SkillBar = ({ skill, index, isVisible }: { skill: Skill; index: number; isVisible: boolean }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setWidth(skill.level);
      }, index * 150);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, skill.level, index]);

  return (
    <div className="group touch-manipulation">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors">
            <skill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <span className="font-medium text-sm sm:text-base">{skill.name}</span>
        </div>
        <span className="text-xs sm:text-sm text-muted-foreground font-mono">{skill.level}%</span>
      </div>
      <div className="h-2 sm:h-2.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const TechCard = ({ tech, index, isVisible }: { tech: typeof technologies[0]; index: number; isVisible: boolean }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setAnimatedLevel(tech.level);
      }, index * 100);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, tech.level, index]);

  return (
    <div className="glass p-4 sm:p-6 rounded-xl active:scale-95 sm:hover:scale-105 transition-all duration-300 group cursor-default touch-manipulation">
      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{tech.logo}</div>
      <h4 className="font-semibold text-sm sm:text-base mb-2">{tech.name}</h4>
      
      {/* Circular progress */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            className="stroke-secondary"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            className="stroke-primary"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 36}`}
            strokeDashoffset={`${2 * Math.PI * 36 * (1 - animatedLevel / 100)}`}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm sm:text-lg font-bold font-mono">{animatedLevel}%</span>
        </div>
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden bg-secondary/30"
    >
      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-display text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Habilidades</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4">
            Skills & <span className="text-gradient">Tecnologías</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Competencias desarrolladas a lo largo de más de 35 años de carrera profesional
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Skills bars */}
          <div className={`space-y-4 sm:space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h3 className="text-xl sm:text-2xl font-display font-bold">Competencias</h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} isVisible={isVisible} />
              ))}
            </div>
          </div>

          {/* Technologies grid */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <Code className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h3 className="text-xl sm:text-2xl font-display font-bold">Tecnologías</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {technologies.map((tech, index) => (
                <TechCard key={tech.name} tech={tech} index={index} isVisible={isVisible} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
