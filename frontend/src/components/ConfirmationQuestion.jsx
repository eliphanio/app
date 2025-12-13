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
    <div className="w-full max-w-2xl px-4">
      {/* Main content container with animation */}
      <div 
        className={`transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Minimal card for question */}
        <div className="relative">
          {/* Subtle rose glow */}
          <div className="absolute -inset-1 bg-accent/8 blur-2xl rounded-3xl" />
          
          <div className="relative bg-card border border-border rounded-3xl p-6 sm:p-10 lg:p-14 subtle-shadow">
            {/* Heart icon */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary">
                <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-primary" strokeWidth={1.5} />
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 sm:mb-6 tracking-wide">
                {userName},
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-foreground/80 font-light leading-relaxed px-2">
                Es-tu prêt(e) à découvrir ce qui t'attend ici ?
              </p>
            </div>

            {/* Buttons container - relative positioning for the fleeing button */}
            <div className="relative min-h-[100px] sm:min-h-[120px] flex items-center justify-center">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
                {/* Yes button - static */}
                <Button
                  onClick={onConfirm}
                  className="h-12 sm:h-14 px-8 sm:px-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg font-medium transition-smooth rounded-xl w-full sm:w-auto"
                >
                  Oui
                </Button>

                {/* No button - runs away */}
                <div 
                  className="relative w-full sm:w-auto"
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
                    className="h-12 sm:h-14 px-8 sm:px-12 border-2 border-primary/30 text-primary hover:border-primary/50 hover:text-primary/90 text-base sm:text-lg font-medium transition-smooth rounded-xl w-full sm:w-auto"
                  >
                    Non
                  </Button>
                </div>
              </div>
            </div>

            {/* Playful hint after a few attempts */}
            {attempts > 2 && (
              <div className="mt-6 sm:mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-center text-xs sm:text-sm text-muted-foreground/70 italic px-4">
                  {attempts > 5 
                    ? "Tu sais qu'il n'y a qu'une seule bonne réponse... 😊"
                    : "Le bouton 'Non' semble être timide..."}
                </p>
              </div>
            )}

            {/* Decorative separator */}
            <div className="mt-8 sm:mt-12 flex justify-center">
              <div className="w-20 sm:w-32 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
