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
    <div className="w-full max-w-3xl">
      {/* Logout button - top right */}
      <div className="flex justify-end mb-6">
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground transition-smooth"
        >
          <LogOut className="w-4 h-4 mr-2" />
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
        {/* Glass card for revealed content */}
        <div className="relative">
          {/* Ambient glow */}
          <div className="absolute -inset-1 bg-accent/10 blur-2xl rounded-3xl" />
          
          <div className="relative bg-card/70 backdrop-blur-xl border border-border/50 rounded-3xl p-8 sm:p-12 lg:p-16 subtle-shadow">
            {/* Welcome header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 elegant-glow">
                <Heart className="w-9 h-9 text-primary" strokeWidth={1.5} />
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-4 tracking-wide">
                Bienvenue, {userName}
              </h1>
              
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
            </div>

            {/* Personal message */}
            <div className="space-y-6 text-foreground/90 leading-relaxed">
              <p className="text-lg sm:text-xl font-light text-center">
                Cet espace n'existe que pour toi.
              </p>
              
              <div className="space-y-4 text-base sm:text-lg font-light max-w-2xl mx-auto">
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
                
                <p className="pt-4 text-center text-muted-foreground italic">
                  Ce que tu lis ici, personne d'autre ne le lira jamais.
                </p>
                
                <p className="pt-6 text-center">
                  C'est rare, précieux, et terriblement fragile.
                </p>
                
                <p className="pt-4 text-center font-medium text-primary">
                  Exactement comme nous.
                </p>
              </div>
            </div>

            {/* Decorative separator */}
            <div className="mt-12 flex justify-center">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* Footer note */}
            <p className="mt-8 text-center text-sm text-muted-foreground/60 font-light">
              Créé avec intention, pour {userName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}