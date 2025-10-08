export default function BackofficeLogs() {
  const logs = [
    { id: 1, action: 'Login realizado', user: 'admin@exemplo.com', time: '2025-10-08 14:32:15', type: 'info' },
    { id: 2, action: 'Evento criado', user: 'admin@exemplo.com', time: '2025-10-08 13:15:42', type: 'success' },
    { id: 3, action: 'Falha no login', user: 'user@exemplo.com', time: '2025-10-08 12:05:30', type: 'error' },
    { id: 4, action: 'Usuário atualizado', user: 'admin@exemplo.com', time: '2025-10-08 11:20:18', type: 'info' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-400/20 text-green-400';
      case 'error': return 'bg-red-400/20 text-red-400';
      default: return 'bg-blue-400/20 text-blue-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Logs do Sistema</h1>
        <p className="text-sm text-muted-foreground">Histórico de atividades e eventos</p>
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Tipo</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Ação</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Usuário</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Data/Hora</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-border hover:bg-surface transition-smooth">
                  <td className="py-4 px-6">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${getTypeColor(log.type)}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-foreground">{log.action}</td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{log.user}</td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
