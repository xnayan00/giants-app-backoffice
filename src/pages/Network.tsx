import { AppBar } from "@/components/AppBar"
import { fetchMembrosAction } from "@/services/membrosService"
import { MembroDataType } from "@/types/membros"
import { User } from "lucide-react"
import { useEffect, useState } from "react"
import { useLoading } from "@/hooks/useLoading"
import PageHeader from "@/components/reusable/PageHeader"
import PageMainContainer from "@/components/reusable/PageMainContainer"
import { NavLink } from "react-router-dom"

export default function Network() {
	const [membros, setMembros] = useState<MembroDataType[]>([])
	const [filteredMembros, setFilteredMembros] = useState<MembroDataType[]>([])
	const { showLoading, hideLoading } = useLoading()

	const [search, setSearch] = useState("")
	const [stateFilter, setStateFilter] = useState("todos")
	const [segmentFilter, setSegmentFilter] = useState("todos")

	const [states, setStates] = useState<string[]>([])
	const [segments, setSegments] = useState<string[]>([])

	useEffect(() => {
		showLoading()
		fetchMembrosAction()
			.then(({ data }) => {
				setMembros(data.data)
				const uniqueStates = [
					...new Set(data.data.map((membro) => membro.estado)),
				] as string[]
				const uniqueSegments = [
					...new Set(data.data.map((membro) => membro.segmento)),
				] as string[]
				setStates(uniqueStates)
				setSegments(uniqueSegments)
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				hideLoading()
			})
	}, [])

	useEffect(() => {
		const filtered = membros
			.filter((membro) => {
				if (!search) return true
				return (
					membro.pes_nome.toLowerCase().includes(search.toLowerCase()) ||
					membro.emp_fantasia.toLowerCase().includes(search.toLowerCase())
				)
			})
			.filter((membro) => {
				if (stateFilter === "todos") return true
				return membro.estado === stateFilter
			})

		setFilteredMembros(filtered)
	}, [membros, search, stateFilter, segmentFilter])

	return (
		<div className="app-container bg-transparent">
			{/* Header */}
			<PageHeader pageName="network" />

			<PageMainContainer>
				{/* Search and Filters */}
				<div className="space-y-4">
					<div className="relative">
						<i className="fi fi-ts-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
						<input
							type="text"
							placeholder="Pesquisar Usuário ou Empresa"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full h-12 pl-12 pr-4 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
						/>
					</div>

					{/* Filters */}
					<div className="grid grid-cols-2 gap-3">
						<select
							value={stateFilter}
							onChange={(e) => setStateFilter(e.target.value)}
							className="h-12 px-4 bg-surface border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
						>
							<option value="todos">Estado</option>
							{states.map((state) => (
								<option
									key={state}
									value={state}
								>
									{state}
								</option>
							))}
						</select>
						<select
							value={segmentFilter}
							onChange={(e) => setSegmentFilter(e.target.value)}
							className="h-12 px-4 bg-surface border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
						>
							<option value="todos">Segmento</option>
							{segments.map((segment) => (
								<option
									key={segment}
									value={segment}
								>
									{segment}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Network List */}
				<main>
					{filteredMembros.map((membro, index) => (
						<NavLink
							to={`/member/${membro.pes_id}`}
							key={membro.pes_id}
							className={"block mb-4 last:mb-0"}
						>
							<div
								className="card-elevated p-5 transition-smooth hover:scale-[1.01]"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="flex items-center gap-4">
									{/* Avatar */}

									{membro.pes_foto_url === null ? (
										<User />
									) : (
										<div className="w-16 h-16 overflow-hidden flex-shrink-0 bg-surface rounded-full flex items-center justify-center text-3xl border border-border">
											<img
												src={membro.pes_foto_url}
												alt={membro.pes_nome}
											/>
										</div>
									)}

									{/* Info */}
									<div className="flex-1 min-w-0">
										<h3 className="text-base font-semibold text-foreground">
											{membro.pes_nome}
										</h3>
										<p className="text-sm text-muted-foreground mt-0.5">
											{membro.emp_fantasia}
										</p>
										<div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
											<i className="fi fi-ts-marker"></i>
											<span>{membro.cidade + " - " + membro.estado}</span>
										</div>
									</div>
								</div>
							</div>
						</NavLink>
					))}
				</main>
			</PageMainContainer>

			<AppBar />
		</div>
	)
}
