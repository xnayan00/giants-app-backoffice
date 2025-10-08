import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function BackofficeLogin() {
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envio de credenciais
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleOtpComplete = async (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      setLoading(true);

      // Simular verificação OTP
      setTimeout(() => {
        // Determinar role baseado no email
        const role = email.includes("admin") ? "membro" : "user";
        
        localStorage.setItem("backoffice_auth", "true");
        localStorage.setItem("backoffice_role", role);
        localStorage.setItem("backoffice_name", email.split("@")[0]);
        
        navigate("/backoffice/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto">
            <i className="fi fi-ts-apps text-primary-foreground text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Backoffice</h1>
          <p className="text-sm text-muted-foreground">Painel Administrativo</p>
        </div>

        {/* Form */}
        <div className="card-elevated p-8 space-y-6">
          {step === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth disabled:opacity-50"
              >
                {loading ? "Verificando..." : "Continuar"}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <i className="fi fi-ts-shield-check text-4xl text-primary"></i>
                <h2 className="text-lg font-semibold text-foreground">Código de Verificação</h2>
                <p className="text-sm text-muted-foreground">
                  Digite o código enviado para {email}
                </p>
              </div>

              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={handleOtpComplete}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <button
                onClick={() => setStep("credentials")}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Voltar
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Use admin@exemplo.com para acesso completo
        </p>
      </div>
    </div>
  );
}
