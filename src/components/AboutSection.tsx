import { useEffect, useRef, useState } from 'react';
import { Code, Database, Cloud, Users, Award, Camera } from 'lucide-react';

const stats = [
  { value: 35, suffix: '+', label: 'Años de Experiencia', icon: Award },
  { value: 30, suffix: '+', label: 'Años Formando', icon: Users },
  { value: 20, suffix: '+', label: 'Años como DBA', icon: Database },
  { value: 10, suffix: '+', label: 'Años en Cloud', icon: Cloud },
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
    <span ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient">
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
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-display text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Acerca de mí</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4">
            Conoce a <span className="text-gradient">Mauricio</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Más de tres décadas dedicadas a la tecnología, la formación y la exploración de nuevas fronteras como la IA.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-10 sm:mb-16">
          {/* Left - Description */}
          <div className={`space-y-4 sm:space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="gradient-border p-4 sm:p-6 rounded-xl bg-card">
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                Curioso impulsivo, siempre buscando cosas nuevas para aprender y compartir. 
                Me gusta descubrir nuevas herramientas tecnológicas e investigar como usarlas 
                y conseguir resultados que sorprendan y me hagan sentir útil y especial.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: Database, label: 'DBA Expert', desc: 'Oracle & PostgreSQL' },
                { icon: Cloud, label: 'Arquitecto Cloud', desc: 'AWS & Infraestructura' },
                { icon: Users, label: 'Formador', desc: 'Instructor & Divulgador' },
                { icon: Code, label: 'Explorador IA', desc: 'Investigación & Aplicación' },
                { icon: Camera, label: 'Fotógrafo', desc: 'Disfrutando hacer fotos', href: 'https://photos.google.com/share/AF1QipOEVR6o9yx8fp-ZBhy3ZJdNGTapOd0AlxuNZI2lU7O36GM0_40tImgZ5Q4e4ewz1g?key=Z25QeVdCeWcyRE0zR3Q2ZTI2SFRCV1BKTkd4dUFn' },
              ].map((item, index) => (
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass p-3 sm:p-4 rounded-xl active:scale-95 sm:hover:scale-105 transition-all duration-300 cursor-pointer group touch-manipulation`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-sm sm:text-base">{item.label}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className={`glass p-3 sm:p-4 rounded-xl active:scale-95 sm:hover:scale-105 transition-all duration-300 cursor-default group touch-manipulation`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-sm sm:text-base">{item.label}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className={`grid grid-cols-2 gap-3 sm:gap-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass p-4 sm:p-6 rounded-xl text-center active:scale-95 sm:hover:scale-105 transition-all duration-300 touch-manipulation"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-4" />
                <Counter end={stat.value} suffix={stat.suffix} />
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2">{stat.label}</p>
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
