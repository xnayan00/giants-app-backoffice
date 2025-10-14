import api from "@/http/api"
import { DashboardResponseList } from "@/types/dashboard"

export const getDashboard = (emp_id: number) => {
	return api.get<DashboardResponseList>(
		`/plataforma/dashboard?emp_id=${emp_id}`,
	)
}
