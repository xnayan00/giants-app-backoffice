import { AppBar } from "@/components/AppBar"
import { PalestraBottomSheet } from "@/components/PalestraBottomSheet"
import { getPalestras } from "@/services/eventsService"
import { PalestraDataType } from "@/types/events"
import { getYoutubeThumbnail } from "@/utils/getYoutubeThumbnail"
import React from "react"
import { useState, useEffect } from "react"

export default function Palestras() {
	const [categorias, setCategorias] = useState<string[]>([])
	const [palestras, setPalestras] = useState<PalestraDataType[]>([])
	const [selectedPalestra, setSelectedPalestra] =
		useState<PalestraDataType | null>(null)

	useEffect(() => {
		getPalestras()
			.then(({ data }) => {
				setPalestras(data)
			const categoriasUnicasEmUmaLinha = [
				...new Set(data.map((palestra) => palestra.categoria))
			] as string[]

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
						key={categoria}
						className="space-y-4"
					>
						{/* Category Title */}
						<h2 className="text-sm font-bold text-foreground/80 tracking-wide">
							{categoria}
						</h2>

						{/* Horizontal Scroll Container */}
						<div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
							{palestras.map((palestra, index) => (
								<React.Fragment key={palestra.id}>
									{palestra.categoria === categoria && (
										<div
											className="card-elevated overflow-hidden flex-shrink-0 w-[280px] transition-smooth hover:scale-[1.02] cursor-pointer"
											style={{
												animationDelay: `${(categoryIndex * 3 + index) * 0.1}s`
											}}
											onClick={() => setSelectedPalestra(palestra)}
										>
											<div className="relative h-40 bg-gradient-to-br from-surface to-surface-elevated flex items-end">
												<img
													src={getYoutubeThumbnail(palestra.link)}
													alt={palestra.nome}
													className="w-full h-full object-cover"
												/>
											</div>

											<div className="p-4">
												<h4 className="text-sm font-semibold text-foreground line-clamp-2 min-h-[40px]">
													{palestra.nome}
												</h4>
											</div>
										</div>
									)}
								</React.Fragment>
							))}
						</div>
					</section>
				))}
			</main>

			<AppBar />

			<PalestraBottomSheet
				open={!!selectedPalestra}
				onOpenChange={(open) => {
					if (!open) {
						setSelectedPalestra(null)
					}
				}}
				title={selectedPalestra?.nome}
				description={selectedPalestra?.descricao}
				videoUrl={selectedPalestra?.link}
			/>
		</div>
	)
}
