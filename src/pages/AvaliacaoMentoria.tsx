import { useState } from "react"
import { AppBar } from "@/components/AppBar"
import PageHeader from "@/components/reusable/PageHeader"
import PageMainContainer from "@/components/reusable/PageMainContainer"
import { StarRating } from "@/components/reusable/StarRating"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AvaliacaoMentoria() {
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState("")

	const handleSubmit = () => {
		// Handle submission logic here
		console.log({ rating, comment })
		// Ex: call an API to save the evaluation
	}

	return (
		<div className="app-container bg-transparent">
			<PageHeader pageName="Avaliação" />

			<PageMainContainer>
				<main className="space-y-6 p-4">
					<div className="text-center">
						<h2 className="text-xl font-semibold">Nome da Mentoria</h2>
					</div>

					<div className="flex justify-center">
						<StarRating
							value={rating}
							onChange={setRating}
						/>
					</div>

					<div>
						<Textarea
							placeholder="Deixe seu comentário sobre a mentoria..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							rows={6}
						/>
					</div>

					<Button
						onClick={handleSubmit}
						className="w-full"
					>
						Enviar Avaliação
					</Button>
				</main>
			</PageMainContainer>

			<AppBar />
		</div>
	)
}
