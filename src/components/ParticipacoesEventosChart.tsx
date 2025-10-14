import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { EventoEmpresaPerfil } from "@/types/dashboard"
import { Label, Pie, PieChart } from "recharts"

export default function ParticipacoesEventosChart({
	data,
}: {
	data: EventoEmpresaPerfil[]
}) {
	const chartData = data
	const chartConfig = {
		total: {
			label: "Total",
		},
		colaborador: {
			label: "Colaborador",
			color: "hsl(var(--chart-1))",
		},
		lideranca: {
			label: "Liderança",
			color: "hsl(var(--chart-2))",
		},
		membro: {
			label: "Membro",
			color: "hsl(var(--chart-3))",
		},
	}

	const total = chartData.reduce((acc, curr) => acc + curr.total, 0)

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Participações em Eventos por Perfil</CardTitle>
				<CardDescription>Colaborador, liderança e membro</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="total"
							nameKey="perfil"
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{total.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Total
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
