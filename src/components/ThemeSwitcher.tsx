import { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export type Theme = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset';

interface ThemeConfig {
  name: string;
  icon: React.ReactNode;
  description: string;
  preview: string;
}

const themes: Record<Theme, ThemeConfig> = {
  light: {
    name: 'Claro',
    icon: <Sun className="w-4 h-4" />,
    description: 'Tema luminoso y profesional',
    preview: 'bg-gradient-to-r from-slate-100 to-orange-100',
  },
  dark: {
    name: 'Oscuro',
    icon: <Moon className="w-4 h-4" />,
    description: 'Tema elegante para desarrolladores',
    preview: 'bg-gradient-to-r from-slate-900 to-orange-900',
  },
  ocean: {
    name: 'Océano',
    icon: <Sparkles className="w-4 h-4" />,
    description: 'Azules profundos y cyan vibrante',
    preview: 'bg-gradient-to-r from-blue-900 to-cyan-500',
  },
  forest: {
    name: 'Bosque',
    icon: <Sparkles className="w-4 h-4" />,
    description: 'Verdes naturales y terrosos',
    preview: 'bg-gradient-to-r from-emerald-900 to-lime-500',
  },
  sunset: {
    name: 'Atardecer',
    icon: <Sparkles className="w-4 h-4" />,
    description: 'Cálidos tonos púrpura y rosa',
    preview: 'bg-gradient-to-r from-purple-900 to-pink-500',
  },
};

export const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('light');
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'theme-ocean', 'theme-forest', 'theme-sunset');
    
    // Apply the new theme
    switch (theme) {
      case 'light':
        root.classList.add('light');
        break;
      case 'dark':
        // Dark is the default (no class needed, but we add it for clarity)
        root.classList.add('dark');
        break;
      case 'ocean':
        root.classList.add('theme-ocean');
        break;
      case 'forest':
        root.classList.add('theme-forest');
        break;
      case 'sunset':
        root.classList.add('theme-sunset');
        break;
    }
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Elige un tema
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(themes) as Theme[]).map((theme) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => handleThemeChange(theme)}
            className={`flex items-center gap-3 cursor-pointer ${
              currentTheme === theme ? 'bg-primary/10' : ''
            }`}
          >
            <div className={`w-6 h-6 rounded-full ${themes[theme].preview} ring-2 ring-border`} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {themes[theme].icon}
                <span className="font-medium">{themes[theme].name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{themes[theme].description}</p>
            </div>
            {currentTheme === theme && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
