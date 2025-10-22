interface PessoaInscrita {
	pes_id: number
	foto_url: string
}

export interface EventoDataType {
	id: number
	turma: number
	descricao: string
	data_inicio: string
	data_limite: string
	data_fim: string
	local: string
	endereco: string
	status: number
	origem: string
	inscritos: string
	tem_foto: number
	formato: string
	formato_id: number
	pessoas_insc: PessoaInscrita[]
	inscrito: boolean
	eve_foto_url: string
	link_inscricao: string | null
	autorizados?: string
	recusados?: string
	pendentes?: string
}

export interface CalendarioDataType {
	data: EventoDataType[]
	total: number
}

export interface GetCalendarioParamsDataType {
	pes_email?: string
	qtd_pessoas?: number
	origem?: string
	id_origem?: number
	emp_id?: number
	pes_id?: number
}

export interface PalestraDataType {
	id: number
	nome: string
	descricao: string
	link: string
	id_youtube: string
	categoria: string
	data: string
}

export interface EventSubscriptionType {
	id_pessoa: number
	id_produto: number
	turma: number
	origem: string
}
