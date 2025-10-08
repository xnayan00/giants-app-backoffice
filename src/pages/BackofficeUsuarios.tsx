export default function BackofficeUsuarios() {
  const users = [
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com', role: 'membro', status: 'Ativo' },
    { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com', role: 'user', status: 'Ativo' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@exemplo.com', role: 'user', status: 'Inativo' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Usuários</h1>
          <p className="text-sm text-muted-foreground">Gerenciar usuários do sistema</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth flex items-center gap-2">
          <i className="fi fi-ts-user-add"></i>
          Novo Usuário
        </button>
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Nome</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Email</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Papel</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-surface transition-smooth">
                  <td className="py-4 px-6 text-sm text-foreground">{user.name}</td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.status === 'Ativo' ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-surface-hover rounded-lg transition-smooth">
                        <i className="fi fi-ts-edit text-foreground"></i>
                      </button>
                      <button className="p-2 hover:bg-surface-hover rounded-lg transition-smooth">
                        <i className="fi fi-ts-trash text-red-400"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
