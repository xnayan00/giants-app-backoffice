import api from "@/http/api"
import {
	CalendarioDataType,
	EventSubscriptionType,
	GetCalendarioParamsDataType,
	Inscricao,
	PalestraDataType,
} from "@/types/events"

export const getCalendarioAction = async (
	params?: GetCalendarioParamsDataType,
) => {
	const queryString = new URLSearchParams(
		params as Record<string, string>,
	).toString()

	return api.get<CalendarioDataType>(
		`/calendario${queryString ? `?${queryString}` : ""}`,
	)
}

export const getPalestras = async () => {
	return api.get<PalestraDataType[]>("/palestras")
}

export const subscribeEvent = async (payload: EventSubscriptionType) => {
	return api.post(`/inscricao`, payload)
}

// TODO: Implement API calls
export const getInscricoesByEvento = async (eventoId: number): Promise<Inscricao[]> => {
	console.log(eventoId)
	// Mock data - replace with API call
	return Promise.resolve([
		{
			id: 1,
			nome: "João da Silva",
			email: "joao.silva@example.com",
			status: "Pendente",
		},
		{
			id: 2,
			nome: "Maria Oliveira",
			email: "maria.oliveira@example.com",
			status: "Aprovado",
		},
		{
			id: 3,
			nome: "Carlos Pereira",
			email: "carlos.pereira@example.com",
			status: "Reprovado",
		},
			{
			id: 4,
			nome: "Ana Souza",
			email: "ana.souza@example.com",
			status: "Pendente",
		},
	]);
}

export const approveInscricao = async (inscricaoId: number): Promise<void> => {
	console.log(inscricaoId)
	// Mock data - replace with API call
	return Promise.resolve()
}

export const reproveInscricao = async (inscricaoId: number): Promise<void> => {
	console.log(inscricaoId)
	// Mock data - replace with API call
	return Promise.resolve()
}