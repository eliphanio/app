import { useState } from 'react';
import AuthenticationGate from '@/components/AuthenticationGate';
import RevealedContent from '@/components/RevealedContent';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  const handleAuthentication = (name) => {
    setUserName(name);
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {!isAuthenticated ? (
        <AuthenticationGate onAuthenticate={handleAuthentication} />
      ) : (
        <RevealedContent userName={userName} />
      )}
    </div>
  );
}