import { AppBar } from '@/components/AppBar';

export default function Eventos() {
  const eventos = [
    {
      id: 1,
      title: 'REPRISE Acelerador Vendedores B2B | Online',
      date: '10/10/2025',
      time: '09:00',
      type: 'Evento',
      participants: 58,
      thumbnail: '🚀',
    },
    {
      id: 2,
      title: 'REPRISE Acelerador Vendedores Inside Sales | Online',
      date: '11/10/2025',
      time: '09:00',
      type: 'Evento',
      participants: 45,
      thumbnail: '📊',
    },
    {
      id: 3,
      title: 'Acelerador Planejamento',
      date: '17/10/2025',
      time: '09:00',
      type: 'Evento',
      participants: 32,
      thumbnail: '📈',
    },
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="bg-surface-elevated border-b border-border p-6">
        <h1 className="text-2xl font-bold text-foreground text-center">Eventos</h1>
      </header>

      {/* Search and Filters */}
      <div className="p-6 pb-4 space-y-4">
        <div className="relative">
          <i className="fi fi-ts-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
          <input
            type="text"
            placeholder="Pesquisar Palavra"
            className="w-full h-12 pl-12 pr-4 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-3 gap-2">
          <select className="h-12 px-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth">
            <option>Próximos</option>
            <option>Passados</option>
          </select>
          <select className="h-12 px-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth">
            <option>Participação</option>
            <option>Confirmado</option>
            <option>Aguardando</option>
          </select>
          <select className="h-12 px-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth">
            <option>Período</option>
            <option>Esta semana</option>
            <option>Este mês</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <main className="px-6 pb-6 space-y-4 animate-fade-in">
        {eventos.map((evento, index) => (
          <div
            key={evento.id}
            className="card-elevated overflow-hidden transition-smooth hover:scale-[1.01]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Date/Time Badge */}
            <div className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-elevated border-b border-border">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <i className="fi fi-ts-calendar"></i>
                <span>{evento.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <i className="fi fi-ts-clock"></i>
                <span>{evento.time}</span>
              </div>
            </div>

            <div className="p-5">
              {/* Thumbnail */}
              <div className="w-full h-24 bg-surface rounded-lg flex items-center justify-center text-5xl mb-4">
                {evento.thumbnail}
              </div>

              {/* Event Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {evento.title}
                  </h3>
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-surface-hover text-muted-foreground">
                    {evento.type}
                  </span>
                </div>

                {/* Participants and Action */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs border-2 border-surface-elevated">👤</div>
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs border-2 border-surface-elevated">👤</div>
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs border-2 border-surface-elevated">👤</div>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">+{evento.participants}</span>
                  </div>

                  <button className="w-12 h-12 rounded-full bg-surface-hover border border-border flex items-center justify-center transition-smooth hover:bg-accent/10 hover:border-accent">
                    <i className="fi fi-ts-plus text-lg text-foreground"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <AppBar />
    </div>
  );
}
