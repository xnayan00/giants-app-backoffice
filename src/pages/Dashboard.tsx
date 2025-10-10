import { AppBar } from "@/components/AppBar"
import { useNavigate } from "react-router-dom"
import logoGiants from "@/assets/logo-horizontal-white.svg"
import { useEffect, useState } from "react"
import { getCalendarioAction } from "@/services/eventsService"
import { getConsumoEmpresa } from "@/services/companyService"
import { EventoDataType } from "@/types/events"
import { formatDate } from "@/utils/formatDate"
import { EmpresaConsumo } from "@/types/company"
import { fetchMembrosAction } from "@/services/membrosService"
import { MembroDataType } from "@/types/membros"

export default function Dashboard() {
	const navigate = useNavigate()
	const [currentMember, setCurrentMember] = useState<MembroDataType>()
	const [nextEvent, setNextEvent] = useState<EventoDataType>()
	const [empresaConsumo, setEmpresaConsumo] = useState<EmpresaConsumo[]>([])

	useEffect(() => {
		getCalendarioAction()
			.then(({ data }) => {
				const dataAtual = new Date()

				const eventosFuturosDisponiveis = data.data.filter((evento) => {
					const dataInicioEvento = new Date(evento.data_inicio)
					return dataInicioEvento >= dataAtual && evento.inscrito === false
				})

				const proximoEvento =
					eventosFuturosDisponiveis.length > 0
						? eventosFuturosDisponiveis.reduce((maisProximo, eventoAtual) => {
								const dataMaisProximo = new Date(maisProximo.data_inicio)
								const dataEventoAtual = new Date(eventoAtual.data_inicio)

								return dataEventoAtual < dataMaisProximo
									? eventoAtual
									: maisProximo
						  }, eventosFuturosDisponiveis[0])
						: null

				setNextEvent(proximoEvento)
			})
			.catch((error) => {
				console.log(error)
			})

		getConsumoEmpresa(198)
			.then(({ data }) => {
				setEmpresaConsumo([data[0], data[1]])
			})
			.catch((error) => {
				console.log(error)
			})

		fetchMembrosAction({ pes_email: "yan.mendes@grupoacelerador.com.br" })
			.then(({ data }) => {
				setCurrentMember(data.data[0])
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return (
		<div className="app-container">
			{/* Header */}
			<header className="bg-surface-elevated border-b border-border p-6 space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<img
							src={logoGiants}
							alt="Logotipo Giants"
							width={120}
						/>
					</div>
					{/* <div>
						<h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
						<p className="text-sm text-muted-foreground">{user.role}</p>
					</div> */}
					<button
						onClick={() => navigate("/profile")}
						className="rounded-full flex items-center justify-center hover:bg-muted/80 transition-smooth"
					>
						<i className="fi fi-ts-circle-user flex aling-center justify-center text-4xl text-foreground"></i>
					</button>
				</div>
			</header>

			{/* Main Content */}
			<main className="p-6 space-y-6 animate-fade-in">
				{/* Next Event Card */}
				{nextEvent && (
					<div className="card-elevated p-6 space-y-4">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
								<i className="fi fi-ts-calendar flex align-center justify-center text-primary text-lg"></i>
							</div>
							<div>
								<p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
									Próximo Evento
								</p>
								<h2 className="text-lg font-semibold text-foreground">
									{nextEvent.descricao}
								</h2>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2 text-muted-foreground">
								<i className="fi fi-ts-clock text-sm"></i>
								<span className="text-sm">
									{formatDate(nextEvent.data_inicio)}
								</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<i className="fi fi-ts-marker text-sm"></i>
								<span className="text-sm">{nextEvent.endereco}</span>
							</div>
						</div>
					</div>
				)}

				{/* Stats Grid */}
				{empresaConsumo.length > 0 && (
					<div className="grid grid-cols-2 gap-4">
						<div className="card-premium p-6 space-y-2">
							<div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
								<i className="fi fi-ts-diploma flex align-center justify-center text-accent text-lg"></i>
							</div>
							<div>
								<p className="text-3xl font-bold text-foreground">
									{empresaConsumo[0].consumido}
								</p>
								<p className="text-sm text-muted-foreground">
									{empresaConsumo[0].grupo}
								</p>
							</div>
						</div>

						<div className="card-premium p-6 space-y-2">
							<div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
								<i className="fi fi-ts-handshake flex align-center justify-center text-accent text-lg"></i>
							</div>
							<div>
								<p className="text-3xl font-bold text-foreground">
									{empresaConsumo[1].consumido}
								</p>
								<p className="text-sm text-muted-foreground">
									{empresaConsumo[1].grupo}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Quick Actions */}
				<div className="space-y-3">
					<div className="space-y-2">
						<button
							onClick={() => navigate("/network")}
							className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover"
						>
							<div className="flex items-center gap-3">
								<i className="fi fi-ts-network-analytic flex align-center justify-center text-foreground text-lg"></i>
								<div className="flex flex-col text-left">
									<span className="text-foreground font-medium">
										Network Giants
									</span>
									<span className="text-xs text-muted-foreground">
										Eles se conectam com você
									</span>
								</div>
							</div>
							<i className="fi fi-ts-angle-right flex align-center justify-center text-muted-foreground"></i>
						</button>

						<button
							onClick={() => navigate("/progresso")}
							className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover"
						>
							<div className="flex items-center gap-3">
								<i className="fi fi-ts-bars-progress flex align-center justify-center text-foreground text-lg"></i>
								<div className="flex flex-col text-left">
									<span className="text-foreground font-medium">
										Meu progresso
									</span>
									<span className="text-xs text-muted-foreground">
										Veja detalhes da sua jornada Giants
									</span>
								</div>
							</div>
							<i className="fi fi-ts-angle-right flex align-center justify-center text-muted-foreground"></i>
						</button>
					</div>
				</div>

				{/* GS Data */}
				<div className="space-y-3">
					{/* GS Card */}
					{currentMember && (
						<div className="card-elevated p-6 space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<span className="text-foreground text-sm font-medium">
										{"Gerente de Sucesso (GS)"}
									</span>
									<h2 className="text-lg font-semibold text-foreground">
										{currentMember.gs_nome}
									</h2>
								</div>
								<div className="flex items-center gap-2">
									<button className="w-[50px] h-[50px] rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth">
										<a
											className="w-full h-full flex items-center justify-center"
											href={`https://api.whatsapp.com/send?phone=55${currentMember.gs_fone}`}
											target="_blank"
										>
											<i className="fi fi-brands-whatsapp flex align-center justify-center text-xl text-foreground"></i>
										</a>
									</button>
									<button className="w-[50px] h-[50px] rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth">
										<a
											className="w-full h-full flex items-center justify-center"
											href={`mailto:${currentMember.gs_email}`}
											target="_blank"
										>
											<i className="fi fi-ts-envelope flex align-center justify-center text-xl text-foreground"></i>
										</a>
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</main>

			<AppBar />
		</div>
	)
}
