import { Heart, Code } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 border-t border-border bg-card/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-display font-bold text-gradient">MR</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-xs sm:text-sm text-muted-foreground">Mauricio Ryan</span>
          </div>

          {/* Made with */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap justify-center">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary animate-pulse" />
            <span>y</span>
            <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span>usando</span>
            <a
              href="https://lovable.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium touch-manipulation"
            >
              Lovable
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            © {currentYear} Mauricio Ryan. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
