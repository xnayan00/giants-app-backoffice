import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { EventoEmpresaPerfil } from "@/types/dashboard"
import { Label, Pie, PieChart, Cell } from "recharts"

export default function ParticipacoesEventosChart({
	data,
}: {
	data: EventoEmpresaPerfil[]
}) {
	const chartData = data
	const COLORS = ["#60a5fa", "#a78bfa", "#4ade80"]
	const chartConfig = {
		total: {
			label: "Total",
		},
		colaborador: {
			label: "Colaborador",
			color: "#60a5fa",
		},
		lideranca: {
			label: "Liderança",
			color: "#a78bfa",
		},
		membro: {
			label: "Membro",
			color: "#4ade80",
		},
	}

	const total = chartData.reduce((acc, curr) => acc + curr.total, 0)

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Participações em Eventos por Perfil</CardTitle>
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
							{chartData.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
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
						<ChartLegend
							content={<ChartLegendContent nameKey="perfil" />}
							className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
