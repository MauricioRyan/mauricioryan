import { useEffect, useRef, useState } from 'react';
import { Code, Database, Cloud, Camera, Users, Award } from 'lucide-react';

const stats = [
  { value: 20, suffix: '+', label: 'Años de Experiencia', icon: Award },
  { value: 26, suffix: '+', label: 'Años como Profesor', icon: Users },
  { value: 3, suffix: '', label: 'Certificaciones', icon: Award },
  { value: 100, suffix: '%', label: 'Pasión por la Tecnología', icon: Code },
];

const Counter = ({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-gradient">
      {count}
      {suffix}
    </span>
  );
};

export const AboutSection = () => {
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
      id="about"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">Acerca de mí</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Conoce a <span className="text-gradient">Mauricio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Más de dos décadas dedicadas a la tecnología, la enseñanza y la captura de momentos únicos.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Description */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="gradient-border p-6 rounded-xl bg-card">
              <p className="text-lg leading-relaxed text-foreground/90">
                Curioso impulsivo, siempre buscando cosas nuevas para aprender y compartir. 
                Me gusta descubrir nuevas herramientas tecnológicas e investigar como usarlas 
                y conseguir resultados que sorprendan y me hagan sentir útil y especial.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Database, label: 'DBA Expert', desc: 'Oracle & MongoDB' },
                { icon: Cloud, label: 'DevOps Leader', desc: 'Kubernetes & Docker' },
                { icon: Users, label: 'Profesor', desc: 'UTN Mendoza' },
                { icon: Camera, label: 'Fotógrafo', desc: 'Pasión artística' },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`glass p-4 rounded-xl hover:scale-105 transition-all duration-300 cursor-default group`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <item.icon className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass p-6 rounded-xl text-center hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <Counter end={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech marquee */}
        <div className="overflow-hidden py-8">
          <div className="flex animate-marquee whitespace-nowrap">
            {['Docker', 'Kubernetes', 'Oracle', 'MongoDB', 'AWS', 'Cloud Native', 'PostgreSQL', 'Linux', 'DevOps', 'SRE', 'Docker', 'Kubernetes', 'Oracle', 'MongoDB', 'AWS', 'Cloud Native'].map((tech, i) => (
              <span
                key={i}
                className="mx-8 text-2xl font-display font-bold text-muted-foreground/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
