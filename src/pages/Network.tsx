import { AppBar } from '@/components/AppBar';
import { useState } from 'react';

export default function Network() {
  const [connections, setConnections] = useState([
    {
      id: 1,
      name: 'Maria Silva',
      role: 'CEO',
      company: 'Tech Innovations',
      avatar: '👩‍💼',
      connected: false,
    },
    {
      id: 2,
      name: 'Pedro Santos',
      role: 'Desenvolvedor',
      company: 'StartupXYZ',
      avatar: '👨‍💻',
      connected: true,
    },
    {
      id: 3,
      name: 'Carla Rodrigues',
      role: 'Designer',
      company: 'Creative Studio',
      avatar: '👩‍🎨',
      connected: false,
    },
    {
      id: 4,
      name: 'Lucas Oliveira',
      role: 'Product Manager',
      company: 'Digital Solutions',
      avatar: '👨‍💼',
      connected: false,
    },
  ]);

  const handleConnect = (id: number) => {
    setConnections(connections.map(conn => 
      conn.id === id ? { ...conn, connected: !conn.connected } : conn
    ));
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="bg-surface-elevated border-b border-border p-6">
        <h1 className="text-2xl font-bold text-foreground">Network</h1>
        <p className="text-sm text-muted-foreground mt-1">Conecte-se com outros participantes</p>
      </header>

      {/* Search */}
      <div className="p-6 pb-4">
        <div className="relative">
          <i className="fi fi-ts-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
          <input
            type="text"
            placeholder="Buscar participantes..."
            className="w-full h-12 pl-12 pr-4 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
          />
        </div>
      </div>

      {/* Network List */}
      <main className="px-6 pb-6 space-y-3 animate-fade-in">
        {connections.map((person, index) => (
          <div
            key={person.id}
            className="card-elevated p-5 space-y-4 transition-smooth"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 flex-shrink-0 bg-surface rounded-full flex items-center justify-center text-2xl">
                {person.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {person.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">{person.role}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-accent">
                  <i className="fi fi-ts-building"></i>
                  <span className="truncate">{person.company}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleConnect(person.id)}
              className={`w-full py-2.5 rounded-lg font-medium transition-smooth ${
                person.connected
                  ? 'bg-surface-hover border border-border text-muted-foreground hover:bg-surface'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {person.connected ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fi fi-ts-check"></i>
                  Conectado
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="fi fi-ts-user-add"></i>
                  Conectar
                </span>
              )}
            </button>
          </div>
        ))}
      </main>

      <AppBar />
    </div>
  );
}
