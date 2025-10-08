export default function Backoffice() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface-elevated border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <i className="fi fi-ts-apps text-primary-foreground text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Backoffice</h1>
              <p className="text-xs text-muted-foreground">Painel Administrativo</p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg text-foreground hover:bg-surface-hover transition-smooth">
            <i className="fi fi-ts-user"></i>
            <span className="text-sm font-medium">Admin</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Usuários', value: '1,234', icon: 'fi fi-ts-users', color: 'text-blue-400' },
            { label: 'Eventos Ativos', value: '12', icon: 'fi fi-ts-calendar', color: 'text-green-400' },
            { label: 'Palestras', value: '48', icon: 'fi fi-ts-presentation', color: 'text-purple-400' },
            { label: 'Conexões', value: '5,678', icon: 'fi fi-ts-link', color: 'text-yellow-400' },
          ].map((stat, index) => (
            <div key={index} className="card-elevated p-6 space-y-3">
              <div className="flex items-center justify-between">
                <i className={`${stat.icon} text-2xl ${stat.color}`}></i>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card-elevated p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="p-4 bg-surface rounded-lg text-left hover:bg-surface-hover transition-smooth">
              <i className="fi fi-ts-user-add text-xl text-primary mb-2"></i>
              <p className="text-sm font-medium text-foreground">Novo Usuário</p>
              <p className="text-xs text-muted-foreground">Adicionar participante</p>
            </button>

            <button className="p-4 bg-surface rounded-lg text-left hover:bg-surface-hover transition-smooth">
              <i className="fi fi-ts-calendar-plus text-xl text-primary mb-2"></i>
              <p className="text-sm font-medium text-foreground">Criar Evento</p>
              <p className="text-xs text-muted-foreground">Novo encontro ou imersão</p>
            </button>

            <button className="p-4 bg-surface rounded-lg text-left hover:bg-surface-hover transition-smooth">
              <i className="fi fi-ts-upload text-xl text-primary mb-2"></i>
              <p className="text-sm font-medium text-foreground">Nova Palestra</p>
              <p className="text-xs text-muted-foreground">Upload de conteúdo</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-elevated p-6 mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Atividade Recente</h2>
          
          <div className="space-y-3">
            {[
              { action: 'Novo usuário cadastrado', time: 'Há 5 minutos', icon: 'fi fi-ts-user' },
              { action: 'Evento atualizado', time: 'Há 1 hora', icon: 'fi fi-ts-calendar' },
              { action: 'Palestra publicada', time: 'Há 2 horas', icon: 'fi fi-ts-presentation' },
              { action: 'Nova conexão realizada', time: 'Há 3 horas', icon: 'fi fi-ts-link' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                <i className={`${activity.icon} text-muted-foreground`}></i>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
