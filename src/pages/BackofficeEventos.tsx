import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getCalendarioAction } from "@/services/eventsService"
import { EventoDataType } from "@/types/events"
import { useEffect, useState } from "react"
import patternBg from "@/assets/pattern-bg.png"
import { isFuture, isPast } from "date-fns"
import { useLoading } from "@/hooks/useLoading"
import { Link } from "react-router-dom"

export default function BackofficeEventos() {
	const [eventos, setEventos] = useState<EventoDataType[]>([])
	const [filteredEventos, setFilteredEventos] = useState<EventoDataType[]>([])
	const { showLoading, hideLoading } = useLoading()


	const [search, setSearch] = useState("")
	const [inscriptionFilter, setInscriptionFilter] = useState("todos")
	const [statusFilter, setStatusFilter] = useState("todos")
	const [periodFilter, setPeriodFilter] = useState("todos")

	useEffect(() => {
		showLoading()
		getCalendarioAction({ emp_id: 198 })
			.then(({ data }) => {
				setEventos(data.data)
			})
			.catch((error) => {
				console.log(error)
			}).finally(() => {
				hideLoading()
			})
	}, [])

	useEffect(() => {
		const filtered = eventos
			.filter((evento) => {
				if (!search) return true
				return evento.descricao.toLowerCase().includes(search.toLowerCase())
			})
			.filter((evento) => {
				if (statusFilter === "proximos") return isFuture(new Date(evento.data_inicio))
				if (statusFilter === "encerrados") return isPast(new Date(evento.data_inicio))
				return true
			})
			.filter((evento) => {
				if (inscriptionFilter === "pendentes") return evento.pendentes > 0
				if (inscriptionFilter === "inscrito") return evento.inscritos > 0
				if (inscriptionFilter === "disponivel") return evento.inscritos === 0
				return true
			})
			.filter((evento) => {
				if (periodFilter === "proximos-3-meses") {
					const today = new Date()
					const threeMonthsLater = new Date()
					threeMonthsLater.setMonth(today.getMonth() + 3)
					return new Date(evento.data_inicio) <= threeMonthsLater
				}
				if (periodFilter === "ano-passado") {
					const lastYear = new Date().getFullYear() - 1
					return new Date(evento.data_inicio).getFullYear() === lastYear
				}
				if (periodFilter === "mes-passado") {
					const lastMonth = new Date().getMonth() - 1
					return new Date(evento.data_inicio).getMonth() === lastMonth
				}
				if (periodFilter === "proximo-mes") {
					const nextMonth = new Date().getMonth() + 1
					return new Date(evento.data_inicio).getMonth() === nextMonth
				}
				if (periodFilter === "este-ano") {
					const thisYear = new Date().getFullYear()
					return new Date(evento.data_inicio).getFullYear() === thisYear
				}
				return true
			})

		setFilteredEventos(filtered)
	}, [eventos, search, inscriptionFilter, statusFilter, periodFilter])

	return (
		<div className="space-y-6 animate-fade-in">
			<div>
				<h1 className="text-2xl font-bold text-foreground">
					Gestão de Eventos
				</h1>
				<p className="text-sm text-muted-foreground">
					Gerencie Eventos, inscrições e calendário de eventos
				</p>
			</div>

			{/* Filtros */}
			<div className="card-elevated p-4">
				<div className="flex flex-col lg:flex-row gap-4">
					{/* Campo de busca */}
					<div className="flex-1 relative">
						<i className="fi fi-ts-search absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
						<input
							type="text"
							placeholder="Buscar por nome ou e-mail..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>

					{/* Filtro de Inscrições */}
					<select
						value={inscriptionFilter}
						onChange={(e) => setInscriptionFilter(e.target.value)}
						className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="pendentes">Inscrições pendentes</option>
						<option value="inscrito">Inscrito</option>
						<option value="disponivel">Disponível</option>
						<option value="todos">Todos</option>
					</select>

					{/* Filtro de Status */}
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="proximos">Próximos</option>
						<option value="encerrados">Encerrados</option>
						<option value="todos">Todos</option>
					</select>

					{/* Filtro de Período */}
					<select
						value={periodFilter}
						onChange={(e) => setPeriodFilter(e.target.value)}
						className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="proximos-3-meses">Próximos 3 meses</option>
						<option value="ano-passado">Ano passado</option>
						<option value="mes-passado">Mês passado</option>
						<option value="proximo-mes">Próximo mês</option>
						<option value="este-ano">Este ano</option>
						<option value="todos">Todos</option>
					</select>
				</div>
			</div>

			{/* Listagem de Eventos */}
			<div className="card-elevated bg-surface p-6 space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-lg font-semibold text-foreground">
							Listagem de Eventos
						</h2>
						<p className="text-sm text-muted-foreground">
							Eventos com um ou mais colaboradores inscritos
						</p>
					</div>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<i className="fi fi-ts-edit"></i>
						<span>Encontrados: {filteredEventos.length} Registros</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredEventos.map((evento) => {
						const autorizados =
							parseInt(evento.autorizados as unknown as string) || 0
						const recusados =
							parseInt(evento.recusados as unknown as string) || 0
						const pendentes =
							parseInt(evento.pendentes as unknown as string) || 0
						const total = autorizados + recusados + pendentes
						const progresso =
							total > 0 ? ((autorizados + recusados) / total) * 100 : 0

						return (
							<Link to={`/backoffice/eventos/${evento.origem}/${evento.id}/inscricoes`}>
							<div
								key={evento.id}
								className={`bg-surface border border-border rounded-lg p-4 space-y-3`}
							>
								<div className="flex flex-col items-start gap-4">
									<div className="w-full rounded-lg overflow-hidden h-[100px] left-0 top-0 bg-surface-elevated">
										{evento.eve_foto_url ? (
											<img
												src={evento.eve_foto_url}
												alt={evento.descricao}
												className="w-full h-full object-cover"
											/>
										) : (
											<img
												src={patternBg}
												alt=""
												className="w-full h-full object-cover"
											/>
										)}
									</div>
									<div className="flex justify-between w-full">
										<div>
											<h3 className="font-semibold text-foreground">
												{evento.descricao}
											</h3>
											<p className="text-sm text-muted-foreground">
												Exclusivo Membros Giants
											</p>
										</div>

										<div>
											<span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
												Aberta
											</span>
										</div>
									</div>
									<div className="flex items-center gap-4 text-sm">
										<div className="flex items-center gap-2 text-muted-foreground">
											<i className="fi fi-ts-calendar"></i>
											<span>
												{new Date(evento.data_inicio).toLocaleDateString(
													"pt-BR",
												)}
											</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<i className="fi fi-ts-clock"></i>
											<span>
												{new Date(evento.data_fim).toLocaleTimeString("pt-BR", {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</span>
										</div>
									</div>
								</div>
								<div className="space-y-2">
									<Progress value={progresso} />
									<div className="flex gap-2 text-xs text-muted-foreground">
										<div className="flex items-center gap-2">
											<span className="w-2 h-2 rounded-full bg-green-500"></span>
											<span>Aprovados: {autorizados}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="w-2 h-2 rounded-full bg-red-500"></span>
											<span>Recusados: {recusados}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="w-2 h-2 rounded-full bg-yellow-500"></span>
											<span>Pendentes: {pendentes}</span>
										</div>
									</div>
								</div>

								<div>
									<Button
										variant="outline"
										size="sm"
										className="w-full"
									>
										Ver inscrições
									</Button>
								</div>
							</div>
							</Link>
						)
					})}
				</div>
			</div>
		</div>
	)
}
