import { EmpresaConsumo } from "@/types/company"
import api from "../http/api"

export const getConsumoEmpresa = async (id_empresa: number) => {
	return api.get<EmpresaConsumo[]>(`empresas/${id_empresa}/consumo`)
}

export const getMentores = async (id_empresa: number) => {
	return api.get(`empresas/${id_empresa}/mentores`)
}


