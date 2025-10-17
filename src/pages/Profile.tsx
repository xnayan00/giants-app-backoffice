import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Profile() {
	const navigate = useNavigate()
	const { user } = useAuth()

	if (!user) {
		return <div>Carregando...</div>
	}

	return (
		<div className="app-container">
			{/* Header */}
			<header className="sticky top-0 z-10 bg-background border-b border-border">
				<div className="flex items-center gap-4 px-4 py-4">
					<button
						onClick={() => navigate(-1)}
						className="p-2 hover:bg-surface rounded-lg transition-smooth"
					>
						<i className="fi fi-ts-arrow-left flex align-center justify-center text-xl text-foreground"></i>
					</button>
					<h1 className="text-xl font-semibold text-foreground">Meu perfil</h1>
				</div>
			</header>

			{/* Main Content */}
			<main className="p-6 space-y-6 animate-fade-in">
				{/* User Info Card */}
				<div className="card-elevated p-6 space-y-6">
					<div className="flex flex-col items-center text-center space-y-3">
						<div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
							<i className="fi fi-ts-user text-4xl text-foreground"></i>
						</div>
						<div>
							<h2 className="text-2xl font-bold text-foreground">
								{user.pes_nome}
							</h2>
							<p className="text-sm text-muted-foreground">{user.pes_email}</p>
						</div>
						{/* <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth flex items-center gap-2">
							<i className="fi fi-ts-edit"></i>
							Editar Perfil
						</button> */}
					</div>
				</div>

				{/* Stats Grid */}
				{/* <div className="grid grid-cols-2 gap-4">
					<div className="card-premium p-4 space-y-2">
						<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
							<i className="fi fi-ts-diploma text-primary"></i>
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">
								{user.pes_}
							</p>
							<p className="text-xs text-muted-foreground">Imersões</p>
						</div>
					</div>

					<div className="card-premium p-4 space-y-2">
						<div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
							<i className="fi fi-ts-handshake text-accent"></i>
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">
								{user.stats.encontros}
							</p>
							<p className="text-xs text-muted-foreground">Encontros</p>
						</div>
					</div>

					<div className="card-premium p-4 space-y-2">
						<div className="w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center">
							<i className="fi fi-ts-presentation text-purple-400"></i>
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">
								{user.stats.palestras}
							</p>
							<p className="text-xs text-muted-foreground">Palestras</p>
						</div>
					</div>

					<div className="card-premium p-4 space-y-2">
						<div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
							<i className="fi fi-ts-link text-yellow-400"></i>
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">
								{user.stats.conexoes}
							</p>
							<p className="text-xs text-muted-foreground">Conexões</p>
						</div>
					</div>
				</div> */}

				{/* Settings */}
				<div className="space-y-3">
					<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
						Configurações
					</h3>

					<div className="space-y-2">
						<button className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover">
							<div className="flex items-center gap-3">
								<i className="fi fi-ts-bell text-foreground"></i>
								<span className="text-foreground font-medium">
									Notificações
								</span>
							</div>
							<i className="fi fi-ts-angle-right text-muted-foreground"></i>
						</button>

						<button className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover">
							<div className="flex items-center gap-3">
								<i className="fi fi-ts-skill-user text-foreground"></i>
								<span className="text-foreground font-medium">
									Enviar Feedback
								</span>
							</div>
							<i className="fi fi-ts-angle-right text-muted-foreground"></i>
						</button>

						<button className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover">
							<div className="flex items-center gap-3">
								<i className="fi fi-ts-interrogation text-foreground"></i>
								<span className="text-foreground font-medium">
									Ajuda & Suporte
								</span>
							</div>
							<i className="fi fi-ts-angle-right text-muted-foreground"></i>
						</button>

						<button
							onClick={() => navigate("/login")}
							className="w-full card-premium p-4 flex items-center justify-between transition-smooth hover:bg-surface-hover text-red-400"
						>
							<div className="flex items-center gap-3">
								<i className="fi fi-ts-sign-out-alt"></i>
								<span className="font-medium">Sair</span>
							</div>
							<i className="fi fi-ts-angle-right"></i>
						</button>
					</div>
				</div>
			</main>
		</div>
	)
}
