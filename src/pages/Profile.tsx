import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const user = {
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    role: 'Participante',
    memberSince: 'Janeiro 2024',
    stats: {
      imersoes: 3,
      encontros: 12,
      palestras: 28,
      conexoes: 45,
    },
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="bg-surface-elevated border-b border-border p-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 flex items-center justify-center hover:bg-surface rounded-lg transition-smooth"
          >
            <i className="fi fi-ts-angle-left text-foreground text-xl"></i>
          </button>
          <h1 className="text-xl font-bold text-foreground">Meu Perfil</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6 animate-fade-in">
        {/* User Info Card */}
        <div className="card-elevated p-6 space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <i className="fi fi-ts-user text-4xl text-foreground"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">{user.role}</p>
            </div>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth flex items-center gap-2">
              <i className="fi fi-ts-edit"></i>
              Editar Perfil
            </button>
          </div>

          <div className="pt-6 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Membro desde</span>
              <span className="text-sm font-medium text-foreground">{user.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card-premium p-4 space-y-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <i className="fi fi-ts-diploma text-primary"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{user.stats.imersoes}</p>
              <p className="text-xs text-muted-foreground">Imersões</p>
            </div>
          </div>

          <div className="card-premium p-4 space-y-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <i className="fi fi-ts-handshake text-accent"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{user.stats.encontros}</p>
              <p className="text-xs text-muted-foreground">Encontros</p>
            </div>
          </div>

          <div className="card-premium p-4 space-y-2">
            <div className="w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center">
              <i className="fi fi-ts-presentation text-purple-400"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{user.stats.palestras}</p>
              <p className="text-xs text-muted-foreground">Palestras</p>
            </div>
          </div>

          <div className="card-premium p-4 space-y-2">
            <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
              <i className="fi fi-ts-link text-yellow-400"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{user.stats.conexoes}</p>
              <p className="text-xs text-muted-foreground">Conexões</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Configurações</h3>
          
          <div className="space-y-2">
            <button className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover">
              <div className="flex items-center gap-3">
                <i className="fi fi-ts-bell text-foreground"></i>
                <span className="text-foreground font-medium">Notificações</span>
              </div>
              <i className="fi fi-ts-angle-right text-muted-foreground"></i>
            </button>

            <button className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover">
              <div className="flex items-center gap-3">
                <i className="fi fi-ts-shield text-foreground"></i>
                <span className="text-foreground font-medium">Privacidade</span>
              </div>
              <i className="fi fi-ts-angle-right text-muted-foreground"></i>
            </button>

            <button className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover">
              <div className="flex items-center gap-3">
                <i className="fi fi-ts-interrogation text-foreground"></i>
                <span className="text-foreground font-medium">Ajuda & Suporte</span>
              </div>
              <i className="fi fi-ts-angle-right text-muted-foreground"></i>
            </button>

            <button 
              onClick={() => navigate('/login')}
              className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover text-red-400"
            >
              <div className="flex items-center gap-3">
                <i className="fi fi-ts-sign-out-alt"></i>
                <span className="font-medium">Sair</span>
              </div>
              <i className="fi fi-ts-angle-right"></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
