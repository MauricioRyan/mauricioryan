import { useEffect, useRef, useState } from 'react';
import { Cloud, Users, Compass, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Cloud,
    title: 'Consultoría Cloud & DevOps',
    description: 'Optimizo tu infraestructura para mayor eficiencia y escalabilidad',
    whatsappMessage: 'Hola Mauricio, me interesa saber más sobre tu servicio de Consultoría Cloud & DevOps.',
  },
  {
    icon: Users,
    title: 'Capacitación Corporativa',
    description: 'Entreno equipos en tecnologías cloud, bases de datos e IA',
    whatsappMessage: 'Hola Mauricio, me interesa saber más sobre tu servicio de Capacitación Corporativa.',
  },
  {
    icon: Compass,
    title: 'Mentoría Profesional',
    description: 'Acompaño tu crecimiento técnico con 35+ años de experiencia',
    whatsappMessage: 'Hola Mauricio, me interesa saber más sobre tu servicio de Mentoría Profesional.',
  },
];

const ServiceCard = ({
  service,
  index,
  isVisible,
}: {
  service: typeof services[0];
  index: number;
  isVisible: boolean;
}) => {
  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?phone=5492615777799&text=${encodeURIComponent(service.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`group glass p-6 sm:p-8 rounded-2xl transition-all duration-700 hover:scale-[1.02] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
      </div>

      {/* Content */}
      <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        {service.description}
      </p>

      {/* CTA */}
      <Button
        variant="outline"
        onClick={handleWhatsApp}
        className="w-full group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
      >
        <MessageCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
        Consultar
      </Button>
    </div>
  );
};

export const ServicesSection = () => {
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
      id="services"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-display text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
            Servicios
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            ¿Cómo Puedo <span className="text-gradient">Ayudarte</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Servicios especializados para impulsar tu infraestructura y tu carrera profesional
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
