export interface EmpresaConsumo {
	id_empresa: number
	empresa: string
	id_grupo: number
	grupo: string
	disponivel: string
	consumido: string
	entrada_giants: string
}

export interface PessoaDataType {
	pes_id: number
	pes_nome: string
	pes_nome_cracha: string
	pes_nome_certificado: string
	pes_cpf: string
	pes_email: string
	perfil: string
	cargo: string
	departamento: string
	pes_status: boolean
	admin: boolean
	pes_tem_foto: number
	pes_foto_url: string
}
