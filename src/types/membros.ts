export interface FetchMembrosParamsDataType {
	pes_email?: string
	qtd_pessoas?: number
	origem?: string
	id_origem?: number
	pes_id?: number
}

export interface MembroDataType {
	pes_id: number
	pes_tipo: number
	pes_tipo_desc: string
	pes_cpf: string
	pes_nome: string
	pes_telefone: string
	pes_email: string
	pes_nascimento: string
	pes_nome_certificado: string
	pes_nome_cracha: string
	pes_rg: string | null
	pes_deficiente: number
	pes_classificacao: number
	pes_instagram: string | null
	pes_cep: string
	pes_endereco: string | null
	pes_complemento: string | null
	pes_bairro: string | null
	cidade: string | null
	estado: string | null
	pes_linkedin: string | null
	pes_internacional: number
	pes_sexo: string
	pes_tem_foto: number
	pes_ciclo: number
	emp_id: number
	emp_razaosocial: string
	emp_fantasia: string
	emp_telefone: string
	emp_celular: string
	emp_email: string
	emp_cep: string
	emp_endereco: string
	emp_complemento: string
	emp_bairro: string
	emp_cidade: string
	emp_estado: string
	emp_numero_funcionarios: number
	emp_faturamento_anual: string
	prod_id: number
	emp_quantidade_socios: number
	empresas_fase_id: number
	emp_instagram: string
	emp_site: string
	emp_tempo_mercado: string
	emp_data_fundacao: string
	emp_gerente_sucesso: string
	catp_id: number
	catp_descricao: string
	cats_id: number
	cats_descricao: string
	emp_internacional: number
	diretor_id: number
	diretor_nome: string
	especialista_id: number | null
	especialista_nome: string | null
	mentor_id: number
	mentor_nome: string
	emp_tem_foto: number
	gs_nome: string
	gs_email: string
	gs_fone: string
	pes_foto_url: string
	emp_logo_url: string
}
