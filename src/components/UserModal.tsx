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
import { getPessoas } from "@/services/companyService";

const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  return true;
};

export function UserModal({
  userId,
  onClose,
  onSave,
}: {
  userId?: number;
  onClose: () => void;
  onSave: () => void;
}) {
  const isEditing = userId !== undefined;
  const [formData, setFormData] = useState<PessoaDataType>({
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
    administrador: false,
  });
  const [cpfError, setCpfError] = useState<string | null>(null);

  useEffect(() => {
    console.log("USERID: ", userId);
    
    if (userId) {
      getPessoas(198, { pes_id: userId.toString() })
        .then(({ data }) => {
          if (data.data.length > 0) {
            setFormData(data.data[0]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "cpf") {
      if (value.replace(/[^\d]+/g, "").length === 11 && !validateCPF(value)) {
        setCpfError("CPF inválido");
      } else {
        setCpfError(null);
      }
    }
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData({ ...formData, [id]: checked });
  };

  const handleSubmit = async () => {
    if (cpfError) return;
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
      <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Usuário" : "Cadastrar Usuário"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cpf">CPF</Label>
              <InputMask
                mask="999.999.999-99"
                value={formData.cpf}
                onChange={handleChange}
              >
                {(inputProps) => <Input id="cpf" {...inputProps} />}
              </InputMask>
              {cpfError && <p className="text-red-500 text-xs">{cpfError}</p>}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nome_completo">Nome Completo</Label>
            <Input
              id="nome_completo"
              value={formData.nome_completo}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nome_certificado">Nome Certificado</Label>
              <Input
                id="nome_certificado"
                value={formData.nome_certificado}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nome_cracha">Nome Crachá</Label>
              <Input
                id="nome_cracha"
                value={formData.nome_cracha}
                onChange={handleChange}
              />
            </div>
          </div>
          {!isEditing && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cep">CEP</Label>
                <InputMask
                  mask="99999-999"
                  value={formData.cep}
                  onChange={handleChange}
                >
                  {(inputProps) => <Input id="cep" {...inputProps} />}
                </InputMask>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={formData.telefone}
                  onChange={handleChange}
                >
                  {(inputProps) => <Input id="telefone" {...inputProps} />}
                </InputMask>
              </div>
            </div>
          )}
          {!isEditing && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sexo">Sexo</Label>
                <Select
                  value={formData.sexo}
                  onValueChange={(value) => handleSelectChange("sexo", value)}
                >
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
                <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                <InputMask
                  mask="99/99/9999"
                  value={formData.data_nascimento}
                  onChange={handleChange}
                >
                  {(inputProps) => <Input id="data_nascimento" {...inputProps} />}
                </InputMask>
              </div>
            </div>
          )}
          {!isEditing && (
            <div className="grid gap-2">
              <Label htmlFor="chocolate_preferido">Chocolate Preferido</Label>
              <Input
                id="chocolate_preferido"
                value={formData.chocolate_preferido}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cargo">Cargo</Label>
              <Input id="cargo" value={formData.cargo} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="departamento">Departamento</Label>
              <Input
                id="departamento"
                value={formData.departamento}
                onChange={handleChange}
              />
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
              id="administrador"
              checked={formData.administrador}
              onCheckedChange={(checked) =>
                handleSwitchChange("administrador", checked)
              }
            />
            <Label htmlFor="administrador">Administrador</Label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit} disabled={!!cpfError}>
            {isEditing ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
