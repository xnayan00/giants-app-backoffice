import { EmpresaConsumo } from "@/types/company"
import api from "../http/api"

export const getConsumoEmpresa = async (id_empresa: number) => {
	return api.get<EmpresaConsumo[]>(`empresas/${id_empresa}/consumo`)
}
