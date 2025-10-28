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
import { Skeleton } from "@/components/ui/skeleton";
import { UserModal } from "@/components/UserModal";

export default function BackofficeUsuarios() {
  const [users, setUsers] = useState<PessoaDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState<PessoaDataType[]>([]);
  const [filter, setFilter] = useState("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PessoaDataType | undefined>(
    undefined
  );

  const handleOpenModal = (user?: PessoaDataType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(undefined);
    setIsModalOpen(false);
  };

  const fetchUsers = () => {
    setLoading(true);
    getPessoas(198)
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      if (filter === "todos") return true;
      if (filter === "ativos") return user.ativo;
      if (filter === "inativos") return !user.ativo;
      return true;
    });
    setFilteredUsers(filtered);
  }, [users, filter]);

  const columns = createColumns(handleOpenModal);

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
          <Button onClick={() => handleOpenModal()}>
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

        {loading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <DataTable columns={columns} data={filteredUsers} />
        )}
      </div>
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={fetchUsers}
        />
      )}
    </div>
  );
}