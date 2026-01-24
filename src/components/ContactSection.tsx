import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Video,
  Camera,
  MapPin,
  Send,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mauricio@ryan.ar',
    href: 'mailto:mauricio@ryan.com.ar',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+54 9 261 577 7799',
    href: 'https://api.whatsapp.com/send?phone=5492615777799&text=Hola,%20soy%20Mauricio%20Ryan.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/mauricioryan',
    href: 'https://www.linkedin.com/in/mauricioryan',
    color: 'from-blue-600 to-blue-500',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@mauricioryan',
    href: 'https://www.instagram.com/mauricioryan/?hl=es',
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: Video,
    label: 'Google Meet',
    value: 'Agendar reunión',
    href: 'https://calendar.app.google/8a3pVo21oz2RADfW9',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Camera,
    label: 'Google Fotos',
    value: 'Galería fotográfica',
    href: 'https://photos.google.com/share/AF1QipOEVR6o9yx8fp-ZBhy3ZJdNGTapOd0AlxuNZI2lU7O36GM0_40tImgZ5Q4e4ewz1g?key=Z25QeVdCeWcyRE0zR3Q2ZTI2SFRCV1BKTkd4dUFn',
    color: 'from-yellow-500 to-orange-500',
  },
];

const ContactCard = ({
  link,
  index,
  isVisible,
}: {
  link: typeof contactLinks[0];
  index: number;
  isVisible: boolean;
}) => {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group glass p-4 sm:p-6 rounded-xl transition-all duration-500 active:scale-95 sm:hover:scale-105 cursor-pointer touch-manipulation ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}
        >
          <link.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
            {link.label}
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{link.value}</p>
        </div>

        {/* Arrow */}
        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0" />
      </div>
    </a>
  );
};

export const ContactSection = () => {
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
      id="contact"
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/4 left-0 w-1/4 h-1/2 bg-gradient-to-r from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-display text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Contacto</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4">
            ¿Hablamos? <span className="text-gradient">Conectemos</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Siempre abierto a nuevas oportunidades, colaboraciones y conversaciones interesantes
          </p>
        </div>

        {/* Location highlight */}
        <div className={`flex items-center justify-center gap-2 mb-8 sm:mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          <span className="text-base sm:text-lg">Mendoza, Argentina 🇦🇷</span>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto mb-10 sm:mb-16">
          {contactLinks.map((link, index) => (
            <ContactCard key={link.label} link={link} index={index} isVisible={isVisible} />
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass p-6 sm:p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 sm:mb-4">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Ya sea una consultoría técnica, capacitación o colaboración,
              estaré encantado de escucharte.
            </p>
            <Button
              variant="glow"
              size="xl"
              onClick={() => window.open('mailto:mauricio@ryan.com.ar', '_blank')}
              className="w-full sm:w-auto min-h-[48px] touch-manipulation"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Enviar Mensaje
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
