import { Evento, EventoCard } from "@/components/EventoCard"
import { Button } from "@/components/ui/button"
import { getCalendarioAction } from "@/services/eventsService"
import { EventoDataType } from "@/types/events"
import { useEffect, useState } from "react"
import patternBg from "@/assets/pattern-bg.png"

export default function BackofficeEventos() {
	const [eventos, setEventos] = useState<EventoDataType[]>([])

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
							className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>

					{/* Filtro de Inscrições */}
					<select className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
						<option>Inscrições pendentes</option>
						<option>Inscrito</option>
						<option>Disponível</option>
						<option>Todos</option>
					</select>

					{/* Filtro de Status */}
					<select className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
						<option>Próximos</option>
						<option>Encerrados</option>
						<option>Todos</option>
					</select>

					{/* Filtro de Período */}
					<select className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
						<option>Próximos 3 meses</option>
						<option>Ano passado</option>
						<option>Mês passado</option>
						<option>Próximo mês</option>
						<option>Este ano</option>
						<option>Todos</option>
					</select>
				</div>
			</div>

			{/* Listagem de Eventos */}
			<div className="card-elevated p-6 space-y-4">
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
						<span>Encontrados: {eventos.length} Registros</span>
					</div>
				</div>

				<div className="space-y-4">
					{eventos.map((evento) => (
						<div
							key={evento.id}
							className="bg-surface border border-border rounded-lg p-4 space-y-3"
						>
							<div className="flex items-start justify-between">
								<div className="flex gap-4">
									<div className="w-16 h-16 rounded-lg bg-surface-elevated flex items-center justify-center overflow-hidden">
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
									<div>
										<h3 className="font-semibold text-foreground">
											{evento.descricao}
										</h3>
										<p className="text-sm text-muted-foreground">
											Exclusivo Membros Giants
										</p>
									</div>
								</div>
								<div className="flex items-center gap-4 text-sm">
									<div className="flex items-center gap-2 text-muted-foreground">
										<i className="fi fi-ts-calendar"></i>
										<span>
											{new Date(evento.data_inicio).toLocaleDateString("pt-BR")}
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
									<span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
										Aberta
									</span>
									<Button
										variant="outline"
										size="sm"
									>
										Inscrições
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
