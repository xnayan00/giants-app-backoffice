import { FetchMembrosParamsDataType } from "@/types/membros"
import api from "../http/api"

export const fetchMembrosAction = async (
	params?: FetchMembrosParamsDataType
) => {
	const queryString = new URLSearchParams(
		params as Record<string, string>
	).toString()

	return api.get(`/membros${queryString ? `?${queryString}` : ""}`)
}
