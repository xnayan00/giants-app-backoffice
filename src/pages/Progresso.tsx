import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { AppBar } from "@/components/AppBar"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"
import { getConsumoEmpresa } from "@/services/companyService"
import { EmpresaConsumo } from "@/types/company"
import { Skeleton } from "@/components/ui/skeleton"

const Progresso = () => {
	const navigate = useNavigate()
	const { user } = useAuth()

	const [consumo, setConsumo] = useState<EmpresaConsumo[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (user?.emp_id) {
			getConsumoEmpresa(user.emp_id)
				.then((response) => {
					setConsumo(response.data)
					setLoading(false)
				})
				.catch(() => {
					setError("Erro ao buscar dados de consumo.")
					setLoading(false)
				})
		}
	}, [user])

	const userData = {
		name: user?.pes_nome || "Usuário",
		cycle: `Sua empresa está no ${user?.pes_ciclo || "N/A"}º Ciclo`,
		cycleNumber: `${user?.pes_ciclo || "N/A"}°`,
	}

	const stats =
		consumo.map((item) => ({
			label: item.grupo,
			value: Number(item.consumido),
		})) || []

	return (
		<div className="app-container min-h-screen bg-background pb-24">
			{/* Header */}
			<header className="sticky top-0 z-10 bg-background border-b border-border">
				<div className="flex items-center gap-4 px-4 py-4">
					<button
						onClick={() => navigate(-1)}
						className="p-2 hover:bg-surface rounded-lg transition-smooth"
					>
						<i className="fi fi-ts-arrow-left flex align-center justify-center text-xl text-foreground"></i>
					</button>
					<h1 className="text-xl font-semibold text-foreground">
						Meu Progresso
					</h1>
				</div>
			</header>

			{/* Content */}
			<div className="px-4 py-6 space-y-6 animate-fade-in">
				{/* Hero Card */}
				<Card className="bg-muted/30 border-border overflow-hidden">
					<CardContent className="p-6">
						<div className="flex gap-4">
							{/* Cycle Badge */}
							<div className="flex-shrink-0">
								<div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center">
									<span className="text-3xl font-bold text-foreground">
										{userData.cycleNumber}
									</span>
								</div>
							</div>

							{/* Info */}
							<div className="flex-1 space-y-2">
								<h2 className="text-lg font-semibold text-foreground">
									Parabéns!
								</h2>
								<p className="text-base font-medium text-foreground">
									{userData.name}
								</p>
								<div className="space-y-1">
									<p className="text-sm font-semibold text-muted-foreground">
										{userData.cycle}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Stats Grid */}
				{loading ? (
					<div className="grid grid-cols-2 gap-3">
						{Array.from({ length: 8 }).map((_, index) => (
							<Card
								key={index}
								className="bg-surface border-border"
							>
								<CardContent className="p-4 space-y-3">
									<Skeleton className="h-1 w-full rounded-full bg-muted/30" />
									<div className="space-y-1">
										<Skeleton className="h-9 w-1/2 bg-muted/30" />
										<Skeleton className="h-4 w-full bg-muted/30" />
										<Skeleton className="h-4 w-2/3 bg-muted/30" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				) : error ? (
					<div className="text-red-500 text-center">{error}</div>
				) : (
					<div className="grid grid-cols-2 gap-3">
						{stats.map((stat, index) => (
							<Card
								key={index}
								className="bg-surface border-border"
							>
								<CardContent className="p-4 space-y-3">
									<p className="text-xs text-muted-foreground">
										Sua empresa participou de
									</p>
									{/* <div className="h-1 bg-muted/30 rounded-full">
										<div className="h-full bg-primary/20 rounded-full w-1/3"></div>
									</div> */}
									<div className="space-y-1">
										<p className="text-4xl font-bold text-muted-foreground">
											{stat.value}
										</p>
										<p className="text-sm font-medium text-foreground">
											{stat.label}
										</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>

			<AppBar />
		</div>
	)
}

export default Progresso
