import {
	CompanyLogsDataType,
	EmpresaConsumo,
	FetchPessoaEmpresaParamsDataType,
	PessoaDataType,
} from "@/types/company"
import api from "../http/api"

export const getConsumoEmpresa = async (id_empresa: number) => {
	return api.get<EmpresaConsumo[]>(`empresas/${id_empresa}/consumo`)
}

export const getLogs = async (id_empresa: number) => {
	return api.get<CompanyLogsDataType[]>(`empresas/${id_empresa}/logs`)
}

export const getPessoas = async (
	id_empresa: number,
	params?: FetchPessoaEmpresaParamsDataType
): Promise<{ data: { data: PessoaDataType[], params?: FetchPessoaEmpresaParamsDataType} }> => {
	const queryString = new URLSearchParams(
		params as Record<string, string>
	).toString();

	return api.get(`empresas/${id_empresa}/pessoas${queryString ? `?${queryString}` : ""}`)
}
