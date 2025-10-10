import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Ativo' | 'Inativo';
  isAdmin: boolean;
}

export default function BackofficeUsuarios() {
  const users: User[] = [
    { id: 1, name: 'Adelmo Nathan Lopes de Jesus', email: 'adelmo.jesus@grupoacelerador.com.br', role: 'Colaborador', status: 'Ativo', isAdmin: false },
    { id: 2, name: 'Agatha Sara Breves Magalhães', email: 'agatha.magalhaes@grupoacelerador.com.br', role: 'Colaborador', status: 'Ativo', isAdmin: false },
    { id: 3, name: 'Alan Teixeira da Silva', email: 'alan.silva@grupoacelerador.com.br', role: 'Colaborador', status: 'Ativo', isAdmin: false },
    { id: 4, name: 'Alexandre Guimarães de Moura', email: 'alexandre.moura@grupoacelerador.com.br', role: 'Colaborador', status: 'Ativo', isAdmin: false },
    { id: 5, name: 'Alexandre Rodrigues Soares', email: 'alexandre.soares@grupoacelerador.com.br', role: 'Colaborador', status: 'Ativo', isAdmin: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestão de Usuários</h1>
          <p className="text-sm text-muted-foreground">Gerencie colaboradores, gestores e parceiros do programa</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <i className="fi fi-ts-upload"></i>
            <span className="ml-2">Cadastro em Lote</span>
          </Button>
          <Button>
            <i className="fi fi-ts-plus"></i>
            <span className="ml-2">Novo Usuário</span>
          </Button>
        </div>
      </div>

      {/* Filtro */}
      <div className="card-elevated p-4">
        <Select>
          <SelectTrigger className="w-full bg-surface border-border">
            <SelectValue placeholder="Filtro" />
          </SelectTrigger>
          <SelectContent className="bg-surface border-border">
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ativos">Ativos</SelectItem>
            <SelectItem value="inativos">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela de Usuários */}
      <div className="card-elevated overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Usuários ({users.length})</h2>
          <p className="text-sm text-muted-foreground">Lista de todos os usuários cadastrados no programa</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-elevated border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Perfil
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Opções
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-surface-hover transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <i className="fi fi-ts-user text-foreground"></i>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-muted text-foreground text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.status === 'Ativo' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {user.isAdmin ? 'Sim' : 'Não'}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <i className="fi fi-ts-menu-dots-vertical"></i>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-surface border-border">
                        <DropdownMenuItem className="cursor-pointer hover:bg-surface-hover text-foreground">
                          <i className="fi fi-ts-edit mr-2"></i>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-surface-hover text-red-500">
                          <i className="fi fi-ts-trash mr-2"></i>
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
