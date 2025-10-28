import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import { PessoaDataType } from "@/types/membros";
import { createUser, updateUser } from "@/services/membrosService";

export function UserModal({
  user,
  onClose,
  onSave,
}: {
  user?: PessoaDataType;
  onClose: () => void;
  onSave: () => void;
}) {
  const isEditing = user !== undefined;
  const [formData, setFormData] = useState<PessoaDataType>(
    user || {
      emp_id: "",
      originador_id: "",
      cpf: "",
      nome_completo: "",
      nome_certificado: "",
      nome_cracha: "",
      data_nascimento: "",
      sexo: "",
      conjuge_socio: false,
      chocolate_preferido: "",
      cep: "",
      telefone: "",
      email: "",
      cargo: "",
      perfil: "",
      departamento: "",
      administrador: false
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData({ ...formData, [id]: checked });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await updateUser(formData);
      } else {
        await createUser(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Usuário" : "Cadastrar Usuário"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="pes_email">Email</Label>
              <Input id="pes_email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pes_cpf">CPF</Label>
              <Input id="pes_cpf" value={formData.cpf} onChange={handleChange} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pes_nome">Nome Completo</Label>
            <Input id="pes_nome" value={formData.nome_completo} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="pes_nome_certificado">Nome Certificado</Label>
              <Input
                id="pes_nome_certificado"
                value={formData.nome_certificado}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pes_nome_cracha">Nome Crachá</Label>
              <Input
                id="pes_nome_cracha"
                value={formData.nome_cracha}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="gender">Sexo</Label>
              <Select onValueChange={(value) => handleSelectChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <InputMask mask="99/99/9999">
                {(inputProps) => <Input {...inputProps} id="birthDate" />}
              </InputMask>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="favoriteChocolate">Chocolate Preferido</Label>
            <Input id="favoriteChocolate" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cargo">Cargo</Label>
              <Input id="cargo" value={formData.cargo} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="departamento">Departamento</Label>
              <Input id="departamento" value={formData.departamento} onChange={handleChange} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="perfil">Perfil</Label>
            <Select
              value={formData.perfil}
              onValueChange={(value) => handleSelectChange("perfil", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lideranca">Liderança</SelectItem>
                <SelectItem value="colaborador">Colaborador</SelectItem>
                <SelectItem value="membro">Membro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="admin"
              checked={formData.administrador}
              onCheckedChange={(checked) => handleSwitchChange("admin", checked)}
            />
            <Label htmlFor="admin">Administrador</Label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            {isEditing ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
