import { AppBar } from '@/components/AppBar';

export default function Dashboard() {
  const user = {
    name: 'João Silva',
    role: 'Participante',
    nextEvent: {
      name: 'Imersão Tech 2025',
      date: '15 de Março, 2025',
      location: 'São Paulo, SP',
    },
    stats: {
      imersoes: 3,
      encontros: 12,
    },
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="bg-surface-elevated border-b border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.role}</p>
          </div>
          <button 
            onClick={() => window.location.href = '/profile'}
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth"
          >
            <i className="fi fi-ts-user text-xl text-foreground"></i>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6 animate-fade-in">
        {/* Next Event Card */}
        <div className="card-elevated p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <i className="fi fi-ts-calendar text-primary text-lg"></i>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Próximo Evento</p>
              <h2 className="text-lg font-semibold text-foreground">{user.nextEvent.name}</h2>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <i className="fi fi-ts-clock text-sm"></i>
              <span className="text-sm">{user.nextEvent.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <i className="fi fi-ts-marker text-sm"></i>
              <span className="text-sm">{user.nextEvent.location}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card-premium p-6 space-y-2">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <i className="fi fi-ts-diploma text-accent text-lg"></i>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{user.stats.imersoes}</p>
              <p className="text-sm text-muted-foreground">Imersões</p>
            </div>
          </div>

          <div className="card-premium p-6 space-y-2">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <i className="fi fi-ts-handshake text-accent text-lg"></i>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{user.stats.encontros}</p>
              <p className="text-sm text-muted-foreground">Encontros</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Acesso Rápido</h3>
          
          <div className="space-y-2">
            <button className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover">
              <div className="flex items-center gap-3">
                <i className="fi fi-ts-list text-foreground text-lg"></i>
                <span className="text-foreground font-medium">Meus Eventos</span>
              </div>
              <i className="fi fi-ts-angle-right text-muted-foreground"></i>
            </button>

            <button className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover">
              <div className="flex items-center gap-3">
                <i className="fi fi-ts-chart-line text-foreground text-lg"></i>
                <span className="text-foreground font-medium">Meu Progresso</span>
              </div>
              <i className="fi fi-ts-angle-right text-muted-foreground"></i>
            </button>
          </div>
        </div>
      </main>

      <AppBar />
    </div>
  );
}
