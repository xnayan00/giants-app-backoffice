import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      toast.success('Código enviado para seu email');
    }, 1000);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-surface-elevated rounded-2xl flex items-center justify-center">
            <i className="fi fi-ts-unlock text-3xl text-primary"></i>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {step === 'credentials' ? 'Bem-vindo' : 'Verificação'}
          </h1>
          <p className="text-muted-foreground">
            {step === 'credentials' 
              ? 'Entre com suas credenciais' 
              : 'Digite o código enviado para seu email'}
          </p>
        </div>

        {/* Form */}
        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-surface border-border text-foreground h-12"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-surface border-border text-foreground h-12"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-medium"
            >
              {loading ? 'Enviando...' : 'Continuar'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Código de Verificação</label>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-surface border-border text-foreground h-12 text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-medium"
              >
                {loading ? 'Verificando...' : 'Verificar'}
              </Button>

              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Voltar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
