export default function BackofficeEventos() {
  const eventos = [
    { id: 1, name: 'Imersão Tech 2025', date: '15 Mar 2025', type: 'Imersão', participants: 45 },
    { id: 2, name: 'Encontro de Networking', date: '22 Mar 2025', type: 'Encontro', participants: 78 },
    { id: 3, name: 'Workshop de IA', date: '05 Abr 2025', type: 'Workshop', participants: 32 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Eventos</h1>
          <p className="text-sm text-muted-foreground">Gerenciar eventos e imersões</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth flex items-center gap-2">
          <i className="fi fi-ts-calendar-plus"></i>
          Novo Evento
        </button>
      </div>

      <div className="grid gap-4">
        {eventos.map((evento) => (
          <div key={evento.id} className="card-elevated p-6 hover:bg-surface-hover transition-smooth">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <i className="fi fi-ts-calendar text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{evento.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <i className="fi fi-ts-clock"></i>
                      {evento.date}
                    </span>
                    <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">
                      {evento.type}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <i className="fi fi-ts-users"></i>
                      {evento.participants} participantes
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-surface rounded-lg transition-smooth">
                  <i className="fi fi-ts-edit text-foreground"></i>
                </button>
                <button className="p-2 hover:bg-surface rounded-lg transition-smooth">
                  <i className="fi fi-ts-eye text-foreground"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
