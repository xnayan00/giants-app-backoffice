import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface MobileDetectorProps {
  children: React.ReactNode;
  instagramUrl?: string;
}

export const MobileDetector = ({ children, instagramUrl = 'https://instagram.com' }: MobileDetectorProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      setIsLoading(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse-soft">
          <div className="w-12 h-12 border-2 border-muted-foreground border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 mx-auto bg-surface-elevated rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Acesso Mobile Apenas
            </h1>
            <p className="text-muted-foreground text-base">
              Este aplicativo foi desenvolvido para proporcionar a melhor experiência em dispositivos móveis.
            </p>
          </div>

          <Button 
            onClick={() => window.open(instagramUrl, '_blank')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth w-full py-6 text-base font-medium"
          >
            Acessar nosso Instagram
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
