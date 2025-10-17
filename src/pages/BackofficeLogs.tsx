import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { getLogs } from "@/services/companyService"
import { CompanyLogsDataType } from "@/types/company"
import { formatDate } from "@/utils/formatDate"
import { useEffect, useState } from "react"

interface Log {
	id: number
	datetime: string
	user: string
	action: string
	details: string
}

export default function BackofficeLogs() {
	const [logs, setLogs] = useState<CompanyLogsDataType[]>([])
	const [filteredLogs, setFilteredLogs] = useState<CompanyLogsDataType[]>([])
	const [filter, setFilter] = useState("todos")

	useEffect(() => {
		getLogs(198)
			.then(({ data }) => {
				setLogs(data)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	useEffect(() => {
		const filtered = logs.filter((log) => {
			if (filter === "todos") return true
			return log.detalhes.toLowerCase().includes(filter.slice(0, -1))
		})
		setFilteredLogs(filtered)
	}, [logs, filter])

	return (
		<div className="space-y-6 animate-fade-in">
			<div>
				<h1 className="text-2xl font-bold text-foreground">
					Logs de Atividade
				</h1>
				<p className="text-sm text-muted-foreground">
					Histórico detalhado de todas as ações realizadas no sistema
				</p>
			</div>

			{/* Filtro */}
			<div className="card-elevated p-4">
				<Select onValueChange={setFilter} value={filter}>
					<SelectTrigger className="w-full bg-surface border-border">
						<SelectValue placeholder="Filtro" />
					</SelectTrigger>
					<SelectContent className="bg-surface border-border">
						<SelectItem value="todos">Todos</SelectItem>
						<SelectItem value="eventos">Eventos</SelectItem>
						<SelectItem value="usuarios">Usuários</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Tabela de Logs */}
			<div className="card-elevated overflow-hidden">
				<div className="p-6 border-b border-border">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-lg font-semibold text-foreground">
								Registro de Atividades
							</h2>
							<p className="text-sm text-muted-foreground">
								Histórico cronológico de todas as ações administrativas
							</p>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<i className="fi fi-ts-edit"></i>
							<span>Encontrados: {filteredLogs.length} Registros</span>
						</div>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-surface-elevated border-b border-border">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
									Data/Hora
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
									Usuário
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
									Ação
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
									Detalhes
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{filteredLogs.map((log, index) => (
								<tr
									key={index}
									className="hover:bg-surface-hover transition-colors"
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
										{formatDate(log.datetime)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
										{log.pes_nome}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
										{log.acao}
									</td>
									<td className="px-6 py-4 text-sm text-muted-foreground">
										{log.detalhes}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}