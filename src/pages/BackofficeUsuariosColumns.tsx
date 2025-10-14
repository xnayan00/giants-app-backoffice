"use client"

import { ColumnDef } from "@tanstack/react-table"
import { PessoaDataType } from "@/types/company"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<PessoaDataType>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
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
		accessorKey: "pes_email",
		header: "Usuário",
		cell: ({ row }) => (
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
					<img
						src={row.original.pes_foto_url}
						alt={row.original.pes_nome}
					/>
				</div>
				<div>
					<div className="font-medium text-foreground">
						{row.original.pes_nome}
					</div>
					<div className="text-sm text-muted-foreground">
						{row.original.pes_email}
					</div>
				</div>
			</div>
		),
	},
	{
		accessorKey: "perfil",
		header: "Perfil",
		cell: ({ row }) => (
			<span className="px-3 py-1 rounded-full bg-muted text-foreground text-sm">
				{row.original.perfil}
			</span>
		),
	},
	{
		accessorKey: "pes_status",
		header: "Status",
		cell: ({ row }) => (
			<span
				className={`px-3 py-1 rounded-full text-sm ${
					row.original.pes_status
						? "bg-green-500/10 text-green-500"
						: "bg-red-500/10 text-red-500"
				}`}
			>
				{row.original.pes_status ? "Ativo" : "Inativo"}
			</span>
		),
	},
	{
		accessorKey: "admin",
		header: "Admin",
		cell: ({ row }) => (row.original.admin ? "Sim" : "Não"),
	},
	{
		id: "actions",
		cell: () => (
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
					<DropdownMenuItem className="cursor-pointer hover:bg-surface-hover text-foreground">
						<i className="fi fi-ts-edit mr-2"></i>
						Editar
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer hover:bg-surface-hover text-red-500">
						<i className="fi fi-ts-trash mr-2"></i>
						Excluir
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
]
