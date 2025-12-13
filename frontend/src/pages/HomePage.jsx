import { useState } from 'react';
import AuthenticationGate from '@/components/AuthenticationGate';
import ConfirmationQuestion from '@/components/ConfirmationQuestion';
import RevealedContent from '@/components/RevealedContent';

export default function HomePage() {
  const [step, setStep] = useState('auth'); // 'auth' | 'confirmation' | 'revealed'
  const [userName, setUserName] = useState('');

  const handleAuthentication = (name) => {
    setUserName(name);
    setStep('confirmation');
  };

  const handleConfirmation = () => {
    setStep('revealed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {step === 'auth' && (
        <AuthenticationGate onAuthenticate={handleAuthentication} />
      )}
      {step === 'confirmation' && (
        <ConfirmationQuestion userName={userName} onConfirm={handleConfirmation} />
      )}
      {step === 'revealed' && (
        <RevealedContent userName={userName} />
      )}
    </div>
  );
}