import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';

const CORRECT_NAME = 'Cathy'; // Secret first name

export default function AuthenticationGate({ onAuthenticate }) {
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsValidating(true);

    // Simulate validation delay for smooth UX
    setTimeout(() => {
      if (inputName.trim() === CORRECT_NAME) {
        onAuthenticate(inputName.trim());
      } else {
        setError('Accès refusé. Identité non reconnue.');
        setInputName('');
      }
      setIsValidating(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-md px-4 animate-in fade-in duration-700">
      {/* Minimal card container */}
      <div className="relative">
        {/* Subtle rose glow effect */}
        <div className="absolute -inset-1 bg-primary/8 blur-2xl rounded-3xl" />
        
        <div className="relative bg-card border border-border rounded-3xl p-6 sm:p-10 subtle-shadow">
          {/* Lock icon with minimal styling */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex items-center justify-center">
              <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Elegant heading */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-foreground mb-2 sm:mb-3 tracking-wide">
              Espace Privé
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light">
              Veuillez vous identifier pour continuer
            </p>
          </div>

          {/* Authentication form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <Label 
                htmlFor="name" 
                className="text-xs sm:text-sm font-normal text-muted-foreground"
              >
                Prénom
              </Label>
              <Input
                id="name"
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Entrez votre prénom"
                className="h-11 sm:h-12 bg-input border-border text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-primary/20 transition-smooth text-base"
                disabled={isValidating}
                autoFocus
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                <p className="text-xs sm:text-sm text-destructive/90 font-light text-center bg-destructive/10 py-2.5 px-4 rounded-xl border border-destructive/20">
                  {error}
                </p>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={!inputName.trim() || isValidating}
              className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-smooth disabled:opacity-50 disabled:cursor-not-allowed text-base rounded-xl"
            >
              {isValidating ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Vérification...
                </span>
              ) : (
                'Accéder'
              )}
            </Button>
          </form>

          {/* Subtle decorative element */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}