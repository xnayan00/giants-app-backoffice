export default function BackofficeDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão geral do sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      {/* Recent Activity */}
      <div className="card-elevated p-6">
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
    </div>
  );
}
