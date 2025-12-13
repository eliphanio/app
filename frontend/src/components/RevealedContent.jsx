import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Heart } from 'lucide-react';

export default function RevealedContent({ userName }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="w-full max-w-3xl px-4">
      {/* Logout button - top right */}
      <div className="flex justify-end mb-4 sm:mb-6">
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary transition-smooth text-xs sm:text-sm"
        >
          <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Se déconnecter
        </Button>
      </div>

      {/* Main content container with animation */}
      <div 
        className={`transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Minimal card for revealed content */}
        <div className="relative">
          {/* Subtle rose glow */}
          <div className="absolute -inset-1 bg-accent/8 blur-2xl rounded-3xl" />
          
          <div className="relative bg-card border border-border rounded-3xl p-6 sm:p-10 lg:p-14 subtle-shadow">
            {/* Welcome header */}
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary mb-5 sm:mb-6">
                <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-primary" strokeWidth={1.5} />
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-3 sm:mb-4 tracking-wide">
                Bienvenue, {userName}
              </h1>
              
              <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto" />
            </div>

            {/* Personal message */}
            <div className="space-y-5 sm:space-y-6 text-foreground/85 leading-relaxed">
              <p className="text-base sm:text-lg lg:text-xl font-light text-center">
                Cet espace n'existe que pour toi.
              </p>
              
              <div className="space-y-3.5 sm:space-y-4 text-sm sm:text-base lg:text-lg font-light max-w-2xl mx-auto">
                <p>
                  Dans un monde où tout est partagé, commenté, éphémère, j'ai voulu créer quelque chose
                  qui n'appartient qu'à un seul regard : le tien.
                </p>
                
                <p>
                  Pas de notifications. Pas d'algorithme. Pas de bruit.
                </p>
                
                <p>
                  Juste un moment suspendu, une attention pure, un endroit où les mots peuvent exister
                  sans être dilués dans le flux constant des écrans.
                </p>
                
                <p className="pt-3 sm:pt-4 text-center text-muted-foreground italic text-xs sm:text-sm">
                  Ce que tu lis ici, personne d'autre ne le lira jamais.
                </p>
                
                <p className="pt-4 sm:pt-6 text-center">
                  C'est rare, précieux, et terriblement fragile.
                </p>
                
                <p className="pt-3 sm:pt-4 text-center font-medium text-primary">
                  Exactement comme nous.
                </p>
              </div>
            </div>

            {/* Decorative separator */}
            <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
              <div className="w-20 sm:w-32 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>

            {/* Footer note */}
            <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-muted-foreground/60 font-light">
              Créé avec intention, pour {userName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}