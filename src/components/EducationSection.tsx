import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';

interface Education {
  id: number;
  title: string;
  institution: string;
  period: string;
  description: string;
  type: 'degree' | 'certification';
}

const education: Education[] = [
  {
    id: 1,
    title: 'Ingeniero en Sistemas de Información',
    institution: 'Universidad Tecnológica Nacional',
    period: '1985 - 1991',
    description: 'Disciplina académica: Ingeniería informática',
    type: 'degree',
  },
  {
    id: 2,
    title: 'Licenciatura en Sistemas',
    institution: 'Universidad Tecnológica Nacional',
    period: '1985 - 1990',
    description: 'Disciplina académica: Sistemas de información de gestión',
    type: 'degree',
  },
  {
    id: 3,
    title: 'AWS Academy Graduate',
    institution: 'Amazon Web Services (AWS)',
    period: '2021',
    description: 'AWS Academy Cloud Foundations',
    type: 'certification',
  },
  {
    id: 4,
    title: 'Oracle Professional Certified',
    institution: 'Oracle Corporation',
    period: '2002',
    description: 'Certificación profesional en administración de bases de datos Oracle',
    type: 'certification',
  },
];

const EducationCard = ({ item, index, isVisible }: { item: Education; index: number; isVisible: boolean }) => {
  const Icon = item.type === 'degree' ? GraduationCap : Award;

  return (
    <div
      className={`group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="glass p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 h-full gradient-border">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>

        {/* Type badge */}
        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${
          item.type === 'degree'
            ? 'bg-chart-3/20 text-chart-3'
            : 'bg-accent/20 text-accent'
        }`}>
          {item.type === 'degree' ? 'Título Universitario' : 'Certificación'}
        </span>

        {/* Content */}
        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        <p className="text-primary font-medium mb-2">{item.institution}</p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          {item.period}
        </div>

        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
    </div>
  );
};

export const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const degrees = education.filter((e) => e.type === 'degree');
  const certifications = education.filter((e) => e.type === 'certification');

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-24 md:py-32 relative overflow-hidden bg-secondary/30"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-display text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Formación</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Formación <span className="text-gradient">Académica</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Títulos universitarios y certificaciones profesionales
          </p>
        </div>

        {/* Degrees */}
        <div className="mb-12">
          <div className={`flex items-center gap-3 mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <GraduationCap className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-display font-bold">Títulos Universitarios</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {degrees.map((item, index) => (
              <EducationCard key={item.id} item={item} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className={`flex items-center gap-3 mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Award className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-display font-bold">Certificaciones</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((item, index) => (
              <EducationCard key={item.id} item={item} index={index + degrees.length} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
