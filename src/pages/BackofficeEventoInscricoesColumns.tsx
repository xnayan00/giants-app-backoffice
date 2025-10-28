'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	approveInscricao,
	reproveInscricao,
} from '@/services/eventsService'
import { PessoaDataType } from '@/types/company'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const getStatus = (status: string) => {
	switch (status) {
		case 'presença autorizada':
			return 'Aprovado'
		case 'presença não autorizada':
			return 'Reprovado'
		case 'pendente de aprovação':
			return 'Pendente'
		default:
			return status
	}
}

export const columns = (
	refetch: () => void,
): ColumnDef<PessoaDataType>[] => [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					table.getIsSomePageRowsSelected()
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'nome',
		header: 'Nome',
		cell: ({ row }) => (
			<div className="font-medium text-foreground">{row.original.pes_nome}</div>
		),
	},
	{
		accessorKey: 'email',
		header: 'E-mail',
		cell: ({ row }) => (
			<div className="text-sm text-muted-foreground">
				{row.original.pes_email}
			</div>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<span
				className={`px-3 py-1 rounded-full text-sm ${
					row.original.status_origem === 'presença autorizada'
						? 'bg-green-500/10 text-green-500'
						: row.original.status_origem === 'presença não autorizada'
						? 'bg-red-500/10 text-red-500'
						: 'bg-yellow-500/10 text-yellow-500'
				}`}
			>
				{getStatus(row.original.status_origem)}
			</span>
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => (
			<div>
				{row.original.status_origem === 'pendente de aprovação' && (
					<div className="flex items-center gap-2">
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										onClick={async () => {
											await approveInscricao(row.original.pes_id)
											refetch()
										}}
									>
										<i className="fi fi-ts-check-circle text-lg text-green-500 flex items-center justify-center"></i>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Aprovar</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										onClick={async () => {
											await reproveInscricao(row.original.pes_id)
											refetch()
										}}
									>
										<i className="fi fi-ts-circle-xmark text-lg text-red-500 flex items-center justify-center"></i>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Reprovar</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				)}
			</div>
		),
	},
]