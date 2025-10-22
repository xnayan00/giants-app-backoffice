import { useEffect } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import CalendarizeComponent from "./CalendarizeEmbedded"

interface MentoringModalProps {
	isOpen: boolean
	onClose: () => void
	calLink: string
}

export function MentoringModal({ isOpen, onClose }: MentoringModalProps) {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Agende sua mentoria</DialogTitle>
				</DialogHeader>
				<CalendarizeComponent />
			</DialogContent>
		</Dialog>
	)
}
