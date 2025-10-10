import { AppBar } from "@/components/AppBar"
import { getPalestras } from "@/services/eventsService"
import { PalestraDataType } from "@/types/events"
import { useEffect, useState } from "react"

export default function Palestras() {
	const [categorias, setCategorias] = useState<string[]>([])
	const [palestras, setPalestras] = useState<PalestraDataType[]>([])

	useEffect(() => {
		getPalestras()
			.then(({ data }) => {
				setPalestras(data)
				const categoriasUnicasEmUmaLinha = [
					...new Set(data.map((palestra) => palestra.categoria))
				]

				setCategorias(categoriasUnicasEmUmaLinha)
			})
			.catch((error) => {
				console.error("Error fetching lectures:", error)
			})
	}, [])

	return (
		<div className="app-container">
			{/* Header */}
			<header className="bg-surface-elevated border-b border-border p-6 space-y-3">
				<h1 className="text-2xl font-bold text-foreground text-center">
					Palestras
				</h1>
				<p className="text-lg text-center text-foreground/90 leading-relaxed px-4">
					Não se preocupe com as falhas, você só precisa acertar uma vez.
				</p>
			</header>

			{/* Categories and Lectures */}
			<main className="p-6 pb-24 space-y-8 animate-fade-in">
				{categorias.map((categoria, categoryIndex) => (
					<section
						key={categoryIndex}
						className="space-y-4"
					>
						{/* Category Title */}
						<h2 className="text-sm font-bold text-foreground/80 tracking-wide">
							{categoria}
						</h2>

						{/* Horizontal Scroll Container */}
						<div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
							{palestras.map((palestra, index) => (
								<>
									{palestra.categoria === categoria && (
										<div
											key={palestra.id}
											className="card-elevated overflow-hidden flex-shrink-0 w-[280px] transition-smooth hover:scale-[1.02]"
											style={{
												animationDelay: `${(categoryIndex * 3 + index) * 0.1}s`
											}}
										>
											<div className="relative h-48 bg-gradient-to-br from-surface to-surface-elevated flex items-end p-6">
												<div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-surface-hover border-2 border-border flex items-center justify-center text-4xl">
													{palestra.link}
												</div>
											</div>

											<div className="p-4">
												<h4 className="text-sm font-semibold text-foreground line-clamp-2 min-h-[40px]">
													{palestra.nome}
												</h4>
											</div>
										</div>
									)}
								</>
							))}
						</div>
					</section>
				))}
			</main>

			<AppBar />
		</div>
	)
}
