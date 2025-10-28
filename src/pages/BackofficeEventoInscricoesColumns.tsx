'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	approveInscricao,
	reproveInscricao,
} from '@/services/eventsService'
import { PessoaDataType } from '@/types/company'

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
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
					>
						<i className="fi fi-ts-circle-ellipsis-vertical text-lg flex items-center"></i>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="bg-surface border-border"
				>
					{row.original.status_origem === 'pendente de aprovação' && (
						<>
							<DropdownMenuItem
								className="cursor-pointer hover:bg-surface-hover text-green-500"
								onClick={async () => {
									await approveInscricao(row.original.pes_id)
									refetch()
								}}
							>
								<i className="fi fi-ts-check-circle mr-2"></i>
								Aprovar
							</DropdownMenuItem>
							<DropdownMenuItem
								className="cursor-pointer hover:bg-surface-hover text-red-500"
								onClick={async () => {
									await reproveInscricao(row.original.pes_id)
									refetch()
								}}
							>
								<i className="fi fi-ts-cross-circle mr-2"></i>
								Reprovar
							</DropdownMenuItem>
						</>
					)}
					{row.original.status_origem === 'pendente de aprovação' && (
						<>
							<DropdownMenuItem
								className="cursor-pointer hover:bg-surface-hover text-red-500"
								onClick={async () => {
									await reproveInscricao(row.original.pes_id)
									refetch()
								}}
							>
								<i className="fi fi-ts-cross-circle mr-2"></i>
								Reprovar
							</DropdownMenuItem>
						</>
					)}
					{row.original.status_origem === 'pendente de aprovação' && (
						<>
							<DropdownMenuItem
								className="cursor-pointer hover:bg-surface-hover text-green-500"
								onClick={async () => {
									await approveInscricao(row.original.id)
									refetch()
								}}
							>
								<i className="fi fi-ts-check-circle mr-2"></i>
								Aprovar
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
]