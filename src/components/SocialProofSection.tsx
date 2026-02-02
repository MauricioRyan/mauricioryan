import { useEffect, useRef, useState } from 'react';
import { Building2, GraduationCap, Users, Quote, Star } from 'lucide-react';

const clients = [
  {
    name: 'Poder Judicial de Mendoza',
    icon: Building2,
  },
  {
    name: 'Sitrack.com',
    icon: Building2,
  },
  {
    name: 'UTN Mendoza',
    icon: GraduationCap,
  },
];

const testimonials = [
  {
    quote: 'Próximamente',
    author: 'Tu testimonio aquí',
    role: 'Comparte tu experiencia',
    placeholder: true,
  },
  {
    quote: 'Próximamente',
    author: 'Tu testimonio aquí',
    role: 'Comparte tu experiencia',
    placeholder: true,
  },
];

const stats = [
  { value: '2', label: 'Generaciones de estudiantes' },
  { value: '100+', label: 'Profesionales capacitados' },
];

export const SocialProofSection = () => {
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
      id="social-proof"
      className="py-24 md:py-32 relative overflow-hidden bg-secondary/30"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-display text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
            Trayectoria
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Han Confiado <span className="text-gradient">en Mí</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Organizaciones e instituciones donde he dejado huella
          </p>
        </div>

        {/* Clients */}
        <div className={`flex flex-wrap justify-center items-center gap-6 sm:gap-10 mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {clients.map((client, index) => (
            <div
              key={client.name}
              className="glass px-6 py-4 rounded-xl flex items-center gap-3 hover:scale-105 transition-transform"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <client.icon className="w-6 h-6 text-primary" />
              <span className="font-medium text-sm sm:text-base whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`flex flex-wrap justify-center gap-8 sm:gap-16 mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className={`grid md:grid-cols-2 gap-6 max-w-3xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`glass p-6 rounded-xl relative ${testimonial.placeholder ? 'border border-dashed border-muted-foreground/30' : ''}`}
            >
              <Quote className="w-8 h-8 text-primary/30 absolute top-4 right-4" />
              
              {testimonial.placeholder ? (
                <div className="text-center py-4">
                  <Star className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground italic mb-4">{testimonial.quote}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
