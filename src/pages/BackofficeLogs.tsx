import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Log {
  id: number;
  datetime: string;
  user: string;
  action: string;
  details: string;
}

export default function BackofficeLogs() {
  const logs: Log[] = [
    {
      id: 1,
      datetime: '09/10/2025 14:41',
      user: 'Isabela Pereira Gomes',
      action: 'Inscrição em evento',
      details: 'Inscrição realizada e enviada para aprovação | Evento: Acelerador Planejamento Estratégico | Onlive',
    },
    {
      id: 2,
      datetime: '08/10/2025 19:07',
      user: 'Aline Cristina Barbosa Ferreira Marques',
      action: 'Inscrição em evento',
      details: 'Inscrição realizada e enviada para aprovação | Evento: REPRISE Acelerador Vendedores B2B | Onlive',
    },
    {
      id: 3,
      datetime: '08/10/2025 17:18',
      user: 'Ruany Saron Mendes Abrocese',
      action: 'Edição de Pessoa',
      details: 'Alterações feitas ao usuário Rafaella Evaristo de Souza.',
    },
    {
      id: 4,
      datetime: '08/10/2025 17:14',
      user: 'Ruany Saron Mendes Abrocese',
      action: 'Edição de Pessoa',
      details: 'Alterações feitas ao usuário Sabrina Denobile Rodrigues.',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Logs de Atividade</h1>
        <p className="text-sm text-muted-foreground">Histórico detalhado de todas as ações realizadas no sistema</p>
      </div>

      {/* Filtro */}
      <div className="card-elevated p-4">
        <Select>
          <SelectTrigger className="w-full bg-surface border-border">
            <SelectValue placeholder="Filtro" />
          </SelectTrigger>
          <SelectContent className="bg-surface border-border">
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="eventos">Eventos</SelectItem>
            <SelectItem value="usuarios">Usuários</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela de Logs */}
      <div className="card-elevated overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Registro de Atividades</h2>
              <p className="text-sm text-muted-foreground">Histórico cronológico de todas as ações administrativas</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <i className="fi fi-ts-edit"></i>
              <span>Encontrados: {logs.length} Registros</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-elevated border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Ação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Detalhes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-hover transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {log.datetime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {log.details}
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
