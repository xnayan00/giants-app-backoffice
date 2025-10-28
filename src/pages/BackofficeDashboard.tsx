import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { getDashboard } from "@/services/dashboardService"
import { DashboardResponseList, Indicador } from "@/types/dashboard"
import { useEffect, useState } from "react"
import PessoasEmpresaChart from "@/components/PessoasEmpresaChart"
import ParticipacoesEventosChart from "@/components/ParticipacoesEventosChart"
import ParticipacoesPorTipoChart from "@/components/ParticipacoesPorTipoChart"
import { Skeleton } from "@/components/ui/skeleton"
import { useLoading } from "@/hooks/useLoading"

export default function BackofficeDashboard() {
	const [data, setData] = useState<DashboardResponseList | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { showLoading, hideLoading } = useLoading()

	useEffect(() => {
		showLoading()
		getDashboard(198)
			.then(({ data }) => {
				setData(data)
				setLoading(false)
			})
			.catch((error) => {
				setError("Erro ao carregar os dados do dashboard.")
				setLoading(false)
				console.error(error)
			}).finally(() => {
				hideLoading()
			})
	}, [])

	const getIndicador = (id: Indicador["id"]) => {
		return data?.[0].resultado_final.indicadores.find((ind) => ind.id === id)
			?.total
	}

	const pessoasAtivas = getIndicador("qtd_pessoas_ativas")
	const participacaoEventos = getIndicador("qtd_pessoas_eventos")
	const aprovacoesPendentes = getIndicador("qtd_eventos_pessoas_pendentes")

	const pessoasEmpresa = data?.[0].resultado_final.pessoas_empresa
	const participacoesPerfil = data?.[0].resultado_final.eventos_empresa_perfil
	const participacoesTipo = data?.[0].resultado_final.eventos_empresa_tipo

	if (loading) {
		return (
			<div className="space-y-6 animate-fade-in">
				<div>
					<h1 className="text-2xl font-bold text-foreground">
						Painel Operacional
					</h1>
					<p className="text-sm text-muted-foreground">
						Acompanhe métricas estratégicas e evolução das inscrições.
					</p>
				</div>
				<div className="grid gap-4 md:grid-cols-3">
					<Skeleton className="h-32" />
					<Skeleton className="h-32" />
					<Skeleton className="h-32" />
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					<Skeleton className="h-64" />
					<Skeleton className="h-64" />
				</div>
				<div>
					<Skeleton className="h-80" />
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-red-500">{error}</p>
			</div>
		)
	}

	return (
		<div className="space-y-6 animate-fade-in">
			<div>
				<h1 className="text-2xl font-bold text-foreground">
					Painel Operacional
				</h1>
				<p className="text-sm text-muted-foreground">
					Acompanhe métricas estratégicas e evolução das inscrições.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Pessoas Ativas</CardTitle>
						<CardDescription>Qtd cadastrados</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{pessoasAtivas}</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Participação de Pessoas em Eventos</CardTitle>
						<CardDescription>Qtd eventos</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{participacaoEventos}</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Aprovações Pendentes</CardTitle>
						<CardDescription>Qtd eventos</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{aprovacoesPendentes}</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				{pessoasEmpresa && <PessoasEmpresaChart data={pessoasEmpresa} />}
				{participacoesPerfil && (
					<ParticipacoesEventosChart data={participacoesPerfil} />
				)}
			</div>

			<div>
				{participacoesTipo && (
					<ParticipacoesPorTipoChart data={participacoesTipo} />
				)}
			</div>
		</div>
	)
}
