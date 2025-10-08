import { AppBar } from '@/components/AppBar';

export default function Palestras() {
  const palestras = [
    {
      id: 1,
      title: 'O Futuro da Tecnologia',
      speaker: 'Dr. Carlos Mendes',
      duration: '45 min',
      category: 'Tecnologia',
      thumbnail: '🚀',
    },
    {
      id: 2,
      title: 'Liderança na Era Digital',
      speaker: 'Ana Paula Santos',
      duration: '60 min',
      category: 'Liderança',
      thumbnail: '👥',
    },
    {
      id: 3,
      title: 'Inovação e Startups',
      speaker: 'Roberto Lima',
      duration: '50 min',
      category: 'Negócios',
      thumbnail: '💡',
    },
    {
      id: 4,
      title: 'Marketing Digital Avançado',
      speaker: 'Marina Costa',
      duration: '40 min',
      category: 'Marketing',
      thumbnail: '📱',
    },
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="bg-surface-elevated border-b border-border p-6">
        <h1 className="text-2xl font-bold text-foreground">Palestras</h1>
        <p className="text-sm text-muted-foreground mt-1">Conteúdo exclusivo e inspirador</p>
      </header>

      {/* Palestras List */}
      <main className="p-6 space-y-4 animate-fade-in">
        {palestras.map((palestra, index) => (
          <div
            key={palestra.id}
            className="card-elevated overflow-hidden transition-smooth hover:scale-[1.02]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex gap-4 p-5">
              {/* Thumbnail */}
              <div className="w-20 h-20 flex-shrink-0 bg-surface rounded-xl flex items-center justify-center text-4xl">
                {palestra.thumbnail}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="text-base font-semibold text-foreground line-clamp-1">
                    {palestra.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{palestra.speaker}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">
                    {palestra.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <i className="fi fi-ts-clock"></i>
                    {palestra.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium transition-smooth hover:bg-primary/90">
                Assistir Agora
              </button>
            </div>
          </div>
        ))}
      </main>

      <AppBar />
    </div>
  );
}
