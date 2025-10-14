import { Evento, EventoCard } from "@/components/EventoCard"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getCalendarioAction } from "@/services/eventsService"
import { EventoDataType } from "@/types/events"
import { useEffect, useState } from "react"
import patternBg from "@/assets/pattern-bg.png"

export default function BackofficeEventos() {
	const [eventos, setEventos] = useState<EventoDataType[]>([])

	useEffect(() => {
		getCalendarioAction({ emp_id: 198 })
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
						<span>Encontrados: {eventos.length} Registros</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{eventos.map((evento) => {
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
										Inscrever-se
									</Button>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
