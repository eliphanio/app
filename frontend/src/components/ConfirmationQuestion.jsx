import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function ConfirmationQuestion({ userName, onConfirm }) {
  const [isVisible, setIsVisible] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Make the "Non" button run away when mouse gets close
  const handleNoButtonHover = () => {
    setAttempts(prev => prev + 1);
    
    // Random position within safe bounds
    const maxX = 400;
    const maxY = 200;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setNoButtonPosition({ x: newX, y: newY });
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Main content container with animation */}
      <div 
        className={`transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Glass card for question */}
        <div className="relative">
          {/* Ambient glow */}
          <div className="absolute -inset-1 bg-accent/10 blur-2xl rounded-3xl" />
          
          <div className="relative bg-card/70 backdrop-blur-xl border border-border/50 rounded-3xl p-8 sm:p-12 lg:p-16 subtle-shadow">
            {/* Heart icon */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 elegant-glow">
                <Heart className="w-9 h-9 text-primary" strokeWidth={1.5} />
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-6 tracking-wide">
                {userName},
              </h2>
              
              <p className="text-lg sm:text-xl text-foreground/90 font-light leading-relaxed">
                Es-tu prêt(e) à découvrir ce qui t'attend ici ?
              </p>
            </div>

            {/* Buttons container - relative positioning for the fleeing button */}
            <div className="relative min-h-[120px] flex items-center justify-center">
              <div className="flex gap-4 sm:gap-6">
                {/* Yes button - static */}
                <Button
                  onClick={onConfirm}
                  className="h-14 px-8 sm:px-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium transition-smooth elegant-glow"
                >
                  Oui
                </Button>

                {/* No button - runs away */}
                <div 
                  className="relative"
                  style={{
                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Button
                    onMouseEnter={handleNoButtonHover}
                    onTouchStart={handleNoButtonHover}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNoButtonHover();
                    }}
                    variant="outline"
                    className="h-14 px-8 sm:px-12 border-2 border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground text-lg font-medium transition-smooth"
                  >
                    Non
                  </Button>
                </div>
              </div>
            </div>

            {/* Playful hint after a few attempts */}
            {attempts > 2 && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-center text-sm text-muted-foreground/60 italic">
                  {attempts > 5 
                    ? "Tu sais qu'il n'y a qu'une seule bonne réponse... 😊"
                    : "Le bouton 'Non' semble être timide..."}
                </p>
              </div>
            )}

            {/* Decorative separator */}
            <div className="mt-12 flex justify-center">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
