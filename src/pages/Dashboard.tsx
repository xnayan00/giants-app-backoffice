import { AppBar } from "@/components/AppBar"
import logoGiants from "@/assets/logo-horizontal-white.svg"

export default function Dashboard() {
	const user = {
		name: "João Silva",
		role: "Participante",
		nextEvent: {
			name: "Imersão Tech 2025",
			date: "15 de Março, 2025",
			location: "São Paulo, SP"
		},
		stats: {
			imersoes: 3,
			encontros: 12
		}
	}

	const gs = {
		name: "Ana Souza",
		whatsapp: "5511999999999",
		email: "ana.souza@example.com"
	}

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
						onClick={() => (window.location.href = "/profile")}
						className="rounded-full flex items-center justify-center hover:bg-muted/80 transition-smooth"
					>
						<i className="fi fi-ts-circle-user flex aling-center justify-center text-4xl text-foreground"></i>
					</button>
				</div>
			</header>

			{/* Main Content */}
			<main className="p-6 space-y-6 animate-fade-in">
				{/* Next Event Card */}
				<div className="card-elevated p-6 space-y-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
							<i className="fi fi-ts-calendar text-primary text-lg"></i>
						</div>
						<div>
							<p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
								Próximo Evento
							</p>
							<h2 className="text-lg font-semibold text-foreground">
								{user.nextEvent.name}
							</h2>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-2 text-muted-foreground">
							<i className="fi fi-ts-clock text-sm"></i>
							<span className="text-sm">{user.nextEvent.date}</span>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<i className="fi fi-ts-marker text-sm"></i>
							<span className="text-sm">{user.nextEvent.location}</span>
						</div>
					</div>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-2 gap-4">
					<div className="card-premium p-6 space-y-2">
						<div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
							<i className="fi fi-ts-diploma text-accent text-lg"></i>
						</div>
						<div>
							<p className="text-3xl font-bold text-foreground">
								{user.stats.imersoes}
							</p>
							<p className="text-sm text-muted-foreground">Imersões</p>
						</div>
					</div>

					<div className="card-premium p-6 space-y-2">
						<div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
							<i className="fi fi-ts-handshake text-accent text-lg"></i>
						</div>
						<div>
							<p className="text-3xl font-bold text-foreground">
								{user.stats.encontros}
							</p>
							<p className="text-sm text-muted-foreground">Encontros</p>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="space-y-3">
					<div className="space-y-2">
						<button className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover">
							<div className="flex items-center gap-3">
								<i className="fi fi-ts-network-analytic text-foreground text-lg"></i>
								<div className="flex flex-col text-left">
									<span className="text-foreground font-medium">
										Network Giants
									</span>
									<span className="text-xs text-muted-foreground">
										Eles se conectam com você
									</span>
								</div>
							</div>
							<i className="fi fi-ts-angle-right text-muted-foreground"></i>
						</button>

						<button className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover">
							<div className="flex items-center gap-3">
								<i className="fi fi-ts-bars-progress text-foreground text-lg"></i>
								<div className="flex flex-col text-left">
									<span className="text-foreground font-medium">
										Meu progresso
									</span>
									<span className="text-xs text-muted-foreground">
										Veja detalhes da sua jornada Giants
									</span>
								</div>
							</div>
							<i className="fi fi-ts-angle-right text-muted-foreground"></i>
						</button>
					</div>
				</div>

				{/* GS Data */}
				<div className="space-y-3">
					{/* GS Card */}
					<div className="card-elevated p-6 space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<span className="text-foreground text-sm font-medium">
									{"Gerente de Sucesso (GS)"}
								</span>
								<h2 className="text-lg font-semibold text-foreground">
									{gs.name}
								</h2>
							</div>
							<div className="flex items-center gap-2">
								<button className="w-[50px] h-[50px] rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth">
									<a
										className="w-full h-full flex items-center justify-center"
										href={`https://wa.me/${gs.whatsapp}`}
										target="_blank"
									>
										<i className="fi fi-brands-whatsapp flex align-center justify-center text-xl text-foreground"></i>
									</a>
								</button>
								<button className="w-[50px] h-[50px] rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth">
									<a
										className="w-full h-full flex items-center justify-center"
										href={`mailto:${gs.email}`}
										target="_blank"
									>
										<i className="fi fi-ts-envelope flex align-center justify-center text-xl text-foreground"></i>
									</a>
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>

			<AppBar />
		</div>
	)
}
