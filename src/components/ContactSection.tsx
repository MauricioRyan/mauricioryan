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
    label: 'Zoom',
    value: 'Reunión virtual',
    href: 'https://utn.zoom.us/my/mauriciorya',
    color: 'from-blue-500 to-cyan-500',
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
      className={`group glass p-6 rounded-xl transition-all duration-500 hover:scale-105 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          <link.icon className="w-6 h-6 text-foreground" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {link.label}
          </h4>
          <p className="text-sm text-muted-foreground">{link.value}</p>
        </div>

        {/* Arrow */}
        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
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
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/4 left-0 w-1/4 h-1/2 bg-gradient-to-r from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-mono text-sm mb-4">&lt;Contacto /&gt;</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            ¿Hablamos? <span className="text-gradient">Conectemos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Siempre abierto a nuevas oportunidades, colaboraciones y conversaciones interesantes
          </p>
        </div>

        {/* Location highlight */}
        <div className={`flex items-center justify-center gap-2 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-lg">Mendoza, Argentina 🇦🇷</span>
        </div>

        {/* Contact grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {contactLinks.map((link, index) => (
            <ContactCard key={link.label} link={link} index={index} isVisible={isVisible} />
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-bold mb-4">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-muted-foreground mb-6">
              Ya sea una consultoría técnica, capacitación o colaboración,
              estaré encantado de escucharte.
            </p>
            <Button
              variant="glow"
              size="xl"
              onClick={() => window.open('mailto:mauricio@ryan.com.ar', '_blank')}
            >
              <Send className="w-5 h-5 mr-2" />
              Enviar Mensaje
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
