import api from "@/http/api"
import type { MentoresType } from "@/types/mentorias"

export const getMentores = async (
	company_id: number,
): Promise<{ data: { data: MentoresType[] } }> => {
	return api.get(`/mentorias/${company_id}/mentores`)
}
