import * as React from "react"
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer"
import { EventoDataType } from "@/types/events"
import { Button } from "./ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import patternBg from "@/assets/pattern-bg.png"
import { subscribeEvent } from "@/services/eventsService"
import { toast } from "@/hooks/use-toast"

interface EventoBottomSheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	evento: EventoDataType | null
}

export function EventoBottomSheet({
	open,
	onOpenChange,
	evento,
}: EventoBottomSheetProps) {
	if (!evento) {
		return null
	}

	const handleSubscribeEvent = () => {
		subscribeEvent({
			id_pessoa: 198,
			id_produto: evento.id,
			turma: evento.turma,
			origem: evento.origem,
		})
			.then(() => {
				toast({
					title: "Inscrição realizada com sucesso!",
					description: `Você foi inscrito no evento: ${evento.descricao}`,
				})
				onOpenChange(false)
			})
			.catch((error) => {
				toast({
					title: "Erro ao tentar se inscrever no evento.",
				})
				onOpenChange(false)
			})
	}

	return (
		<Drawer
			open={open}
			onOpenChange={onOpenChange}
		>
			<DrawerContent className="p-4 max-w-4xl mx-auto w-full">
				<div className="aspect-image rounded-lg overflow-hidden bg-muted mt-3">
					{evento.eve_foto_url ? (
						<img
							className="w-full object-cover"
							src={evento.eve_foto_url}
							alt={evento.descricao}
						/>
					) : (
						<img
							src={patternBg}
							alt=""
						/>
					)}
				</div>
				<DrawerHeader>
					<DrawerTitle className="text-2xl">{evento.descricao}</DrawerTitle>
				</DrawerHeader>
				<div className="px-4 space-y-4">
					<div className="space-y-2 text-sm text-muted-foreground">
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							<span>
								Início:{" "}
								{new Date(evento.data_inicio).toLocaleDateString("pt-BR")} às{" "}
								{new Date(evento.data_inicio).toLocaleTimeString("pt-BR", {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							<span>
								Fim: {new Date(evento.data_fim).toLocaleDateString("pt-BR")} às{" "}
								{new Date(evento.data_fim).toLocaleTimeString("pt-BR", {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Users className="h-4 w-4" />
							<span>{evento.inscritos} participantes</span>
						</div>
						{evento.local && (
							<div className="flex items-center gap-2">
								<MapPin className="h-4 w-4" />
								<span>{evento.local}</span>
							</div>
						)}
						{evento.endereco && (
							<div className="flex items-center gap-2">
								<span>{evento.endereco}</span>
							</div>
						)}
					</div>
					<p className="text-muted-foreground">{evento.origem}</p>

					<div className="flex items-center gap-2">
						<div className="flex -space-x-2">
							{evento.pessoas_insc.map((pessoa, index) => (
								<div
									key={pessoa.pes_id + index}
									className="w-8 h-8 overflow-hidden rounded-full bg-accent flex items-center justify-center text-xs border-2 border-surface-elevated"
								>
									{pessoa.foto_url === null ? (
										<i className="fi fi-ts-circle-user flex items-center justify-center text-lg text-white"></i>
									) : (
										<img
											src={pessoa.foto_url}
											alt=""
										/>
									)}
								</div>
							))}
						</div>
						<Button variant="outline">Ver todos</Button>
					</div>
					{!evento.inscrito && (
						<Button
							onClick={handleSubscribeEvent}
							className="w-full"
						>
							Inscreva-se
						</Button>
					)}
					{evento.inscrito && (
						<Button
							disabled
							className="w-full"
						>
							Você está inscrito
						</Button>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	)
}
