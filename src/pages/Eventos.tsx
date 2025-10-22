import { AppBar } from "@/components/AppBar"
import { EventoBottomSheet } from "@/components/EventoBottomSheet"
import { getCalendarioAction } from "@/services/eventsService"
import { EventoDataType } from "@/types/events"
import { getDate, getTime } from "@/utils/formatDate"
import { isFuture, isPast, isThisMonth, isThisWeek } from "date-fns"
import { useEffect, useState } from "react"
import patternBg from "@/assets/pattern-bg.png"
import Icon from "@/components/Icon"
import PageHeader from "@/components/reusable/PageHeader"
import PageMainContainer from "@/components/reusable/PageMainContainer"
import App from "@/App"

export default function Eventos() {
	const [eventos, setEventos] = useState<EventoDataType[]>([])
	const [selectedEvento, setSelectedEvento] = useState<EventoDataType | null>(
		null,
	)

	const [search, setSearch] = useState("")
	const [dateFilter, setDateFilter] = useState("todos")
	const [participationFilter, setParticipationFilter] = useState("todos")
	const [periodFilter, setPeriodFilter] = useState("todos-periodos")

	const [filteredEventos, setFilteredEventos] = useState<EventoDataType[]>([])

	useEffect(() => {
		getCalendarioAction({ pes_id: 198 })
			.then(({ data }) => {
				setEventos(data.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	useEffect(() => {
		const filtered = eventos
			.filter((evento) => {
				if (!search) return true
				return evento.descricao.toLowerCase().includes(search.toLowerCase())
			})
			.filter((evento) => {
				if (dateFilter === "proximos")
					return isFuture(new Date(evento.data_inicio))
				if (dateFilter === "passados")
					return isPast(new Date(evento.data_inicio))
				return true
			})
			// .filter((evento) => {
			// 	if (participationFilter === "confirmado")
			// 		return evento.participacao === "Confirmado"
			// 	if (participationFilter === "aguardando")
			// 		return evento.participacao === "Aguardando"
			// 	return true
			// })
			.filter((evento) => {
				if (periodFilter === "esta-semana")
					return isThisWeek(new Date(evento.data_inicio))
				if (periodFilter === "este-mes")
					return isThisMonth(new Date(evento.data_inicio))
				return true
			})

		setFilteredEventos(filtered)
	}, [eventos, search, dateFilter, participationFilter, periodFilter])

	const baseShadow =
		"inset 6px 6px 14px rgba(0,0,0,0.7), inset -6px -6px 14px rgba(255,255,255,0.03)"
	const focusShadow =
		"0 8px 30px rgba(99,102,241,0.08), inset 3px 3px 8px rgba(0,0,0,0.7), inset -3px -3px 8px rgba(255,255,255,0.03)"

	return (
		<div className="app-container bg-transparent">
			{/* Header */}
			<PageHeader pageName="eventos" />

			{/* Events List */}
			<PageMainContainer>
				{/* Search and Filters */}
				<div className="space-y-4">
					<div className="flex items-center gap-1 bg-muted-foreground/10 px-4">
						<Icon
							name="search"
							color="#555"
						/>
						<input
							type="text"
							placeholder="Pesquisar evento"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full h-12 px-2 bg-transparent rounded-xl text-foreground placeholder:text-muted-foreground outline-none transition-smooth"
						/>
					</div>
					{/* <div className="grid grid-cols-3 gap-2">
					<select
						value={dateFilter}
						onChange={(e) => setDateFilter(e.target.value)}
						className="h-12 px-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
					>
						<option value="todos">Todos</option>
						<option value="proximos">Próximos</option>
						<option value="passados">Passados</option>
					</select>
					<select
						value={participationFilter}
						onChange={(e) => setParticipationFilter(e.target.value)}
						className="h-12 px-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
					>
						<option value="todos">Participação</option>
						<option value="confirmado">Confirmado</option>
						<option value="aguardando">Aguardando</option>
					</select>
					<select
						value={periodFilter}
						onChange={(e) => setPeriodFilter(e.target.value)}
						className="h-12 px-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
					>
						<option value="todos-periodos">Período</option>
						<option value="esta-semana">Esta semana</option>
						<option value="este-mes">Este mês</option>
					</select>
				</div> */}
				</div>
				{filteredEventos.map((evento, index) => (
					<div
						key={evento.id}
						className="card-elevated bg-muted-foreground/10 overflow-hidden transition-smooth hover:scale-[1.01] cursor-pointer"
						style={{ animationDelay: `${index * 0.1}s` }}
						onClick={() => setSelectedEvento(evento)}
					>
						{/* Date/Time Badge */}
						<div className="flex items-center justify-center gap-3 py-3 px-4 bg-muted-foreground/10 border-b border-border">
							<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
								<i className="fi fi-ts-calendar"></i>
								<span>{getDate(evento.data_inicio)}</span>
							</div>
							<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
								<i className="fi fi-ts-clock"></i>
								<span>{getTime(evento.data_inicio)}</span>
							</div>
						</div>

						<div className="p-5">
							{/* Thumbnail */}
							<div className="w-full overflow-hidden h-24 bg-surface rounded-lg flex items-center justify-center text-5xl mb-4">
								{!evento.eve_foto_url ? (
									<img
										src={patternBg}
										alt=""
									/>
								) : (
									<img
										src={evento.eve_foto_url}
										alt=""
										className="w-full h-full object-cover"
									/>
								)}
							</div>

							{/* Event Info */}
							<div className="space-y-3">
								<div>
									<h3 className="text-base font-semibold text-foreground mb-2">
										{evento.descricao}
									</h3>
									<span className="inline-block text-xs px-2 py-1 rounded-full bg-surface-hover text-muted-foreground">
										{evento.origem}
									</span>
								</div>

								{/* Participants and Action */}
								<div className="flex items-center justify-between pt-2">
									<div className="flex items-center gap-2">
										<div className="flex -space-x-2">
											{evento.pessoas_insc.map((pessoa, index) => (
												<div
													key={pessoa.pes_id + index}
													className="w-8 h-8 overflow-hidden rounded-full bg-accent flex items-center justify-center text-xs border-2 border-surface-elevated"
												>
													{pessoa.foto_url === null ? (
														<>👤</>
													) : (
														<img
															src={pessoa.foto_url}
															alt=""
														/>
													)}
												</div>
											))}
										</div>
										<span className="text-sm text-muted-foreground font-medium">
											+{evento.inscritos} Participantes
										</span>
									</div>

									<button className="w-12 h-12 rounded-full bg-surface-hover border border-border flex items-center justify-center transition-smooth hover:bg-accent/10 hover:border-accent">
										<i className="fi fi-ts-plus text-lg text-foreground"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</PageMainContainer>

			<AppBar />

			<EventoBottomSheet
				open={!!selectedEvento}
				onOpenChange={(open) => {
					if (!open) {
						setSelectedEvento(null)
					}
				}}
				evento={selectedEvento}
			/>
		</div>
	)
}
