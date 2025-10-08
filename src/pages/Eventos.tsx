import { AppBar } from '@/components/AppBar';

export default function Eventos() {
  const eventos = [
    {
      id: 1,
      name: 'Imersão Tech 2025',
      date: '15 de Março, 2025',
      location: 'São Paulo, SP',
      type: 'Imersão',
      status: 'Confirmado',
    },
    {
      id: 2,
      name: 'Encontro de Networking',
      date: '22 de Março, 2025',
      location: 'Rio de Janeiro, RJ',
      type: 'Encontro',
      status: 'Aguardando',
    },
    {
      id: 3,
      name: 'Workshop de Inovação',
      date: '05 de Abril, 2025',
      location: 'Online',
      type: 'Workshop',
      status: 'Disponível',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'text-green-400';
      case 'Aguardando':
        return 'text-yellow-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="bg-surface-elevated border-b border-border p-6">
        <h1 className="text-2xl font-bold text-foreground">Eventos</h1>
        <p className="text-sm text-muted-foreground mt-1">Próximas atividades e encontros</p>
      </header>

      {/* Events List */}
      <main className="p-6 space-y-4 animate-fade-in">
        {eventos.map((evento, index) => (
          <div
            key={evento.id}
            className="card-elevated p-5 space-y-3 transition-smooth hover:scale-[1.02]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground">{evento.name}</h3>
                <span className="inline-block text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">
                  {evento.type}
                </span>
              </div>
              <span className={`text-xs font-medium ${getStatusColor(evento.status)}`}>
                {evento.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <i className="fi fi-ts-calendar text-sm"></i>
                <span className="text-sm">{evento.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <i className="fi fi-ts-marker text-sm"></i>
                <span className="text-sm">{evento.location}</span>
              </div>
            </div>

            <button className="w-full mt-2 py-2.5 bg-surface-hover border border-border rounded-lg text-foreground font-medium transition-smooth hover:bg-accent/10 hover:border-accent">
              Ver Detalhes
            </button>
          </div>
        ))}
      </main>

      <AppBar />
    </div>
  );
}
