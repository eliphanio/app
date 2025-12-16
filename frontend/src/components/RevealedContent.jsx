import { Play, Pause } from 'lucide-react';
import { useRef } from 'react';
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

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
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
            <div className="flex flex-col items-center gap-4 mb-8">
              <Button
                onClick={toggleAudio}
                variant="secondary"
                className="flex items-center gap-2 rounded-full px-6 py-2 transition-all hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                  )}
                <span className="text-sm font-light">
                  {isPlaying ? 'Mettre en pause' : 'Écouter le message'}
                </span>
              </Button>

              <audio ref={audioRef} src="/audio/message.mp3" />
            </div>


            {/* Personal message */}
            <div className="space-y-5 sm:space-y-6 text-foreground/85 leading-relaxed">
              <p className="text-base sm:text-lg lg:text-xl font-light text-center">
                Cet espace n'existe que pour toi.
              </p>
              
              <div className="space-y-3.5 sm:space-y-4 text-sm sm:text-base lg:text-lg font-light max-w-2xl mx-auto">
                <p>
                  Comme je te l’avais dit, j’ai créé quelque chose pour toi 😅
Ce n’est peut-être ni extraordinaire ni très beau, mais je l’ai fait avec sincérité, juste pour te dire quelque chose qui me tient vraiment à cœur 🥺
                </p>
                
                <p>
Normalement, personne ne peut accéder à ce message, sauf si on devine que seul ton prénom est accepté. Tous les autres sont refusés 😄                </p>
                
                <p>
                  Pour être honnête, j’apprécie énormément les moments où on discute ensemble, et j'ai une envie inébranlable de te voir.
Je ne suis pas très doué avec les mots, mais je vais quand même essayer d’exprimer ce que je ressens.
                </p>

                <p>
                  Ce que je veux te dire, Cathy, c’est que je t’aime beaucoup.
J’aimerais vraiment qu’on sorte ensemble et quand je dis “sortir”, je parle de devenir ma copine ❤️
Quelqu’un avec qui je pourrais partager ma vie.
                </p>
                
                <p className="pt-3 sm:pt-4 text-center text-muted-foreground italic text-xs sm:text-sm">
                  Tu me repondra sur fb ou autre...
                </p>
                
                <p className="pt-4 sm:pt-6 text-center">
                  Cette fois, je te pose la question sincèrement et j’attends une vraie réponse.
                </p>
                
                <p className="pt-3 sm:pt-4 text-center font-medium text-primary">
                  
Est-ce que tu accepterais de sortir avec moi et de devenir ma copine ? ❤️🥺
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