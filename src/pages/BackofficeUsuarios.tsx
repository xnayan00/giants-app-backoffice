import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getPessoas } from "@/services/companyService";
import { PessoaDataType } from "@/types/company";
import { DataTable } from "@/components/reusable/DataTable";
import { columns as createColumns } from "./BackofficeUsuariosColumns";
import { UserModal } from "@/components/UserModal";
import { useLoading } from "@/hooks/useLoading"

export default function BackofficeUsuarios() {
  const [users, setUsers] = useState<PessoaDataType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<PessoaDataType[]>([]);
  const [filter, setFilter] = useState("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number>();
  const { showLoading, hideLoading } = useLoading();
  const [rowSelection, setRowSelection] = useState({});

  const handleOpenModal = (user?: PessoaDataType) => {    
    setSelectedUser(user.pes_id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(undefined);
    setIsModalOpen(false);
  };

  const fetchUsers = () => {
    showLoading();
    getPessoas(198)
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        hideLoading();
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = createColumns(handleOpenModal);

  const [table, dataTableComponent] = DataTable({
      columns: columns,
      data: filteredUsers,
      rowSelection,
      setRowSelection,
    });

  useEffect(() => {
    const filtered = users.filter((user) => {
      if (filter === "todos") return true;
      if (filter === "ativos") return user.pes_status;
      if (filter === "inativos") return !user.pes_status;
      return true;
    });
    setFilteredUsers(filtered);
  }, [users, filter]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Gestão de Usuários
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie colaboradores, gestores e parceiros do programa
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <i className="fi fi-ts-upload"></i>
            <span className="ml-2">Cadastro em Lote</span>
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <i className="fi fi-ts-plus"></i>
            <span className="ml-2">Novo Usuário</span>
          </Button>
        </div>
      </div>

      {/* Filtro */}
      <div className="card-elevated p-4">
        <Select onValueChange={setFilter} value={filter}>
          <SelectTrigger className="w-full bg-surface border-border">
            <SelectValue placeholder="Filtro" />
          </SelectTrigger>
          <SelectContent className="bg-surface border-border">
            <SelectItem value="todos">Todos </SelectItem>
            <SelectItem value="ativos">Ativos</SelectItem>
            <SelectItem value="inativos">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela de Usuários */}
      <div className="card-elevated overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Usuários ({filteredUsers.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Lista de todos os usuários cadastrados no programa
          </p>
        </div>
          {dataTableComponent}
      </div>
      {isModalOpen && (
        <UserModal
          userId={selectedUser}
          onClose={handleCloseModal}
          onSave={fetchUsers}
        />
      )}
    </div>
  );
}