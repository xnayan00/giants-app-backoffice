import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchMembrosAction } from "@/services/membrosService"
import { MembroDataType } from "@/types/membros"
import { useLoading } from "@/hooks/useLoading"
import PageHeader from "@/components/reusable/PageHeader"
import PageMainContainer from "@/components/reusable/PageMainContainer"
import { AppBar } from "@/components/AppBar"
import { User } from "lucide-react"
import { getDate } from "@/utils/formatDate"

export default function MemberDetails() {
	const { id } = useParams<{ id: string }>()
	const [member, setMember] = useState<MembroDataType | null>(null)
	const { showLoading, hideLoading } = useLoading()

	useEffect(() => {
		if (id) {
			showLoading()
			fetchMembrosAction({ pes_id: parseInt(id) })
				.then(({ data }) => {
					setMember(data.data[0])
				})
				.catch((error) => {
					console.error("Error fetching member details:", error)
				})
				.finally(() => {
					hideLoading()
				})
		}
	}, [])

	const getInstagramShorthand = (instagram: string) => {
		if (!instagram) return ""
		return "@" + instagram.split("/")[3].split("?")[0] || instagram
	}

	const formatPhoneNumber = (phone: string) => {
		if (!phone) return ""
		const area = phone.slice(0, 2)
		const firstPart = phone.slice(2, 6)
		const secondPart = phone.slice(6, 11)
		return `(${area}) ${firstPart}-${secondPart}`
	}

	if (!member) {
		return null // Or a loading indicator
	}

	return (
		<div className="app-container bg-transparent">
			<PageHeader pageName="Membro" />

			<PageMainContainer>
				<main className="space-y-6 p-4">
					{/* Member Info */}
					<div className="flex flex-col items-center gap-4">
						{member.pes_foto_url ? (
							<div className="w-24 h-24 overflow-hidden flex-shrink-0 bg-surface rounded-full flex items-center justify-center text-3xl border border-border">
								<img
									src={member.pes_foto_url}
									alt={member.pes_nome}
								/>
							</div>
						) : (
							<User size={96} />
						)}
						<div className="flex-1 min-w-0">
							<h2 className="text-xl text-center font-bold">
								{member.pes_nome}
							</h2>
							<p className="text-muted-foreground text-center">
								{getDate(member.pes_nascimento)}
							</p>
							<p className="text-muted-foreground text-center">{`${member.cidade} - ${member.estado}`}</p>
						</div>
					</div>

					{/* Social */}
					<div className="space-y-3">
						<a
							href={`https://wa.me/${member.pes_telefone}`}
							target="_blank"
							rel="noreferrer"
							className="card-elevated p-4 flex items-center gap-3 justify-center"
						>
							<i className="fi fi-brands-whatsapp text-2xl text-green-500"></i>
							<span>{formatPhoneNumber(member.pes_telefone)}</span>
						</a>
						<a
							href={`https://instagram.com/${member.pes_instagram}`}
							target="_blank"
							rel="noreferrer"
							className="card-elevated p-4 flex items-center gap-3 justify-center"
						>
							<i className="fi fi-brands-instagram text-2xl text-pink-500"></i>
							<span>{getInstagramShorthand(member.pes_instagram)}</span>
						</a>
					</div>

					{/* Company Info */}
					<div className="card-elevated p-5 space-y-4">
						<h3 className="text-lg font-semibold">Dados da Empresa</h3>
						<div>
							<p className="text-sm text-muted-foreground">Nome</p>
							<p>{member.emp_fantasia}</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Localização</p>
							<p>{`${member.emp_cidade} - ${member.emp_estado}`}</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Nº de Funcionários
							</p>
							<p>{member.emp_numero_funcionarios}</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Segmento Principal
							</p>
							<p>{member.catp_descricao}</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Segmento Secundário
							</p>
							<p>{member.cats_descricao}</p>
						</div>
					</div>
				</main>
			</PageMainContainer>

			<AppBar />
		</div>
	)
}
