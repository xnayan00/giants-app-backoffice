import api from "@/http/api"
import {
	CalendarioDataType,
	EventSubscriptionType,
	GetCalendarioParamsDataType,
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
