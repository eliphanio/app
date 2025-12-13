import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';

const CORRECT_NAME = 'Marie'; // Secret first name

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
    <div className="w-full max-w-md animate-in fade-in duration-700">
      {/* Glass card container */}
      <div className="relative">
        {/* Subtle glow effect */}
        <div className="absolute -inset-1 bg-primary/5 blur-xl rounded-2xl" />
        
        <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 sm:p-12 subtle-shadow">
          {/* Lock icon with elegant styling */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center elegant-glow">
              <Lock className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Elegant heading */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-foreground mb-3 tracking-wide">
              Espace Privé
            </h1>
            <p className="text-sm text-muted-foreground font-light">
              Veuillez vous identifier pour continuer
            </p>
          </div>

          {/* Authentication form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label 
                htmlFor="name" 
                className="text-sm font-normal text-muted-foreground"
              >
                Prénom
              </Label>
              <Input
                id="name"
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Entrez votre prénom"
                className="h-12 bg-input/50 border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-primary/20 transition-smooth"
                disabled={isValidating}
                autoFocus
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                <p className="text-sm text-destructive/90 font-light text-center bg-destructive/10 py-2 px-4 rounded-lg border border-destructive/20">
                  {error}
                </p>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={!inputName.trim() || isValidating}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-smooth elegant-glow disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="mt-8 flex justify-center">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}