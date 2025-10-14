import {
	CompanyLogsDataType,
	EmpresaConsumo,
	PessoaDataType,
} from "@/types/company"
import api from "../http/api"

export const getConsumoEmpresa = async (id_empresa: number) => {
	return api.get<EmpresaConsumo[]>(`empresas/${id_empresa}/consumo`)
}

export const getMentores = async (id_empresa: number) => {
	return api.get(`empresas/${id_empresa}/mentores`)
}

export const getLogs = async (id_empresa: number) => {
	return api.get<CompanyLogsDataType[]>(`empresas/${id_empresa}/logs`)
}

export const getPessoas = async (
	id_empresa: number,
): Promise<{ data: { data: PessoaDataType[] } }> => {
	return api.get(`empresas/${id_empresa}/pessoas`)
}
