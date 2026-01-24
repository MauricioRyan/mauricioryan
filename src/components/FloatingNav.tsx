import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from './ThemeSwitcher';

const navItems = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Educación', href: '#education' },
  { label: 'Contacto', href: '#contact' },
];

export const FloatingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass rounded-full px-6 py-3 shadow-lg'
            : 'bg-transparent px-6 py-4'
        }`}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="text-xl font-display font-bold text-gradient"
          >
            MR
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme Switcher */}
          <div className="hidden md:flex">
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={`text-2xl font-display font-medium text-foreground hover:text-primary transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};
