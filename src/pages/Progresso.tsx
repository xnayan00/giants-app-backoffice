import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AppBar } from "@/components/AppBar";

const Progresso = () => {
  const navigate = useNavigate();

  // Mock user data
  const userData = {
    name: "Yan Ricardo Mendes",
    cycle: "Ciclo 7 — Legado em Construção.",
    cycleNumber: "7°",
    message: "Sua história no Giants já é parte da história do próprio programa. Que orgulho dessa trajetória!",
  };

  const stats = [
    { label: "Imersões", value: 145 },
    { label: "Encontros", value: 3 },
    { label: "Experience", value: 2 },
    { label: "Porsche Cup", value: 2 },
    { label: "Mentorias In Company", value: 2 },
    { label: "Mentorias Online", value: 73 },
    { label: "1:1 com o Marcus", value: 0 },
    { label: "Confraria", value: 3 },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-surface rounded-lg transition-smooth"
          >
            <i className="fi fi-rr-arrow-left text-xl text-foreground"></i>
          </button>
          <h1 className="text-xl font-semibold text-foreground">Seu Progresso</h1>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Hero Card */}
        <Card className="bg-muted/30 border-border overflow-hidden">
          <CardContent className="p-6">
            <div className="flex gap-4">
              {/* Cycle Badge */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">{userData.cycleNumber}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2">
                <h2 className="text-lg font-semibold text-foreground">Parabéns!</h2>
                <p className="text-base font-medium text-foreground">{userData.name}</p>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-muted-foreground">{userData.cycle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {userData.message}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-surface border-border">
              <CardContent className="p-4 space-y-3">
                <div className="h-1 bg-muted/30 rounded-full">
                  <div className="h-full bg-primary/20 rounded-full w-1/3"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-bold text-muted-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">Sua empresa participou de</p>
                  <p className="text-sm font-medium text-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AppBar />
    </div>
  );
};

export default Progresso;
