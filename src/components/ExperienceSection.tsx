import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description?: string;
  current: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Jefe de Equipo de DevOps',
    company: 'Poder Judicial de Mendoza',
    period: '2004 - Actualmente',
    location: 'Mendoza, Argentina',
    description: 'Liderando el equipo de DevOps, implementando prácticas de CI/CD y automatización.',
    current: true,
  },
  {
    id: 2,
    title: 'SRE (Site Reliability Engineer)',
    company: 'Sitrack.com',
    period: 'Oct. 2018 - Actualidad',
    location: 'Mendoza, Argentina',
    description: 'Garantizando la disponibilidad y rendimiento de los sistemas de tracking.',
    current: true,
  },
  {
    id: 3,
    title: 'Profesor - Computación en la Nube',
    company: 'UTN - Facultad Regional Mendoza',
    period: '2018 - Actualidad',
    location: 'Mendoza, Argentina',
    description: 'Enseñando las últimas tecnologías cloud y arquitecturas modernas.',
    current: true,
  },
  {
    id: 4,
    title: 'Profesor - Bases de Datos Avanzada',
    company: 'UTN - Facultad Regional Mendoza',
    period: '2002 - Actualidad',
    location: 'Mendoza, Argentina',
    description: 'Formando nuevas generaciones de expertos en bases de datos.',
    current: true,
  },
  {
    id: 5,
    title: 'Jefe de Departamento Bases de Datos',
    company: 'Poder Judicial de Mendoza',
    period: 'Abr. 2011 - Dic. 2019',
    location: 'Mendoza, Argentina',
    description: 'Gestión de bases de datos y servidores de aplicaciones durante 8 años.',
    current: false,
  },
  {
    id: 6,
    title: 'DBA (Database Administrator)',
    company: 'Poder Judicial de Mendoza',
    period: 'Dic. 2004 - Abr. 2011',
    location: 'Mendoza, Argentina',
    description: 'Administración y optimización de bases de datos Oracle.',
    current: false,
  },
  {
    id: 7,
    title: 'Profesor - Programación Avanzada',
    company: 'UTN - Facultad Regional Mendoza',
    period: '1998 - Actualidad',
    location: 'Mendoza, Argentina',
    description: 'JTP cátedra de Programación Avanzada.',
    current: true,
  },
];

const TimelineItem = ({ exp, index, isVisible }: { exp: Experience; index: number; isVisible: boolean }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} mb-8 lg:mb-0`}>
      {/* Content */}
      <div
        className={`w-full lg:w-5/12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div
          className={`glass p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 group cursor-default ${
            exp.current ? 'gradient-border' : ''
          }`}
        >
          {/* Current badge */}
          {exp.current && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-3">
              Actualmente
            </span>
          )}

          <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
            {exp.title}
          </h3>

          <p className="text-primary font-medium mb-2">{exp.company}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {exp.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {exp.location}
            </span>
          </div>

          {exp.description && (
            <p className="text-sm text-muted-foreground">{exp.description}</p>
          )}
        </div>
      </div>

      {/* Timeline dot - hidden on mobile */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10 group-hover:scale-150 transition-transform">
        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-25" />
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
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

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-mono text-sm mb-4">&lt;Experiencia /&gt;</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Trayectoria <span className="text-gradient">Profesional</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Más de 20 años de experiencia en el sector público y privado
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

          {/* Timeline items */}
          <div className="space-y-8 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="lg:w-1/2" />
                <TimelineItem exp={exp} index={index} isVisible={isVisible} />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { label: 'Años en Poder Judicial', value: '20+' },
            { label: 'Años como Profesor', value: '26+' },
            { label: 'Roles Actuales', value: '5' },
            { label: 'Instituciones', value: '3' },
          ].map((stat) => (
            <div key={stat.label} className="glass p-6 rounded-xl text-center">
              <p className="text-3xl font-display font-bold text-gradient mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
