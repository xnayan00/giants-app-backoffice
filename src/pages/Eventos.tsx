import { AppBar } from "@/components/AppBar"
import { EventoBottomSheet } from "@/components/EventoBottomSheet"
import { getCalendarioAction } from "@/services/eventsService"
import { EventoDataType } from "@/types/events"
import { getDate, getTime } from "@/utils/formatDate"
import { Image } from "lucide-react"
import { useEffect, useState } from "react"
import patternBg from "@/assets/pattern-bg.png"

export default function Eventos() {
	const [eventos, setEventos] = useState<EventoDataType[]>([])
	const [selectedEvento, setSelectedEvento] = useState<EventoDataType | null>(
		null
	)

	useEffect(() => {
		getCalendarioAction({ pes_id: 198 })
			.then(({ data }) => {
				setEventos(data.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return (
		<div className="app-container">
			{/* Header */}
			<header className="bg-surface-elevated border-b border-border p-6">
				<h1 className="text-2xl font-bold text-foreground text-center">
					Eventos
				</h1>
			</header>

			{/* Search and Filters */}
			<div className="p-6 pb-4 space-y-4">
				<div className="relative">
					<i className="fi fi-ts-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
					<input
						type="text"
						placeholder="Pesquisar Palavra"
						className="w-full h-12 pl-12 pr-4 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
					/>
				</div>

				{/* Filters */}
				<div className="grid grid-cols-3 gap-2">
					<select className="h-12 px-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth">
						<option>Próximos</option>
						<option>Passados</option>
					</select>
					<select className="h-12 px-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth">
						<option>Participação</option>
						<option>Confirmado</option>
						<option>Aguardando</option>
					</select>
					<select className="h-12 px-3 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth">
						<option>Período</option>
						<option>Esta semana</option>
						<option>Este mês</option>
					</select>
				</div>
			</div>

			{/* Events List */}
			<main className="px-6 pb-6 space-y-4 animate-fade-in">
				{eventos.map((evento, index) => (
					<div
						key={evento.id}
						className="card-elevated overflow-hidden transition-smooth hover:scale-[1.01] cursor-pointer"
						style={{ animationDelay: `${index * 0.1}s` }}
						onClick={() => setSelectedEvento(evento)}
					>
						{/* Date/Time Badge */}
						<div className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-elevated border-b border-border">
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
			</main>

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
