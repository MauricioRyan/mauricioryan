import { useEffect, useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';
import profileImg from '@/assets/mauricio-ryan.jpg';

const titles = ['Ingeniero', 'Profesor', 'Fotógrafo', 'DevOps Leader', 'DBA Expert'];

export const HeroSection = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const title = titles[currentTitle];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < title.length) {
            setDisplayText(title.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentTitle((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitle]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-primary/20 dark:from-background/80 dark:via-background/70 dark:to-background/60" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-particle-1 opacity-60" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-particle-2 opacity-40" />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary rounded-full animate-particle-2 opacity-50" />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-accent/50 rounded-full animate-float opacity-30" />
        <div className="absolute bottom-1/4 right-10 w-2 h-2 bg-primary rounded-full animate-particle-1 opacity-40" />
      </div>

      {/* Hero glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl opacity-50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-primary font-display text-sm uppercase tracking-widest mb-4 animate-fade-in">
            ¡Hola! Bienvenidos
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 animate-slide-up">
            Soy <span className="text-gradient">Mauricio</span>
            <br />
            Ryan
          </h1>

          <div className="h-12 md:h-16 mb-6">
            <p className="text-2xl md:text-4xl font-display text-muted-foreground animate-fade-in">
              {displayText}
              <span className="animate-blink text-primary">|</span>
            </p>
          </div>

          <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 animate-slide-up delay-200">
            Curioso impulsivo, siempre buscando cosas nuevas para aprender y compartir. 
            Me gusta descubrir nuevas herramientas tecnológicas e investigar como usarlas.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-8 animate-slide-up delay-300">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Mendoza, Argentina</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up delay-400">
            <Button variant="glow" size="xl" onClick={scrollToAbout}>
              Conocer Más
            </Button>
            <Button
              variant="outline-glow"
              size="xl"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contactar
            </Button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex-shrink-0 animate-scale-in">
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-30 animate-pulse-glow" />
            
            {/* Profile image container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden gradient-border">
              <img
                src={profileImg}
                alt="Mauricio Ryan"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -right-4 top-8 glass px-4 py-2 rounded-full animate-float">
              <span className="text-sm font-medium">20+ años exp</span>
            </div>
            <div className="absolute -left-4 bottom-16 glass px-4 py-2 rounded-full animate-float delay-300">
              <span className="text-sm font-medium">AWS Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};
