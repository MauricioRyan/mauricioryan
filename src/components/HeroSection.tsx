import { useEffect, useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';
import profileImg from '@/assets/mauricio-ryan.jpg';

const titles = ['Ingeniero', 'Formador', 'Arquitecto Cloud', 'DevOps Leader', 'DBA Expert', 'Explorador de IA', 'Aficionado a la Fotografía'];

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
      {/* Background Image - Hidden in light mode, visible in dark mode */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-100 transition-opacity duration-500"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/60" />
      </div>
      
      {/* Light mode background - Vibrant gradient */}
      <div className="absolute inset-0 dark:opacity-0 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-primary/10" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl" />
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20 pt-20 sm:pt-0">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-primary font-display text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 animate-fade-in">
            ¡Hola! Bienvenidos
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-3 sm:mb-4 animate-slide-up">
            Soy <span className="text-gradient">Mauricio</span>
            <br />
            Ryan
          </h1>

          <div className="h-10 sm:h-12 md:h-16 mb-4 sm:mb-6">
            <p className="text-xl sm:text-2xl md:text-4xl font-display text-muted-foreground animate-fade-in">
              {displayText}
              <span className="animate-blink text-primary">|</span>
            </p>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8 animate-slide-up delay-200 px-2 sm:px-0">
            Curioso impulsivo, siempre buscando cosas nuevas para aprender y compartir. 
            Me gusta descubrir nuevas herramientas tecnológicas e investigar como usarlas.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-6 sm:mb-8 animate-slide-up delay-300">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm sm:text-base">Mendoza, Argentina</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 animate-slide-up delay-400 px-4 sm:px-0">
            <Button variant="glow" size="xl" onClick={scrollToAbout} className="w-full sm:w-auto min-h-[48px] touch-manipulation">
              Conocer Más
            </Button>
            <Button
              variant="outline-glow"
              size="xl"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto min-h-[48px] touch-manipulation"
            >
              Contactar
            </Button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex-shrink-0 animate-scale-in order-first lg:order-last">
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-primary to-accent rounded-full blur-xl sm:blur-2xl opacity-30 animate-pulse-glow" />
            
            {/* Profile image container */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden gradient-border">
              <img
                src={profileImg}
                alt="Mauricio Ryan"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badges - Hidden on very small screens */}
            <div className="hidden sm:block absolute -right-2 sm:-right-4 top-4 sm:top-8 glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full animate-float">
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">35+ años exp</span>
            </div>
            <div className="hidden sm:block absolute -left-2 sm:-left-4 bottom-12 sm:bottom-16 glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full animate-float delay-300">
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">AWS Academy Graduate</span>
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
