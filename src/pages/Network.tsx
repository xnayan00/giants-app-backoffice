import { AppBar } from "@/components/AppBar"
import { fetchMembrosAction } from "@/services/membrosService"
import { MembroDataType } from "@/types/membros"
import { User } from "lucide-react"
import { useEffect, useState } from "react"

export default function Network() {
	const [membros, setMembros] = useState<MembroDataType[]>([])

	useEffect(() => {
		fetchMembrosAction()
			.then(({ data }) => {
				setMembros(data.data)
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
					Network Giants
				</h1>
			</header>

			{/* Search and Filters */}
			<div className="p-6 pb-4 space-y-4">
				<div className="relative">
					<i className="fi fi-ts-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
					<input
						type="text"
						placeholder="Pesquisar Usuário ou Empresa"
						className="w-full h-12 pl-12 pr-4 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
					/>
				</div>

				{/* Filters */}
				<div className="grid grid-cols-2 gap-3">
					<select className="h-12 px-4 bg-surface border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth">
						<option>Estado</option>
						<option>São Paulo</option>
						<option>Rio de Janeiro</option>
						<option>Mato Grosso</option>
						<option>Goiás</option>
					</select>
					<select className="h-12 px-4 bg-surface border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth">
						<option>Segmento</option>
						<option>Tecnologia</option>
						<option>Saúde</option>
						<option>Brindes</option>
					</select>
				</div>
			</div>

			{/* Network List */}
			<main className="px-6 pb-6 space-y-3 animate-fade-in">
				{membros.map((membro, index) => (
					<div
						key={membro.pes_id}
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
				))}
			</main>

			<AppBar />
		</div>
	)
}
