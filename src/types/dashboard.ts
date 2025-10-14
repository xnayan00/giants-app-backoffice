export interface EmpresaResponse {
	resultado_final: {
		pessoas_empresa: PessoaEmpresa[]
		indicadores: Indicador[]
		eventos_empresa_perfil: EventoEmpresaPerfil[]
		eventos_empresa_tipo: EventoEmpresaTipo[]
	}
}

export interface PessoaEmpresa {
	perfil: string
	total: number
}

export interface Indicador {
	id:
		| "qtd_pessoas"
		| "qtd_pessoas_ativas"
		| "qtd_eventos"
		| "qtd_pessoas_eventos"
		| "qtd_pessoas_pendentes"
		| "qtd_eventos_pessoas_pendentes"
	total: number
}

export interface EventoEmpresaPerfil {
	perfil: string
	total: number
}

export interface EventoEmpresaTipo {
	gr_descricao: string
	total: number
}

// Como o JSON é um array:
export type DashboardResponseList = EmpresaResponse[]
