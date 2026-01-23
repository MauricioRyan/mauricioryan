import { Heart, Code } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-card/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold text-gradient">MR</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">Mauricio Ryan</span>
          </div>

          {/* Made with */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-primary animate-pulse" />
            <span>y</span>
            <Code className="w-4 h-4 text-primary" />
            <span>usando</span>
            <a
              href="https://lovable.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Lovable
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mauricio Ryan. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
